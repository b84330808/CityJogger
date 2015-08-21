/*  */
var request = require('request');
var data = require('./data.js');

var cars_url = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=5aacba65-afda-4ad5-88f5-6026934140e6';
var constructions_url = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=201d8ae8-dffc-4d17-ae1f-e58d8a95b162';

/* cars */
request(cars_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        data.cars = (JSON.parse(body)).result.results;
        // console.log(obj.result.results);
    }
})
setInterval(function() {
    request(cars_url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data.cars = (JSON.parse(body)).result.results;
            // console.log(obj.result.results);
        }
    })
}, 300000);

/* constructions */
request(constructions_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        data.constructions = (JSON.parse(body)).result.results;
        // console.log(obj.result.results);
    }
})
setInterval(function() {
    request(constructions_url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            data.constructions = (JSON.parse(body)).result.results;
            // console.log(obj.result.results);
        }
    })
}, 86400000);