let UserMountain = require('./user_mountain');
let ApiRequest = require('./api_request');

const baseURL = "http://www.munrobagger.scot/";
// const baseURL = "http://localhost:3000/"
// const baseURL = "http://192.168.1.124:3000/";
const baggedRoute = "bagged_munros";
const apiRequest = new ApiRequest();

var User = function() {
  this._mountains = [];
  this._jwtoken = null;
  Object.defineProperty(this, "baggedList", { get: function(){ return this._mountains; } });
}

User.prototype.register = function(email, password, onCompleted) {
  let url = baseURL + "users";
  let params = { user: {
    email: email,
    password: password
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

User.prototype.resetPassword = function(email, onCompleted) {
  console.log(email)
  let url = baseURL + "users/reset";
    let params = { user: {
      email: email
    } };
  apiRequest.makePutRequest(url, params, null, function(status, result) {
    let success = (status === 201);
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

User.prototype.saveUserMountain = function(mountain, onCompleted) {
  if (!mountain.isDirty()) callback(false);
  let url = baseURL + baggedRoute;
  let forExport = mountain.export();

  // decide if a create, update or delete request is needed

  if (!mountain._originId && mountain.bagged) {
    // Mountain has not been in the database before so should be a create request
    apiRequest.makePostRequest(url, { bagged: forExport }, this._jwtoken, function(status, savedMtn) {
      let success = (status === 201);
      if (success) {
        mountain._dirty = false;
        // retrieve the id for the new entry
        mountain._originId = savedMtn.id;
      }
      onCompleted(success);
    });
    return;
  }

  // If not a create request, will have to identify the resource that is being changed.
  url += "/" + mountain._originId;

  if (mountain._originId && !mountain.bagged) {
    // This mountain has been in the database so was bagged once but not now
    // This is a delete request
    apiRequest.makeDeleteRequest(url, null, this._jwtoken, function(status) {
      let success = (status === 204);
      if (success) {
        mountain._dirty = false;
        mountain._originId = undefined;
      }
      onCompleted(success);
    });
    return
  }

  if (mountain._originId && mountain.bagged) {
    apiRequest.makePutRequest(url, { bagged: forExport }, this._jwtoken, function(status) {
      let success = (status === 201);
      if (success) {
        mountain._dirty = false;
      }
      onCompleted(success);
    });
  }
}

module.exports = User;
