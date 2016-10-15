var MountainView = function(mtn) {
  this._mountain = mtn;
  this.bagged = false;
  this.pin = null;
  this.listEntry = null;
  Object.defineProperty(this, "mountain", { get: function(){ return this._mountain; } });
}

module.exports = MountainView;