var Mountains = require('../models/mountains');

var MountainsView = function() {
  this.mountains = null;
}

MountainsView.all = function(onCompleted) {
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

MountainsView.prototype.getMountainPin = function(mtnId) {

}

MountainsView.prototype.getMountainMarker = function(mtnId) {

}

MountainsView.prototype.getMountainListEntry = function(mtnId) {

}