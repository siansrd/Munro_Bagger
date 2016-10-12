var Wind = require("../models/wind");
var assert = require("assert");

describe("Wind", function(){

  it("should be north", function(){
    wind = new Wind({"speed": 5.71,"direction": 11.000});
    assert.strictEqual(wind.compassBearing(), "North");
  });

  it("should be n(top value)", function(){
    wind = new Wind({"speed": 5.71,"direction": 11.249});
    assert.strictEqual(wind.compassBearing(), "North");
  });

  it("should be n(bottom value)", function(){
    wind = new Wind({"speed": 5.71,"direction": 348.750});
    assert.strictEqual(wind.compassBearing(), "North");
  });

  it("should be ssw", function(){
    wind = new Wind({"speed": 5.71,"direction": 195.75});
    assert.strictEqual(wind.compassBearing(), "South South-West");
  });

  it("should be ene", function(){
    wind = new Wind({"speed": 5.71,"direction": 59.75});
    assert.strictEqual(wind.compassBearing(), "East North-East");
  });
});
