var apiKey = require("./api_key");

var weatherObjs = [];

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  saveWeather(response);
}



var app = function(){

}

window.onload = app;
