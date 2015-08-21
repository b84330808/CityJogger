var request = require('request');

var url = 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=5aacba65-afda-4ad5-88f5-6026934140e6';
var obj='';

request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        obj= JSON.parse(body);
        console.log(obj.result.results);
    }
})

setInterval(function() {
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            obj= JSON.parse(body);
            console.log(obj.result.results);
        }
    })
}, 300000);

////// fetch obj ///////