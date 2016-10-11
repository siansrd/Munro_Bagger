var Wind = function(options) {
  this._speed = options.speed;
  this._direction = options.direction;
  Object.defineProperty(this, "speed", { get: function(){ return this._speed; } });
  Object.defineProperty(this, "direction", { get: function(){ return this._direction; } });
};

Wind.prototype.windDirection = function(){
  var d = this.direction;
  var dToReturn;
  var directions = ["North", "North North-East", "North-East", "East North-East", "East", "East South-East", "South-East", "South South-East", "South", "South South-West", "South-West", "West South-West", "West", "West North-West", "North-West", "North West-North"];
  dToReturn = directions[Math.round(d/22.5)];
  return dToReturn;
};

module.exports = Wind;
