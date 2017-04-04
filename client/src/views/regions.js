"use strict"

const logger = require('../utility').logger;

const Regions = function(mountains) {
	this._regions = this._createRegions(mountains);

	this._regionNames = Object.keys(this._regions);
	this._regionNames.sort();

  Object.defineProperty(this, "length", { get: function(){ return this._regionNames.length; } });
  Object.defineProperty(this, "names", { get: function(){ return this._regionNames; } });
}

Regions.prototype._createRegions = function(mountains) {
	let regions = {};
 	for (let mountain of mountains) {
		if (!regions[mountain.detail.region]) {
			regions[mountain.detail.region] = [];
		}
		regions[mountain.detail.region].push(mountain);
	}
	return regions;
}

Regions.prototype.mountainsByIndex = function(index) {
	if ((index < 0) || (index >= this._regionNames.length)) return null;
	return this._regions[this._regionNames[index]];
}

Regions.prototype.nameByIndex = function(index) {
	if ((index < 0) || (index >= this._regionNames.length)) return null;
	return this._regionNames[index];
}

Regions.prototype.mountainsByName = function(name) {
	return this._regions[name];
}

module.exports = Regions;
