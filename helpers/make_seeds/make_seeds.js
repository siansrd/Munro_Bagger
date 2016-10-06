var fs = require('fs');
var linesIn = fs.readFileSync('munros.csv').toString().split("\n");
var linesOut = "use munro_bagger;\ndb.mountains.insert([\n";
var line;
var fields;
for(line of linesIn) {
  if (line.length > 0) {
    fields = line.split(",");
    // "WptName","GR(6)","Hill Name","Height","GridZN","GridEast","GridNorth","Latitude","Longitude","Climbed?"
    linesOut += "  {\n    name: " + fields[2] +",\n    height: " + fields[3] + ",\n    gridRef: {\n      letters: " +
      fields[4] + ",\n      eastings: " + fields[5] + ",\n      northings: " + fields[6] + "\n    },\n    latLng: {\n" +
      "      lat: " + fields[7] + ",\n      lng: " + fields[8] + "\n    }\n  },\n";
  }
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n]);"
// console.log(linesOut)
fs.writeFileSync("seeds.js", linesOut);
