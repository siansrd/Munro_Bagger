function Pin (map, mtnView) {
  this.id = mtnView.id;
  this.mtnView = mtnView;
  this.map = map;
  this.dayNum = 0;
  this.loggedIn = false;
  this.mountBagged = mtnView.bagged;
  this.forecasts = mtnView.mountain.forecasts;
  this.mountSunny = (this.forecasts.day[0].code <= 3)
  this.marker = null;
  this.markerCallback = null;
  this.hasFocus = false;
  this.infoWindow = null;
};

Pin.prototype.changeForecast = function(dayNum) {
  if (this.forecasts.day[this.dayNum].code !== this.forecasts.day[dayNum].code) {
    this.mountSunny = (this.forecasts.day[dayNum].code <= 3);
    this.marker.setMap(null);
    this._resetMarker();
  }
  this.dayNum = dayNum;
}

Pin.prototype.userLoggedIn = function(mtnView) {
  this.mtnView = mtnView;
  this.mountBagged = mtnView.bagged;
  this.loggedIn = true;
  this.marker.setMap(null);
  this._resetMarker();
}

Pin.prototype.userLoggedOut = function() {
  this.mountBagged = false;
  this.loggedIn = false;
  this.marker.setMap(null);
  this._resetMarker();
}

Pin.prototype._resetMarker = function() {
  this.marker =  new google.maps.Marker({
    position: this.mtnView.mountain.latLng,
    map: this.map,
    icon: { url: this.generateIcon(), scaledSize: new google.maps.Size(15, 15) }
  });
  google.maps.event.addListener(this.marker, 'click', function(){
    this.callback(this.id);
  }.bind(this));
  if (this.hasFocus) this._openInfoWindow();
}

Pin.prototype.createMarker = function(callback) {
  this.callback = callback;
  this._resetMarker()
};

Pin.prototype._openInfoWindow = function(){
  const infoWindow = new google.maps.InfoWindow({
      content: this.mtnView.mountain.name
  });
  infoWindow.open(this.map, this.marker);
  this.infoWindow = infoWindow;
};

Pin.prototype.setFocus = function() {
  this.hasFocus = true;
  this._openInfoWindow();
  return this;
}

Pin.prototype.clearFocus = function() {
  this.hasFocus = false;
  this.infoWindow.close();
}

Pin.prototype.generateIcon = function(){
  var base = "/public/images/";
  var fileName = base + "mntn-";
  if (this.loggedIn) {
    if (!this.mountBagged) fileName += "not-";
    fileName += "bagged";
    if (this.mountSunny) fileName += "-sunny";
  }
  else {
    if (!this.mountSunny) fileName += "not-";
    fileName += "sunny";
  }
  fileName += ".png";
  return fileName;
}

module.exports = Pin;
