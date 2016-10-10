var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var WeatherQuery = function() {
  this.url = 'mongodb://localhost:27017/munro_bagger';
};

MountainQuery.prototype.getCachedForecast = function(weatherStation, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('weathers');
      // how tio get the weather from mongo?
      // By weather station name or by lat/long
      collection.findOne({ "_id": weatherStation.id }, function(err, weather) {
        onQueryFinished(weather);
        db.close();
      })
    }
  });
};

module.exports = WeatherQuery;
