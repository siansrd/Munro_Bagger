var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');

var search = function(mountains, mountainId) {
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

  return binarySearch(0, mountains.length-1);
};

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
