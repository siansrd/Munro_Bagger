var Mountains = require("../models/mountains");
var assert = require("assert");

describe("Mountains", function(){

  it( "contains 282 mountains", function(){
    new Mountains().all(function(mtns){
      // test result needs to be checked in the callback
      assert.strictEqual(mtns.length, 282);
    });
  })

  // Don't check the id because it will change as the database evolves
  // it("should have id", function(){
  //   new Mountains().all(function(mtns){
  //     assert.strictEqual(mtns[0].id, "57f6c141fcff223d05f1ebe0");
  //   });
  // });

  it("first mountain should have name", function(){
    new Mountains().all(function(mtns){
      // test result needs to be checked in the callback
      assert.strictEqual(mtns[0].name, "A'Bhuidheanach Bheag");
    });
  });

  it("first mountain should have height", function(){
    new Mountains().all(function(mtns){
      // test result needs to be checked in the callback
      assert.equal(mtns[0].height, 936.1);
    });
  });

  it("first mountain should have gridref", function(){
    new Mountains().all(function(mtns){
      assert.strictEqual(mtns[0].gridRef.toString(), "NN660776");
    });
  });

  it("first mountain should have latlng", function(){
    new Mountains().all(function(mtns){
      assert.deepStrictEqual(mtns[0].latLng, {lat: 56.87039900, lng: -4.1988390});
    });
  });

  it("first mountain should not be bagged", function(){
    new Mountains().all(function(mtns){
      assert.strictEqual(mtns[0].bagged, false);
    });
  });

});

