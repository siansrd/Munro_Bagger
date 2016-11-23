var GridRef = require ("./grid_ref");
var Forecasts = require("./forecasts");

var Mountain = function(options){
  this._id = options.id;
  this._smcId = options.smcId;
  this._name = options.name;
  this._height = options.height;
  this._gridRef = new GridRef(options.gridRef);
  this._latLng = options.latLng;
  this._meaning = options.meaning;
  this._region = options.region;
  this._weatherId = options.weatherId;
  this._forecasts = new Forecasts(options.forecast.data);

  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "name", { get: function(){ return this._name; } });
  Object.defineProperty(this, "height", { get: function(){ return this._height; } });
  Object.defineProperty(this, "gridRef", { get: function(){ return this._gridRef; } });
  Object.defineProperty(this, "latLng", { get: function(){ return this._latLng; } });
  Object.defineProperty(this, "meaning", { get: function(){ return this._meaning; } });
  Object.defineProperty(this, "region", { get: function(){ return this._region; } });
  Object.defineProperty(this, "forecasts", { get: function(){ return this._forecasts; } });
};

module.exports = Mountain;
