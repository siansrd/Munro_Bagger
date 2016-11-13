var MountainView = function(mtn) {
  // this._id = mtn.id;
  this._detail = mtn;
  this._status = null;
  this._createStatus = null;
  this._saveStatus = null;
  this.pin = null;
  Object.defineProperty(this, "id", { get: function(){ return this._detail.id; } });
  Object.defineProperty(this, "detail", { get: function(){ return this._detail; } });
  Object.defineProperty(this, "status", { set: function(status){ this._status = status; } });
  Object.defineProperty(this, "bagged", {
    get: function(){ return this._status ? this._status.bagged : false; },
    set: function(value) {
      if (!this._status) this._status = this._createStatus(this.id);
      this._status.bagged = value;
    }
  });
  Object.defineProperty(this, "climbedOn", {
    get: function(){ return this._status ? this._status.climbedOn : null; },
    set: function(value) {
      if (!this._status) this._status = this._createStatus(this.id);
      this._status.climbedOn = value;
    }
  });
  Object.defineProperty(this, "createStatus", {
    set: function(callback){ this._createStatus = callback; }
  });
  Object.defineProperty(this, "saveStatus", {
    set: function(callback){ this._saveStatus = callback; }
  });
}

MountainView.prototype.save = function() {
  if (this._saveStatus) this._saveStatus(this._status);
}

module.exports = MountainView;