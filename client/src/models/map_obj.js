var Pin = require('./pin');
var search = require('../utility').mountainSearch;

var MapObject = function(container) {
  const ne = new google.maps.LatLng(59.073548704841784, 2.1691826171875164);
  const sw = new google.maps.LatLng(55.59337026438907, -7.853101562500001);

  this._map = new google.maps.Map(container, {
    center: new google.maps.LatLng(57.450861,-1.604004),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain',
    clickableIcons: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });
  this._bounds = new google.maps.LatLngBounds(sw, ne);
  this._map.fitBounds(this._bounds);
  this._prevFocus = null;
  this._allPins = []; 

  this._preventPan(); 
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

MapObject.prototype.openInfoWindowForMountain = function(mountain){
  const pin = search(this._allPins, mountain.id);
  if( this._prevFocus ) {
     this._prevFocus.clearFocus();
  }
  this._prevFocus = pin.setFocus()
};

MapObject.prototype.addPin = function(mountainView, callback) {
  let pin = new Pin(this._map, mountainView);
  pin.createMarker(callback);
  this._allPins.push(pin);
}

MapObject.prototype.changeForecast = function(dayNum) {
  for (let pin of this._allPins) {
    pin.changeForecast(dayNum);
  }
}

MapObject.prototype.userLoggedIn = function(mountainViews) {
  let mtnView;
  for (let pin of this._allPins) {
    mtnView = search(mountainViews, pin.id);
    pin.userLoggedIn(mtnView);
  }
}

MapObject.prototype.userLoggedOut = function() {
  for (let pin of this._allPins) {
    pin.userLoggedOut();
  }
}

module.exports = MapObject;