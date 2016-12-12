const React = require('react');
const passwordOK = require('../utility.js').passwordOK;

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
    // console.log(this.state.password)
  },

  updatePasswordConfirmation: function(event) {
    this.setState({passwordConfirmation: event.target.value})
    // console.log(this.state.passwordConfirmation)
  },

  signUp: function(event){
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation && passwordOK(this.state.password)) {
      this.props.userRegistration(this.state.email, this.state.password);
    } else {
      this.setState({passwordConfirmation: ""});
      this.setState({mismatch: true});
    } 
    // const request = new ApiRequest();
    // request.makePostRequest(url, content, function(status){console.log(status)})
  },

  render: function(){

    this.props.signupEmailExists

    if (!this.state.mismatch && !this.props.signupEmailExists) {
      return (
        <div>
          <h3>Sign Up</h3>

          <form>
            <div className="formElement">
              <label>Email</label><br />
              <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail} />
            </div>

            <div className="formElement">
              <label>Password</label><br />
              <p className="small">At least 8 charaters, 1 uppercase and 1 number</p>
              <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} /><br />
            </div>

            <div className="formElement">
              <label>Password confirmation</label><br />
              <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
            </div>

            <div>
              <button onClick={this.signUp}>Sign up</button>
            </div>
          </form>
          <p>Once submitted, check your email for verification.</p>
        </div>
      )
    }


    if (this.props.signupEmailExists) {
      return (
        <div>
          <h3>Sign Up</h3>

          <form>
            <div className="formElement">
              <p>Email address is already registered.</p>
              <label>Email</label><br />
              <input type="email" name="user[email]" id="user_email" onChange={this.updateEmail} />
            </div>

            <div className="formElement">
              <label>Password</label><br/>
              <p className="small">At least 8 charaters, 1 uppercase and 1 number</p>
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
              <p>Passwords must match and fulfill the strength requirements</p>
              <label>Password</label><br/>
              <p className="small">At least 8 charaters, 1 uppercase and 1 number</p>
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
        </div>
      )
    }

  }

})

module.exports = UserSignUp;
