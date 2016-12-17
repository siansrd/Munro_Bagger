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
          <div className="grid-item-key">
            <img className="icon" src="/public/images/mntn-bagged-sunny.png"/>
            <img className="icon" src="/public/images/mntn-bagged.png"/>
          </div>
          <div className="grid-item-key">- Bagged (Sunny/Not Sunny)</div>
          <div className="grid-item-key">
            <img className="icon" src="/public/images/mntn-not-bagged-sunny.png"/>
            <img className="icon" src="/public/images/mntn-not-bagged.png"/>
          </div>
          <div className="grid-item-key">- Not Bagged (Sunny/Not Sunny)</div>
        </div>

        <p className="user-link" onClick={this.clickChangePassword}>Change Password</p>
       
      </div>
    )
  }

});

module.exports = UserLoginSuccess;

