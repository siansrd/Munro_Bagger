var MountainView = function(mtn) {
  this._mountain = mtn;
  this._bagged = false;
  this.pin = null;
  this.listEntry = null;
  this._onChange = null;
  Object.defineProperty(this, "mountain", { get: function(){ return this._mountain; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._bagged; },
    set: function(value) {
      this._bagged = value;
      if (this._onChange) this._onChange(this);
    }
  });
  Object.defineProperty(this, "onChange", {
    set: function(callback){ this._onChange = callback; }
  });
}



module.exports = MountainView;