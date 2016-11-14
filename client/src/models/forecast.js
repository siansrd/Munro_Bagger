var visibility = require('./forecast_info').visibility;
var weatherText = require('./forecast_info').significantWeather;
var UVIndexText = require('./forecast_info').UVIndex;

// D: "SSW",  Wind direction 16-point compass direction e.g. S, SSW, SW, etc.
// Gn: "13",  Wind gust noon in miles per hour (mph)
// Hn: "100", Screen relative humidity noon in percent (%)
// PPd: "96", This gives the Precipitation Probability as a percentage (%)
// S: "7",    Wind speed in miles per hour (mph)
// V: "VP",   Visibility code
// Dm: "6",   Day Maximum Temperature
// FDm: "3",  Feels Like Day Maximum Temperature
// W: "15",   Significant weather as a code
// U: "1"     Max Solar UV Index'

var Forecast = function(options){
  // this._timeStamp = options.dt;
  // this._dateTime = options.dt_txt;
  this._date = options.value;
  this._wind = { direction: options.Rep[0].D, speed: options.Rep[0].S, gusting: options.Rep[0].Gn };
  this._humidity = options.Rep[0].Hn;
  this._pofp = options.Rep[0].PPd;
  this._temperature = { max: options.Rep[0].Dm, feelsLike: options.Rep[0].FDm };
  this._code = (options.Rep[0].W === "NA") ? -1 : Number(options.Rep[0].W);
  this._description = (this._code === -1) ? "Not available" : weatherText[this._code];
  this._visibility = visibility[Number(options.Rep[0].V)];
  this._UVIndex = { index: Number(options.Rep[0].U), text: UVIndexText[Number(options.Rep[0].U)] };

  Object.defineProperty(this, "date", { get: function() { return this._date; } });
  Object.defineProperty(this, "wind", { get: function() { return this._wind; } });
  Object.defineProperty(this, "humidity", { get: function() { return this._humidity; } });
  Object.defineProperty(this, "pofp", { get: function() { return this._pofp; } });
  Object.defineProperty(this, "temperature", { get: function(){ return this._temperature; } });
  Object.defineProperty(this, "description", { get: function() { return this._description; } });
  Object.defineProperty(this, "code", { get: function() { return this._code; } });
  Object.defineProperty(this, "visibility", { get: function(){ return this._visibility; } });
  Object.defineProperty(this, "UVIndex", { get: function(){ return this._UVIndex; } });
 
};

module.exports = Forecast;
