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

MapObject.prototype.generateIcon = function(){
  var base = "/public/images/mntn-";
  var fileName = base;
  return fileName += "not-sunny.png";
};

MapObject.prototype.addMarker = function(mountain, callback) {

  const marker =  new google.maps.Marker({
    position: mountain.latLng,
    map: this.map,
      icon: { url: this.generateIcon(),
        scaledSize: new google.maps.Size(15, 15) }
  }); 
  
  const infoWindow = new google.maps.InfoWindow({
      content: mountain.name
  });
  
  google.maps.event.addListener(marker, 'click', function(){
    callback(mountain.id);

    if( this.prevInfoWindow ) {
       this.prevInfoWindow.close();
    }
    this.prevInfoWindow = infoWindow;
    infoWindow.open(this.map, marker);
  }.bind(this));
};



module.exports = MapObject;