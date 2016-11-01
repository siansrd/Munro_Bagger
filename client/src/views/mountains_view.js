var Mountains = require('../models/mountains');
var MountainView = require('./mountain_view');
var search = require('../utility').mountainSearch;

var MountainsView = function() {
  this.mountains = null;
  this.user = null;
}

MountainsView.prototype.all = function(onCompleted) {
  new Mountains().all(function(mtns){
    this.mountains = mtns.map(function(mtn) {
      var mv = new MountainView(mtn);
      mv.onChange = this.mountainViewChange.bind(this);
      return mv;
    }.bind(this));
    onCompleted(this.mountains);
  }.bind(this));
}

MountainsView.prototype.userLogin = function(user) {
  this.user = user;
  // clear any existing user settings
  var mtn;
  for (mtn of this.mountains) {
    // access private variable _bagged to sidestep callback
    mtn._bagged = false
  }
  var mtnId;
  var mtnIds = user.getBaggedIdList();
  for (mtnId of mtnIds) {
    mtn = search(this.mountains, mtnId);
    // access private variable _bagged to sidestep callback
    mtn._bagged = true;
  }
}

MountainsView.prototype.getPinById = function(mtnId) {
  var mtn = search(this.mountains, mtnId);
  return mtn.pin;
}

MountainsView.prototype.getListEntryById = function(mtnId) {
  var mtn = search(this.mountains, mtnId);
  return mtn.listEntry;
}

MountainsView.prototype.mountainViewChange = function(changed) {
  this.user.setHasClimbed(changed.id, changed.bagged);
  this.user.saveChanges();
}

module.exports = MountainsView;