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
  var mountains = this._mountains;
  var mId = Number(mountainId);

  var binarySearch = function(first, last) {
    var mid = first + Math.floor((last - first) / 2);
    var mountain = mountains[mid];
    var numberId = Number(mountain.id);
    if (mId === numberId) return mountain;
    if (first === last) return undefined;
    if (mId < numberId)
      return binarySearch(first, mid - 1);
    else
      return binarySearch(mid + 1, last);
  };

  var mountain = binarySearch(0, mountains.length-1);
  if (mountain) return mountain.bagged;
  return false;
};

User.prototype.setHasClimbed = function(mountainId, value) {
  var mountain = this._mountains.find(function(userMountain){
    userMountain.id === mountainId;
  });
  if (mountain) mountain.bagged = value;
};

module.exports = User;
