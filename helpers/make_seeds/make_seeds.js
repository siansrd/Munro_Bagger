var fs = require('fs');
var linesIn = fs.readFileSync('munros.csv').toString().split("\n");
var linesOut = "use munro_bagger;\ndb.mountains.drop();\ndb.mountains.insert([\n";
var line;
var fields;
var i = 0;
for(; i < linesIn.length; i++) {
  line = linesIn[i];
  if (line.length > 0) {
    fields = line.split(",");
    // "WptName","GR(6)","Hill Name","Height","GridZN","GridEast","GridNorth","Latitude","Longitude","Climbed?"
    linesOut += "  {\n    _id: \""  + (i+1) + "\",\n    name: " + fields[2] +",\n    height: " +
    // linesOut += "  {\n    name: " + fields[2] +",\n    height: " +
      fields[3].substr(1, fields[3].length-2) + ",\n    gridRef: {\n      letters: " +
      fields[4] + ",\n      eastings: " + fields[5] + ",\n      northings: " +
      fields[6] + "\n    },\n    latLng: {\n" + "      lat: " +
      fields[7].substr(1, fields[7].length-2) + ",\n      lng: " +
      fields[8].substr(1, fields[8].length-2) + "\n    }\n  },\n";
  }
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n]);\n"
// console.log(linesOut)
fs.writeFileSync("seeds.js", linesOut);