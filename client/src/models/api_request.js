// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var ApiRequest = function() {
};

ApiRequest.prototype.makeRequest = function(url, callback) {
 var request = new XMLHttpRequest()
 request.open("GET", url);
 request.withCredentials = false;
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
  // request.withCredentials = true;
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    var result = "";
    if (this.status === 201) {
      result = JSON.parse(this.responseText);
    }
    callback(this.status, result);
  };
  request.send(JSON.stringify(content));
}

module.exports = ApiRequest;