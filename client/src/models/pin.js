function Pin (map, mtnView) {
  // this._id = mtnView.id;
  this._mtnView = mtnView;
  this._map = map;
  this._dayNum = 0;
  this._loggedIn = false;
  this._mountBagged = mtnView.bagged;
  this._forecasts = mtnView.detail.forecasts;
  this._mountSunny = (this._forecasts.day[0].code <= 3)
  this._marker = null;
  this._markerCallback = null;
  this._hasFocus = false;
  this._infoWindow = null;

  Object.defineProperty(this, "id", { get: function(){ return this._mtnView.id; } });
};

Pin.prototype.changeForecast = function(dayNum) {
  if (this._forecasts.day[this._dayNum].code !== this._forecasts.day[dayNum].code) {
    this._mountSunny = (this._forecasts.day[dayNum].code <= 3);
    this._marker.setMap(null);
    this._resetMarker();
  }
  this._dayNum = dayNum;
}

Pin.prototype.userLoggedIn = function(mtnView) {
  this._mtnView = mtnView;
  this._mountBagged = mtnView.bagged;
  this._loggedIn = true;
  this._marker.setMap(null);
  this._resetMarker();
}

Pin.prototype.userLoggedOut = function() {
  this._mountBagged = false;
  this._loggedIn = false;
  this._marker.setMap(null);
  this._resetMarker();
}

Pin.prototype._resetMarker = function() {
  this._marker =  new google.maps.Marker({
    position: this._mtnView.detail.latLng,
    map: this._map,
    icon: { url: this._generateIcon(), scaledSize: new google.maps.Size(15, 15) }
  });
  google.maps.event.addListener(this._marker, 'click', function(){
    this._markerCallback(this.id);
  }.bind(this));
  if (this._hasFocus) this._openInfoWindow();
}

Pin.prototype.createMarker = function(callback) {
  this._markerCallback = callback;
  this._resetMarker()
};

Pin.prototype._openInfoWindow = function(){
  const infoWindow = new google.maps.InfoWindow({
      content: this._mtnView.detail.name
  });
  infoWindow.open(this._map, this._marker);
  this._infoWindow = infoWindow;
};

Pin.prototype.setFocus = function() {
  this._hasFocus = true;
  this._openInfoWindow();
  return this;
}

Pin.prototype.clearFocus = function() {
  this._hasFocus = false;
  this._infoWindow.close();
}

Pin.prototype._generateIcon = function(){
  var base = "/public/images/";
  var fileName = base + "mntn-";
  if (this._loggedIn) {
    if (!this._mountBagged) fileName += "not-";
    fileName += "bagged";
    if (this._mountSunny) fileName += "-sunny";
  }
  else {
    if (!this._mountSunny) fileName += "not-";
    fileName += "sunny";
  }
  fileName += ".png";
  return fileName;
}

module.exports = Pin;
