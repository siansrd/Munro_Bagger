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
var m;
for (var i = 0; i < mountains.length; i++) {
  m = mountains[i]
  linesOut += (i+1) + ",\"" + m.name + "\"," + m.height + "," + m.weatherStation.id + ",\"" +
  	m.weatherStation.name + "\"," + m.weatherStation.latitude + "," + m.weatherStation.longitude + "," +
  	m.weatherStation.elevation + "," + m.wsDistance + "\n"
}
fs.writeFileSync("weather_stations.csv", linesOut);
