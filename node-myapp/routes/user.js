var mongoose = require('mongoose');
var express = require('express');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Mongo = require('mongodb');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session')
mongoose.Promise = global.Promise;


// user save schema
function save(req,res,next){
    
var User = {
'name': req.body.name,
'password': req.body.password
//'_id':mySuperAwesomeExtraneousId
};
//res.send("this is me");
var url = 'mongodb://localhost:27017/app';
MongoClient.connect(url, function(err, db) {

  db.collection("UserSchema").findOne(User, function(err, doc) {
      console.log(doc);
    if (doc==null){
        db.close();
        let mySuperAwesomeExtraneousId = new Mongo.ObjectID()
        var newUser = {
            'name': req.body.name,
            'password': req.body.password,
            '_id':''+mySuperAwesomeExtraneousId+''
            };
            console.log("--------------");
            console.log(newUser);
            console.log("--------------");
               console.log("this is find one error")
        insert(newUser);
    }else{
        var sessData = req.session;
        sessData.someAttribute = "sucess";
        console.log("this is find one  sucess");
       res.send("user is logged in");
    }
  });
  console.log(res);
  
});
}

function insert(user){
    console.log('function was called..');
    
        var url = 'mongodb://localhost:27017/app';
        MongoClient.connect(url, function(err, db) {   
          db.collection("UserSchema").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
          });
          db.close();
        });
        
}


module.exports.save=save;
