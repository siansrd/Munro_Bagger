const Mountain = require("../models/mountain");
const MountainView = require("../views/mountain_view");
const UserMountain = require("../models/user_mountain");
const sinon = require("sinon");
const assert = require("assert");

describe("Mountain", function(){

	var mountain;
  var mountainView;

  before(function() {
    mountain = new Mountain({
			id: 8,
			smcId: "M240",
			name: "A' Bhuidheanach Bheag",
			height: 936,
			gridRef: {
				letters: "NN",
				eastings: "66069",
				northings: "77600"
			},
			latLng: {
				lat: 56.870399,
				lng: -4.198839
			},
			region: "Loch Ericht to Drumochter",
			meaning: "The little yellow place",
			weatherId: "350001",
			forecast: {
				data: {
					dataDate: "2017-02-05T17:00:00Z",
					days: [
						{ D: "ESE", Gn: "27", Hn: "100", PPd: "87", S: "13", V: "VP", Dm: "-1", FDm: "-7", W: "24", U: "1", $: "Day" },
						{ D: "SE", Gn: "51", Hn: "97", PPd: "61", S: "40", V: "VP", Dm: "-3", FDm: "-13", W: "6", U: "1", $: "Day" },
						{ D: "SSE", Gn: "11", Hn: "97", PPd: "58", S: "9", V: "MO", Dm: "-2", FDm: "-6", W: "24", U: "1", $: "Day" }
					]
				},
				updated_at: "2017-02-05T18:15:52.713Z"
			}
    });
    mountainView = new MountainView(mountain);
  })

  it ( 'Contains mountain', function() {
    assert.strictEqual(mountainView.detail, mountain);
  });

  it ( 'Has id', function() {
	  assert.strictEqual(mountainView.id, 8);
  });

  it ( 'Has name', function() {
	  assert.strictEqual(mountainView.name, "A' Bhuidheanach Bheag");
  });

  it ( 'Has no pin', function() {
	  assert.strictEqual(mountainView.pin, null);
  });

  it ( 'Is not bagged', function() {
	  assert.strictEqual(mountainView.bagged, false);
  });

  it ( 'Has no bagged date', function() {
	  assert.strictEqual(mountainView.climbedOn, null);
  });

  it ( 'Has no status', function() {
	  assert.strictEqual(mountainView._status, null);
  });

  it ( 'Has no _createStatus() function', function() {
	  assert.strictEqual(mountainView._createStatus, null);
  });

  it ( 'Has no _saveStatus() function', function() {
	  assert.strictEqual(mountainView._saveStatus, null);
  });

  it ( 'Has no backup', function() {
	  assert.strictEqual(mountainView._backup, null);
  });

  describe( 'createStatus', function() {
  	var fn;

  	before(function() {
  		fn = function(id) {
  			return new UserMountain({ munro_id: id });
  		};
  		mountainView.createStatus = fn;
  	});

  	it ( 'Saves the createStatus function', function() {
  		assert.strictEqual(mountainView._createStatus, fn);
  	});

  	it ( 'Calls the createStatus function when climedOn set', function() {
  		mountainView.climbedOn = "2000-01-01";
  		assert.notStrictEqual(mountainView._status, null);
  		assert.strictEqual(mountainView._status.id, 8);
  		assert.strictEqual(mountainView.climbedOn, "2000-01-01");
  		assert.strictEqual(mountainView.bagged, false);
  	});

  	it ( 'Calls the createStatus function when bagged set', function() {
  		mountainView._status = null;
  		mountainView.bagged = true;
  		assert.notStrictEqual(mountainView._status, null);
  		assert.strictEqual(mountainView._status.id, 8);
  		assert.strictEqual(mountainView.bagged, true);
      assert.strictEqual(mountainView.climbedOn, undefined);
  	});

  });

  describe( 'saveStatus', function() {
  	const stub_return = { content: null };
  	var fn;

  	before (function() {
			fn = sinon.stub();
  	});

  	it ( 'Saves saveStatus function', function() {
  		mountainView.saveStatus = fn;
      assert.strictEqual(fn.callCount, 0);
  		assert.strictEqual(mountainView._saveStatus, fn);
  	});

  	it ( 'Calls external function to save data', function() {
      mountainView.save();
      assert.strictEqual(fn.callCount, 1);
  	});

  });

  describe( 'Backup and Restore', function() {

  	before( function() {
  		mountainView._status = null;
  	});

  	it ( 'Creates status prior to backup', function() {
  		mountainView.backup();
  		assert.notStrictEqual(mountainView._status, null);
  		assert.strictEqual(mountainView._status.id, 8);
  		assert.strictEqual(mountainView.bagged, false);
      assert.strictEqual(mountainView.climbedOn, undefined);
  	});

  	it ( 'Restores bagged and climbedOn', function() {
  		mountainView.bagged = true;
  		mountainView.climbedOn = "2000-01-01";
  		mountainView.restore();
  		assert.strictEqual(mountainView._status.id, 8);
  		assert.strictEqual(mountainView.bagged, false);
      assert.strictEqual(mountainView.climbedOn, undefined);
  	});

  });
});