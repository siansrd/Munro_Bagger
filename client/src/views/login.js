var Map = require('../models/map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');


var Login = function(){
  this.render(); 
}

Login.prototype = {
  loginPopUp: function() {
    var login = document.getElementById('login');
    login.addEventListener('click', function() {
      console.log("login clicked");
        this.openPopUp();
    }.bind(this));
  },
  openPopUp: function(){
    var loginPopUp = document.getElementById('loginPopUp');
    loginPopUp.style.display = "block";
  },
  createPopUp: function() {
    var close = document.getElementById("close");
    close.setAttribute('src', '../../client/build/public/images/cross.png'); 
  },
  login: function() {
    var loginSubmit = document.getElementById('login-submit');
    loginSubmit.addEventListener('click', function() {
      var email = document.getElementById('email').value;
    })
  },
  render: function() {
    this.loginPopUp();
    this.login()
  }
};


module.exports = Login;