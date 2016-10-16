var fs = require('fs');
var cacheDir = "./cache";
var cacheFile = "/forecasts";

function makeDir(dir, callback) {
  fs.mkdir(dir, 0777, function(err) {
    if (err) {
      if (err.code == 'EEXIST')
        callback(null); // ignore the error if the folder already exists
      else
        callback(err); // something else went wrong
    }
    else
      callback(null); // successfully created folder
  });
}

var findCachedForecast = function(id, forecasts) {
  //if (forecasts.length === 0) return -1;
  for (var i = 0; i < forecasts.length; i++) {
    if (forecasts[i]._id === id) return i;
  }
  return -1;
}

var WeatherStore = function() {
  this._forecasts = [];
  try  {
    fs.statSync(cacheDir + cacheFile).isFile();
    var cache = fs.readFileSync(cacheDir + cacheFile);
    this._forecasts = JSON.parse(cache);
  }
  catch (e) {
  }
  this._changed = false;
  setTimeout(function() {
    this.backup();
  }.bind(this), 60000);
}

WeatherStore.prototype.cacheForecast = function(weatherStation, forecast) {
  var doc = {
    _id: weatherStation.id,
    timeOfRequest: Date.now(),
    forecast: forecast
  };
  var index = findCachedForecast(weatherStation.id, this._forecasts);
  if (index < 0)
    this._forecasts.push(doc);
  else
    this._forecasts[index] = doc;
  this._changed = true;
}

WeatherStore.prototype.getCachedForecast = function(weatherStation) {
  var index = findCachedForecast(weatherStation.id, this._forecasts);
  if (index < 0) return undefined;
  return this._forecasts[index];
}

WeatherStore.prototype.backup = function() {

  console.log(new Date().toTimeString() + ": Starting backup of forecasts cache.")
  if (!this._changed) {
    console.log(new Date().toTimeString() + ": No changes to forecasts cache.")
    setTimeout(function() {
      this.backup();
    }.bind(this), 60000);
    return;
  }

  makeDir(cacheDir, function(error){
    if (error)
      console.log(error);
    else {
      fs.writeFile(cacheDir + cacheFile, JSON.stringify(this._forecasts), function(error) {
        if (error) {
          console.log(error);
        }
        else {
          // backup successful
          this._changed = false;
          console.log(new Date().toTimeString() + ": Forecasts cache saved to ./cache/forecasts");
        }
      }.bind(this)); 
    }
    // reset the timer even if backup failed
    setTimeout(function() {
      this.backup();
    }.bind(this), 60000);
  }.bind(this));

}

module.exports = WeatherStore;