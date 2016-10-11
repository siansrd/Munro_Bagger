var Forecast = require("./forecast");
var ApiRequest = require("./api_request");

var Forecasts = function(){
  this._forecasts = [];

  Object.defineProperty(this, "today", {
    get: function(){
      return this._forecasts[0];
    }
  });

  Object.defineProperty(this, "tomorrow", {
    get: function(){
      return this._forecasts[1];
    }
  });

  Object.defineProperty(this, "dayAfter", {
    get: function(){
      return this._forecasts[2];
    }
  });
};

Forecasts.prototype.forMountain = function(mountainId, onCompleted) {
  var url = "http://localhost:3000/api/weather?m=" + mountainId;
  var apiRequest = new ApiRequest();
  apiRequest.makeRequest(url, function(receivedForecasts) {
    this._forecasts = []; 
    for (var forecast of receivedForecasts) {
      this._forecasts.push(new Forecast(forecast));
    }
    onCompleted();
  }.bind(this))
}

module.exports = Forecasts;
