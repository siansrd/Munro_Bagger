const React = require('react');
const Utility = require('../utility.js')

const UserSignUp = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      mismatch: false
    }
  },

  updateEmail: function(event) {
    this.setState({email: event.target.value})
  },

  updatePassword: function(event) {
    this.setState({password: event.target.value})
    console.log(this.state.password)
  },

  updatePasswordConfirmation: function(event) {
    this.setState({passwordConfirmation: event.target.value})
    console.log(this.state.passwordConfirmation)
  },

  signUp: function(event){
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation && Utility.passwordOK(this.state.password)) {
      this.props.userRegistration(this.state.email, this.state.password);
    } else {
      this.setState({passwordConfirmation: ""})
    } 
    // const request = new ApiRequest();
    // request.makePostRequest(url, content, function(status){console.log(status)})
  },

  clickLogin: function(){  
      this.props.loginClicked();
  },

  render: function(){

    if (!this.state.mismatch) {
      return (
        <div>
          <h3>Sign Up</h3>

          <form>
            <div className="formElement">
              <label>Email</label><br />
              <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail} />
            </div>

            <div className="formElement">
              <label>Password</label>
              <em>(6 characters minimum)</em><br />
              <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
            </div>

            <div className="formElement">
              <label>Password confirmation</label><br />
              <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
            </div>

            <div>
              <button onClick={this.signUp}>Sign up</button>
            </div>
          </form>
          <p className="user-link" onClick={this.clickLogin}>Log in</p>
        </div>
      )
    }

    if (this.state.mismatch) {
      return (
        <div>
          <h3>Sign Up</h3>

          <form>
            <div className="formElement">
              <label>Email</label><br />
              <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail} />
            </div>

            <div className="formElement">
              <label><em>Passwords must match and be 6 characters minimum</em></label><br/>
              <label>Password</label><br/>
              <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
            </div>

            <div className="formElement">
              <label>Password confirmation</label><br />
              <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
            </div>

            <div>
              <button onClick={this.signUp}>Sign up</button>
            </div>
          </form>
          <p className="user-link" onClick={this.clickLogin}>Log in</p>
        </div>
      )
    }

  }

})

module.exports = UserSignUp;