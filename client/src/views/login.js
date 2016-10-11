var Map = require('../models/map');
var Mountains = require('../models/mountains');
var Pin = require('./pin');
var User = require('../models/user')

var Login = function(ui){
  this.ui = ui;
  this.render();
};

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
  loginSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var user = new User(email);
    user.getInfo(function(){
      this.ui.pinNotifier(function(pin) {
        pin.userLoggedIn(user);
      })
    }.bind(this))
   }.bind(this))
 },
 render: function() {
   this.loginPopUp();
   this.login()
 }
};

module.exports = Login;
