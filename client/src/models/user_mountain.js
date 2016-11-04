var UserMountain = function(options) {
  this._originId = options.id;
  this._id = options.munro_id;
  this._climbedOn = options.climbed_on;
  this._bagged = (this._originId) ? true : false;
  this._dirty = false;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._bagged; },
    set: function(value){ this._bagged = value; this._dirty = true; }
  });
  Object.defineProperty(this, "climbedOn", {
    get: function(){ return this._climbedOn; },
    set: function(value){ this._climbedOn = value; this._dirty = true; }
  });
};

UserMountain.prototype.isDirty = function() {
  return this._dirty;
}

UserMountain.prototype.export = function() {
  return { munro_id: this._id, climbed_on: this._climbedOn };
}

module.exports = UserMountain;
