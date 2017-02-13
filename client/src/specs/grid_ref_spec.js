const GridRef = require("../models/grid_ref");
const assert = require("assert");

describe("GridRef", function(){

  var gridRef;

  before(function(){
    gridRef = new GridRef({
      letters: "NN",
      eastings: "66069",
      northings: "77600"
    });
  })

  it ( 'Holds letters, eastings and northings', function() {
    assert.strictEqual(gridRef.letters, "NN");
    assert.strictEqual(gridRef.eastings, "66069");
    assert.strictEqual(gridRef.northings, "77600");
  })

  it ( 'Supports toString()', function() {
    assert.strictEqual(gridRef.toString(), "NN660776");
  })

  it ( 'Supports toCoords()', function() {
    assert.deepStrictEqual(gridRef.toCoords(), { eastings: "266069", northings: "777600" });
  })
})