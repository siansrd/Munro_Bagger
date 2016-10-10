// var Mountain = require('../../client/src/models/mountain');
var Mountains = require('../../client/src/models/mountains');
var fs = require('fs');

var generateOutput = function(stations) {
  var linesOut = "";
  var strNum;
  var padding;
  var m = 0;
  for (var i = 0; i < stations.length; i++) {
    strNum = (i+1).toString();
    padding = " ".repeat(3 - strNum.length);
    linesOut += padding + (i+1) + ". " + stations[i].weatherStation.name +
      " (" + stations[i].weatherStation.id + ")\n";
    for (mountain of stations[i].mountains) {
      linesOut += "     - " + mountain.name + " (" + (++m) + ")\n";
    }
  }
  fs.writeFileSync("weather_stations.txt", linesOut);
}

var Station = function(weatherStation) {
  this._weatherStation = weatherStation;
  this._mountains = [];
  Object.defineProperty(this, "weatherStation", { get: function(){ return this._weatherStation; } });
  Object.defineProperty(this, "mountains", { get: function(){ return this._mountains; } });
}

Station.prototype.addMountain = function(mtn) {
  this._mountains.push(mtn);
}

new Mountains().all(function(mountains) {
  var stations = [];
  var station;

  for (var mountain of mountains) {
    console.log(stations);
    station = stations.find(function(stn){
      // console.log("Comparing...");
      // console.log("stn", stn.weatherStation);
      // console.log("mtn", mountain.weatherStation);
      stn.weatherStation.name == mountain.weatherStation.name;
    });
    if (!station) {
      station = new Station(mountain.weatherStation);
      stations.push(station);
    }
    station.addMountain(mountain);
  }

  generateOutput(stations);
});