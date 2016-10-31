const React = require('react');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');
const UserLogin = require('./user_login');

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
    </div>
  )
 }

})

module.exports = InfoBox;
