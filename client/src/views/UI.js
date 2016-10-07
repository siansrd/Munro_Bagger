var Map = require('../models/map');

var UI = function(){
  this.render();
}

UI.prototype = {
  displayMap: function() {
    var mapContainer = document.getElementById('mapContainer')
    new Map(mapContainer);
  },
  render: function() {
    this.displayMap();
  }
}

module.exports = UI;



