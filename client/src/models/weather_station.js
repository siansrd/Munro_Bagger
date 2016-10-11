var WeatherStation = function(options) {
  this._id = options.id;
  this._name = options.name;
  this._latLng = options.latLng;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "name", { get: function(){ return this._name; } });
  Object.defineProperty(this, "latLng", { get: function(){ return this._latLng; } });
};

module.exports = WeatherStation;
