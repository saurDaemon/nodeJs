var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var config  = require('./database.js');

//insert service layer
function myFunction(data){
    console.log('function was called..');
    var url = config.database;
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      var myobj = data;     
      console.log("this is service layer"+ myobj); 
      db.collection("userDetails").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
      console.log("Connected correctly to server.");
      db.close();
    });

}

//delete employee details
function deleteEmp(data){
  console.log('function was called..'+data.length);
  var mongodb = require('mongodb');
  MongoClient.connect(config.database, function(err, db) { 
    if (err) throw err;  
     // console.log(i+"---"+data.length)
      var id=''+data+'';
      console.log("this data is getting removed"+ id);
  db.collection('userDetails', function(err, collection) {
var MongoClient = require('mongodb').MongoClient;
collection.remove({_id: new mongodb.ObjectID(id)});
 });
db.close();
    console.log("Connected correctly to server.");
    
  });


}

//retrive employee

function getFunction(req,res,next){
  var url =config.database;
  var array=[];
  MongoClient.connect(url,function(err,db){
  assert.equal(null,err);
var curser=db.collection('userDetails').find();
curser.forEach(function(doc,err) {
  assert.equal(null,err);
  array.push(doc);
}, function(){
  db.close();
  res.send(array);
});
  });

}


//insert service layer
function myUpdate(data){
  var url = config.database;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var myquery = ''+data+'';
    var myobj = data;     
    console.log("this is service layer"+ myobj); 
    db.collection("customers").updateOne({_id: new mongodb.ObjectID(id)}, myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });

}

var myString='String';
module.exports.deleteEmp=deleteEmp;
module.exports.getFunction=getFunction;
module.exports.myFunction=myFunction;
module.exports.myString=myString;