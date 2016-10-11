var UI = require('./views/map_view');
var Login = require('./views/login');
var List = require('./views/list');

var app = function(){
  var ui = new UI();
  var login = new Login(ui);
  var list = new List();
}

window.onload = app;