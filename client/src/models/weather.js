var Weather = function(options){
  this._id = options.id;
  this._day = options.day;
  this._time = options.time;
  this._description = options.description;
  this._main = options.main;
  this._temperature = options.temperature;
  this._wind = {
    options.wind.speed,
    options.wind.direction;
  };

  Object.defineProperty(this, "id", {
    get: function(){
      return this._id;
    }
  });

  Object.defineProperty(this, "day", {
    get: function(){
      return this._day;
    }
  });

  Object.defineProperty(this, "time", {
    get: function(){
      return this._time;
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

  Object.defineProperty(this, "windSpeed", {
    get: function(){
      return this._wind[0];
    }
  });

  Object.defineProperty(this, "windDirection", {
    get: function(){
      return this._wind[1];
    }
  });
  
};

module.exports = Weather;
