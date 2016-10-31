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
      <Welcome/>
    </div>
  )

  if (this.props.infoBox === "mountain") return (
    <div id="infoBox">
      <MountainDetail focusMount={this.props.focusMount} bagged={this.props.baggedStatusChanged}/>
    </div>
  )

  if (this.props.infoBox === "login") return (
    <div id="infoBox">
      <UserLogin/>
      <UserLogin/>
      <UserSignUp/>
      <UserNewPassword/>
    </div>
  )


 }


})

module.exports = InfoBox;
