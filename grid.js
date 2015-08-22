var lat_digit = 3;
var lng_digit = 3;


// var grid = {
//     "25.123_121.567": [{
//         lat: 25.312345,
//         lng: 121.5679999,
//         type: '1'
//     }, {
//         lat: 25.312345,
//         lng: 121.5679999,
//         type: '1'
//     }, {
//         lat: 25.3123456,
//         lng: 121.56799999,
//         type: '2'
//     }, {
//         lat: 25.312345,
//         lng: 121.5679999,
//         type: '2'
//     }],
//     "25.178_122.588":[

//     ]

// };

var grid = {};

// classify(25.033788, 121.567978);
// classify(25.0337889, 121.566978);
// classify(25.03378888, 122.567978);
// classify(25.033788, 121.5679798);
// console.log(retrieveNearX(25.033788,121.56797));

function classify(lat, lng, type) {
    var c_lat = Math.floor(lat * 1000) / 1000;
    var c_lng = Math.floor(lng * 1000) / 1000;


    if (!((c_lat + '_' + c_lng) in grid)) {
        grid[c_lat + '_' + c_lng] = [];
    }

    grid[c_lat + '_' + c_lng].push({
        'lat': lat,
        'lng': lng,
        'type': type
    });
    // console.log(grid);
}

function retrieveNearX(lat, lng) {
    var c_lat = Math.floor(lat * 1000) / 1000;
    var c_lng = Math.floor(lng * 1000) / 1000;
    return grid[c_lat + '_' + c_lng];
}

