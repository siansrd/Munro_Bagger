var express = require('express');
var app = express();
var MountainApi = require('./api/mountain_api');
var UserApi = require('./api/user_api')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('client/build'));

app.listen(3000, function () {
  new MountainApi(app);
  new UserApi(app);
  console.log('App running on port', this.address().port);
});