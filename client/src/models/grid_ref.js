"use strict"

const baseGrids = require('./grid_base');

const GridRef = function(options){
  this._letters = options.letters;
  this._eastings = options.eastings;
  this._northings = options.northings;
  
  Object.defineProperty(this, "letters", { get: function(){ return this._letters; } });
  Object.defineProperty(this, "eastings", { get: function(){ return this._eastings; } });
  Object.defineProperty(this, "northings", { get: function(){ return this._northings; }
  });
};

GridRef.prototype.toString = function(){
  return this._letters + this._eastings.substring(0,3) + this._northings.substring(0,3);
};

GridRef.prototype.toCoords = function() {
  for (let i = 0;  i < baseGrids.length; i++) {
    if (this._letters === baseGrids[i].letters) {
      let eastings = baseGrids[i].eastings + this._eastings;
      let northings = baseGrids[i].northings + this._northings;
      return ({ eastings: eastings, northings: northings });
    }
  }
  return( undefined );
}

module.exports = GridRef;
