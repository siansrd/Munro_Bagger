function Pin (map, mountain) {
  this.map = map;
  this.coords = mountain.latLng;
  this.mountName = "Name";
  this.mountHeight = "Height";

  this.marker = new google.maps.Marker({
    position: mountain.latLng,
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
