// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var ApiRequest = function() {
};

ApiRequest.prototype.makeRequest = function(url, callback) {
 var request = new XMLHttpRequest()
 request.open("GET", url);
 // request.withCredentials = true;
 request.onload = function() {
   if (this.status !== 200) return;
   var jsonString = this.responseText;
   var results = JSON.parse(jsonString);
   callback(results);
 };
 request.send();
};

ApiRequest.prototype.makeGetRequest = ApiRequest.prototype.makeRequest;

ApiRequest.prototype.makePostRequest = function(url, content, callback) {
  var request = new XMLHttpRequest()
  request.open("POST", url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    callback(this.status);
  };
  request.send(JSON.stringify(content));
}

module.exports = ApiRequest;