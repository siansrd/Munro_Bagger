const React = require('react');

const UserLogin = React.createClass({

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  clickForgotPass: function() {
    this.props.forgotPassClicked()
  },

  render: function(){

    return (
      <div>
        <h3>Log in</h3>

        <form>
          <div>
            <label>Email</label><br />
            <input type="email" name="user[email]" id="user_email" />
          </div>
          <div>
            <label>Password</label><br />
            <input type="password" name="user[password]" id="user_password" />
          </div>
          <div>
            <button>Log in</button>
          </div>
        </form>

        <p className="user-link" onClick={this.clickSignUp}>Sign up</p>
        <p className="user-link" onClick={this.clickForgotPass}>Forgot your password?</p>
      </div>
    )

  }

})

module.exports = UserLogin;