"use strict"

const Regions = require("../views/regions");
const MountainView = require("../views/mountain_view");
const Mountain = require("../models/mountain");
const assert = require("assert");
const munros = require("./stub_data").munros();

describe("Regions", function(){

	let mountains = [];
	var regions;

	before(function() {
		for (let i = 0; i < munros.length; i++) {
			mountains.push(new MountainView(new Mountain(munros[i])));
		}
		regions = new Regions(mountains);
	})

	it ('Creates regions', function() {
		assert.strictEqual(regions.length, 4);
	})

	it ('Correctly orders regions', function() {
		assert.deepStrictEqual(regions._regionNames, ["Glen Shiel to Loch Mullardoch", "Loch Ericht to Drumochter", "Loch Maree to Loch Broom", "Speyside to Great Glen"]);
		assert.strictEqual(regions._regionNames, regions.names);

	})

	it ('Correctly groups mountains', function() {
		assert.deepStrictEqual(regions._regions["Glen Shiel to Loch Mullardoch"].length, 2);
		assert.deepStrictEqual(regions._regions["Glen Shiel to Loch Mullardoch"], [mountains[3], mountains[4]]);
	})

	it ('Retrieves correct region names by index', function() {
		assert.strictEqual(regions.nameByIndex(0), "Glen Shiel to Loch Mullardoch");
		assert.strictEqual(regions.nameByIndex(1), "Loch Ericht to Drumochter");
		assert.strictEqual(regions.nameByIndex(2), "Loch Maree to Loch Broom");
		assert.strictEqual(regions.nameByIndex(3), "Speyside to Great Glen");
	})

	it ('Retrieves correct mountains by index', function() {
		assert.deepStrictEqual(regions.mountainsByIndex(0), [mountains[3], mountains[4]]);
		assert.deepStrictEqual(regions.mountainsByIndex(1), [mountains[0]]);	
		assert.deepStrictEqual(regions.mountainsByIndex(2), [mountains[1]]);	
		assert.deepStrictEqual(regions.mountainsByIndex(3), [mountains[2]]);		
	})

	it ('Retrieves correct mountains by name', function() {
		assert.deepStrictEqual(regions.mountainsByName("Glen Shiel to Loch Mullardoch"), [mountains[3], mountains[4]]);
		assert.deepStrictEqual(regions.mountainsByName("Loch Ericht to Drumochter"), [mountains[0]]);	
		assert.deepStrictEqual(regions.mountainsByName("Loch Maree to Loch Broom"), [mountains[1]]);	
		assert.deepStrictEqual(regions.mountainsByName("Speyside to Great Glen"), [mountains[2]]);		
	})
});