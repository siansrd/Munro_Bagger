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
      mainMap.addPin(myMountains[i]);
    };
  },
  populateList: function(myMountains){
    for (var i = 0;  i < myMountains.length; i++){
       var munro = document.createElement('li');
       munro.innerHTML = myMountains[i].name;
       document.getElementById('munroList').appendChild(munro); 
    };
  },
  render: function() {
    this.displayMap();
    var newMount = new Mountains();
    newMount.all(function(mtns){  
      this.addMarkers(mtns);
      this.populateList(mtns);
    }.bind(this)); 
  

  }
};







module.exports = UI;



