var UserMountain = function(options) {
  this._id = options.mtn_id;
  this.bagged = options.bagged;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
}

module.exports = UserMountain;