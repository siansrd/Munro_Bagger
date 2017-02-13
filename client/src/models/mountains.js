"use strict"

const Mountain = require('./mountain');
const ApiRequest = require('./api_request');

const baseURL = "www.munrobagger.scot";
// const baseURL = "localhost:3000";
// const baseURL = "192.168.1.124:3000";

const Mountains = function(){
};

Mountains.prototype.all = function(onCompleted) {
  
  const apiRequest = new ApiRequest();
  this._fetchFromNetwork(function(receivedMtns) {
    const mountains = [];
    for (let i = 0; i < receivedMtns.length; i++) {
      let mtn = new Mountain(receivedMtns[i]);
      mountains.push(mtn);
    }
    onCompleted(mountains);
  })
};

Mountains.prototype._fetchFromNetwork = function(onCompleted) {
  const url = document.location.protocol + "//" + baseURL + "/munros";
  const apiRequest = new ApiRequest();
  apiRequest.makeGetRequest(url, null, function(status, received) {
    onCompleted(received);
  });
}

module.exports = Mountains;
