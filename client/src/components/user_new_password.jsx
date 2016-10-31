const React = require('react');

const UserNewPassword = React.createClass({

  render: function(){

    return (
      <div>
        <h2>Forgot your password?</h2>

        <form>
            <div>
                <label>Email</label><br />
                <input type="email" value="" name="user[email]" id="user_email" />
            </div>
            <div>
                <input type="submit" value="Send me reset password instructions" />
            </div>
        </form>
        <a href="/users/sign_in">Log in</a><br />
        <a href="/users/sign_up">Sign up</a><br />
      </div>
    )

  }

})

module.exports = UserNewPassword;