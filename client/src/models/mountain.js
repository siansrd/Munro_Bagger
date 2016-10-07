var Mountain = function(options){
  this._id = options._id;
  this._name = options.name;
  this._height = options.height;
  this._gridref = new GridRef(options.gridRef);
  this._latLng = options.latLng;
  Object.defineProperty(this, "id", {
    get: function(){
      return this._id
    };
  });
};

// Mountain.prototype.GridRef = function(options){
//
//
// };
