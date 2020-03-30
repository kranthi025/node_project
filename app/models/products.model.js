var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    name:String,
    image:String,
    subcategory:[{
        _id : String,
        name:String,
        price:String,
        sub:[{
            name : String,
            price : String,
            details : String,
            model : String,
            image : String,
            date : String,
            location : String
        }]
    }]
});

//Syntax: mongoose.model('modelObject',Schema,collection); 

mongoose.model('Product',productSchema,'pjone_products');
