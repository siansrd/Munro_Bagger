const React = require('react');

const UserSignUp = React.createClass({

  clickLogin: function(){
    this.props.loginClicked();
  },

  render: function(){

    return (
      <div>
        <h3>Sign Up</h3>

        <form>
          <div>
            <label>Email</label><br />
            <input type="email" name="user[email]" id="user_email" />
          </div>

          <div>
            <label>Password</label>
            <em>(6 characters minimum)</em><br />
            <input type="password" name="user[password]" id="user_password" />
          </div>

          <div>
            <label>Password confirmation</label><br />
            <input type="password" name="user[password_confirmation]" id="user_password_confirmation" />
          </div>

          <div>
            <button>Sign up</button>
          </div>
        </form>
        <p className="user-link" onClick={this.clickLogin}>Log in</p>
      </div>
    )

  }

})

module.exports = UserSignUp;