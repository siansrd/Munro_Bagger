const React = require('react');

const UserNewPassword = React.createClass({

  getInitialState: function() {
    return {
      email: ""
    }
  },

  updateEmail: function(event) {
    this.setState({email: event.target.value})
  },

  passwordReset: function(event){
    event.preventDefault();
    this.props.passwordReset(this.state.email)
  },

  clickLogin: function(){
    this.props.loginClicked();
  },

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  render: function(){

    const errorMessage = (!this.props.resetEmailExists) ? "That email doesn't match our records." : "" ;

      return (
        <div>
          <h3>Forgot your password?</h3>
          <p>{errorMessage}</p>
          <form>
              <div className="formElement">
                  <label>Email</label><br />
                  <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail}/>
              </div>
              <div>
                <button onClick={this.passwordReset}>Send me reset password instructions</button>
              </div>
          </form>
          <p className="user-link" onClick={this.clickLogin}>Log in</p>
          <p className="user-link" onClick={this.clickSignUp}>Sign up</p>
        </div>
      )
    }

})

module.exports = UserNewPassword;
