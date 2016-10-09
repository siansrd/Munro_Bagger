var fs = require('fs');
var linesOut = "use munro_bagger;\ndb.user_mountains.drop();\ndb.user_mountains.insert([\n";
var userId = 1;
for (; userId <= 5; userId++) {
  linesOut += "  {\n    _id: \"" + userId + "\",\n    mountains: [\n"
  var mtnId = 1;
  for(; mtnId <= 282; mtnId++) {
    linesOut += "      {\n        mtn_id: \"" + mtnId + "\",\n        bagged: " + false + "\n      },\n"
  }
  linesOut += "    ]\n  },\n"
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n]);"
fs.writeFileSync("user_mtn_seeds.js", linesOut);