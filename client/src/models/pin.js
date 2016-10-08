function Pin (map, mountain) {
  this.map = map;
  this.coords = mountain.latLng;
  this.mountName = mountain.name;
  this.mountHeight = mountain.height;

  this.marker = new google.maps.Marker({
    position: mountain.latLng,
    map: map
  });

  this.marker.addListener('click', function() {
    this.createPopUp();
    this.openPopUp();
  }.bind(this));

}

Pin.prototype = {
  openPopUp: function(){
    var popUp = document.getElementById('popUp');
    popUp.style.display = "block";
  },
  createPopUp: function() {
    var popUpContent = document.getElementById('popUp-content');
    var mountName = document.createElement('p');
    mountName.innerHTML = this.mountName;
    popUpContent.appendChild(mountName);
    var mountHeight = document.createElement('p');
    mountHeight.innerHTML = this.mountHeight;
    popUpContent.appendChild(mountHeight); 

  }
}


module.exports = Pin;
