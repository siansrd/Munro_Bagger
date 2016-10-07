var Map = require('../models/map');
var Mountains = require('../models/mountains');

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
      console.log(myMountains[i].latLng);
      mainMap.addMarker(myMountains[i].latLng);

    };
  },
  render: function() {
    this.displayMap();
    var newMount = new Mountains();
    newMount.all(function(mtns){
      //this.myMountains = mtns;   
      this.addMarkers(mtns);
      // console.log(myMountains)
    }.bind(this));   
  }
};







module.exports = UI;



