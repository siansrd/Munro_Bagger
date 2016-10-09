var fs = require('fs');
var linesIn1 = fs.readFileSync('munros.csv').toString().split("\n");
var linesIn2 = fs.readFileSync('weather_stations.csv').toString().split("\n");
var linesOut = "use munro_bagger;\ndb.mountains.drop();\ndb.mountains.insert([\n";
var line;
var fields1;
var fields2;
var i = 0;
for(; i < linesIn1.length; i++) {
  line = linesIn1[i];
  if (line.length === 0) break;
  fields1 = line.split(",");
  // "WptName","GR(6)","Hill Name","Height","GridZN","GridEast","GridNorth","Latitude","Longitude","Climbed?"
  linesOut += "  {\n    _id: \""  + (i+1) + "\",\n    name: " + fields1[2] +",\n    height: " +
  // linesOut += "  {\n    name: " + fields[2] +",\n    height: " +
    fields1[3].substr(1, fields1[3].length-2) + ",\n    gridRef: {\n      letters: " +
    fields1[4] + ",\n      eastings: " + fields1[5] + ",\n      northings: " +
    fields1[6] + "\n    },\n    latLng: {\n" + "      lat: " +
    fields1[7].substr(1, fields1[7].length-2) + ",\n      lng: " +
    fields1[8].substr(1, fields1[8].length-2) + "\n    },\n";

  line = linesIn2[i];
  fields2 = line.split(",");
  // count, Hill Name, City Id, "City Name", City Lat., Lity Long.
  if (fields1[2] !== fields2[1]) {
    console.log("Hill names differ at line #", (i+1));
    break;
  }
  linesOut += "    city: {\n      id: " + fields2[2] + ",\n      name: " + fields2[3] + ",\n" +
    "      latLng: {\n        lat: " + fields2[4] + ",\n        lng: " + fields2[5] + "\n" +
    "      }\n    }\n  },\n";
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n]);"
// console.log(linesOut)
fs.writeFileSync("seeds.js", linesOut);