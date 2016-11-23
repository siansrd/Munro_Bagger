var Forecast = require("./forecast");

var Forecasts = function(forecasts){

  this._forecasts = [];

  for (var forecast of forecasts.days) {
    this._forecasts.push(new Forecast(forecast));
  }

  Object.defineProperty(this, "day", {
    get: function(){
      return this._forecasts;
    }
  });

};



module.exports = Forecasts;
