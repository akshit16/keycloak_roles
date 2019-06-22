let express = require('express');
let router = express.Router();
var controller = require('./controller')


router.post('/upload', function(req, res) {
    console.log(req.body)
    controller.uploadFile(req,res)
{
try{
}
catch(err){
console.log("something"+err)
}}
});

module.exports=router;