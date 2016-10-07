var UI = require('./views/UI');

var app = function(){
  var ui = new UI();
  ui.displayMap();
}

window.onload = app;