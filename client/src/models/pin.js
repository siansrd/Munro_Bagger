function Pin (map, coords) {
  this.map = map;
  this.coords = coords;
  this.mountName = "Name";
  this.mountHeight = "Height";

  this.marker = new google.maps.Marker({
    position: {lat: coords.lat-0,lng: coords.lng-0},
    map: map
  });

  this.marker.addListener('click', function() {
    this.openPopUp();
  }.bind(this));

}

Pin.prototype = {
  openPopUp: function(){
    var modal = document.getElementById('popUp');
    modal.style.display = "block";
  }
}


module.exports = Pin;
