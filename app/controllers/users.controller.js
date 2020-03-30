var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getAllUsers = (req,res)=>{
    // var offset = (req.query.offset)?parseInt(req.query.offset,10):0;
    // var count = (req.query.code)?parseInt(req.query.count,10):3;
    
    User.find({})
    .exec((error,docs)=>{
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

    User.findById(userId,(error,user)=>{
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

    User.create(req.body,(error,resp)=>{
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

    //Update query
    var updateQ = {
        $set:{
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password
        }
    }
    //coll.updateOne(filterQ,updateQ,callback)
    User.findOneAndReplace(userId,updateQ,(error,ack)=>{
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
    
    //coll.updateOne(filterQ,updateQ,callback)
    User.findByIdAndDelete(userId,(error,ack)=>{
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
    
    User.findById(userId,(error,user)=>{
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
}