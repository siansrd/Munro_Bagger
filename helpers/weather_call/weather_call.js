var apiKey = require("./api_key");
// var munros = require("..../db/mountain_query");

var munroList = [
  {
    name: "A'Bhuidheanach Bheag",
    height:  936.1,
    gridRef: {
      letters: "NN",
      eastings: "66069",
      northings: "77600"
    },
    latLng: {
      lat: 56.87039900,
      lng: -4.1988390
    }
  },
  {
    name: "A'Chailleach",
    height:  997.0,
    gridRef: {
      letters: "NH",
      eastings: "13620",
      northings: "71414"
    },
    latLng: {
      lat: 57.69378200,
      lng: -5.1287300
    }
  },
  {
    name: "A'Chailleach",
    height:  929.2,
    gridRef: {
      letters: "NH",
      eastings: "68110",
      northings: "04178"
    },
    latLng: {
      lat: 57.10956400,
      lng: -4.1792850
    }
  },
  {
    name: "A'Chraileag (A'Chralaig)",
    height: 1120.0,
    gridRef: {
      letters: "NH",
      eastings: "09431",
      northings: "14797"
    },
    latLng: {
      lat: 57.18424000,
      lng: -5.1548420
    }
  },
  {
    name: "A'Ghlas-bheinn",
    height:  918.0,
    gridRef: {
      letters: "NH",
      eastings: "00822",
      northings: "23105"
    },
    latLng: {
      lat: 57.25509000,
      lng: -5.3036870
    }
  }
];
var weatherObjs = [];
var counter = 0;

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
};

var saveWeather = function(response){
  var weatherObj = response[counter];
  weatherObjs.push(weatherObj);
};

var urlGenerator = function(){
  var api_key = apiKey.key();
  var url = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + api_key;
  return url;
}


var app = function(){

};

window.onload = app;
