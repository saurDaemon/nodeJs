var express = require('express');
var router = express.Router();
//var auth = require('./auth.js');
var bodyParser = require('body-parser');
var app = express();
var config = require('./database.js');
var User = require('./user.js');
app.use(bodyParser.json());

var service=require('./myAppService');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var expressValidator=require('express-validator');
var expressSession=require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(expressValidator());
app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));



router.get('/', function(req, res) {
    
    console.log("m in Root");
    console.log(req.body.name);
    res.json({ message: 'Welcome' });
  });
//this api is for updatae
router.post('/insert',urlencodedParser,function(req,res,next){
  if(req.someAttribute=="sucess"){
    var employee=req.body;
     console.log(employee);
     service.myFunction(employee);
       res.send('this is whtat i was looking for');
  }else{
    res.send("Your are not authorized");
  }
   });


   //this api is for deliting data
router.get('/delete',function(req,res,next){
  if(req.someAttribute=="sucess"){
    var employee=req.body;  
      console.log(employee.length);
    for(var i=0;i<employee.length;i++){
     service.deleteEmp(employee[i]);
    }
       res.send('this is whtat i was looking for');
  }else{
    res.send("you are not permitted");
  }
   });

 //this api is for retriving data
 router.get('/retrive',function(req,res){
   console.log(req.someAttribute);
  if(req.someAttribute=="sucess"){
  service.getFunction(req,res,next);
  }else{
    res.send("you are not permitted");
  }
});
     
//this api for user signup and registration
        router.post('/signup', urlencodedParser,function(req,res,next) {
          console.log(req.body);
          if (!req.body.name || !req.body.password) {
            console.log("this is if");
            res.json({success: false, msg: 'Please pass name and password.'});
          } else {
            console.log("this is else");
           
          User.save(req,res);
          console.log(req.someAttribute);

          
        }
        });



 //this api is for retriving data
 router.get('/update',function(req,res,next){
  if(req.someAttribute=="sucess"){
  service.myUpdate(req.body);
  }else{
    res.send("you are not permitted");
  }
});

module.exports = router;

