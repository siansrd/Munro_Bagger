const Mountain = require("../models/mountain");
const assert = require("assert");

describe("Mountain", function(){

  var mountain;

  before(function() {
    mountain = new Mountain({
			id: 1,
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
  })

  it ( 'Contains id', function() {
    assert.strictEqual(mountain.id, 1);
  });

  it ( 'Contains name', function() {
	  assert.strictEqual(mountain.name, "A' Bhuidheanach Bheag");
  });

  it ( 'Contains height', function() {
	  assert.strictEqual(mountain.height, 936);
  });

  it ( 'Contains gtidRef', function() {
	  assert.strictEqual(mountain.gridRef.toString(), "NN660776");
  });

  it ( 'Contains latLng', function() {
	  assert.deepStrictEqual(mountain.latLng, { lat: 56.870399, lng: -4.198839 });
  });

  it ( 'Contains meaning', function() {
	  assert.strictEqual(mountain.meaning, "The little yellow place");
  });

  it ( 'Contains region', function() {
	  assert.strictEqual(mountain.region, "Loch Ericht to Drumochter");
  });

  it ( 'Contains forecasts', function() {
	  assert.strictEqual(mountain.forecasts.day.length, 3);
	  assert.deepStrictEqual(mountain.forecasts.day[0].wind, { direction: "ESE", speed: "13", gusting: "27" });
	 	assert.deepStrictEqual(mountain.forecasts.day[1].wind, { direction: "SE", speed: "40", gusting: "51" });
	  assert.deepStrictEqual(mountain.forecasts.day[2].wind, { direction: "SSE", speed: "9", gusting: "11" });
  });

  it ( 'Contains SMC Id', function() {
	  assert.strictEqual(mountain._smcId, "M240");
  });

  it ( 'Contains Weather Id', function() {
	  assert.strictEqual(mountain._weatherId, "350001");
  });
})