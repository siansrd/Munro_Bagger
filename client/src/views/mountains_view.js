var Mountains = require('../models/mountains');
var MountainView = require('./mountain_view');
var search = require('../utility').mountainSearch;

var MountainsView = function() {
  this._mountainsModel = new Mountains();
  this.mountains = null;
  this._user = null;
  this._forecastDates = {
    _min: null,
    _max: null,
    _total: 0,
    _count: 0,
    get min() { return this._min; },
    get max() { return this._max; },
    get ave() {
      let sDate = (this._count > 0) ? new Date(this._total / this._count).toISOString() : null;
      return (sDate) ? sDate.split(".")[0] + "Z" : "";
    },
    get aligned() { return (this._min && this._min === this._max); },
    reset: function() { this._min = this._max = null; this._total = this._count = 0 },
    add: function(sDate) {
      this._count += 1;
      this._total += new Date(sDate).getTime();
      if (!this._min || this._min > sDate) this._min = sDate;
      if (!this._max || this._max < sDate) this._max = sDate;
    }
  }

  Object.defineProperty(this, "forecastDates", { get: function(){ return this._forecastDates; } });
}

MountainsView.prototype.all = function(onCompleted) {
  this._mountainsModel.all(function(mtns){
    this.mountains = mtns.map(function(mtn) {
      this._forecastDates.add(mtn.forecasts.dataDate);
      const mv = new MountainView(mtn);
      mv.createStatus = this.newBaggedRecord.bind(this);
      mv.saveStatus = this.saveBaggedRecord.bind(this);
      return mv;
    }.bind(this));
    onCompleted(this.mountains);
  }.bind(this));
}

MountainsView.prototype._clearMountains = function() {
  for (let i = 0; i < this.mountains.length; i++) {
    this.mountains[i].status = null;
  }
}

MountainsView.prototype.userLogin = function(user) {
  this._user = user;
  // clear any existing user settings
  this._clearMountains();

  let mtn;
  let user_mtns = user.baggedList;
  for (let i = 0; i < user_mtns.length; i++) {
    mtn = search(this.mountains, user_mtns[i].id);
    mtn.status = user_mtns[i];
  }
}

MountainsView.prototype.userLogout = function() {
  this._user = null;
  this._clearMountains();
}

MountainsView.prototype.newBaggedRecord = function(id) {
  if (!this._user) return null; // this shouldn't happen
  return this._user.createUserMountain(id)
}

MountainsView.prototype.saveBaggedRecord = function(bagged, callback) {
  if (this._user) this._user.saveUserMountain(bagged, callback);
}

module.exports = MountainsView;