var Map = function(container){
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(56.87039900,-4.1988390),
    zoom: 8,
    minZoom: 8,
  });
}
Map.prototype = {
  addMarker: function(coords,name,height){
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var marker = new google.maps.Marker({
      position: {lat: coords.lat-0,lng: coords.lng-0},
      title : <B>"Munro Name: " +name + "\nHeight:-    " + height+<a href="www.google.co.uk">Test url</a>,
      map: this.googleMap,
          label: "A",
          draggable: true,
          raiseOnDrag: true,
          labelContent: "ABCD",
          labelAnchor: new google.maps.Point(15, 65),
          labelClass: "labels", // the CSS class for the label
          labelInBackground: false,
          icon: pinSymbol('red')
      // labels[i % labels.length]
      animation: google.maps.Animation.DROP
    });
    return marker;
  }


}



module.exports = Map;