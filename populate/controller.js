var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var querystring = require('querystring');

;
var axios = require("axios")
var jsonData=[]
let token=''
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  });
  var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
            console.log(file.originalname)
        }
        callback(null, true);
    }
}).single('file');

function uploadFile(req,res){
    var exceltojson; //Initialization
    upload(req,res,function(err){
        if(err){
            console.log(req.body)
             res.json({error_code:1,err_desc:err});
             console.log(err)
             return;

        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        //start convert process
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                    console.log("++++++"+err)
                }
                jsonData=result
                res.json({error_code:0,err_desc:null, data: result});
                let roles=[]
                // roles=[{"id":"1234","name":result.name}]
                console.log("jsodata",jsonData.length)
                axios.post('http://localhost:8080/auth/realms/ace/protocol/openid-connect/token',querystring.stringify({
                        username: 'admin',
                        password: 'admin',
                        grant_type: 'password',
                        client_id: 'ace-public'
                    }),{
                        headers: { 
                            "Content-Type": "application/x-www-form-urlencoded"
                          }
                    }).then(function(response){console.log("success")
                     token = response.data.access_token

                
                jsonData.map(obj=>{
                     
                        console.log("email",obj.email)
                      
                         axios.get('http://localhost:8080/auth/admin/realms/ace/users?email='+obj.email,{
                            headers:{
                                "Authorization": "Bearer "+token
                            }
                        }).then(function(response){
                            let name = obj.name.replace(/\s*,\s*/g, ",");
                            name = name.split(",");
                            console.log("name",name)
                            roles=[]
                            name.map(item=>{
                                console.log(item)
                                   if(item=="service-engineer")
                                   roles.push({"id":"47d284b2-c75b-48b0-a6a7-18ffed8f0f4c","name":item})
                                   if(item=="ace-architect") 
                                   roles.push({"id":"b95ef9de-42a3-4419-8a04-73b0fbf58d72","name":item})
                                   if(item=="domain-architect") 
                                   roles.push({"id":"6ce803fc-9091-4200-a819-a6ea069e7ceb","name":item})
                                   if(item=="project-manager") 
                                   roles.push({"id":"430a36af-bc47-4335-9453-9e4a12403845","name":item})
           
           
                            })
                            console.log("roles",roles)
                            let id = response.data[0].id
                            axios.post("http://localhost:8080/auth/admin/realms/ace/users/"+id+"/role-mappings/clients/4c50426f-b172-43c2-97bd-ed917b0f13a0",roles,{
                                headers:{
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer "+token
                                }
                              }).then(function(response){
                                  console.log("assigned roles")
                                  roles=[]
                              }).catch(function(err){
                                  console.log(err)
                                roles=[]
                              })     
                        }).catch(function(err){
                            roles=[]
                            console.log(err)
                        })
                    })

                })
                
            })
        } catch (e){
            res.json({error_code:1,err_desc:"Corrupted excel file"});
            console.log(e)
        }

    });
}

function populate(req,res){
   
}
module.exports={
    uploadFile:uploadFile,
    populate:populate
}