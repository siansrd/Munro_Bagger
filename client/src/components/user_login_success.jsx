var React = require('react');

const UserLoginSuccess = React.createClass ({

  clickChangePassword: function() {
    this.props.changePassClicked()
  },

  render: function() {
    return (
      <div>   
        <p>You're now logged in. You can change the bagged status of any of the mountains by clicking the icons on the map and you will see a checkbox in this window.</p>

        <table>
          <tr>
            <td>
              <img className="icon" alt="icon indicating mountain is bagged and sunny" src="/public/images/mntn-bagged-sunny.png"/>
              <img className="icon" alt="icon indicating mountain is bagged but not sunny" src="/public/images/mntn-bagged.png"/>
            </td>
            <td>- Bagged (Sunny/Not Sunny)</td>
          </tr>

          <tr>
            <td>
              <img className="icon" alt="icon indicating mountain is not bagged and sunny" src="/public/images/mntn-not-bagged-sunny.png"/>
              <img className="icon" alt="icon indicating mountain is not bagged and not sunny" src="/public/images/mntn-not-bagged.png"/>
            </td>
            <td>- Not Bagged (Sunny/Not Sunny)</td>
          </tr>
        </table>

        <p className="user-link" onClick={this.clickChangePassword}>Change Password</p>
       
      </div>
    )
  }

});

module.exports = UserLoginSuccess;

