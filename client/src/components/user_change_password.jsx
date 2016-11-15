var React = require('react');

const UserChangePassword = React.createClass ({

  render: function(){
    return (
      <div>
        <form>
            <h4>Change Password</h4>
            <div className="formElement">
                <label>Password</label>
                <em>(6 characters minimum)</em><br />
                <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
            </div>

            <div className="formElement">
                <label>Password confirmation</label><br />
                <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
            </div>
              <button onClick={this.passwordChange}>Change Password</button>
        </form>
      </div>
    )

  }

})

module.exports = UserChangePassword;