var MountainView = function(mtn) {
  this._id = mtn.id;
  this._mountain = mtn;
  this._bagged = false;
  this._climbed_on = null;
  this.pin = null;
  this._onChange = null;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "mountain", { get: function(){ return this._mountain; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._bagged; },
    set: function(value) {
      this._bagged = value;
      if (this._onChange) this._onChange(this);
    }
  });
  Object.defineProperty(this, "climbed_on", {
    get: function(){ return this._climbed_on; },
    set: function(value) {
      this._climbed_on = value;
      if (this._onChange) this._onChange(this);
    }
  });
  Object.defineProperty(this, "onChange", {
    set: function(callback){ this._onChange = callback; }
  });
}

module.exports = MountainView;