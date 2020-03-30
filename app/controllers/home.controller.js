module.exports.homeRoot = (req,res)=>{
    res
.status(200)
.send("Hello server is running...........");
}


module.exports.homePage = (req,res)=>{
    res
    .status(200)
    .send("Welcome to homepage...");
}
