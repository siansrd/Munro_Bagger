let Mountain = require('./mountain');
let ApiRequest = require('./api_request');

const baseURL = "http://www.munrobagger.scot/";
// const baseURL = "http://localhost:3000/";
// const baseURL = "http://192.168.1.124:3000/";

var Mountains = function(){
};

Mountains.prototype.all = function(onCompleted) {
  const url = baseURL + "munros";
  const apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, null, function(status, receivedMtns) {
    const mountains = [];
    for (let i = 0; i < receivedMtns.length; i++) {
      let mtn = new Mountain(receivedMtns[i]);
      mountains.push(mtn);
    }
    onCompleted(mountains);
  })
};

module.exports = Mountains;
