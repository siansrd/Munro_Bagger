var Weather = require("./weather");

var Weathers = function(options){
  this._today = new Weather(options[0]);
  this._tomorrow = new Weather(options[1]);
  this._dayAfter = new Weather(options[2])

  Object.defineProperty(this, "today", {
    get: function(){
      return this._today;
    }
  });

  Object.defineProperty(this, "tomorrow", {
    get: function(){
      return this._tomorrow;
    }
  });

  Object.defineProperty(this, "dayAfter", {
    get: function(){
      return this._dayAfter;
    }
  });
};

module.exports = Weathers;
