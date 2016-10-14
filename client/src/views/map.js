var Pin = require('./pin');

var Map = function(container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain'
  });
  this.pins = [];
};

Map.prototype.addPins = function(mountainsView) {
  this.mountainsView = mountainsView;
  for (var mv of mountainsView.mountains) {
    var pin = new Pin(this.googleMap, mv.mountain)
    this.pins.push(pin);
    mv.pin = pin;
  } 
};

Map.prototype.changeForecast = function(dayNum) {
  for (var pin of this.pins) {
    pin.changeForecast(dayNum);
  }
};

module.exports = Map;
