// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var ApiRequest = function() {
};

ApiRequest.prototype.makeRequest = function(url, callback) {
 var request = new XMLHttpRequest()
 request.open("GET", url);
 request.withCredentials = true;
 request.onload = function() {
   if (this.status !== 200) return;
   var jsonString = this.responseText;
   var result = JSON.parse(jsonString);
   callback(result);
 };
 request.send();
};

ApiRequest.prototype.makeGetRequest = ApiRequest.prototype.makeRequest;

ApiRequest.prototype.makePostRequest = function(url, content, callback) {
  var request = new XMLHttpRequest()
  request.open("POST", url);
  request.withCredentials = true;
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    var result = "";
    if (this.status === 201) {
      result = JSON.parse(this.responseText);
    }
    callback(this.status, result);
  };
  var json = JSON.stringify(content);
  request.send(json);
}

ApiRequest.prototype.makePutRequest = function(url, content, callback) {
  var request = new XMLHttpRequest()
  request.open("PUT", url);
  request.withCredentials = true;
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    var result = "";
    if (this.status === 201) {
      result = JSON.parse(this.responseText);
    }
    callback(this.status, result);
  };
  var json = JSON.stringify(content);
  request.send(json);
}

ApiRequest.prototype.makeDeleteRequest = function(url, content, callback) {
  var request = new XMLHttpRequest()
  request.open("DELETE", url);
  request.withCredentials = true;
  if (content) request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    var result = "";
    if (this.status === 201) {
      result = JSON.parse(this.responseText);
    }
    callback(this.status, result);
  };
  let json = null;
  if (content) json = JSON.stringify(content);
  request.send(json);
}

module.exports = ApiRequest;