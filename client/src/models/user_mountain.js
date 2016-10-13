var UserMountain = function(options) {
  this._id = options.mtn_id;
  this._bagged = options.bagged;
  this._dirty = false;
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._bagged; },
    set: function(value){ this._bagged = value; this._dirty = true; }
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
