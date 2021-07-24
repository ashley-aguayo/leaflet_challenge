//create queryurl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

//Call query 
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
    // create console log
    console.log(data);
});

// create the circle markers along with the bindpop ups
//for (var i = 0; i < features.length; i++) {

    // Conditionals for countries points
    //var color = "";
    //if (features[i].properties.mag < 4) {
        //color = "#ffbf00";
    // //}
    // else if (features[i].properties.mag < 4.5) {
    //     color = "#ffa812";
    // }
    // else if (features[i].properties.mag < 5.0) {
    //     color = "#ff7518";
    // }
    // else {
    //     color = "#f94d00";
    // }
    // // Add circles to map
    // L.circle(features.geometry.coordinates, {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: color,
      // Adjust radius
//       radius: features.properties.mag * 1500
//     }).bindPopup("<h3>" + feature.properties.place +
//     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(myMap);
// }


//create feature with data and create a pop up with details
function createFeatures(earthquakeData) {
    
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        return new L.circle(feature, {
            radius: feature.properties.mag * 1500,
            fillColor: "#ff7518",
            stroke: false,
        })
    }

//create geoJson layer for earthquakeData
var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
    });

//create map
createMap(earthquakes)
}

function createMap (earthquakes) {

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

// Define a baseMaps object to hold our base layers
    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
    };

  // Create overlay object to hold our overlay layer
    var overlayMaps = {
    Earthquakes: earthquakes
    };

    //create map
    var myMap = L.map("map", {
        center: [
        15.783, -90.230
        ],
        zoom: 4,
        layers: [streetmap, earthquakes]
    });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    

}