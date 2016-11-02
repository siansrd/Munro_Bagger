var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');
var search = require('../utility').mountainSearch;

var baseURL = "http://www.munrobagger.scot/";

var User = function() {
  // this._id = userId;
  this._mountains = [];
  // Object.defineProperty(this, "id", { get: function(){ return this._id; } });
}

User.prototype.register = function(email, password, confirmation, onCompleted) {
  let url = baseURL + "users.json";
  let apiRequest = new ApiRequest();
  let params = { user: {
    email: email,
    password: password,
    password_confirmation: confirmation
  } };
  apiRequest.makePostRequest(url, params, function(status, result) {
    onCompleted(status, result);
  });
}

User.prototype.login = function(email, password, onCompleted) {
  let url = baseURL + "users/sign_in.json";
  let apiRequest = new ApiRequest();
  let params = { user: {
    email: email,
    password: password
  } };
  apiRequest.makePostRequest(url, params, function(status, result) {
    onCompleted(status, result);
  });
}

// User.prototype.logout = function(onCompleted) {
//   let url = baseURL + "users/sign_out.json";
//   let apiRequest = new ApiRequest();
//   apiRequest.makeDeleteRequest(url, params, function(status, result) {
//     onCompleted(status, result);
//   }
// }

User.prototype.getInfo = function(onCompleted) {
  var url = baseURL + "bagged_munros";
  var apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, function(mountains) {
//    var mountains = receivedData;
    console.log("Mountains:", mountains)
    for (var mountain of mountains) {
      this._mountains.push(new UserMountain(mountain));
    }
    onCompleted();
  }.bind(this))
}

// User.prototype.hasClimbed = function(mountainId) {
//   var mountain = search(this._mountains, mountainId);
//   if (mountain) return mountain.bagged;
//   return false;
// };

User.prototype.getBaggedList = function() {
  var bagged = this._mountains.filter(function(mtn) {
    return mtn.bagged;
  });
  return bagged.map(function(mtn) {
    return { id: mtn.id, climbed_on: mtn.climbed_on };
  })
}

User.prototype.setHasClimbed = function(mountainId, value, date) {
  var mountain = search(this._mountains, mountainId);
  if (!mountain) {
    mountain = new UserMountain({ mtn_id: mountainId });
    this._mountains.push(mountain);
  }
  mountain.bagged = value;
  mountain.climbed_on = date;
}

User.prototype.saveChanges = function() {
  var changed = this._mountains.filter(function(mtn) {
    return mtn.isDirty();
  });
  changed = changed.map(function(mtn){
    return mtn.export();
  })
  var url = "http://localhost:3000/bagged_munros";
  var apiRequest = new ApiRequest();
  apiRequest.makePostRequest(url, { bagged_munros: changed }, function(receivedStatus) {
    if (receivedStatus !== 200) console.log("Post returned:", receivedStatus);
  });
}

module.exports = User;
