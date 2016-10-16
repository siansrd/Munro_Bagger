var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');
var search = require('../utility').mountainSearch;

var User = function(userId) {
  this._id = userId;
  this._mountains = [];
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
};

User.prototype.getInfo = function(onCompleted) {
  var url = "http://localhost:3000/api/users/" + this._id;
  var apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, function(receivedData) {
    var mountains = receivedData.user.mountains;
    for (var mountain of mountains) {
      this._mountains.push(new UserMountain(mountain));
    }
    onCompleted();
  }.bind(this))
};

User.prototype.hasClimbed = function(mountainId) {
  var mountain = search(this._mountains, mountainId);
  if (mountain) return mountain.bagged;
  return false;
};

User.prototype.setHasClimbed = function(mountainId, value) {
  var mountain = search(this._mountains, mountainId);
  if (mountain) mountain.bagged = value;
};

User.prototype.saveChanges = function() {
  var changed = this._mountains.filter(function(mtn) {
    return mtn.isDirty();
  });
  changed = changed.map(function(mtn){
    return mtn.export();
  })
  var url = "http://localhost:3000/api/users/" + this._id;
  var apiRequest = new ApiRequest();
  apiRequest.makePostRequest(url, { mountains: changed }, function(receivedStatus) {
    if (receivedStatus !== 200) console.log("Post returned:", receivedStatus);
  });
}

module.exports = User;
