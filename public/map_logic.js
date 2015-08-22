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
    // drawCarDataOnMap(carData, map)

    // Testing
    drawCrossRoadsMarkersOnMap(map)

    // Testing
    getDataFromServer()
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

// ==== Basic helper ====
function drawLinesOnMap(path, map, color) {
    var lines = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0.7,
        strokeWeight: 4
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

function drawAMakerOnMap(coordsStringArray, map, title, image) {
    var latLng = aLocation(parseFloat(coordsStringArray[0]), parseFloat(coordsStringArray[1]));

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: title,
        icon:image
    });


}

// ==== Draw events ====
function drawCrossRoadMarkerOnMap(coordsStringArray, map) {

    drawAMakerOnMap(coordsStringArray, map, '交叉路口', '/static/img/cir 3.png')

}

function drawCrossRoadsMarkersOnMap(map) {

    for (var i = 0; i < cross_road_data.length; i++) {
        drawCrossRoadMarkerOnMap(cross_road_data[i], map)
    };

}

function drawCarDataOnMap(liveCarData, map) {

    var results = liveCarData;

    for (var i = 0; i < results.length; i++) {

        var color = "#3eb076" // green
        if (parseFloat(results[i].AvgOcc) > 7) {
            color = "#bb3d15"
        } 

        drawLinesOnMap([aLocation(parseFloat(results[i].StartWgsY), parseFloat(results[i].StartWgsX)), aLocation(parseFloat(results[i].EndWgsY), parseFloat(results[i].EndWgsX))], map, color)
    };

}

function drawConstructionSiteOnMap(constructionData, map) {
    
    for (var i = 0; i < constructionData.length; i++) {
        drawAMakerOnMap([constructionData[i].X, constructionData[i].Y], map, '施工地點', '/static/img/construction_small.png')
    };

}

function drawCrimeSiteOnMap(crimeData, map) {
    for (var i = 0; i < crimeData.length; i++) {
        drawAMakerOnMap([crimeData[i].lat, crimeData[i].lng], map, '常犯罪地點', '/static/img/danger_small.png')
    };

}


// ==== Get Live Data ====
function getDataFromServer() {
    console.log('get server data')
    $.get('http://localhost:3000/getdata', function(result) {
        // console.log(result)

        result = JSON.parse(result)

        var carsData = result.cars.data
        var crime = result.crime.data
        var park = result.park.data
        var constructions = result.constructions.data
        var uv = result.uv.data
        var airquality = result.airquality.data

        // console.log("carsData: " + carsData)

        drawCarDataOnMap(carsData, map)
        drawConstructionSiteOnMap(constructions, map)
        drawCrimeSiteOnMap(crime, map)

    })
}