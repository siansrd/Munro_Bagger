const React = require('react');

const UserLogin = React.createClass({

  render: function(){

    return (
      <div>
        <h3>Log in</h3>

        <form>
          <div>
            <label>Email</label><br />
            <input type="email" value="" name="user[email]" id="user_email" />
          </div>
          <div>
            <label>Password</label><br />
            <input type="password" name="user[password]" id="user_password" />
          </div>
          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>

        <a href="/users/sign_up">Sign up</a><br />
        <a href="/users/password/new">Forgot your password?</a><br/>
      </div>
    )

  }

})

module.exports = UserLogin;