var Weather = function(day0, day1, day2){
  [
    {
      this._day = day0.name
      this._id = day0.id;
      this._description = day0.description;
      this._main = day0.main;
      this._temperature = day0.temperature;
      this._wind = {
        day0.wind.speed,
        day0.wind.direction;
      };
    },
    {
      this._day = day1.name
      this._id = day1.id;
      this._description = day1.description;
      this._main = day1.main;
      this._temperature = day1.temperature;
      this._wind = {
        day1.wind.speed,
        day1.wind.direction;
      };
    },
    {
      this._day = day2.name
      this._id = day2.id;
      this._description = day2.description;
      this._main = day2.main;
      this._temperature = day2.temperature;
      this._wind = {
        day2.wind.speed,
        day2.wind.direction;
      };
    },
  ]

  // Object.defineProperty(this, "id", {
  //   get: function(){
  //     return this._id;
  //   }
  // });
  //
  // Object.defineProperty(this, "timeOfRequest", {
  //   get: function(){
  //     return this._timeOfRequest;
  //   }
  // });
  //
  // Object.defineProperty(this, "forecast", {
  //   get: function(){
  //     return this._forecast;
  //   }
  // });
};

module.exports = Weather;
