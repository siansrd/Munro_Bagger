var Pin = require('./pin');
var search = require('../utility').mountainSearch;

var MapObject = function(container) {

  this.map = new google.maps.Map(container, {
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
  const ne = new google.maps.LatLng(59.073548704841784, 2.1691826171875164);
  const sw = new google.maps.LatLng(55.59337026438907, -7.853101562500001);
  this.bounds = new google.maps.LatLngBounds(sw, ne);
  this.map.fitBounds(this.bounds);

  this.prevFocus = null;
  this.allPins = []; 

  this.preventPan(); 
};

MapObject.prototype.preventPan = function(){
  google.maps.event.addListener(this.map, 'dragend', function() {
    if (this.bounds.contains(this.map.getCenter())) return;

    var c = this.map.getCenter(),
             x = c.lng(),
             y = c.lat(),
             maxX = this.bounds.getNorthEast().lng(),
             maxY = this.bounds.getNorthEast().lat(),
             minX = this.bounds.getSouthWest().lng(),
             minY = this.bounds.getSouthWest().lat();

         if (x < minX) x = minX;
         if (x > maxX) x = maxX;
         if (y < minY) y = minY;
         if (y > maxY) y = maxY;

         this.map.setCenter(new google.maps.LatLng(y, x));
  }.bind(this));
};


MapObject.prototype.openInfoWindowForMountain = function(mountain){
  const pin = search(this.allPins, mountain.id);
  if( this.prevFocus ) {
     this.prevFocus.clearFocus();
  }
  this.prevFocus = pin.setFocus()
};

MapObject.prototype.addPin = function(mountainView, callback) {
  let pin = new Pin(this.map, mountainView);
  pin.createMarker(callback);
  this.allPins.push(pin);
}

MapObject.prototype.changeForecast = function(dayNum) {
  for (let pin of this.allPins) {
    pin.changeForecast(dayNum);
  }
}

MapObject.prototype.userLoggedIn = function(mountainViews) {
  let mtnView;
  for (let pin of this.allPins) {
    mtnView = search(mountainViews, pin.id);
    pin.userLoggedIn(mtnView);
  }
}

MapObject.prototype.userLoggedOut = function() {
  for (let pin of this.allPins) {
    pin.userLoggedOut();
  }
}

module.exports = MapObject;