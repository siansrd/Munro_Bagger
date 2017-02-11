let UserMountain = require('./user_mountain');
let ApiRequest = require('./api_request');

const baseURL = "www.munrobagger.scot";
// const baseURL = "localhost:3000"
// const baseURL = "192.168.1.124:3000";
const baggedRoute = "bagged_munros";

const User = function() {
  this._mountains = [];
  this._jwtoken = null;
  Object.defineProperty(this, "baggedList", { get: function(){ return this._mountains; } });
}

User.prototype._getMessage = function(status, request) {
  // Global messages.
  // The wording comes from the official definition of the error codes.
  let messages = {
    400: "Bad request.",
    401: "Unauthorized.",
    403: "Forbidden.",
    404: "Not found.",
    405: "Method not allowed.",
    406: "Not acceptable.",
    407: "Proxy authentication required.",
    408: "Request timeout.",
    409: "Conflict.",
    422: "Unprocessable entity.",
    429: "Too many requests.",
    431: "Request header fields too large.",
    500: "Unexpected server error.",
    501: "Not implemented.",
    502: "Bad gateway.",
    503: "Service unavailable.",
    504: "Gateway timeout.",
    505: "HTTP version not supported.",
    511: "Network authentication required.",
    598: "Network read timeout error.",
    599: "Network connect timeout error.",
  };

  // This object contains messages for specific requests.
  // This contains all the explicit error responses made by the server
  let requests = {
    register: { 422: "That email address is already registered." },
    login: { 401: "Unrecognised email address or password." },
    logout: {},
    resetPassword: { 404: "That email address is not registered." },
    changePassword: {  401: "Not logged in.", 422: "Update of password failed." },
    getBagged: { 401: "Not logged in." },
    saveBagged: { 401: "Not logged in." },
    deleteBagged: { 401: "Not logged in.", 422: "Update failed." },
    updateBagged: { 401: "Not logged in." , 422: "Update failed." }
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

User.prototype._makeURL = function(route) {
  return document.location.protocol + "//" + baseURL + "/" + route;
}

User.prototype.register = function(email, password, onCompleted) {
  const params = { user: {
    email: email,
    password: password
  } };
  this._requestRegister("users", params, function(status, result) {
    let success = (status === 201);
    // Tokens are not returned in response to register requests
    // if(success) this._jwtoken = result.auth_token;
    onCompleted(success, this._getMessage(status, 'register'));
  }.bind(this));
}

User.prototype.login = function(email, password, onCompleted) {
  const params = { session: {
    email: email,
    password: password
  } };
  this._requestLogin("sessions", params, function(status, result) {
    let success = (status === 201);
    if(success) this._jwtoken = result.auth_token;
    onCompleted(success, this._getMessage(status, 'login'));
  }.bind(this));
}

User.prototype.logout = function(onCompleted) {
  this._requestLogout("sessions", this._jwtoken, function(status) {
    let success = (status === 204);
    if (success) {
      this._mountains = [];
      this._jwtoken = null;
    }
    onCompleted(success, this._getMessage(status, 'logout'));
  }.bind(this));
}

User.prototype.resetPassword = function(email, onCompleted) {
  const params = { user: {
    email: email
  } };
  this._requestResetPassword("users/reset", params, function(status, result) {
    let success = (status === 204);
    onCompleted(success, this._getMessage(status, 'resetPassword'));
  }.bind(this));
}

User.prototype.changePassword = function(password, onCompleted) {
  const params = { user: {
    password: password
  } };
  this._requestChangePassword("users/update", params, this._jwtoken, function(status, result) {
    let success = (status === 200);
    onCompleted(success, this._getMessage(status, 'changePassword'));
  }.bind(this));
}

User.prototype.getInfo = function(onCompleted) {
  this._requestGetInfo(baggedRoute, this._jwtoken, function(status, mountains) {
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
  if (!mountain.isDirty()) return null;
  let forExport = { bagged: mountain.export() };

  // decide if a create, update or delete request is needed

  if (!mountain._originId && mountain.bagged) {
    // Mountain has not been in the database before so should be a create request
    this._requestSaveBagged(baggedRoute, forExport, this._jwtoken, function(status, savedMtn) {
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
  let idRoute = baggedRoute + "/" + mountain._originId;

  if (mountain._originId && !mountain.bagged) {
    // This mountain has been in the database so was bagged once but not now
    // This is a delete request
    this._requestDeleteBagged(idRoute, this._jwtoken, function(status) {
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
    this._requestUpdateBagged(idRoute, forExport, this._jwtoken, function(status) {
      let success = (status === 201);
      if (success) {
        mountain._dirty = false;
      }
      onCompleted(success, this._getMessage(status, 'updateBagged'));
    }.bind(this));
  }
}

// All methods beginning _request contain only an API request
// The API request has been separated from the logic that surrounds it to allow the
// API call itself to be stubbed out during testing

User.prototype._requestRegister = function(route, params, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePostRequest(url, params, null, onCompleted);
}

User.prototype._requestLogin = function(route, params, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePostRequest(url, params, null, onCompleted);
}

User.prototype._requestLogout = function(route, token, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makeDeleteRequest(url, null, token, onCompleted);
}

User.prototype._requestResetPassword = function(route, params, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePutRequest(url, params, null, onCompleted);
}

User.prototype._requestChangePassword = function(route, params, token, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePutRequest(url, params, token, onCompleted);  
}

User.prototype._requestGetInfo = function(route, token, onCompleted) {
  const url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, token, onCompleted);
}

User.prototype._requestSaveBagged = function(route, params, token, onCompleted) {
  let url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePostRequest(url, params, token, onCompleted);
}

User.prototype._requestDeleteBagged = function(route, token, onCompleted) {
  let url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makeDeleteRequest(url, null, token, onCompleted);
}

User.prototype._requestUpdateBagged = function(route, params, token, onCompleted) {
  let url = this._makeURL(route);
  const apiRequest = new ApiRequest();
  apiRequest.makePutRequest(url, params, token, onCompleted);
}

module.exports = User;
