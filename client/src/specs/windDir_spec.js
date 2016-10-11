var Wind = require("../models/wind");
var assert = require("assert");

describe("Wind", function(){

  it("should be north", function(){
    wind = new Wind({"speed": 5.71,"direction": 11.000});
    assert.strictEqual(wind.windDirection(), "North");
  });
});
