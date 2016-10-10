var Pin = require('../views/pin');

var Map = function(container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain'
  });
  this.pins = [];
}

Map.prototype.addPin = function(mountain) {
  this.pins.push(new Pin(this.googleMap, mountain));
}

module.exports = Map;