const { json } = require( "express" );
const fs = require("fs")
const path = require('path');


const fsWrite =(req, res)=>{
  // Asynchronous way to write to files 

  const {content1, content2, content3} =req.body;

  fs.writeFile("content1.txt", content1, (err)=>{
    // if(err)return res.status(200).json({"errorcode":"0000", "message":"Error during write"});
    if(err)console.log("error");
  })
  
  fs.writeFile("content2.txt", content2, (err)=>{
    if(err)return res.status(200).json({"errorcode":"0000", "message":"Error during write"});
  })

  fs.writeFile("content3.txt", content3, (err)=>{
    if(err)return res.status(200).json({"errorcode":"0000", "message":"Error during write"});
  })
  let returnData = "";

  const readPath = path.join(__dirname, "..", "content3.txt")

  // const readAFile = fs.readFileSync(readPath, 'utf8')   
  returnData = readAFile

  fs.readFile(readPath, (err, data) => {
    if (err) throw err;
    returnData = data.toString();
    console.log(returnData);
  })
  // returnData in response will be empty
  // Sometimes it might give error as during async running readFile might get initiated and say the file does not exist

  return res.status(200).json({"errorcode":"1111", "message":"Success", data:returnData});
}

// Real world scenario of using fs.writeFIle
const fsWriteReq =(req, res)=>{
  // Asynchronous way to write to files 

  const {userName, PhoneNumber} =req.body;

  //the server uses fs.writeFile to log incoming requests asynchronously to a file.
  fs.writeFile("request.log", JSON.stringify({userName, PhoneNumber}), (err)=>{
    if(err)console.log({"errorcode":"0000", "message":"Error during write"});
  });

  let sum = 0;

  for(let i=1; i<1000;i++)sum+=i;
  return res.status(200).json({errorcode:"1111", message:"Success", data:sum});
}


const fsWriteFileSync =(req, res)=>{
  try{
    const {content1, content2, content3} =req.body;  
    // The file write operation is synchronous
    // Blocks the execution of the program until the write operation is complete. 

    fs.writeFileSync("content4.txt", content1, {flag:'a+'});
    fs.writeFileSync("content5.txt", content2);
    fs.writeFileSync("content6.txt", content3);

    const readPath = path.join(__dirname, "..", "content6.txt")

    const readAFile = fs.readFileSync(readPath, 'utf8')   

    return res.status(200).json({"errorcode":"1111", "message":"Success", "data":readAFile});

  }catch(error){
    return res.status(500).json({"errorcode":"0000", "message":"Something went wrong."});
  }
}


const writeStreams =(req, res)=>{

    try{
      const filePath = path.join(__dirname, "..", "data_Log.txt")
      const inputStream = fs.createReadStream(filePath)
  
      const outputStream = fs.createWriteStream('data.txt')

      inputStream.pipe(outputStream)
      
      // On finish
      outputStream.on('finish', () => {
          return res.status(200).send('Successfully uploaded file.');
      })

      // Handle errors
      outputStream.on('error', (err) => {
        console.error('Error writing file:', err);
        return res.status(500).send('Error uploading file.');
      });

    }catch(error){
      return res.status(500).send('Error uploading file.');

    }
    
}


module.exports = {fsWrite, fsWriteReq,fsWriteFileSync, writeStreams}

















// NOTE: 

// fs.open and fs.write are for low-level access, similar to what you get when you code in C. fs.open opens a file and fs.write writes to it.

// A fs.WriteStream is a stream that opens the file in the background and queues writes until the file is ready. Also, as it implements the stream API, you can use it in a more generic way, just like a network stream or so. You'll e.g. want this when a user uploads a file to your server - take the incoming HTTP POST stream, pipe() it to the WriteStream. Very easy.

// fs.writeFile is a high-level method for writing a bunch of data you have in RAM to a file. It doesn't support streaming or so, so it's a bad idea for large files or performance-critical stuff. You'll want this if you write out small JSON files or so in your code.
