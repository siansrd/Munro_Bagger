var UI = require('./views/UI');
var Login = require('./views/login');

var app = function(){
  var ui = new UI();
  var login = new Login();
}

window.onload = app;