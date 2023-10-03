const fs = require("fs")

const inspectSwitch=(req, res)=>{

  console.log("Starting InspectSwitch func --- learn enabling V8 inspector")

  var a = [1,2,3,4]
  var lessThanTwo = []
  var greaterThanTwo = []
  for(let i=0; i<a.length;i++){

    console.log("Inside for loop")

    if (a[i] <= 2){
      lessThanTwo.push(a[i])
    }else {
      // package json updated with ---- "start": "node --inspect ./bin/www"
      // Open in Chrome --- for chrome debugger tools 
      // Inspect - click on Nodejs icon from debugger 
      // You can start debugging your code

      // debugger work
      // Debugger acts like Parent process, by default it runs on 9229 port
      // Our application acts as child process
      debugger;
      greaterThanTwo.push(a[i])
    }
  }
  
  res.send({lessThanTwo, greaterThanTwo})
}

module.exports= {inspectSwitch}