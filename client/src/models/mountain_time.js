var oneMinute = 60 * 1000;
var twentyFourHours = 24 * 60 * oneMinute;

var MountainTime = function(msTime) {
  this._time = (msTime) ? new Date(msTime) : new Date();
}

MountainTime.prototype.milliseconds = function() {
  return this._time.getTime();
}

MountainTime.prototype.minDiff = function(time) {
  return (this._time.getTime() - time) / oneMinute;
}

MountainTime.prototype.middayTomorrow = function() {
  var d = new Date(this._time.getTime() + twentyFourHours);
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  console.log(year, month, day);
  return new Date(year, month, day, 12, 0, 0, 0).getTime();
}

MountainTime.prototype.middayDayAfter = function() {
  var d = new Date(this._time.getTime() + (twentyFourHours * 2));
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  console.log(year, month, day);
  return new Date(year, month, day, 12, 0, 0, 0).getTime();
}

module.exports = MountainTime;