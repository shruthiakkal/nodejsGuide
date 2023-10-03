var express = require('express');


const { inspectSwitch } = require( '../controllers/jsDebugger' );
const { fsWrite, fsWriteFileSync, writeStreams, fsWriteReq } = require( '../controllers/writesData' );
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/inspect", inspectSwitch)
router.post("/write", fsWrite)
router.post("/writeSync", fsWriteFileSync)
router.post("/writeStreams", writeStreams)
router.post("/write/example", fsWriteReq)




module.exports = router;
