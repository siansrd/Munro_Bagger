var Weather = function(options){
  this._id = options.id;
  this._timeOfRequest = options.timeOfRequest;
  this._forcast = options.forcast;

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

  Object.defineProperty(this, "forcast", {
    get: function(){
      return this._forcast;
    }
  });
};

module.exports = Weather;
