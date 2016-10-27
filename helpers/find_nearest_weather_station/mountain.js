var Mountain = function(options) {
  this._id = options.id;
  this._name = options.name;
  this._height = options.height;
  this._gridRef = options.gridRef;
  this._latLng = options.latLng;
  this._weatherStation = { station: undefined, distance: undefined };
  Object.defineProperty(this, "name", { get: function(){ return this._name; } });
  Object.defineProperty(this, "height", { get: function(){ return this._height; } });
  Object.defineProperty(this, "weatherStation", { get: function(){ return this._weatherStation.station; } });
  Object.defineProperty(this, "wsDistance", {
    get: function(){ return Math.round(this._weatherStation.distance * 10) / 10; }
  });

}

Mountain.prototype.calculateDistanceTo = function( latLng ) {

  // Haversine
  // formula:  a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  // c = 2 ⋅ atan2( √a, √(1−a) )
  // d = R ⋅ c
  // where φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
  // note that angles need to be in radians to pass to trig functions!

  function toRadians(x) {
    return x * Math.PI / 180;
  }

  var R = 6371e3; // metres
  var φ1 = toRadians(this._latLng.lat);
  var φ2 = toRadians(latLng.lat);
  var Δφ = toRadians(latLng.lat-this._latLng.lat);
  var Δλ = toRadians(latLng.lng-this._latLng.lng);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;
}

Mountain.prototype.checkStation = function( weatherStation ) {
  // A weather station is formated like this:
  // {
  //   elevation: "32.0",
  //   id: "324236",
  //   latitude: "53.5452",
  //   longitude: "-2.6361",
  //   name: "Wigan",
  //   region: "nw",
  //   unitaryAuthArea: "Greater Manchester"
  // }

  var distance = this.calculateDistanceTo( {lat: weatherStation.latitude, lng: weatherStation.longitude} );
  if (!this._weatherStation.distance || distance < this._weatherStation.distance) {
    this._weatherStation = { station: weatherStation, distance: distance };
  }
}

module.exports = Mountain;
