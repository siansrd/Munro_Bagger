var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var WeatherQuery = function() {
  this.url = 'mongodb://localhost:27017/munro_bagger';
}

MountainQuery.prototype.getForecast = function(weatherStation, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('weathers');
      // how tio get the weather from mongo?
      // By weather station name or by lat/long
      collection.findOne({ "_id": id }, function(err, weather) {
        if (!weather /* || weather out of date */ ) {
          // TODO: John's code goes in here

          // get weather from the open weather API
          // if weather existed but was out of date, remove the existing record from mongo
          // store the weather in mongo
          // in mongo the weather must be tagged with the weather station and the date of fetch...
          // think it probably has these by default
        }
        onQueryFinished(weather);
        db.close();
      })
    }
  });
}

module.exports = WeatherQuery;
