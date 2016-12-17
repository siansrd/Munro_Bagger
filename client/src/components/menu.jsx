const React = require('react');
const LoginLink = require('./login_link');
const AboutLink = require('./about_link');

const Menu = function(props){

    return (
      <div id="menu">
        <AboutLink
          aboutLinkClicked={props.aboutLinkClicked}/>
        <LoginLink 
          user={props.user}
          loginLinkClicked={props.loginLinkClicked}
          logoutLinkClicked={props.logoutLinkClicked}/>
      </div>
    )
}


module.exports = Menu;