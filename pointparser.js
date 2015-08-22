var request = require('request');
var list = [];

for(var i; i < list.length; i++){
	var url = 'https://www.google.com.tw/maps/place/' + list[i];

	request(url, function(error, response, body) {
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
}


	