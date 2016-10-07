var Map = function(container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 8,
    minZoom: 8,
  });
}
Map.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: {lat: coords.lat-0,lng: coords.lng-0},
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    return marker;
  }
}



module.exports = Map;