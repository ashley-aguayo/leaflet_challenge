//create map
function createMap(myMap) {
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    });

//create base map to hold the layer lightmap
var basemap = {
    "LightMap": lightmap
};
//creat variable to hold the earthquake points
var overlayMaps = {
    "Earthquakes" : earthQuakes
};

//create map object
var map = L.map("mapid", {
    center: 40.73, -74.0059],
    zoom: 10,
    layers:[lightmap,earthQuakes]
});

//add map layer control
L.control.layers(basemap,overlayMaps, {
    collapsed: false
}).addTo(myMap);
}

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

