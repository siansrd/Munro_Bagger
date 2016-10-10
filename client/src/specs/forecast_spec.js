var Forecasts = require("../models/forecasts");
var ForecastTime = require("../models/Forecast_time");
var assert = require("assert");

describe("Forecasts", function(){

  var forecasts;

  before(function(){
    forecasts = new Forecasts();
  })

  it ( 'contains no forecasts', function() {
    assert.strictEqual(forecasts.today, undefined);
    assert.strictEqual(forecasts.tomorrow, undefined);
    assert.strictEqual(forecasts.dayAfter, undefined);
  })

  it ( 'receives forecast data', function() {
    forecasts.forMountain(1, function() {
      assert.strictNotEqual(forecasts.today, undefined);
      assert.strictNotEqual(forecasts.tomorrow, undefined);
      assert.strictNotEqual(forecasts.dayAfter, undefined);
    });
  })

  it ( 'receives forecast for three differet days', function() {
    var ft = new ForecastTime();
    forecasts.forMountain(1, function() {
      assert.strictEqual(forecasts.tomorrow.timeStamp, ft.midTomorrow());
      assert.strictEqual(forecasts.dayAfter.timeStamp, ft.midDayAfter());
    });
  })
})