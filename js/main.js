var myMap = L.map('map-canvas').setView([-6.2582000,106.77620], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  maxZoom: 20,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(myMap);

new L.Control.Zoom({ position: 'bottomright' }).addTo(myMap);

var markers = L.markerClusterGroup({ chunkedLoading: true });

var markerList = [];

var school_csv = "https://raw.githubusercontent.com/ramdaffe/opendikbud/master/jakarta.csv";

$.ajax({
      url: school_csv,
      async: false,
      dataType: "text",
      success: function (csvd) {
          var data = $.csv.toObjects(csvd);
          data.forEach(function (k) {
            var title = k.name;
            var marker = L.marker(L.latLng(k.lat, k.long), { title: title });
            marker.bindPopup(title);
            markerList.push(marker);
          });
      }
});

markers.addLayers(markerList);
myMap.addLayer(markers);