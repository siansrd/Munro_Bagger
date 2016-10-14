var User = require('../models/user');

var UserView = function() {
  this.login = new Login();
  this.user = null;

  this._day0 = document.querySelector('#day0');
  this._day1 = document.querySelector('#day1');
  this._day2 = document.querySelector('#day2');

  Object.defineProperty(this, "onChangeForecast", {
    get: function() { return this._onChangeForecast; },
    set: function(fn) {
      this._onChangeForecast = fn;
      this._day0.addEventListener("click", function(){ this._onChangeForecast(0); });
      this._day1.addEventListener("click", function(){ this._onChangeForecast(1); });
      this._day2.addEventListener("click", function(){ this._onChangeForecast(2); });
    }
  });
  Object.defineProperty(this, "onLogin", {
    get: function() { return this._onLogin; },
    set: function(fn) {
      this._onLogin = fn;
      this.login.onLogin = function(email) {
        this.user = new User(email);
        this.user.getInfo(function(){
          this._onLogin();
        }.bind(this))
      }
    }
  });
}

UserView.prototype.onLogin = function(callback) {

}

UserView.prototype.onChangeForecast = function(callback) {

}

module.exports = UserView;