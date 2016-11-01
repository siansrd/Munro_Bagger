var UserMountain = function(options) {
  this._origin_id = options.id;
  this._id = options.munro_id;
  this._climbed_on = options.climbed_on;
  this._bagged = true;
  this._dirty = false;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._bagged; },
    set: function(value){ this._bagged = value; this._dirty = true; }
  });
  Object.defineProperty(this, "climbed_on", {
    get: function(){ return this._climbed_on; },
    set: function(value){ this._climbed_on = value; this._dirty = true; }
  });
};

UserMountain.prototype.isDirty = function() {
  return this._dirty;
}

UserMountain.prototype.export = function() {
  this._dirty = false;
  return { mtn_id: this._id, bagged: this._bagged };
}

module.exports = UserMountain;
