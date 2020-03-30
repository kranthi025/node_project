//import connection file mongodb connection
// require('./app/models/connection').open();
require('./app/models/conn')

var express = require('express');
var homeRoute = require('./app/Routes/home.route');
var userRoute = require('./app/Routes/users.route');
var productRoute = require('./app/Routes/products.route');
var bodyParser = require('body-parser')
var port = 3030;
var host = '127.0.0.1';

var app = express();

//middleware enable request body parsing
app.use(bodyParser.urlencoded({extended:false}));

//Enable Json data as request
app.use(bodyParser.json());

//pare an html body into a string
app.use(bodyParser.text({ type: 'text/html' }));

//middleware mapping routes
app.use('/', homeRoute);
app.use('/api/', userRoute);
app.use('/api/', productRoute);

//generate server
app.listen(port,host,function(){
console.log(`Server is running on port : ${port}
And Host: ${host}`);
});