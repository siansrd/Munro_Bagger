function Pin (map, mountain) {
  this.map = map;
  this.coords = mountain.latLng;
  this.mountName = mountain.name;
  this.mountHeight = mountain.height;
  this.mountGridRef = mountain.gridRef;
  this.mountlatLng = mountain.latLng;
  this.mountSunny = true;

  this.marker = new google.maps.Marker({
    position: mountain.latLng,
    map: map,
    icon: { url: this.generateIcon(),
            scaledSize: new google.maps.Size(15, 15)}
  });

  this.marker.addListener('click', function() {
    this.createPopUp();
    this.openPopUp();
    window.onclick = function(event) {
        if (event.target == popUp) {
            popUp.style.display = "none";
        }
    }; 
    var closeBtn = document.querySelector('#close')
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
    var close = document.getElementById("close");
    close.setAttribute('src', '/public/images/cross.png');
    var mountName = document.getElementById('mountName');
    mountName.innerHTML = this.mountName;
    heightText = document.querySelector('#txt_height');
    heightText.innerText = this.mountHeight + " meters above sea level";
    gridText = document.querySelector('#text_grid');
    gridText.innerText = this.mountGridRef.letters + " " + this.mountGridRef.eastings + " " + this.mountGridRef.northings;
    txtLatLng = document.querySelector('#txt_latlng');
    txtLatLng.innerText = this.mountlatLng.lat + ", " + this.mountlatLng.lng;  
  },
  removeChildNodes: function(parent) {
    while (parent.hasChildNodes()) {   
      parent.removeChild(parent.firstChild);
    }
  },
  generateIcon: function(){
    var base = "/public/images/";
    var sunny = "mntn-sunny.png";
    var notSunny = "mntn-not-sunny.png";
    var sunnyBagged = "mntn-bagged-sunny.png";
    var sunnyNotBagged = "mntn-not-bagged-sunny.png";
    var bagged = "mntn-bagged.png";
    var notBagged = "mntn-not-bagged.png";
    if (this.mountSunny) {
      return base + sunny
    } else {
      return base + notSunny
    }
  }
}


module.exports = Pin;
