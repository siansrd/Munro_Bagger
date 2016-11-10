var Mountain = require('./mountain');
var ApiRequest = require('./api_request');

var baseURL = "http://www.munrobagger.scot/";
// var baseURL = "http://localhost:3000/";


var Mountains = function(){
};

Mountains.prototype.all = function(onCompleted) {
  var url = baseURL + "munros";
  var apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, null, function(status, receivedMtns) {
    var mountains = [];
    for (var receivedMtn of receivedMtns) {
      var mtn = new Mountain(receivedMtn);
      mountains.push(mtn);
    }
    onCompleted(mountains);
  })
};

module.exports = Mountains;
