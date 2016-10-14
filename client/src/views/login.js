var Login = function(){
  this.loginPopUp();
  this.login()

  Object.defineProperty(this, "onLogin", {
    get: function(){ return this._onLogin; },
    set: function(fn){ this._onLogin = fn; }
  });
};

Login.prototype = {
 loginPopUp: function() {
   var login = document.getElementById('login');
   login.addEventListener('click', function() {
     console.log("login clicked");
      this.createPopUp();
      this.openPopUp();

       var loginPopUp = document.getElementById('loginPopUp');
       window.onclick = function(event) {
         if (event.target == loginPopUp) {
             loginPopUp.style.display = "none";
         }
       }; 
       var closeBtn = document.getElementById("login-close");
       closeBtn.onclick= function() {
        console.log("close clicked")
         loginPopUp.style.display = "none";
       }
   }.bind(this));
 },
 openPopUp: function(){
   var loginPopUp = document.getElementById('loginPopUp');
   loginPopUp.style.display = "block";
 },
 createPopUp: function() {
   var closeBtn = document.getElementById("login-close");
   closeBtn.setAttribute('src', '/public/images/cross.png');
 },
 login: function() {
  var loginSubmit = document.getElementById('login-submit');
  loginSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    loginPopUp.style.display = "none";
    this._onLogon(email);
   }.bind(this))
 }
};

module.exports = Login;
