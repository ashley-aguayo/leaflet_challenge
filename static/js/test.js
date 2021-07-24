var myMap = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 7,
});

//add tile layer of map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    }).addTo(myMap);



//create base map to hold the layer lightmap
var baseMap = {
    "Lightmap" : lightMap
};
//creat variable to hold the earthquake points


//create map object
var map = L.map("mapid", {
    center: [40.73, -74.0059],
    zoom: 10,
    layers: [lightMap]
});

//add map layer control
L.control.layers(basemap,overlayMaps, {
    collapsed: false
}).addTo(myMap);


//create function to map out earthquake data points
function createMarkers(response) {

    //pull the lat and lon for each data point
    var points = response.data.points;

    //create an empty list to loop
    var pointMarker = [];

    //loop thru the earthquake data
    for (var index = 0; index < points.length; index++) {
        var points = points[index];

        //for each data point cratet a marker with popup
        var pointMarker = L.marker([points.lat, points.lon])
        .bindPopup("<h3>" +points.place + "<h3>" + points.mag + "<h3>" );
        //add markers
        pointMarker.push(pointMarker);
    }

    //create a layer with markers
    createMap(L.layerGroup(pointMarker));
}

//call api data for map and earthquake
// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createMarkers);


//function markerSize(mag) {
    return mag * 20000;
}
//create function for color rules based on return of mag size
    if (mag <= 4) {
        return "#f6e01e";
    } else if (mag <= 4.5){
        return "#e88905";
    } else if (mag <= 4.9){
        return "#e85605";
    } else if (mag <= 5.5){
        return "#f33918";
    } else {
        return "#f11313";
    };

  // An array containing all of the information needed to create city and state markers


  // Define arrays to hold created city and state markers
var cityMarkers = [];
var stateMarkers = [];

  // Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    stateMarkers.push(
    L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "white",
        fillColor: "white",
        radius: markerSize(locations[i].state.population)
    })
    );

    // Setting the marker radius for the city by passing population into the markerSize function
    cityMarkers.push(
    L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        fillColor: "purple",
        radius: markerSize(locations[i].city.population)
    })
    );
}
//call json data
d3.json(queryUrl, function(response){
    createFeatures(response.features);
    console.log(response)
});

// Create base layers

// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Create two separate layer groups: one for cities and one for states
var states = L.layerGroup(stateMarkers);
var cities = L.layerGroup(cityMarkers);

  // Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

  // Create an overlay object
var overlayMaps = {
    "State Population": states,
    "City Population": cities
};

  // Define a map object
var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, states, cities]
});

  // Pass our map layers into our layer control
  // Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
