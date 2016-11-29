var Forecast = require("./forecast");

var Forecasts = function(forecasts){

  this._forecasts = [];

  for (let i = 0; i < forecasts.days.length; i++) {
  	this._forecasts.push(new Forecast(forecasts.days[i]));
  }
  // for (var forecast of forecasts.days) {
  //   this._forecasts.push(new Forecast(forecast));
  // }

  Object.defineProperty(this, "day", {
    get: function(){
      return this._forecasts;
    }
  });

};



module.exports = Forecasts;
