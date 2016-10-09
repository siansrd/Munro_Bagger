var fs = require('fs');
var linesOut = "use munro_bagger;\ndb.users.drop();\ndb.users.insert([\n";
var userId = 0;
var baggedIt;
for (; userId <= 10; userId++) {
  var mtnId = 0;
  linesOut += "  {\n    _id: \"user" + (userId + 1) + "@codeclan.com\",\n    public: {\n" +
    "      mountains: [\n"
  for(; mtnId < 282; mtnId++) {
    baggedIt = ((mtnId % 10) < userId);
    linesOut += "        { mtn_id: \"" + (mtnId + 1) + "\", bagged: " + baggedIt + " },\n"
  }
  linesOut = linesOut.slice(0, -2);
  linesOut += "\n      ]\n    }\n  },\n"
}
linesOut = linesOut.slice(0, -2);
linesOut += "\n]);"
fs.writeFileSync("user_seeds.js", linesOut);