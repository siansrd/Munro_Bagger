var Map = require('./map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');
//var User = require('../models/user')
var UserView = require('./user_view')
var MountainsView = require('./mountains_view')

var UI = function(){
  // Initialise the map and the list of mountains
  var mapContainer = document.getElementById('mapContainer');
  this.map = new Map(mapContainer);
  var mtnsView = new MountainsView();
  mtnsView.all(function(mtns){
    this.mountains = mtns;
    console.log(mtns);
    this.map.addPins(mtns);
    this.mtnList = new List(mtns);

    this.userView = new UserView();
    this.userView.onChangeForecast = function(dayNum) {
      for (var mtn of this.mountains) {
        mtn.pin.changeForecast(dayNum);
      }
    };
    this.userView.onLogin = function() {
    }
  }.bind(this));

};


UI.prototype = {

  pinNotifier: function(callback){
    for (var pin of this.map.pins) {
      callback(pin)
    }
  }
};

module.exports = UI;
