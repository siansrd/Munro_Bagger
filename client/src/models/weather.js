var Weather = function(options){
  this._id = options.id;
  this._timeOfRequest = options.timeOfRequest;
  this._forecast = options.forecast;

  Object.defineProperty(this, "id", {
    get: function(){
      return this._id;
    }
  });

  Object.defineProperty(this, "timeOfRequest", {
    get: function(){
      return this._timeOfRequest;
    }
  });

  Object.defineProperty(this, "forecast", {
    get: function(){
      return this._forecast;
    }
  });
};

module.exports = Weather;