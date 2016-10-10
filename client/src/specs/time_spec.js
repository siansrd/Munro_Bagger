var MountainTime = require("../models/mountain_time");
var assert = require("assert");

describe("Time", function(){
  var time;

  before(function() {
    // 2016-10-09 @ 21:00:00
    time = new MountainTime(1476046800);
  })

  it ( 'returns what it was given', function() {
    assert.strictEqual(time.milliseconds(), 1476046800);
  })

  it ( 'calculates midday tomorrow', function() {
    // 2016-10-10 @ 12:00:00
    assert.strictEqual(time.middayTomorrow(), 1476100800);
  })

  it ( 'calculates midday, the day after tomorrow', function() {
    // 2016-10-11 @ 12:00:00
    assert.strictEqual(time.middayDayAfter(), 1476187200);
  })

});