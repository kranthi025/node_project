var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
const CONFIG = require('../config');

module.exports.registration = (req,res,next)=>{
 console.log(req.body);
 var saltRounds=10;
 var salt = bcrypt.genSaltSync(saltRounds);
 var hashPassword = bcrypt.hashSync(req.body.password, salt);
 if(req.body && req.body.name && req.body.email && req.body.phone && req.body.password){
        var user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashPassword,
            role:req.body.role
        });
        user.save((error,result)=>{
            if(error){
                res
                .status(500)
                .json({
                    message:"Interal server error",
                    error:error,
                });
            }
            else{
                res
                .status(200)
                .json({
                    status:true,
                    message:"Record added succesful",
                    payload:result
                });
            }
        })

 }else{
        res
        .status(404)
        .json({
            message:"Required fields are missing",
        });
 }
}

module.exports.loginUser= (req,res,next) =>{
    console.log(req.body);
    if(req.body && req.body.email && req.body.password){
        User.findOne({email: req.body.email},(error,user)=>{
            if(error){
                res
                .status(500)
                .json({
                    message:"Interal server error",
                    error:error,
                });
            }else if(!user){
                res

                .status(500)
                .json({
                    message:"User not found ! Register now",
                    status:false,
                });
            }
            else{
                console.log(req.body.password,user.password);
                var isMatched = bcrypt.compareSync(req.body.password,user.password);
                if(isMatched){
                    var payload = {_id: user._id,role:user.role};
                    var token = jwt.sign(payload,CONFIG.SECRETKEY,{expiresIn:'1h'});
                    res
                    .status(500)
                    .json({
                        message:'Login Successfull !',
                        status:true,
                        token:token
                    })
                }else{
                    res
                .status(400)
                .json({
                    message:"Password not matched ! unAuthorized user",
                    status:false
                });
                }
            }
        })
    }else{
        res
        .status(404)
        .json({
            message:"Required fields are missing",
        });   
    }
}
module.exports.tokenValidator= (req,res,next) =>{
    console.log(req.headers);
    var token = req.headers['auth-access-token'];
    if(token){
        jwt.verify(token,CONFIG.SECRETKEY,(error,decoded)=>{
            if(error){
                res
                    .status(401)
                    .json({
                        message:"Invalid Token",
                        error: "UnAutherized !"
                    });
            }
            User.findById(decoded._id,(error,user)=>{
                if(error){
                    res
                    .status(500)
                    .json({
                        message:"Interal server error",
                        error:error
                    });
                }else if(!user){
                    res
                    .status(500)
                    .json({
                        message:"User not found ! Get Register",
                        status:false
                    });
                }
                else if(user.role=='admin'){
                    // res
                    // .status(200)
                    // .json({
                    //     message:"Token is verfied",
                    //     status:true,
                    //     user:user
                    // })
                    next();
                }
                else{
                    res
                    .status(401)
                    .json({
                        message:"Unautherized user, Need admin access",
                        status:false
                    })
                }
            })
        });
    }else{
        res
        .status(404)
        .json({
            message:"Token not found !",
            token:null,
            status:false
        });
    }
}

module.exports.adminValidatorForAdminRole = (req,resp,next)=>{

}