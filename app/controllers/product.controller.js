var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.addManyProducts=(req,res,next)=>{
    if(req.body){
        Product.insertMany(req.body,(err,doc)=>{
            if(err){
                res.status(500).json({
                    err:err,
                    message:"Internal server error"
                })
            }else{
                res.status(200).json({
                    message:"Multiple records inserted succesfully",
                    doc:doc
                })
            }
        })
    }else{
        res.status(404).json({
            message:"Required data is missing from body"
        })
    }
}

module.exports.addOneProduct=(req,res,next)=>{
    if(req.body){
        Product.create(req.body,(err,doc)=>{
            if(err){
                res.status(500).json({
                    err:err,
                    message:"Internal server error"
                })
            }else{
                res.status(200).json({
                    message:"One record inserted succesfully",
                    doc:doc
                })
            }
        })
    }else{
        res.status(404).json({
            message:"Required data is missing from body"
        })
    }
}

module.exports.getOneProduct=(req,res,next)=>{
    
    var productId = req.params.productId;
    if(productId){
    Product.findById(productId,(error,product)=>{
        if(error){
            res
            .status(500)
            .json({message:"Get one product failed",
            error:error
        });
            }
        else{
            res
            .status(200)
            .json(product)
            }
    })
}else{
    res.status(404).json({
        message:"Required data productId is missing from params"
    })
}
}

module.exports.getManyProducts=(req,res,next)=>{
    Product.find({})
    .exec((error,products)=>{
        if(error){
        res
        .status(500)
        .json({message:"Get all products failed",
        error:error
    })
        }
    else{
        console.log("Records count:",products.length);
        
        res
        .status(200)
        .json(products)
        }
    });
}

module.exports.updateOneProduct = (req,res)=>{
    var ProductId = req.params.ProductId; 
    console.log(ProductId);

    //Update query
    var updateQ = {
        $set:req.body
    }
    if(productId){
    //coll.updateOne(filterQ,updateQ,callback)
    Product.findByIdAndUpdate(ProductId,updateQ,(error,ack)=>{
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
                message:"The Record is updated succesfully",
                payload: ack
            })
        }
    })
    }else{
    res.status(404).json({
        message:"Required data productId is missing from params"
    })
    }
}


module.exports.deleteOneProduct=(req,res,next)=>{
    var productId = req.params.productId;
    
    if(productId){
    Product.findOneAndDelete(productId,(error,ack)=>{
        if(error){
            res
            .status(500)
            .json({
                message:"Interal server error",
                error:error
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
    }else{
    res.status(404).json({
        message:"Required data productId is missing from params"
    })
}
}