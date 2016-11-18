const React = require('react');
const LoginLink = require('./login_link');
const AboutLink = require('./about_link');

const Menu = React.createClass({

  render: function(){

    return (
      <div id="menu">
        <LoginLink 
          user={this.props.userLoggedIn}
          loginLinkClicked={this.props.loginLinkClicked}
          logoutLinkClicked={this.props.logoutLinkClicked}/>
        <AboutLink
          aboutLinkClicked={this.props.aboutLinkClicked}/>
      </div>
    )
  }
});

module.exports = Menu;