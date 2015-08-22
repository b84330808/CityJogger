// var grid = {
//     "25.123_121.567": {
//         'event': [{
//             lat: 25.312345,
//             lng: 121.5679999,
//             type: '1'
//         }, {
//             lat: 25.312345,
//             lng: 121.5679999,
//             type: '1'
//         }, {
//             lat: 25.3123456,
//             lng: 121.56799999,
//             type: '2'
//         }, {
//             lat: 25.312345,
//             lng: 121.5679999,
//             type: '2'
//         }],
//         'traffic': 78
//     },
//     "25.178_122.588": [

//     ]
// };

var grid = {};

// classify(25.033788, 121.567978);
// classify(25.0337889, 121.566978);
// classify(25.03378888, 122.567978);
// classify(25.033788, 121.5679798);
// classify(25.03788, 121.5679798);
// classify(25.133788, 121.5479798);
// classify(25.133788, 121.7679798);
// classify(25.233788, 121.1679798);

function classify(lat, lng, type) {
    var c_lat = Math.floor(lat * 1000) / 1000;
    var c_lng = Math.floor(lng * 1000) / 1000;


    if (!((c_lat + '_' + c_lng) in grid)) {
        grid[c_lat + '_' + c_lng] = {};
        grid[c_lat + '_' + c_lng]['event'] = [];
        grid[c_lat + '_' + c_lng]['traffic'] = 0;
    }

    grid[c_lat + '_' + c_lng]['event'].push({
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
////////////////////////////////////////////////////////////
/*
    source and destination format 
    {
        lat:22.123151
        lng:121.15614
    }
*/

// classifyLine({
//     'lat': 21,
//     'lng': 127
// }, {
//     'lat': 15,
//     'lng': 123
// }, 50)

// classifyLine({
//     'lat': 120,
//     'lng': 20
// }, {
//     'lat': 123,
//     'lng': 25
// }, 88)

// classifyLine({
//     'lat': 120,
//     'lng': 20
// }, {
//     'lat': 123,
//     'lng': 25
// }, 77)

function classifyLine(source, destination, traffic) {
    if (source.lng > destination.lng) {
        var temp = destination;
        destination = source;
        source = temp;
    };
    var s = {};
    var d = {};
    s['x'] = source.lng;
    s['y'] = source.lat;
    d['x'] = destination.lng;
    d['y'] = destination.lat;
    var slope = (d['y'] - s['y']) / (d['x'] - s['x']);
    var set = [];
    while (s['x'] < d['x']) {
        // set.push({
        //     lat: s['y'],
        //     lng: s['x']
        // });
        var c_lat = Math.floor(s['x'] * 1000) / 1000;
        var c_lng = Math.floor(s['y'] * 1000) / 1000;

        if (!((c_lat + '_' + c_lng) in grid)) {
            grid[c_lat + '_' + c_lng] = {};
            grid[c_lat + '_' + c_lng]['event'] = [];
            grid[c_lat + '_' + c_lng]['traffic'] = 0;
        }

        if (traffic > grid[c_lat + '_' + c_lng]['traffic']) {
            grid[c_lat + '_' + c_lng]['traffic'] = traffic;
        }
        /////////////////*****************num need to be discuss 
        var num = 0.5;
        s['x'] += num;
        s['y'] += num * slope;
        //////////////////////////////////////////
    }

    var c_lat = Math.floor(d['x'] * 1000) / 1000;
    var c_lng = Math.floor(d['y'] * 1000) / 1000;

    if (!((c_lat + '_' + c_lng) in grid)) {
        grid[c_lat + '_' + c_lng] = {};
        grid[c_lat + '_' + c_lng]['event'] = [];
        grid[c_lat + '_' + c_lng]['traffic'] = 0;
    }

    if (traffic > grid[c_lat + '_' + c_lng]['traffic']) {
        grid[c_lat + '_' + c_lng]['traffic'] = traffic;
    }
}

console.log('hahahah',grid);