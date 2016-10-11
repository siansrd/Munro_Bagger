var Wind = function(options) {
  this._speed = options.speed;
  this._direction = options.direction;
  Object.defineProperty(this, "speed", { get: function(){ return this._speed; } });
  Object.defineProperty(this, "direction", { get: function(){ return this._direction; } });
};

Wind.prototype.windDirection = function(direction){

};

module.exports = Wind;
