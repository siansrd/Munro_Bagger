var React = require('react');

const LoginLink = React.createClass({

  onClickHandler: function(){
    this.props.linkClicked();
  },

  render: function(){
    return (
      <div id="loginLink" className="user-link" onClick={this.onClickHandler}>
        <h4>Login/LogOut</h4>
      </div>
    )
  }
});

module.exports = LoginLink;