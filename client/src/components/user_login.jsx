const React = require('react');
const ApiRequest = require('../models/api_request')

const UserLogin = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: ""
    }
  },

  updateEmail: function(event) {
    this.setState({email: event.target.value})
  },

  updatePassword: function(event) {
    this.setState({password: event.target.value})
  },

  signIn: function(event) {
    event.preventDefault();
    // const url = "http://www.munrobagger.scot/users/sign_in.json"
    // const content = { user: {
    //   email: this.state.email, 
    //   password: this.state.password
    // }}
    // const request = new ApiRequest();
    // request.makePostRequest(url, content, function(status){console.log(status)})
    this.props.user("user@email.com")
  },

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

        <form action="/users/sign_in" >
          <div>
            <label>Email</label><br />
            <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail}/>
          </div>
          <div>
            <label>Password</label><br />
            <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword}/>
          </div>
          <div>
            <button onClick={this.signIn}>Log in</button>
          </div>
        </form>

        <p className="user-link" onClick={this.clickSignUp}>Sign up</p>
        <p className="user-link" onClick={this.clickForgotPass}>Forgot your password?</p>
      </div>
    )

  }

})

module.exports = UserLogin;