var Pin = require('../views/pin');
var Login = require('../views/login')

var Map = function(container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain'
  });
  this.pins = [];
  this.user = 
}

Map.prototype.addPin = function(mountain) {
  this.pins.push(new Pin(this.googleMap, mountain));
}

module.exports = Map;



// var user = new User(email);
// console.log(user)
// user.getInfo(function(){
//   for (var pin of mainMap.pins) {
//     console.log(pin);
//     // mountain if pin, call has climbed in user; 
//     // set true or false;         
//   }
// })