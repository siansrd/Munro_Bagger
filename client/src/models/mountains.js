var Mountain = require('./mountain');
var ApiRequest = require('./api_request');

var Mountains = function(){
}

Mountains.prototype.all = function(onCompleted) {
  var url = "http://localhost:3000/api/mountains";
  var apiRequest = new ApiRequest();
  apiRequest.makeRequest(url, function(receivedMtns) {
    var mountains = []; 
    for (var receivedMtn of receivedMtns.mountains) {
      var mtn = new Mountain(receivedMtn);
      mountains.push(mtn);
    }
    onCompleted(mountains);
  })
}

module.exports = Mountains;