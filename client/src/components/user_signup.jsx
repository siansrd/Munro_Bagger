const React = require('react');

const UserSignUp = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  },

  updateEmail: function(event) {
    this.setState({email: event.target.value})
  },

  updatePassword: function(event) {
    this.setState({password: event.target.value})
  },

  updatePasswordConfirmation: function(event) {
    this.setState({passwordConfirmation: event.target.value})
  },

  signUp: function(event){
    event.preventDefault();
    const url = "http://www.munrobagger.scot/users.json"
    const content = { user: {
      email: this.state.email, 
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }}
    const request = new ApiRequest();
    request.makePostRequest(url, content, function(status){console.log(status)})
  },

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
            <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail} />
          </div>

          <div>
            <label>Password</label>
            <em>(6 characters minimum)</em><br />
            <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
          </div>

          <div>
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

})

module.exports = UserSignUp;