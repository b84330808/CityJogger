/**/
var http = require('http');
var express = require('express'); 
var fs = require('fs');

/**/
var init = require('./init.js');
var datas = require('./data.js');

/**/
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);

/**/
app.use('/static',  express.static('public'));
app.get('/', function(req, res){
	var data = fs.readFileSync('index.ejs', 'utf-8');

  	res.end(data);
});
app.get('/getdata', function(req, res){
  	res.end(datas);
});

var data = require('./data.js');

setTimeout(function(){
	console.log(data.constructions);
}, 10000);
