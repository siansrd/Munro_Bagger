"use strict"

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const logger = require('../utility').logger;
const fs = require('fs');

const makeGetRequest = function(url, callback) {
  const request = new XMLHttpRequest()
  request.open("GET", url);
  // request.withCredentials = true;
  request.onload = function() {
    let content = (this.status === 200) ? JSON.parse(this.responseText) : null;
    callback(this.status, content);
  };
  request.send();
}

const getForecast = function(locationId, onCompleted) {
  const apiKey = process.env.MET_OFFICE_API;
  // http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/xml/3840?res=3hourly&key=01234567-89ab-cdef-0123-456789abcdef
  const url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/" + locationId + "?res=daily&key=" + apiKey;
  makeGetRequest(url, function(status, forecast) {
    forecast = (status === 200) ? forecast : null;
    onCompleted(forecast)
  })
};

const trackForecasts = function(locationId) {
  let lastDataDate = "";

  const closure = function() {
    setTimeout(closure, 5 * 60 * 1000);
    getForecast(locationId, function(forecast) {
      if (forecast) {
        let dataDate = forecast.SiteRep.DV.dataDate;
        if (dataDate !== lastDataDate) {
          logger("Forecast dataDate:", forecast.SiteRep.DV.dataDate);
          lastDataDate = dataDate;
        }
      }
      else
        logger("Could not retrieve forecast");
    })
  };

  closure();
};

makeGetRequest("http://www.munrobagger.scot/munros", function(status, rxMountains){
  if (status === 200)
    trackForecasts(rxMountains[0].weatherId);
  else
    logger("Could not retrieve Munros.");
});