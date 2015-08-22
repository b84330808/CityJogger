var fs = require('fs');

var data = fs.readFileSync('parkR.json');
var obj = JSON.parse(data);
var nobj = [];
for(var i = 0; i < obj.length; i++){
	nobj.push({
		name: obj[i].ParkName,
		lat: obj[i].Latitude,
		lng: obj[i].Longitude
	});
}
fs.writeFileSync('park.json', JSON.stringify(nobj));

var data2 = fs.readFileSync('crimeR.json');
var obj2 = JSON.parse(data2);
var nobj2 = [];
for(var i = 0; i < obj2.length; i++){
	for(var j = 0; j < obj2[i].data.length; j++){
		nobj2.push({
			lat: obj2[i].data[j].lat,
			lng: obj2[i].data[j].lng
		});
	}
	
}
fs.writeFileSync('crime.json', JSON.stringify(nobj2));
