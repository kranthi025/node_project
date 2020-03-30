// Import mongoose
// Generate connection
// Create Schema
// Generate Schema
// Generate model object
// Use model objects for query

const mongoose = require('mongoose');
const CONFIG = require('../config');
require('../models/users.model');
require('../models/products.model');
var dbConfig = {
    user: CONFIG.DBUSER,
    pass: CONFIG.DBPASS,
    authSource: CONFIG.DBAUTH,
    useNewUrlParser: CONFIG.PARSER,
}

// Connection URL
//const dburl = 'mongodb://pjone_user:user1234@ds153495.mlab.com:53495/pjone_db';
mongoose.connect(CONFIG.DBURL,dbConfig);

var conn = mongoose.connection;

conn.on('error',()=>{
    console.log("DB connection error");
});
conn.once('open',()=>{
    console.log("DB connection succesfull on mongoose !");
})