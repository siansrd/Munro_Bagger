var Wind = function(options) {
  this._speed = options.speed;
  this._direction = options.direction;
  Object.defineProperty(this, "speed", { get: function(){ return this._speed; } });
  Object.defineProperty(this, "direction", { get: function(){ return this._direction; } });
};

Wind.prototype.windDirection = function(){
  var dir = this._direction;
  var dirToReturn = "No Wind";
  var directions = ["North", "North North-East", "North-East", "East North-East", "East", "East South-East", "South-East", "South South-East", "South", "South South-West", "South-West", "West South-West", "West", "West North-West", "North-West", "North West-North"];
  index = Math.round(dir/22.5)
  dirToReturn = directions[index];
  return dirToReturn;
};

module.exports = Wind;
