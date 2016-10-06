var express = require('express');
var app = express();
var MountainApi = require('./api/mountain_api');

app.use(express.static('client/build'));

app.listen(3000, function () {
  new MountainApi(app);
  console.log('App running on port', this.address().port);
});