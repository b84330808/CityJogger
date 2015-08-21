/*  */
var request = require('request');
var datas = require('./data.js');

getCars();
getConstructions();
getUV();
getAirQuality();


/**/
function getCars(){
	request(datas.cars.url, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        datas.cars.data = (JSON.parse(body)).result.results;

                        //****preprocess start****//
                        var speedLimit = 1;
                        var temp =[];
                        for(var i in datas.cars.data){
                            if(datas.cars.data[i]['AvgOcc']<speedLimit){
                                temp.push(datas.cars.data[i]);
                            }
                        }
	        datas.cars.data=temp;
                        //****preprocess end****//
	    }
	});

	setTimeout(getCars, datas.cars.updateInterval);
}

function getConstructions(){
	request(datas.constructions.url, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        datas.constructions.data = (JSON.parse(body)).result.results;
	        //console.log(datas.constructions.data);
	    }
	});
	setTimeout(getConstructions, datas.constructions.updateInterval);
}

function getUV(){
	request(datas.uv.url, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        datas.uv.data = (JSON.parse(body));
	        // console.log(obj.result.results);
	    }
	});
	setTimeout(getUV, datas.uv.updateInterval);
}

function getAirQuality(){
	request(datas.airquality.url, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        datas.airquality.data = (JSON.parse(body));
	        // console.log(obj.result.results);
	    }
	});
	setTimeout(getAirQuality, datas.airquality.updateInterval);
}