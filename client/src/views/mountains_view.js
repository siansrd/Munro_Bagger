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
  let mtn;
  for (mtn of this.mountains) {
    // access private variable _bagged to sidestep callback
    mtn._bagged = false;
    mtn._climbed_on = null;
  }
  let user_mtn;
  let user_mtns = user.getBaggedList();
  for (user_mtn of user_mtns) {
    mtn = search(this.mountains, user_mtn.id);
    // access private variable _bagged to sidestep callback
    mtn._bagged = true;
    mtn._climbed_on = user_mtn._climbed_on;
  }
}

MountainsView.prototype.getPinById = function(mtnId) {
  var mtn = search(this.mountains, mtnId);
  return mtn.pin;
}

MountainsView.prototype.mountainViewChange = function(changed) {
  this.user.setHasClimbed(changed.id, changed.bagged);
  this.user.saveChanges();
}

module.exports = MountainsView;