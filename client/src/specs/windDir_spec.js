var Wind = require("../models/wind");
var assert = require("assert");

describe("Wind", function(){

  it("should be north", function(){
    wind = new Wind({"speed": 5.71,"direction": 11.000});
    assert.strictEqual(wind.windDirection(), "North");
  });

  it("should be north2", function(){
    wind = new Wind({"speed": 5.71,"direction": 11.244});
    assert.strictEqual(wind.windDirection(), "North");
  });

  it("should be north3", function(){
    wind = new Wind({"speed": 5.71,"direction": 348.75});
    assert.strictEqual(wind.windDirection(), "North");
  });


});
