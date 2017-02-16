const Mountains = require("../models/mountains");
const stubData = require("./stub_data")
const sinon = require("sinon");
const assert = require("assert");
process.env.NODE_ENV = 'test';

describe("Mountains", function(){

  var mountains;

  before(function(){
    mountains = new Mountains();
  })

  it ( 'Fetches mountains from network', function() {
  	// stub out the call to the Internet
  	const stub = sinon.stub(mountains, "_fetchFromNetwork");
  	stub.yields(stubData.munros());
  	mountains.all(function(rxMountains) {
      mountains._fetchFromNetwork.restore();
      assert.strictEqual(rxMountains.length, 5);
      assert.strictEqual(rxMountains[0]._smcId, "M240");
      assert.strictEqual(rxMountains[1]._smcId, "M144");
      assert.strictEqual(rxMountains[2]._smcId, "M251");
      assert.strictEqual(rxMountains[3]._smcId, "M033");
      assert.strictEqual(rxMountains[4]._smcId, "M274");
      assert.strictEqual(stub.callCount, 1);
    });
  })
})