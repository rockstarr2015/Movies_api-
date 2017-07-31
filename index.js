var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');


var upload = multer();


app.use(bodyParser.json());
app.use(upload.array());
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'pug');
app.set('views','./views');


var router = require('./route.js');

app.use('/', router);


app.listen(port,(err) => {
	if(err){
		console.log(err);
	}
	console.log("Server is listening on port: "+port);
});

