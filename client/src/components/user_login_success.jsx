var React = require('react');

const UserLoginSuccess = React.createClass ({

  clickChangePassword: function() {
    this.props.changePassClicked()
  },

  render: function() {
    return (
      <div>   
        <p>You're now logged in. You can change the bagged status of any of the mountains by clicking the icons on the map and you will see a checkbox in this window.</p>

        <div className="flex-grid">
          <div className="grid-item">Sunny Bagged:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-bagged-sunny.png"/></div>
          <div className="grid-item">Sunny Not Bagged:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-not-bagged-sunny.png"/></div> 
        </div>

        <p className="user-link" onClick={this.clickChangePassword}>Change Password</p>
       
      </div>
    )
  }

});

module.exports = UserLoginSuccess;

