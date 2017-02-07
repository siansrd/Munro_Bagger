let Forecast = require("../models/forecast");
let assert = require("assert");

describe("Forecast", function(){

  it ( 'Holds all values', function() {
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
			$: "Day"
  	});

    assert.deepStrictEqual(forecast.wind, { direction: "ESE", speed: "13", gusting: "27" });
	  assert.strictEqual(forecast.humidity, "100");
	  assert.strictEqual(forecast.pofp, "87");
	  assert.deepStrictEqual(forecast.temperature, { max: "-1", feelsLike: "-7" });
	  assert.strictEqual(forecast.code, 24);
	  assert.strictEqual(forecast.description, "Light snow");
	  assert.strictEqual(forecast.visibility, "Under 1km");
	  assert.deepStrictEqual(forecast.UVIndex, { index: 1, text: "Low exposure. No protection required. You can safely stay outside."});
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
			$: "Day"
  	});

    assert.deepStrictEqual(forecast.wind, { direction: "ESE", speed: "13", gusting: "27" });
	  assert.strictEqual(forecast.humidity, "100");
	  assert.strictEqual(forecast.pofp, "87");
	  assert.deepStrictEqual(forecast.temperature, { max: "-1", feelsLike: "-7" });
	  assert.strictEqual(forecast.code, -1);
	  assert.strictEqual(forecast.description, "Not available");
	  assert.strictEqual(forecast.visibility, "Under 1km");
	  assert.deepStrictEqual(forecast.UVIndex, { index: 1, text: "Low exposure. No protection required. You can safely stay outside."});
  })
})
