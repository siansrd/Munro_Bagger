var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');

var User = function(userId) {
  this._id = userId;
  this._mountains = [];
  Object.defineProperty(this, "id", { get: function(){ return this._id; } });
};

User.prototype.getInfo = function(onCompleted) {
  var url = "http://localhost:3000/api/users/" + this._id;
  var apiRequest = new ApiRequest();
  apiRequest.makeRequest(url, function(receivedData) {
    var mountains = receivedData.user.mountains;
    for (var mountain of mountains) {
      this._mountains.push(new UserMountain(mountain));
    }
    onCompleted();
  }.bind(this))
};

User.prototype.hasClimbed = function(mountainId) {
  for (var mountain of this._mountains) {
    if (mountain.id === mountainId) return mountain.bagged;
  }
  return false;
};

User.prototype.setHasClimbed = function(mountainId, value) {
  var mountain = this._mountains.find(function(userMountain){
    userMountain.id === mountainId;
  });
  if (mountain) mountain.bagged = value;
};

module.exports = User;
