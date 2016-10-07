var Map = require('../models/map');
var Mountains = require('../models/mountains');
var Pin = require('../models/pin');

var mainMap;


var UI = function(){
  this.render(); 
}

UI.prototype = {
  displayMap: function() {
    var mapContainer = document.getElementById('mapContainer')
    mainMap = new Map(mapContainer);
  },
  addMarkers: function(myMountains){
    for (var i = 0;  i < myMountains.length; i++){
      mainMap.addPin(myMountains[i].latLng);
    };
  },
  render: function() {
    this.displayMap();
    var newMount = new Mountains();
    newMount.all(function(mtns){  
      this.addMarkers(mtns);
    }.bind(this));   
  }
};







module.exports = UI;



