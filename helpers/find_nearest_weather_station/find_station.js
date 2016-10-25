var Mountain = require('./mountain');
var mountainList = require('../../api/mountains');
var fs = require('fs');

var jsonWeatherStations = fs.readFileSync('siteList.json');
var weatherStations = JSON.parse(jsonWeatherStations);

var mountains = [];
var mountain;

for (mtn of mountainList.mountains) {
  mountain = new Mountain(mtn);
  console.log("Processing", mountain.name)
  for (station of weatherStations.Locations.Location) {
    mountain.checkStation(station);
  }
  mountains.push(mountain);
}

var linesOut = "";
for (var i = 0; i < mountains.length; i++) {
  linesOut += (i+1) + ",\"" + mountains[i].name + "\"," + mountains[i].weatherStation.id + ",\"" +
    mountains[i].weatherStation.name + "\"," + mountains[i].weatherStation.latitude + "," + mountains[i].weatherStation.longitude + "\n";
}
fs.writeFileSync("weather_stations.csv", linesOut);