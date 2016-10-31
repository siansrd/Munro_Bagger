const React = require('react');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');
const UserLogin = require('./user_login');
const UserSignUp = require('./user_signup');
const UserNewPassword = require('./user_new_password');

const InfoBox = React.createClass({

 render: function() {

  if (!this.props.focusMount) return (
    <div id="infoBox">
      <Welcome/>
    </div>
  )

  return (
    <div id="infoBox">
      <MountainDetail focusMount={this.props.focusMount} bagged={this.props.baggedStatusChanged}/>
      <UserLogin/>
      <UserSignUp/>
      <UserNewPassword/>
    </div>
  )
 }

})

module.exports = InfoBox;
