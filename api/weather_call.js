var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var apiKey = require("./weather_api_key");
// var munroList = require(""); //this should come from a DB now

// var weatherObjs = []; //this should point to a DB now
// var counter = 0; //maybe we dont need this counter since this is only for calls that are out of date.

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  // saveWeather(response);
  // return weather ??
  // counter++; //counter no longer required
  // if (counter < 10){ //this number needs to change //counter no longer required
    // setTimeout(function(){
      makeRequest(urlGenerator(), requestComplete);
    // }, 1050);
    //timeout maybe not required. Put back in if we have any issues
  // };
};
//can we make this call when the mountain is created?? Maybe when we host the munro api ourselves, we can make both requests at the same time and save them together??

// var saveWeather = function(response){
//   var weatherObj = response[counter];
//   weatherObjs.push(weatherObj);
// };

var latLngGenerator = function(){
  var latLng = munroList[counter].latLng;
  return latLng;
};

var urlGenerator = function(){
  var apiKey = key();
  var lat = latLngGenerator().lat;
  var lng = latLngGenerator().lng;
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey;
  return url;
};

// var app = function(){
  // var url = urlGenerator();
  // makeRequest(url, requestComplete);
  // console.log(weatherObjs);
// };

// window.onload = app;
