var Map = require('../models/map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');


var Login = function(){
  this.render();
}

Login.prototype = {
  login: function() {
    var login = document.getElementById('login');
    login.addEventListener('click', function() {
      console.log("login clicked");
    });
  },
  render: function() {
    this.login();
  }
};

module.exports = Login;
