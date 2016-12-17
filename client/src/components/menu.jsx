const React = require('react');
const LoginLink = require('./login_link');
const AboutLink = require('./about_link');

const Menu = React.createClass({

  render: function(){

    return (
      <div id="menu">
        <AboutLink
          aboutLinkClicked={this.props.aboutLinkClicked}/>
        <LoginLink 
          user={this.props.user}
          loginLinkClicked={this.props.loginLinkClicked}
          logoutLinkClicked={this.props.logoutLinkClicked}/>
      </div>
    )
  }
});

module.exports = Menu;