let UserMountain = require('./user_mountain');
let ApiRequest = require('./api_request');

const baseURL = "www.munrobagger.scot/";
// const baseURL = "localhost:3000/"
// const baseURL = "192.168.1.124:3000/";
const baggedRoute = "bagged_munros";
const apiRequest = new ApiRequest();

const User = function() {
  this._mountains = [];
  this._jwtoken = null;
  Object.defineProperty(this, "baggedList", { get: function(){ return this._mountains; } });
}

User.prototype._getMessage = function(status, request) {
  // Global messages.
  // The wording comes from the official definition of the error codes.
  let messages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    511: "Network Authentication Required",
    598: "Network read timeout error",
    599: "Network connect timeout error"
  };

  // This object contains messages for specific requests.
  // This contains all the explicit error responses made by the server
  let requests = {
    register: { 422: "Email address already registered" },
    login: { 401: "Unrecognised username or password" },
    logout: {},
    resetPassword: { 404: "Email not recognised" },
    changePassword: {  401: "Not logged in", 422: "Update of password failed" },
    getBagged: { 401: "Not logged in" },
    saveBagged: { 401: "Not logged in" },
    deleteBagged: { 401: "Not logged in", 422: "Update failed" },
    updateBagged: { 401: "Not logged in" , 422: "Update failed" }
  }

  // Merge the list for the request with the global list
  // Rails will generate error messages of its own which should be caught by the global list
  for (var code in requests[request]) {
    messages[code] = requests[request][code];
  }

  // The supplied status may not have an associated message
  let message = null;
  if (status in messages) message = { status: status, message: messages[status] };
  return message;
}

User.prototype.register = function(email, password, onCompleted) {
  const url = location.protocol + "//" + baseURL + "users";
  const params = { user: {
    email: email,
    password: password
  } };
  apiRequest.makePostRequest(url, params, null, function(status, result) {
    let success = (status === 201);
    if(success) this._jwtoken = result.auth_token;
    onCompleted(success, this._getMessage(status, 'register'));
  }.bind(this));
}

User.prototype.login = function(email, password, onCompleted) {
  const url = location.protocol + "//" + baseURL + "sessions";
  const params = { session: {
    email: email,
    password: password
  } };
  apiRequest.makePostRequest(url, params, null, function(status, result) {
    let success = (status === 201);
    if(success) this._jwtoken = result.auth_token;
    onCompleted(success, this._getMessage(status, 'login'));
  }.bind(this));
}

User.prototype.logout = function(onCompleted) {
  const url = location.protocol + "//" + baseURL + "sessions";
  apiRequest.makeDeleteRequest(url, null, this._jwtoken, function(status) {
    let success = (status === 204);
    if (success) {
      this._mountains = [];
      this._jwtoken = null;
    }
    onCompleted(success, this._getMessage(status, 'logout'));
  }.bind(this));
}

User.prototype.resetPassword = function(email, onCompleted) {
  // console.log(email)
  const url = location.protocol + "//" + baseURL + "users/reset";
  const params = { user: {
    email: email
  } };
  apiRequest.makePutRequest(url, params, null, function(status, result) {
    let success = (status === 204);
    onCompleted(success, this._getMessage(status, 'resetPassword'));
  }.bind(this));
}

User.prototype.changePassword = function(password, onCompleted) {
  const url = location.protocol + "//" + baseURL + "users/update";
  const params = { user: {
    password: password
  } };
  apiRequest.makePutRequest(url, params, this._jwtoken, function(status, result) {
    // console.log('status', status)
    let success = (status === 200);
    onCompleted(success, this._getMessage(status, 'changePassword'));
  }.bind(this));
}

User.prototype.getInfo = function(onCompleted) {
  const url = location.protocol + "//" + baseURL + baggedRoute;
  const apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, this._jwtoken, function(status, mountains) {
    let success = (status === 200);
    if (success) {
      for (let i = 0; i < mountains.length; i++) {
        this._mountains.push(new UserMountain(mountains[i]));
      }
    }
    onCompleted(success, this._getMessage(status, 'getBagged'));
  }.bind(this))
}

User.prototype.createUserMountain = function(mountainId) {
  let mountain = new UserMountain({ munro_id: mountainId });
  this._mountains.push(mountain);
  return mountain;
}

User.prototype.saveUserMountain = function(mountain, onCompleted) {
  if (!mountain.isDirty()) callback(false);
  let url = location.protocol + "//" + baseURL + baggedRoute;
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
      onCompleted(success,this._getMessage(status, 'saveBagged'));
    }.bind(this));
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
      onCompleted(success, this._getMessage(status, 'deleteBagged'));
    }.bind(this));
    return
  }

  if (mountain._originId && mountain.bagged) {
    apiRequest.makePutRequest(url, { bagged: forExport }, this._jwtoken, function(status) {
      let success = (status === 201);
      if (success) {
        mountain._dirty = false;
      }
      onCompleted(success, this._getMessage(status, 'updateBagged'));
    }.bind(this));
  }
}

module.exports = User;
