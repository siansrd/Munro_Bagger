const React = require('react');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');
const UserLogin = require('./user_login');
const UserSignUp = require('./user_signup');
const UserNewPassword = require('./user_new_password');

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

  if (this.props.infoBox === "signUp" ) return (
    <div id="infoBox">
      <UserSignUp
        loginClicked={this.props.loginClicked}
        userRegistration={this.props.userRegistration}/>
    </div>
  )

  if (this.props.infoBox === "password" ) return (
    <div id="infoBox">
      <UserNewPassword
        loginClicked={this.props.loginClicked}
        signUpClicked={this.props.signUpClicked}/>
    </div>
  )


 }


})

module.exports = InfoBox;
