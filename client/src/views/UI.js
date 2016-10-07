var Map = require('../models/map');

var UI = function(){

}

UI.prototype = {
  displayMap: function() {
    var mapContainer = document.getElementById('mapContainer')
    new Map(mapContainer);
  }
}

module.exports = UI;



