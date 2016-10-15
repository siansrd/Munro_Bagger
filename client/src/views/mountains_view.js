var Mountains = require('../models/mountains');

var search = function(mtnsView, mountainId) {
  var mId = Number(mountainId);

  var binarySearch = function(first, last) {
    var mid = first + Math.floor((last - first) / 2);
    var mountain = mtnsView[mid].mountain;
    var numberId = Number(mountain.id);
    if (mId === numberId) return mtnsView[mid];
    if (first === last) return undefined;
    if (mId < numberId)
      return binarySearch(first, mid - 1);
    else
      return binarySearch(mid + 1, last);
  };

  return binarySearch(0, mtnsView.length-1);
};

var MountainsView = function() {
  this.mountains = null;
  this.user = null;
}

MountainsView.prototype.all = function(onCompleted) {
  new Mountains().all(function(mtns){
    this.mountains = mtns.map(function(mtn) {
      return {
        mountain: mtn,
        bagged: false,
        pin: null,
        listEntry: null
      }
    });
    onCompleted(this.mountains);
  }.bind(this));
}

MountainsView.prototype.userLogin = function(user) {
  this.user = user;
  for (var mtn of this.mountains) {
    mtn.bagged = user.hasClimbed(mtn.mountain.id);
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

module.exports = MountainsView;