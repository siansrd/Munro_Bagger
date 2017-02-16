const Forecasts = require("../models/forecasts");
const assert = require("assert");

describe("Forecasts", function(){

	var forecasts;

  before(function(){
  	forecasts = new Forecasts({
			dataDate: "2017-02-05T17:00:00Z",
			days: [
				{
					D: "ESE",
					Gn: "27",
					Hn: "100",
					PPd: "87",
					S: "13",
					V: "VP",
					Dm: "-1",
					FDm: "-7",
					W: "24",
					U: "1",
					$: "Day"
				},
				{
					D: "SE",
					Gn: "51",
					Hn: "97",
					PPd: "61",
					S: "40",
					V: "VP",
					Dm: "-3",
					FDm: "-13",
					W: "6",
					U: "1",
					$: "Day"
				},
				{
					D: "SSE",
					Gn: "11",
					Hn: "97",
					PPd: "58",
					S: "9",
					V: "MO",
					Dm: "-2",
					FDm: "-6",
					W: "24",
					U: "1",
					$: "Day"
				}
			]
  	});
  });

  it ( 'Creates all forecasts', function() {
	  assert.strictEqual(forecasts.day.length, 3);

  	// Only checking fields that are displayed
  	assert.deepStrictEqual(forecasts.day[0].wind, { direction: "ESE", speed: "13", gusting: "27" });
	  assert.deepStrictEqual(forecasts.day[0].temperature, { max: "-1", feelsLike: "-7" });
	  assert.strictEqual(forecasts.day[0].description, "Light snow");
	  assert.strictEqual(forecasts.day[0].visibility, "Under 1km");

	  assert.deepStrictEqual(forecasts.day[1].wind, { direction: "SE", speed: "40", gusting: "51" });
	  assert.deepStrictEqual(forecasts.day[1].temperature, { max: "-3", feelsLike: "-13" });
	  assert.strictEqual(forecasts.day[1].description, "Fog");
	  assert.strictEqual(forecasts.day[1].visibility, "Under 1km");

	  assert.deepStrictEqual(forecasts.day[2].wind, { direction: "SSE", speed: "9", gusting: "11" });
	  assert.deepStrictEqual(forecasts.day[2].temperature, { max: "-2", feelsLike: "-6" });
	  assert.strictEqual(forecasts.day[2].description, "Light snow");
	  assert.strictEqual(forecasts.day[2].visibility, "4 - 10km");
  });

  it ('Creates dataDate', function() {
  	assert.strictEqual(forecasts.dataDate, "2017-02-05T17:00:00Z");
  });
});
