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

    map.addListener('click', function(event) {
        console.log(event.latLng.lat() + ", " + event.latLng.lng())
    });

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('alternative'));

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)

        // userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        // userLocation = new google.maps.LatLng(25.015384309623297, 121.53891563415527)
        userLocation = new google.maps.LatLng(25.033661079435696, 121.51153564453125)


        map.setCenter(userLocation);
        map.setZoom(14);

        addUserMarker(userLocation, map);

        // Testing
        // calcRoute(userLocation, aMapsLatLng(25.1, 121.56), map)

        // Testing 
        getBlockWithinDistance(1)

    });

    // Testing
    // drawLinesOnMap([aLocation(25.02, 121.534), aLocation(25.03, 121.534)], map)
    // drawCarDataOnMap(carData, map)

    // Testing
    // drawCrossRoadsMarkersOnMap(map)

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
        icon: image
    });


}

// ==== Draw events ====
function drawCrossRoadMarkerOnMap(coordsStringArray, map) {

    drawAMakerOnMap(coordsStringArray, map, '交叉路口', '/static/img/cir3.png')

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

// 
function addCarsDataToGridLine(aLiveCarData) {
    var startLng = parseFloat(aLiveCarData.StartWgsY)
    var startLat = parseFloat(aLiveCarData.StartWgsX)
    var endLng = parseFloat(aLiveCarData.EndWgsY)
    var endLat = parseFloat(aLiveCarData.EndWgsX)
    classifyLine({
        lat: startLat,
        lng: startLng
    }, {
        lat: endLat,
        lng: endLng
    }, parseFloat(aLiveCarData.AvgOcc))
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

function drawParkOnMap(parkData, map) {
    for (var i = 0; i < parkData.length; i++) {
        drawAMakerOnMap([parkData[i].lat, parkData[i].lng], map, '公園', '')
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

        // Draw all on map
        drawCarDataOnMap(carsData, map)
        drawConstructionSiteOnMap(constructions, map)
        drawCrimeSiteOnMap(crime, map)

        // Add to grid system
        for (var i = 0; i < constructions.length; i++) {
            addConstructionSiteToGrid(constructions[i])
        };

        for (var i = 0; i < crime.length; i++) {
            addCrimeSiteToGrid(crime[i])
        };

        for (var i = 0; i < carsData.length; i++) {
            addCarsDataToGridLine(carsData[i])
        };

        // console.log(JSON.stringify(grid))
    })
}

function gf(string) {
    return parseFloat(string)
}

// Type: Construction: 1, Crime: 2, 
function addConstructionSiteToGrid(aConstruction) {
    classify(gf(aConstruction.X), gf(aConstruction.Y), 1)
}

function addCrimeSiteToGrid(aCrimeSiteData) {
    classify(gf(aCrimeSiteData.lat), gf(aCrimeSiteData.lng), 2)
}

function getBlockWithinDistance(distanceWithinAsKm) {

    directionsService = new google.maps.DirectionsService();
    directionsRender = new google.maps.DirectionsRenderer();

    var list = []

    var candidateLegs = []
    var currentHighestScore = 0

    for (var i = 0; i < cross_road_data.length; i++) {

        var itsDistance = calcCrow(userLocation.lat(), userLocation.lng(), parseFloat(cross_road_data[i][0]), parseFloat(cross_road_data[i][1]));

        if (itsDistance <= distanceWithinAsKm) {
            console.log('smaller')

            console.log()

            // drawAMakerOnMap([cross_road_data[i][0], cross_road_data[i][1]], map, 'Smaller', '')

            var request = {
                origin: aMapsLatLng(userLocation.lat(), userLocation.lng()),
                destination: aMapsLatLng(parseFloat(cross_road_data[i][0]), parseFloat(cross_road_data[i][1])),
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.WALKING
            }

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var sublist = [];

                    var allGridsForThisLeg = []

                    for (var j = 0; j < response.routes[0].legs[0].steps.length; j++) {

                        var startPoint = response.routes[0].legs[0].steps[j].start_point;
                        var endPoint = response.routes[0].legs[0].steps[j].end_point;

                        sublist.push({
                            start: startPoint,
                            end: endPoint
                        });

                        var legGrid = getGridsThrough({
                                "lat": startPoint.G,
                                "lng": startPoint.K
                            }, {
                                "lat": endPoint.G,
                                "lng": endPoint.K
                            })
                            // console.log("legGrid step" + j + ": " + JSON.stringify(legGrid))
                            // console.log(startPoint + endPoint)

                        allGridsForThisLeg = _.union(allGridsForThisLeg, legGrid)

                    }

                    var itsScore = calculateScoreFromAllGrids(allGridsForThisLeg);

                    var scoreAndLeg = {
                        score: itsScore,
                        leg: sublist,
                        polylines: []
                    }

                    if (itsScore >= currentHighestScore) {
                        currentHighestScore = itsScore
                        console.log('Current highest score: ' + currentHighestScore)
                            // Remove all polylines
                        for (var k = 0; k < candidateLegs.length; k++) {
                            for (var h = 0; h < candidateLegs[k].polylines.length; h++) {
                                candidateLegs[k].polylines[h].setMap(null);
                            };
                        };
                    }

                    // console.log("score: " + itsScore)
                    // directionsRender.setDirections(response)

                    // Create polylines
                    for (var k = 0; k < sublist.length; k++) {
                        sublist[k]

                        var thePath = [aLocation(sublist[k].start.G, sublist[k].start.K), aLocation(sublist[k].end.G, sublist[k].end.K)]

                        var lines = new google.maps.Polyline({
                            path: thePath,
                            geodesic: true,
                            strokeColor: "#7bacfa",
                            strokeOpacity: 1,
                            strokeWeight: 6
                        });

                        if (itsScore == currentHighestScore) {
                            lines.setMap(map);
                        } else {
                            lines.setMap(null);
                        }

                        scoreAndLeg.polylines.push(lines)
                    };

                    console.log(scoreAndLeg)

                    candidateLegs.push(scoreAndLeg)

                    // console.log("All grid: " + allGridsForThisLeg)

                    list.push(sublist);
                    // console.log(JSON.stringify(list))
                } else {
                    console.log('Google Maps route failed ' + status)
                }
            });
        }
    };

}

function calculateScoreFromAllGrids(allGrids) {
    var finalScore = 100;
    //console.log('grid:',grid);
    //console.log('allGrids',allGrids);
    for (var i = 0; i < allGrids.length; i++) {
        var key = allGrids[i];
        if (!(key in grid)) {
            //console.log('key not found in grid')
        } else {
            var event = grid[key]["event"];
            var traffic = grid[key]["traffic"];

            var type1Count = 0;
            var type2Count = 0;
            for (var j = 0; j < event.length; j++) {
                if (event[j]["type"] == '1') {
                    type1Count++
                } else {
                    type2Count++
                }
            };

            finalScore = finalScore - (3 * type2Count) - (1 * type1Count) - (3 * traffic)
        }

        var score = grid[key]
    };
    return finalScore
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

// Button action
function changeRoute() {
    console.log('adfasdflllll')
}

