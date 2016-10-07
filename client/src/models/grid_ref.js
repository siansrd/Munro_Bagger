var GridRef = fuction(options){
  this._letters = options.letters;
  this._eastings = options.eastings;
  this._northings = options.northings;

  Object.defineProperty(this, "letters", {
    get: function(){
      return this._letters;
    };
  });
  Object.defineProperty(this, "eastings", {
    get: function(){
      return this._eastings;
    };
  });
  Object.defineProperty(this, "northings", {
    get: function(){
      return this._northings;
    };
  });
}
