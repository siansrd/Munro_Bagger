var UserMountain = require('./user_mountain');
var ApiRequest = require('./api_request');
var search = require('../utility').mountainSearch;

// const baseURL = "http://www.munrobagger.scot/";
const baseURL = "http://localhost:3000/"
const baggedRoute = "bagged_munros";
const apiRequest = new ApiRequest();

var User = function() {
  this._mountains = [];
  this._jwtoken = null;
  Object.defineProperty(this, "baggedList", { get: function(){ return this._mountains; } });
}

User.prototype.register = function(email, password, confirmation, onCompleted) {
  let url = baseURL + "users";
  let params = { user: {
    email: email,
    password: password,
    password_confirmation: confirmation
  } };
  apiRequest.makePostRequest(url, params, null, function(status, result) {
    let success = (status === 201);
    if(success) this._jwtoken = result.auth_token;
    onCompleted(success);
  }.bind(this));
}

User.prototype.login = function(email, password, onCompleted) {
  let url = baseURL + "sessions";
  let params = { session: {
    email: email,
    password: password
  } };
  apiRequest.makePostRequest(url, params, null, function(status, result) {
    let success = (status === 201);
    if(success) this._jwtoken = result.auth_token;
    onCompleted(success);
  }.bind(this));
}

User.prototype.logout = function(onCompleted) {
  let url = baseURL + "sessions";
  apiRequest.makeDeleteRequest(url, null, this._jwtoken, function(status) {
    let success = (status === 204);
    if (success) {
      this._mountains = [];
      this._jwtoken = null;
    }
    onCompleted(success);
  }.bind(this));
}

User.prototype.getInfo = function(onCompleted) {
  var url = baseURL + baggedRoute;
  var apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, this._jwtoken, function(status, mountains) {
    for (var mountain of mountains) {
      this._mountains.push(new UserMountain(mountain));
    }
    onCompleted();
  }.bind(this))
}

User.prototype.createUserMountain = function(mountainId) {
  let mountain = new UserMountain({ munro_id: mountainId });
  this._mountains.push(mountain);
  return mountain;
}

User.prototype.saveUserMountain = function(mountain) {
  if (!mountain.isDirty()) return;
  let url = baseURL + baggedRoute;
  let forExport = mountain.export();

  // decide if a create, update or delete request is needed

  if (!mountain._origin_id && mountain.bagged) {
    // Mountain has not been in the database before so should be a create request
    apiRequest.makePostRequest(url, { bagged: forExport }, this._jwtoken, function(status, savedMtn) {
      if (status !== 201) return;
      mountain._dirty = false;
      // retrieve the id for the new entry
      mountain._origin_id = savedMtn.id;
    });
    return;
  }

  // If not a create request, will have to identify the resource that is being changed.
  url += "/" + mountain._origin_id;

  if (mountain._origin_id && !mountain.bagged) {
    // This mountain has been in the database so was bagged once but not now
    // This is a delete request
    apiRequest.makeDeleteRequest(url, null, this._jwtoken, function(status) {
      if (receivedStatus !== 204) return;
      mountain._dirty = false;
      mountain._origin_id = undefined;
    });
    return
  }

  if (mountain._origin_id && mountain.bagged) {
    apiRequest.makePutRequest(url, { bagged: forExport }, this._jwtoken, function(status) {
      if (receivedStatus !== 201) return;
      mountain._dirty = false;
    });
  }
}

module.exports = User;
