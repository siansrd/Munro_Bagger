var Forecasts = require('../models/forecasts');
var upCase = require("../models/upCase");

function Pin (map, mountain) {
  this.mountain = mountain;
  this.map = map;
  this.coords = mountain.latLng;
  this.mountId = mountain.id;
  this.mountName = mountain.name;
  this.mountHeight = mountain.height;
  this.mountGridRef = mountain.gridRef;
  this.mountlatLng = mountain.latLng;
  this.dayNum = 0;
  this.user = null;
  this.mountBagged = null;
  // this.mountSunny = false;
  this.forecasts = new Forecasts();
  this.forecasts.forMountain(this.mountId, function() {
    this.mountSunny = (this.forecasts.day[0].id === 800)
    this.createMarker();
  }.bind(this))
};

Pin.prototype = {
  changeForecast: function(dayNum) {
    if (this.forecasts.day[this.dayNum].id !== this.forecasts.day[dayNum].id) {
      this.mountSunny = (this.forecasts.day[dayNum].id === 800);
      this.marker.setMap(null);
      this.createMarker();
    }
    this.dayNum = dayNum;
  },

  userLoggedIn: function(user) {
    this.user = user;
    this.mountBagged = this.user.hasClimbed(this.mountId);
    this.marker.setMap(null);
    this.createMarker();
  },

  createMarker: function(){
    this.marker = new google.maps.Marker({
      position: this.mountain.latLng,
      map: this.map,
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
  },

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
    heightText.innerText = this.mountHeight + "m";

    gridText = document.querySelector('#text_grid');
    gridText.innerText = this.mountGridRef.letters + " " + this.mountGridRef.eastings + " " + this.mountGridRef.northings;

    txtLatLng = document.querySelector('#txt_latlng');
    txtLatLng.innerText = this.mountlatLng.lat + ", " + this.mountlatLng.lng;

    txtWeather = document.querySelector('#weather');
    desc = this.forecasts.day[this.dayNum].description;
    txtWeather.innerText = upCase(desc);

    textTemp = document.querySelector('#temperature');
    textTemp = innerText = this.forecasts.day[this.dayNum].temperature;

    txtWind = document.querySelector("#wind");
    txtWind.innerText = this.forecasts.day[this.dayNum].wind.speed + "m/s " + this.forecasts.day[this.dayNum].wind.compassBearing();
  },

  removeChildNodes: function(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  },

  generateIcon: function(){
    var base = "/public/images/";
    var fileName = base + "mntn-";
    if (this.user) {
      if (!this.mountBagged) fileName += "not-";
      fileName += "bagged";
      if (this.mountSunny) fileName += "-sunny";
    }
    else {
      if (!this.mountSunny) fileName += "not-";
      fileName += "sunny";
    }
    fileName += ".png";
    return fileName;
  }
}

module.exports = Pin;
