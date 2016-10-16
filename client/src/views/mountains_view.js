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
  for (var mtn of this.mountains) {
    // access private variable _bagged to sidestep callback
    mtn._bagged = user.hasClimbed(mtn.id);
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