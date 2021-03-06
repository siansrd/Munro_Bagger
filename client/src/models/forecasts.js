const Forecast = require("./forecast");

const Forecasts = function(forecasts){

  this._forecasts = [];
  let days = forecasts.days;
  for (let i = 0; i < days.length; i++) {
  	this._forecasts.push(new Forecast(days[i]));
  }

  Object.defineProperty(this, "day", {
    get: function(){
      return this._forecasts;
    }
  });

};



module.exports = Forecasts;
