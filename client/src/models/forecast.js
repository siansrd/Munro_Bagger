var Wind = require('./wind');

var Forecast = function(options){
  this._id = options.id;
  this._timeStamp = options.dt;
  this._dateTime = options.dt_txt;
  this._time = options.time;
  this._description = options.description;
  this._main = options.main;
  this._temperature = options.temperature;
  this._wind = new Wind(options.wind);

  Object.defineProperty(this, "id", {
    get: function(){
      return this._id;
    }
  });

  Object.defineProperty(this, "dateTime", {
    get: function(){
      return this._dateTime;
    }
  });

  Object.defineProperty(this, "timeStamp", {
    get: function(){
      return this._timeStamp;
    }
  });

  Object.defineProperty(this, "description", {
    get: function(){
      return this._description;
    }
  });

  Object.defineProperty(this, "main", {
    get: function(){
      return this._main;
    }
  });

  Object.defineProperty(this, "temperature", {
    get: function(){
      return this._temperature;
    }
  });

  Object.defineProperty(this, "wind", {
    get: function(){
      return this._wind;
    }
  });
  
};

module.exports = Forecast;
