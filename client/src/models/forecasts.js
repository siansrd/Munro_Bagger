var Forecast = require("./forecast");
var ApiRequest = require("./api_request");

var Forecasts = function(forecasts){

  this._forecasts = [];

  for (var forecast of forecasts) {
    this._forecasts.push(new Forecast(forecast));
  }

  // Object.defineProperty(this, "today", {
  //   get: function(){
  //     return this._forecasts[0];
  //   }
  // });

  // Object.defineProperty(this, "tomorrow", {
  //   get: function(){
  //     return this._forecasts[1];
  //   }
  // });

  // Object.defineProperty(this, "dayAfter", {
  //   get: function(){
  //     return this._forecasts[2];
  //   }
  // });

  Object.defineProperty(this, "day", {
    get: function(){
      return this._forecasts;
    }
  });

};



module.exports = Forecasts;
