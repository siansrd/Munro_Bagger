var baseGrids = require('./grid_base')

var GridRef = function(options){
  this._letters = options.letters;
  this._eastings = options.eastings;
  this._northings = options.northings;

  Object.defineProperty(this, "letters", {
    get: function(){
      return this._letters;
    }
  });
  Object.defineProperty(this, "eastings", {
    get: function(){
      return this._eastings;
    }
  });
  Object.defineProperty(this, "northings", {
    get: function(){
      return this._northings;
    }
  });
};

GridRef.prototype.toString = function(){
  return this._letters + this._eastings.substring(0,3) + this._northings.substring(0,3);
};

GridRef.protoype.toCoords = function() {
  for(var baseGrid of baseGrids) {
    if (this._letters === baseGrid.letters) {
      var eastings = baseGrid.eastings + this._eastings;
      var northings = baseGrid.northings + this._northings;
      return ({ eastings: eastings, northings: northings });
    }
  }
  return( undefined );
}

module.exports = GridRef;
