const React = require('react');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');
const UserLogin = require('./user_login');
const UserLoginSuccess = require('./user_login_success');
const UserSignUp = require('./user_signup');
const UserNewPassword = require('./user_new_password');
const UserChangePassword = require('./user_change_password');
const UserPasswordResetSuccess = require('./user_pass_reset_success')
const About = require('./about');

const InfoBox = React.createClass({

 render: function() {

  if (!this.props.infoBox) return (
    <div id="infoBox">
      <Welcome signUpClicked={this.props.signUpClicked}/>
    </div>
  )

  if (this.props.infoBox === "mountain") return (
    <div id="infoBox">
      <MountainDetail
        focusMount={this.props.focusMount}
        dayNum={this.props.dayNum}
        bagged={this.props.bagged}
        disabled={this.props.disabled}
        date={this.props.date}
        userLoggedIn={this.props.userLoggedIn} />
    </div>
  )

  if (this.props.infoBox === "login") return (
    <div id="infoBox">
      <UserLogin
        signUpClicked={this.props.signUpClicked}
        forgotPassClicked={this.props.forgotPassClicked}
        user={this.props.user}/>
    </div>
  )

  if (this.props.infoBox === "loginSuccess") return (
    <div id="infoBox">
      <UserLoginSuccess
        changePassClicked={this.props.changePassClicked}/>
    </div>
  )

  if (this.props.infoBox === "signUp" ) return (
    <div id="infoBox">
      <UserSignUp
        userRegistration={this.props.userRegistration}/>
    </div>
  )

  if (this.props.infoBox === "password" ) return (
    <div id="infoBox">
      <UserNewPassword
        loginClicked={this.props.loginClicked}
        signUpClicked={this.props.signUpClicked}
        passwordReset={this.props.passwordReset}/>
    </div>
  )

  if (this.props.infoBox === "passwordReset" ) return (
    <div id="infoBox">
      <UserPasswordResetSuccess/>
    </div>
  )


  if (this.props.infoBox === "changePassword" ) return (
    <div id="infoBox">
      <UserChangePassword
        subitChangePassword={this.props.subitChangePassword}/>
    </div>
  )

  if (this.props.infoBox === "changePasswordSuccess" ) return (
    <div id="infoBox">
      <h4>Your password was changed successfully</h4>
    </div>
  )

  if (this.props.infoBox === "contactUs" ) return (
    <div id="infoBox">
      <About/>
    </div>
  )


 }


})

module.exports = InfoBox;
