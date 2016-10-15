var Pin = require('./pin');

var Map = function(ui, container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain'
  });
  this.ui = ui;
  this.pins = [];
};

Map.prototype.addPins = function() {
  this.mountainsView = this.ui.getMountainsView();
  for (var mv of this.mountainsView.mountains) {
    var pin = new Pin(this.googleMap, mv)
    this.pins.push(pin);
    mv.pin = pin;
  } 
};

Map.prototype.changeForecast = function(dayNum) {
  for (var pin of this.pins) {
    pin.changeForecast(dayNum);
  }
};

Map.prototype.userLogin = function() {
  for (var pin of this.pins) {
    pin.userLoggedIn();
  }
};

module.exports = Map;
