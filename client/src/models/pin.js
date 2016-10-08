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
    var closeBtn = document.querySelector('.close')
    closeBtn.onclick= function() {
      popUp.style.display = "none";
    }
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
    var close = document.createElement("img");
    close.setAttribute('src', 'https://cdn0.iconfinder.com/data/icons/octicons/1024/x-128.png');
    close.className = "close";
    popUpContent.appendChild(close);
    var mountName = document.createElement('h2');
    mountName.innerHTML = this.mountName;
    popUpContent.appendChild(mountName);
    var mountHeight = document.createElement('p');
    mountHeight.innerHTML = this.mountHeight + " meters above sea level";
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
