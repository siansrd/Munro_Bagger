var Mountain = require("../models/mountain");
var GridRed = require("../models/grid_ref");
var assert = require("assert");

describe("Mountain", function(){

  var mountain;

  beforeEach(function(){

    mountain = new Mountain({

      _id: "57f6c141fcff223d05f1ebe0",
      name: "A'Bhuidheanach Bheag",
      height: " 936.1",
      gridRef: {
        letters: "NN",
        eastings: "66069",
        northings: "77600"
      },
      latLng: {
        lat: "56.87039900",
        lng: "-4.1988390"
      }

    })

  });

  it("should have id", function(){
    assert.strictEqual(mountain.id, "57f6c141fcff223d05f1ebe0")
  });

  it("should have name", function(){
    assert.strictEqual(mountain.name, "A'Bhuidheanach Bheag")
  });

  it("should have height", function(){
    assert.equal(mountain.height, 936.1)
  });

  it("should have gridref", function(){
    assert.strictEqual(mountain.gridRef.toString(), "NN660776")
  });

  it("should have latlng", function(){
    assert.deepEqual(mountain.latLng, {lat: "56.87039900", lng: "-4.1988390"})
  })



})
