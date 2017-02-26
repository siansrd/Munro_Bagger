"use strict"

var mountainSearch = function(mountains, mountainId) {
  var mId = Number(mountainId);

  var binarySearch = function(first, last) {
    var mid = first + Math.floor((last - first) / 2);
    var mountain = mountains[mid];
    var numberId = Number(mountain.id);
    if (mId === numberId) return mountains[mid];
    if (first === last) return undefined;
    if (mId < numberId)
      return binarySearch(first, mid - 1);
    else
      return binarySearch(mid + 1, last);
  };

  if (mountains.length === 0) return undefined;
  return binarySearch(0, mountains.length-1);
};

var upCase = function(string){
   var splitString = string.toLowerCase().split(' ');
   for (var i = 0; i < splitString.length; i++) {
       splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
   }
   return splitString.join(' ');
};

var passwordOK = function(password) {
  if (password.length < 8) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/\d+/)) return false;
  return true;
};

const logger = function() {
  if (true) {
    const date = new Date();
    const ms = date.getMilliseconds();
    let padding = "";
    if (ms < 100) {
      padding = (ms < 10) ? "00" : "0";
    }
    const time = date.toTimeString().split(" ")[0] + "." + padding + ms;
    let args = Array.from(arguments);
    console.log.apply(null, [time].concat(args));
  }
};

module.exports = {
  mountainSearch: mountainSearch,
  upCase: upCase,
  passwordOK: passwordOK,
  logger: logger
}