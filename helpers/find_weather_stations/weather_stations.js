// var Mountain = require('../../client/src/models/mountain');
var Mountains = require('../../client/src/models/mountains');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var key = require('./api_key');
var fs = require('fs');

var makeRequest = function(num, url, callback){
  var request = new XMLHttpRequest();
  console.log("Request #" + (num+1) + ": " + url);
  request.open("GET", url);
  request.onload = function(){
    // console.log(this.status)
    if (this.status !== 200) return;
    var jsonString = this.responseText;
    var response = JSON.parse(jsonString);
    callback(response);
  };
  request.send();
};

var urlGenerator = function(latLng){
  var apiKey = key();
  var lat = latLng.lat;
  var lng = latLng.lng;
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey;
  return url;
};

var generateCSV = function(mtns, ress) {
  var linesOut = "";
  console.log("Generating output...");
  for (var i = 0; i < mtns.length; i++) {
    linesOut += (i+1) + ",\"" + mtns[i].name + "\"," + ress[i].city.id + ",\"" +
      ress[i].city.name + "\"," +ress[i].city.coord.lat + "," + ress[i].city.coord.lon + "\n";
  }
  fs.writeFileSync("weather_stations.csv", linesOut);
} 

console.log("Running...");
new Mountains().all(function(mountains) {
  var requests = [];
  var responses = [];
  var responseCount = 0;

  var requestScheduler = function(reqNo) {
    makeRequest(reqNo, requests[reqNo], function(response) {
      responses[reqNo] = response;
      responseCount++;
      console.log("Received", responseCount, "responses.")
      if (responseCount === requests.length) {
        generateCSV(mountains, responses);
      }
    });
    setTimeout(function(){
      if (reqNo < requests.length - 1)
        requestScheduler(reqNo + 1);
      else
        console.log("All requests sent");
    }, 1000);
  }

  console.log("Starting the weather requests...");
  for (var mountain of mountains) {
    console.log("Generating a request for", mountain.name);
    url = urlGenerator(mountain.latLng);
    requests.push(url);
  }
  requestScheduler(0);
});
