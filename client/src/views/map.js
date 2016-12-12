var Pin = require('./pin');
var search = require('../utility').mountainSearch;

var MapObject = function(container) {
  const ne = new google.maps.LatLng(59.073548704841784, 2.1691826171875164);
  const sw = new google.maps.LatLng(55.59337026438907, -7.853101562500001);

  this._map = new google.maps.Map(container, {
    center: new google.maps.LatLng(57.450861,-1.604004),
    zoom: this._scaleZoom(),
    minZoom: this._scaleZoom(),
    mapTypeId: 'terrain',
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });
  this._keepCenter = google.maps.event.addDomListener(window, "resize", function() {
    var center = this._map.getCenter();
    google.maps.event.trigger(this._map, "resize");
    this._map.setCenter(center);
  }.bind(this));
  this._bounds = new google.maps.LatLngBounds(sw, ne);
  this._map.fitBounds(this._bounds);
  this._prevFocus = null;
  this._allPins = [];
  this._preventPan();
  this._width = this._getBrowserWidth();
};

MapObject.prototype._scaleZoom = function(){
    const width = this._getBrowserWidth();
    if (width < 700) return 6;
    if (width > 700 && width < 1500) return 7;
    if (width > 1501) return 8;
  }

MapObject.prototype._getBrowserWidth = function(){
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
};

MapObject.prototype._preventPan = function(){
  google.maps.event.addListener(this._map, 'dragend', function() {
    if (this._bounds.contains(this._map.getCenter())) return;

    var c = this._map.getCenter(),
    x = c.lng(),
    y = c.lat(),
    maxX = this._bounds.getNorthEast().lng(),
    maxY = this._bounds.getNorthEast().lat(),
    minX = this._bounds.getSouthWest().lng(),
    minY = this._bounds.getSouthWest().lat();

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    this._map.setCenter(new google.maps.LatLng(y, x));
  }.bind(this));
};

MapObject.prototype.openInfoWindowForMountain = function(mtnPin){
  if( this._prevFocus ) {
     this._prevFocus.clearFocus();
  }
  this._prevFocus = mtnPin.setFocus()
};

MapObject.prototype.addPin = function(mountainView, onMarkerClicked) {
  let pin = new Pin(this._map, mountainView);
  pin.createMarker(onMarkerClicked);
  this._allPins.push(pin);
  mountainView.pin = pin;
}

MapObject.prototype.changeForecast = function(dayNum) {
  for (let i = 0; i < this._allPins.length; i++) {
    this._allPins[i].changeForecast(dayNum);
  }
  // for (let pin of this._allPins) {
  //   pin.changeForecast(dayNum);
  // }
}

MapObject.prototype.userLoggedIn = function(mountainViews) {
  for (let i = 0; i < mountainViews.length; i++) {
    mountainViews[i].pin.userLoggedIn(mountainViews[i].bagged);
  }
  // for (let mtnView of mountainViews) {
  //   mtnView.pin.userLoggedIn(mtnView.bagged);
  // }
}

MapObject.prototype.userLoggedOut = function() {
  for (let i = 0; i < this._allPins.length; i++) {
    this._allPins[i].userLoggedOut();
  }
  // for (let pin of this._allPins) {
  //   pin.userLoggedOut();
  // }
}

module.exports = MapObject;
