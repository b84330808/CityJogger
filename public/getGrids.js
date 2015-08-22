var s = {
    'lat': 25.0152285,
    'lng': 121.5389394
}

var t = {
    'lat': 25.0152579,
    'lng': 121.538295
}

console.log(getGridsThrough(t, s));

function getGridsThrough(source, destination) {
    if (source.lng > destination.lng) {
        var temp = destination;
        destination = source;
        source = temp;
    };
    var s = {};
    var d = {};
    var num = 3;
    s['x'] = source.lng;
    s['y'] = source.lat;
    d['x'] = destination.lng;
    d['y'] = destination.lat;
    var slope = (d['y'] - s['y']) / (d['x'] - s['x']);

    var grids = [];

    /////////////////*****************num need to be discuss 
    var gridWidth = 0.03;
    while (s['x'] < d['x']) {
        var x = s['x'].toFixed(num);
        var y = s['y'].toFixed(num);
        if (grids.indexOf(x + '_' + y) == -1) {
            grids.push(x + '_' + y);
        }
        if (grids.indexOf((x - gridWidth).toFixed(num) + '_' + y) == -1) {
            grids.push((x - gridWidth).toFixed(num) + '_' + y);
        }

        s['x'] += gridWidth;
        s['y'] += gridWidth * slope;
        //////////////////////////////////////////
    }
    return grids;
}
