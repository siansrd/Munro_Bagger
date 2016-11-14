var React = require('react');

const LoginLink = React.createClass({

  onClickLogin: function(){
    this.props.loginLinkClicked();
  },

  onClickLogout: function(){
    this.props.logoutLinkClicked();
  },

  render: function(){

    if (!this.props.user) return (
      <div id="loginLink" className="menu-link" onClick={this.onClickLogin}>
        <h3>Login</h3>
      </div>
    )

    return (
      <div id="loginLink" className="menu-link" onClick={this.onClickLogout}>
        <h3>Logout</h3>
      </div>
    )
  }
});

module.exports = LoginLink;