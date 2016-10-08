function Pin (map, mountain) {
  this.map = map;
  this.coords = mountain.latLng;
  this.mountName = mountain.name;
  this.mountHeight = mountain.height;
  this.mountGridRef = mountain.gridRef;
  this.mountlatLng = mountain.latLng;


  this.marker = new google.maps.Marker({
    position: mountain.latLng,
    map: map
  });

  this.marker.addListener('click', function() {
    this.createPopUp();
    this.openPopUp();
    window.onclick = function(event) {
        if (event.target == popUp) {
            popUp.style.display = "none";
        }
    }; 
  }.bind(this));

}

Pin.prototype = {
  openPopUp: function(){
    var popUp = document.getElementById('popUp');
    popUp.style.display = "block";
  },
  createPopUp: function() {
    var popUpContent = document.getElementById('popUp-content');
    this.removeChildNodes(popUpContent);
    var mountName = document.createElement('p');
    mountName.innerHTML = this.mountName;
    popUpContent.appendChild(mountName);
    var mountHeight = document.createElement('p');
    mountHeight.innerHTML = this.mountHeight;
    popUpContent.appendChild(mountHeight); 
    var gridRef = document.createElement('p');
    gridRef.innerHTML = this.mountGridRef.letters + " " + this.mountGridRef.eastings + " " + this.mountGridRef.northings;
    popUpContent.appendChild(gridRef);
    var latLng = document.createElement('p');
    latLng.innerHTML = this.mountlatLng.lat + " " + this.mountlatLng.lng;
    popUpContent.appendChild(latLng); 
  },
  removeChildNodes: function(parent) {
    while (parent.hasChildNodes()) {   
      parent.removeChild(parent.firstChild);
    }
  }
}


module.exports = Pin;
