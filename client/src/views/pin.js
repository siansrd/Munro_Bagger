var Forecasts = require('../models/forecasts');
var upCase = require("../models/upCase");

function Pin (map, mtnView) {
  this.mtnView = mtnView;
  var mountain = mtnView.mountain;
  this.mountain = mountain;
  this.map = map;
  this.coords = mountain.latLng;
  this.mountId = mountain.id;
  this.mountName = mountain.name;
  this.mountHeight = mountain.height;
  this.mountGridRef = mountain.gridRef;
  this.mountlatLng = mountain.latLng;
  this.dayNum = 0;
  this.loggedIn = false;
  this.mountBagged = false;
  // this.mountSunny = false;
  this.forecasts = mtnView.mountain.forecasts;
  this.mountSunny = (this.forecasts.day[0].code === 1)
  this.createMarker();
};

Pin.prototype = {
  changeForecast: function(dayNum) {
    if (this.forecasts.day[this.dayNum].id !== this.forecasts.day[dayNum].id) {
      this.mountSunny = (this.forecasts.day[dayNum].code === 1);
      this.marker.setMap(null);
      this.createMarker();
    }
    this.dayNum = dayNum;
  },

  userLoggedIn: function() {
    this.loggedIn = true;
    this.mountBagged = this.mtnView.bagged;
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

    var heightText = document.querySelector('#txt_height');
    heightText.innerText = this.mountHeight + "m";

    var gridText = document.querySelector('#text_grid');
    gridText.innerText = this.mountGridRef.letters + " " + this.mountGridRef.eastings + " " + this.mountGridRef.northings;

    var txtLatLng = document.querySelector('#txt_latlng');
    txtLatLng.innerText = this.mountlatLng.lat + ", " + this.mountlatLng.lng;

    var txtWeather = document.querySelector('#weather');
    var desc = this.forecasts.day[this.dayNum].description;
    txtWeather.innerText = upCase(desc);

    var textTemp = document.querySelector('#temperature');
    var temp = this.forecasts.day[this.dayNum].temperature;
    textTemp.innerText = Math.round(temp) + "°C";

    var txtWind = document.querySelector("#wind");
    txtWind.innerText = this.forecasts.day[this.dayNum].wind.speed + "m/s " + this.forecasts.day[this.dayNum].wind.compassBearing();

    var bagged = document.querySelector("#bagged");
    bagged.disabled = true;
    if(this.loggedIn) bagged.disabled = false;
    bagged.checked = false;
    if(this.mountBagged) bagged.checked = true;
    bagged.onclick = function(){
      this.mountBagged = bagged.checked;
      this.mtnView.bagged = this.mountBagged;
      this.marker.setMap(null);
      this.createMarker();
    }.bind(this)
  },

  removeChildNodes: function(parent) {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  },

  generateIcon: function(){
    var base = "/public/images/";
    var fileName = base + "mntn-";
    if (this.loggedIn) {
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
