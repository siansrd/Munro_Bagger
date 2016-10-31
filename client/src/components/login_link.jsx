var React = require('react');

const LoginLink = React.createClass({

  onClickHandler: function(event){
    // const loginLink = event.target
    this.props.linkClicked();
  },

  render: function(){
    return (
      <div id="loginLink" onClick={this.onClickHandler}>
        <h4>Login/LogOut</h4>
      </div>
    )
  }
});

module.exports = LoginLink;