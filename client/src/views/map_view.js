var Map = require('../models/map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');
var User = require('../models/user')

var mainMap;

var UI = function(){
  this.render();
  this.mainMap = mainMap;
};

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
  pinNotifier: function(callback){
    for (var pin of mainMap.pins) {
      callback(pin)
    }
  },
  onclickListenersForcast: function() {
    var day0 = document.querySelector('#day0');
    day0.addEventListener("click", function(){
      this.pinNotifier(function(pin){
        pin.changeForecast(0);
      })
    }.bind(this));

    var day1 = document.querySelector('#day1');
    day1.addEventListener("click", function(){
      this.pinNotifier(function(pin){
        pin.changeForecast(1);
      })
    }.bind(this));

    var day2 = document.querySelector('#day2');
    day2.addEventListener("click", function(){
      this.pinNotifier(function(pin){
        pin.changeForecast(2);
      })
    }.bind(this));
  },
  render: function() {
    this.displayMap();
    var newMount = new Mountains();
    newMount.all(function(mtns){
      this.addMarkers(mtns);
    }.bind(this));
    this.onclickListenersForcast();
  }
};


module.exports = UI;
