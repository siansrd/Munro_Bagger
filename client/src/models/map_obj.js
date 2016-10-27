var MapObject = function(container) {

  this.map = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain'
  });

}

module.exports = MapObject;