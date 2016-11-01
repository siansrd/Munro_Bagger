var fs = require('fs');

var formatted = function(date) {
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  output = year.toString() + "-";
  if (month < 10) output += "0";
  output += month.toString() + "-";
  if (day < 10) output += "0";
  output += day.toString();
  return output;
}

const msInDay = 1000 * 60 * 60 * 24;
const msIn40Days = msInDay * 40;
let munros = [];
let baseId = 1;
let baseDateString = "2000-01-01";
let date = new Date(baseDateString);
let ms = date.valueOf();
for ( let i = 0; i < 100; i++ ) {
  munros.push({ id: i+1, munro_id: baseId + (i * 2), climbed_on: formatted(date)})
  ms += msIn40Days;
  date = new Date(ms);
}

let lines = "[\n";
for (let munro of munros) {
  lines += "  {\n"
  lines += "    id: " + munro.id + ",\n";
  lines += "    munro_id: " + munro.munro_id + ",\n";
  lines += "    climbed_on: \"" + munro.climbed_on + "\"\n";
  lines += "  },\n";
}
lines.slice(0, -2);
lines += "\n]";
fs.writeFileSync("bagged.js", lines);