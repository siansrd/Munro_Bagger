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
  this._userClosedInfoWin = false;
  this._infoWindow = null;

  Object.defineProperty(this, "id", { get: function(){ return this._mtnView.id; } });
};

Pin.prototype.changeForecast = function(dayNum) {
  let sunnyForecast = (this._forecasts.day[dayNum].code <= 3)
  if (this._mountSunny !== sunnyForecast) {
    this._mountSunny = sunnyForecast
    this._marker.setMap(null);
    this._resetMarker();
  }
  this._dayNum = dayNum;
}

Pin.prototype.changeBaggedState = function(bagged) {
  this._mountBagged = bagged;
  this._marker.setMap(null);
  this._resetMarker();
}

Pin.prototype.userLoggedIn = function(bagged) {
  this._loggedIn = true;
  this.changeBaggedState(bagged);
}

Pin.prototype.userLoggedOut = function() {
  this._loggedIn = false;
  this.changeBaggedState(false);
}

Pin.prototype._resetMarker = function() {
  this._marker =  new google.maps.Marker({
    position: this._mtnView.detail.latLng,
    map: this._map,
    icon: { url: this._generateIcon(), scaledSize: new google.maps.Size(17, 20) }
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
  if (this._userClosedInfoWin) return;
  const infoWindow = new google.maps.InfoWindow({
      content: this._mtnView.detail.name
  });
  infoWindow.open(this._map, this._marker);
  google.maps.event.addListener(infoWindow,'closeclick',function(){
    this._userClosedInfoWin = true;
    this._infoWindow = null;
  }.bind(this));
  this._infoWindow = infoWindow;
};

Pin.prototype.setFocus = function() {
  this._hasFocus = true;
  this._userClosedInfoWin = false;
  this._openInfoWindow();
  return this;
}

Pin.prototype.clearFocus = function() {
  this._hasFocus = false;
  if (this._infoWindow !== null) this._infoWindow.close();
  this._infoWindow = null;
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
