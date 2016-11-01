var Login = function(){
  this.loginPopUp();
  this._loginSubmit = document.getElementById('login-submit');

  Object.defineProperty(this, "onLogin", {
    set: function(callback) {
      this._loginSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        loginPopUp.style.display = "none";
        callback(email);
      }.bind(this))
    }
  });
};

Login.prototype = {
 loginPopUp: function() {
   var login = document.getElementById('login');
   login.addEventListener('click', function() {
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
 }
};

module.exports = Login;
