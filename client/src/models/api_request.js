"use strict"

const XMLHttpRequest = (process.env.NODE_ENV === 'test') ? require('../stubs').XMLHttpRequest : window.XMLHttpRequest;
const navigator = (process.env.NODE_ENV === 'test') ? require('../stubs').navigator : window.navigator;

const ApiRequest = function() {
};

ApiRequest.prototype._makeRequest = function(httpVerb, url, expected, callback, jwtoken, content) {
  const request = new XMLHttpRequest()
  request.open(httpVerb, url);
  // request.withCredentials = true;
  if (jwtoken) request.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
  if (content) request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    let errorStatus = (expected.indexOf(this.status) === -1);
    let content = ((this.status === 204) || errorStatus ) ? null : JSON.parse(this.responseText);
    console.log(httpVerb, "request to", url, "returned status", this.status)
    callback(this.status, content);
  };
  let json = (content) ? JSON.stringify(content) : null;
  if (navigator.onLine) {
    request.send(json);
  }
  else {
    callback(0, null);
  }
}

ApiRequest.prototype.makeGetRequest = function(url, jwtoken, callback) {
  this._makeRequest("GET", url, [200], callback, jwtoken)
};

ApiRequest.prototype.makePostRequest = function(url, content, jwtoken, callback) {
  this._makeRequest("POST", url, [200, 201], callback, jwtoken, content)
}

ApiRequest.prototype.makePutRequest = function(url, content, jwtoken, callback) {
  this._makeRequest("PUT", url, [200, 201], callback, jwtoken, content)
}

ApiRequest.prototype.makeDeleteRequest = function(url, content, jwtoken, callback) {
  this._makeRequest("DELETE", url, [200, 201, 204], callback, jwtoken, content);
}

module.exports = ApiRequest;
