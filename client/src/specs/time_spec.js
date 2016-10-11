var ForecastTime = require("../models/forecast_time");
var assert = require("assert");

describe("Time", function(){
  var time;

  before(function() {
    // 2016-10-09 @ 21:00:00
    time = new ForecastTime(1476046800);
  })

  it ( 'returns what it was given', function() {
    assert.strictEqual(time.getTime(), 1476046800);
  })

  it ( 'calculates midday tomorrow', function() {
    // 2016-10-10 @ 12:00:00
    assert.strictEqual(time.midTomorrow(), 1476100800);
  })

  it ( 'calculates midday, the day after tomorrow', function() {
    // 2016-10-11 @ 12:00:00
    assert.strictEqual(time.midDayAfter(), 1476187200);
  })

});