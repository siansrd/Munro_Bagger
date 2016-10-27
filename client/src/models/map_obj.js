var MapObject = function(container) {

  this.map = new google.maps.Map(container, {
    center: new google.maps.LatLng(57.450861,-1.604004),
    zoom: 7,
    minZoom: 7,
    mapTypeId: 'terrain',
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    }
  });
  const ne = new google.maps.LatLng(59.073548704841784, 2.1691826171875164);
  const sw = new google.maps.LatLng(55.59337026438907, -7.853101562500001);
  this.bounds = new google.maps.LatLngBounds(sw, ne);
  this.map.fitBounds(this.bounds);

  this.prevInfoWindow = null;
  
}

MapObject.prototype.addMarker = function(latlng) {
  const marker =  new google.maps.Marker({
    position: latlng,
    map: this.map
  }); 
  
  const infoWindow = new google.maps.InfoWindow({
      content: "Mountain Name"
  });
  
  google.maps.event.addListener(marker, 'click', function(){
    if( this.prevInfoWindow ) {
       this.prevInfoWindow.close();
    }
    this.prevInfoWindow = infoWindow;
    infoWindow.open(this.map, marker);
  }.bind(this));
};








module.exports = MapObject;