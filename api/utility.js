var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Mountain = require('../client/src/models/mountain');

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

var mountainSearch = function(mountains, mountainId) {
  var mId = Number(mountainId);

  var binarySearch = function(first, last) {
    var mid = first + Math.floor((last - first) / 2);
    var mountain = mountains[mid];
    var numberId = Number(mountain.id);
    if (mId === numberId) return mountain;
    if (first === last) return undefined;
    if (mId < numberId)
      return binarySearch(first, mid - 1);
    else
      return binarySearch(mid + 1, last);
  };

  var searchResult = binarySearch(0, mountains.length-1);
  if (searchResult) return new Mountain(searchResult);
  return undefined;
};

module.exports = {
  makeRequest: makeRequest,
  mountainSearch: mountainSearch
}