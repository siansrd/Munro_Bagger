// var Mountain = require('../../client/src/models/mountain');
var Mountains = require('../../client/src/models/mountains');
var fs = require('fs');

var generateOutput = function(alphabet) {
  var linesOut = "";
  var strNum;
  var padding;
  var m = 0;
  for (var i = 0; i < alphabet.length; i++) {
    strNum = (i+1).toString();
    padding = " ".repeat(3 - strNum.length);
    linesOut += padding + (i+1) + ". " + alphabet[i].letter +
      " (" + alphabet[i].mountains.length + ")\n";
    for (mountain of alphabet[i].mountains) {
      linesOut += "     - " + mountain.name + " (" + (++m) + ")\n";
    }
  }
  fs.writeFileSync("alphabetic.txt", linesOut);
}


new Mountains().all(function(mountains) {
  var alphabet = [];

  for (var c = 0; c < 26; c++) {
    letter = String.fromCharCode('A'.charCodeAt() + c);
    result = mountains.filter(function(mtn) {
      return mtn.name[0] === letter;
    })
    if (result.length > 0) alphabet.push({ letter: letter, mountains: result});
  }

  generateOutput(alphabet);
});