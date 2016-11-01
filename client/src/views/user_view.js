var User = require('../models/user');
var Login = require('./login');

var UserView = function() {
  this._login = new Login();
  this.user = null;

  this._day0 = document.querySelector('#day0');
  this._day1 = document.querySelector('#day1');
  this._day2 = document.querySelector('#day2');

  Object.defineProperty(this, "onChangeForecast", {
    set: function(callback) {
      this._day0.addEventListener("click", function(){ callback(0) });
      this._day1.addEventListener("click", function(){ callback(1) });
      this._day2.addEventListener("click", function(){ callback(2) });
    }
  });
  Object.defineProperty(this, "onLogin", {
    set: function(callback) {
      this._login.onLogin = function(email) {
        this.user = new User(email);
        this.user.getInfo(function(){
          callback(this.user);
        }.bind(this));
      }.bind(this);
    }
  });
}

module.exports = UserView;