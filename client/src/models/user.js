var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');
var search = require('../utility').mountainSearch;

const baseURL = "http://www.munrobagger.scot/";
const baggedRoute = "bagged_munros" 

var User = function() {
  // this._id = userId;
  this._mountains = [];
  // Object.defineProperty(this, "id", { get: function(){ return this._id; } });
}

User.prototype.register = function(email, password, confirmation, onCompleted) {
  let url = baseURL + "users/sign_up.json";
  let apiRequest = new ApiRequest();
  let params = { user: {
    email: email,
    password: password,
    password_confirmation: confirmation
  } };
  console.log(params)
  apiRequest.makePostRequest(url, params, function(status, result) {
    onCompleted(status === 201);
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
    onCompleted(status === 201);
  });
}

User.prototype.logout = function(onCompleted) {
  let url = baseURL + "users/sign_out.json";
  let apiRequest = new ApiRequest();
  apiRequest.makeDeleteRequest(url, params, function(status, result) {
    this._mountains = [];
    onCompleted(status, result);
  });
}

User.prototype.getInfo = function(onCompleted) {
  var url = baseURL + bagged_route;
  var apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, function(mountains) {
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
    mountain = new UserMountain({ id: mountainId });
    this._mountains.push(mountain);
  }
  mountain.bagged = value;
  mountain.climbed_on = date;
}

User.prototype.saveChanges = function() {
  var url = baseURL + baggedRoute;
  var apiRequest = new ApiRequest();
  // 
  let created = this._mountains.filter(function(mtn) {
    return (mtn.isDirty() && mtn.bagged && !mtn._origin_id)
  });
  if (created.length > 0) {
    created = created.map(function(mtn){
      return mtn.export();
    });
    apiRequest.makePostRequest(url, { munros: created }, function(receivedStatus) {
      if (receivedStatus !== 200) console.log("Post returned:", receivedStatus);
    });
  }

  let changed = this._mountains.filter(function(mtn) {
    return (mtn.isDirty() && mtn.bagged && mtn._origin_id);
  });
  if (changed.length > 0) {
    changed = changed.map(function(mtn){
      return mtn.export();
    });
    apiRequest.makePutRequest(url, { munros: changed }, function(receivedStatus) {
      if (receivedStatus !== 200) console.log("Put returned:", receivedStatus);
    });
  }

  let deleted = this._mountains.filter(function(mtn) {
    return (mtn.isDirty() && !mtn.bagged && mtn._origin_id)
  });
  if (deleted.length > 0) {
    deleted = deleted.map(function(mtn){
      return mtn._origin_id;
    });
    apiRequest.makeDeleteRequest(url, { munros: deleted }, function(receivedStatus) {
      if (receivedStatus !== 200) console.log("Delete returned:", receivedStatus);
    });
  }
}

module.exports = User;
