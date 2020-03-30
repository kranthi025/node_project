var conn = require('../models/connection');
var ObjectId = require('mongodb').ObjectId;

module.exports.getAllUsers = (req,res)=>{
    var coll = conn.get().db('pjone_db').collection('pjone_users');
    var offset = (req.query.offset)?parseInt(req.query.offset,10):0;
    var count = (req.query.code)?parseInt(req.query.count,10):3;
    
    coll.find({})
    .skip(offset)
    .limit(count)
    .toArray((error,docs)=>{
        if(error){
        res
        .status(500)
        .json({message:"Get all users failed"})
        }
    else{
        console.log("Records count:",docs.length);
        
        res
        .status(200)
        .json(docs)
        }
    });
}

module.exports.getOneUser = (req,res)=>{
    var userId = req.params.userId;
    var coll = conn.get().db('pjone_db').collection('pjone_users');
    coll.findOne({"_id": userId},(error,user)=>{
        if(error){
            res
            .status(500)
            .json({message:"Get one users failed"})
            }
        else{
            res
            .status(200)
            .json(user)
            }
    })
    res
    .status(200)
    .send(`Hello user ${request.query.name} 
    Your age is ${request.query.age}`)
};

// module.exports.getUsers = (request,response)=>{
//     console.log(request.url);

//     console.log("------------------------");

//     console.log(request.method);

    
//     console.log("------------------------");
    
//     console.log(request.query);

//     console.log("------------------------");
    
//     response
//     .status(200)
//     .send(`Welcome to User name ${request.query.name} And age is ${request.query.age}`)
// };

module.exports.getData= (req,res)=>{
    var user = {name: "kranthi", age: 30, gender: "male"}
    res
    .status(200)
    .json(user)
};


module.exports.addUser = (req,res)=>{
    console.log("----------------------------------");
    console.log(req.body);
    console.log("----------------------------------");
    var coll = conn.get().db('pjone_db').collection('pjone_users');
    coll.insertOne(req.body,(error,resp)=>{
        if(error){
            res
            .status(500)
            .json({
                message:"Interal server error",
                error:error,
            })
        }
        else{
            res
            .status(200)
            .json({
                status:true,
                message:"Record added succesful",
                payload:resp
            })
        }
    });

};

module.exports.updateUser = (req,res)=>{
    var userId = req.params.userId; 
    console.log(userId);
    var coll = conn.get().db('pjone_db').collection('pjone_users');
    //filter query
    var filterQ = {"_id":ObjectId(userId)};
    //Update query
    var updateQ = {
        $set:{
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        }
    }
    //coll.updateOne(filterQ,updateQ,callback)
    coll.updateOne(filterQ,updateQ,(error,ack)=>{
        if(error){
            res
            .status(500)
            .json({
                message:"Interal server error",
                error:error,
            })
        }
        else{
            res
            .status(200)
            .json({
                status: true,
                message:"Record is updated succesfully",
                payload: ack
            })
        }
    });

    // res
    // .status(200)
    // .json({
    //     message:"This is a put message"
    // })
}

module.exports.deleteOneUser = (req,res)=>{
    var userId = req.params.userId; 
    console.log(userId);
    var coll = conn.get().db('pjone_db').collection('pjone_users');
    //filter query
    var filterQ = {"_id":ObjectId(userId)};
    //Update query
    
    //coll.updateOne(filterQ,updateQ,callback)
    coll.deleteOne(filterQ,(error,ack)=>{
        if(error){
            res
            .status(500)
            .json({
                message:"Interal server error",
                error:error,
            })
        }
        else{
            res
            .status(200)
            .json({
                status: true,
                message:"Record deleted succesfully",
                payload: ack
            })
        }
    });
    // res
    // .status(200)
    // .json({
    //     message:"This is a delete message"
    // })
    }

module.exports.getUserById = (req,res)=>{
    var userId = req.params.userId;
    console.log(req.params);
    

    var coll = conn.get().db('pjone_db').collection('pjone_users');
    coll.findOne({"_id":ObjectId(userId)},(error,user)=>{
        if(error){
            res
            .status(500)
            .json({message:"Get one users failed"})
            }
        else{
            res
            .status(200)
            .json(user)
            }
    });
}