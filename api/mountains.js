var fs = require('fs');

var getMountains = function() {
  var jsonMtns = fs.readFileSync(__dirname + '/mountains.json');
  return JSON.parse(jsonMtns);
}

module.exports = getMountains;
