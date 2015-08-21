/**/
var http = require('http');
var express = require('express'); 
var session = require('express-session');
var fs = require('fs');
var ejs = require('ejs');

/**/
var init = require('./init.js');

/**/
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);

/**/
app.use('/static',  express.static('public'));
app.get('/', function(req, res){
	var data = ejs.render(fs.readFileSync('index.ejs', 'utf-8'));

  	res.end(data);
});

var data = require('./data.js');

setTimeout(function(){
	console.log(data.constructions);
}, 10000);
