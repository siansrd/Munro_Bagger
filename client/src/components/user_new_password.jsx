const React = require('react');

const UserNewPassword = React.createClass({

  clickLogin: function(){
    this.props.loginClicked();
  },

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  render: function(){

    return (
      <div>
        <h2>Forgot your password?</h2>

        <form>
            <div>
                <label>Email</label><br />
                <input type="email" name="user[email]" id="user_email" />
            </div>
            <div>
              <button>Send me reset password instructions</button>
            </div>
        </form>
        <p className="user-link" onClick={this.clickLogin}>Log in</p>
        <p className="user-link" onClick={this.clickSignUp}>Sign up</p>
      </div>
    )

  }

})

module.exports = UserNewPassword;