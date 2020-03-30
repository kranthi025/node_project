var MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const dburl = 'mongodb://pjone_user:user1234@ds153495.mlab.com:53495/pjone_db';

 var conn;
 var open = ()=>{
// Use connect method to connect to the server
MongoClient.connect(dburl,{ useNewUrlParser: true },(error, Connection)=> {
    if (error) {
        console.log("DB server not connected to node");
    } 
    else{
        console.log("Connected successfully to server");
        conn = Connection;
    }  
    });
 }

var get = ()=>{
    return conn;
}

module.exports={
    open:open,
    get:get
}