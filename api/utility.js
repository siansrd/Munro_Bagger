var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var makeRequest = function(url, callback) {
 var request = new XMLHttpRequest()
 request.open("GET", url);
 request.onload = function() {
   if (this.status !== 200) return;
   var jsonString = this.responseText;
   var results = JSON.parse(jsonString);
   callback(results);
 };
 request.send();
}

module.exports = {
  makeRequest: makeRequest
}