var map;
var userLocation;
var userMarker;

$(function() {
    console.log("Document is ready!");
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)

        userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

        map.setCenter(userLocation);
        map.setZoom(14);

        addUserMarker(userLocation, map);

        // Testing
        // calcRoute(userLocation, aMapsLatLng(25.1, 121.56), map)

    });

    // Testing
    // drawLinesOnMap([aLocation(25.02, 121.534), aLocation(25.03, 121.534)], map)
    drawCarDataOnMap(map)

    // Testing
    drawCrossRoadsMarkersOnMap(map)

}

function addUserMarker(location, map) {
    userMarker = new google.maps.Marker({
        map: map,
        position: location,
        title: "My Position"
    });
    // console.log(location, map);
}

// Helper --> {"lat":lat, "lng":lng}
function aLocation(lat, lng) {
    return {
        "lat": lat,
        "lng": lng
    }
}

// Helper (121, 25) --> google.maps.LatLng
function aMapsLatLng(lat, lng) {
    return new google.maps.LatLng(lat, lng)
}

function drawLinesOnMap(path, map) {
    var lines = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    lines.setMap(map);
}

var directionsService;
var directionsRender;

function calcRoute(originLoc, destinationLoc, map) {

    directionsService = new google.maps.DirectionsService();
    directionsRender = new google.maps.DirectionsRenderer();
    directionsRender.setMap(map);

    var request = {
        origin: originLoc,
        destination: destinationLoc,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    }

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRender.setDirections(response);
        }
    });
}


function drawCarDataOnMap(map) {

    var results = carData.result.results;

    for (var i = 0; i < results.length; i++) {
        drawLinesOnMap([aLocation(parseFloat(results[i].StartWgsY), parseFloat(results[i].StartWgsX)), aLocation(parseFloat(results[i].EndWgsY), parseFloat(results[i].EndWgsX))], map)
    };

}

function drawAMakerOnMap(coordsStringArray, map) {

    var myLatLng = aLocation(parseFloat(coordsStringArray[0]), parseFloat(coordsStringArray[1]));

    console.log(myLatLng)

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: '交叉路口'
    });

}

function drawCrossRoadsMarkersOnMap(map) {

    for (var i = 0; i < cross_road_data.length; i++) {
        drawAMakerOnMap(cross_road_data[i], map)
    };

}