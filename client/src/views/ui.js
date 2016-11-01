var Map = require('./map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');
var renderList = require('./list/render_list.jsx');
var UserView = require('./user_view');
var MountainsView = require('./mountains_view');

var UI = function(){
  // Initialise the map and the list of mountains
  var mapContainer = document.getElementById('mapContainer');
  this.map = new Map(this, mapContainer);
  this.mtnsView = new MountainsView();
  this.mtnsView.all(function(mtns){
    this.map.addPins();
    // this.mtnList = new List(this);
    renderList(this.mtnsView.mountains, function(mtnId) {
      var pin = this.mtnsView.getPinById(mtnId);
      this.map.zoomToPin(pin);
    }.bind(this));

    this.userView = new UserView();
    this.userView.onChangeForecast = this.map.changeForecast.bind(this.map);
    this.userView.onLogin = function(user) {
      this.mtnsView.userLogin(user);
      this.map.userLogin();
      // this.mtnList.userLogin();
    }.bind(this);
  }.bind(this));

};

UI.prototype.getMountainsView = function() {
  return this.mtnsView;
}

UI.prototype.getMap = function() {
  return this.map;
}

UI.prototype.getList = function() {
  return this.mtnList;
}

module.exports = UI;
