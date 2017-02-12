const Forecast = require("../models/forecast");
const assert = require("assert");

describe("Forecast", function(){

	var forecast;

	before(function() {
		forecast = new Forecast({
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
			$: "2017-02-06Z"
  	});
	})

  it ( 'Creates wind', function() {
    assert.deepStrictEqual(forecast.wind, { direction: "ESE", speed: "13", gusting: "27" });
  })

  it ( 'Creates humidity', function() {
	  assert.strictEqual(forecast.humidity, "100");
  })

  it ( 'Creates pofp', function() {	
	  assert.strictEqual(forecast.pofp, "87");
  })

  it ( 'Creates temperature', function() {
	  assert.deepStrictEqual(forecast.temperature, { max: "-1", feelsLike: "-7" });
  })

  it ( 'Creates weather code', function() {
  	assert.strictEqual(forecast.code, 24);
  })

  it ( 'Creates weather description', function() {
	  assert.strictEqual(forecast.description, "Light snow");
  })

  it ( 'Creates visibility', function() {
	  assert.strictEqual(forecast.visibility, "Under 1km");
  })

  it ( 'Creates UV index', function() {
	  assert.deepStrictEqual(forecast.UVIndex, { index: 1, text: "Low exposure. No protection required. You can safely stay outside."});
  })

  it ( 'Creates date', function() {
	  assert.strictEqual(forecast.date, "2017-02-06Z");
  })

  it ( 'Handles weather code of "NA"', function() {
  	forecast = new Forecast({
  		D: "ESE",
			Gn: "27",
			Hn: "100",
			PPd: "87",
			S: "13",
			V: "VP",
			Dm: "-1",
			FDm: "-7",
			W: "NA",
			U: "1",
			$: "2017-02-06Z"
  	});

    assert.deepStrictEqual(forecast.wind, { direction: "ESE", speed: "13", gusting: "27" });
	  assert.strictEqual(forecast.humidity, "100");
	  assert.strictEqual(forecast.pofp, "87");
	  assert.deepStrictEqual(forecast.temperature, { max: "-1", feelsLike: "-7" });
	  assert.strictEqual(forecast.code, -1);
	  assert.strictEqual(forecast.description, "Not available");
	  assert.strictEqual(forecast.visibility, "Under 1km");
	  assert.deepStrictEqual(forecast.UVIndex, { index: 1, text: "Low exposure. No protection required. You can safely stay outside."});
	 	assert.strictEqual(forecast.date, "2017-02-06Z");
  })

  it ( 'Handles empty forecast', function() {
  	forecast = new Forecast({});

    assert.deepStrictEqual(forecast.wind, { direction: undefined, speed: undefined, gusting: undefined });
	  assert.strictEqual(forecast.humidity, undefined);
	  assert.strictEqual(forecast.pofp, undefined);
	  assert.deepStrictEqual(forecast.temperature, { max: undefined, feelsLike: undefined });
	  assert.strictEqual(forecast.code, -1);
	  assert.strictEqual(forecast.description, "Not available");
	  assert.strictEqual(forecast.visibility, undefined);
	  assert.deepStrictEqual(forecast.UVIndex, { index: -1, text: "Not available"});
	 	assert.strictEqual(forecast.date, undefined);
  })
})
