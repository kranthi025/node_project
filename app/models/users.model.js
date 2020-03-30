var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String,
    phone:String,
    role:{
        type:String,
        "default":"user"
    },
    Gender:String,
    isMarried:Boolean,
    address:{
        street:String,
        pincode:String,
        city:String,
        state:String,
        country:String,
    }
});

//Syntax: mongoose.model('modelObject',Schema,collection); 

mongoose.model('User',userSchema,'pjone_users');
