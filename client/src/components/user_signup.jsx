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

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      mismatch: false
    });
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
    this.setState({mismatch: false})
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation && passwordOK(this.state.password)) {
      this.props.userRegistration(this.state.email, this.state.password);
    } else {
      this.setState({mismatch: true, email: "", password: "", passwordConfirmation: ""});
    } 
    // const request = new ApiRequest();
    // request.makePostRequest(url, content, function(status){console.log(status)})
  },

  render: function(){

    let errorMessage = (this.props.error) ? this.props.error.message : "" ;

    if (this.state.mismatch ) {
      errorMessage = "Passwords must match and fulfill the strength requirements"
    };
  
    return (
      <div>
        <h3>Sign Up</h3>

        <form>
          <div className="formElement">
            <p>{errorMessage}</p>
            <div><label htmlFor="user_email">Email</label></div>
            <input type="email" name="user[email]" id="user_email" value={this.state.email} onChange={this.updateEmail} />
          </div>

          <div className="formElement">
            <div><label htmlFor="user_password">Password</label></div>
            <input type="password" name="user[password]" id="user_password" value={this.state.password} onChange={this.updatePassword} />
            <p className="small">At least 8 charaters, 1 uppercase and 1 number</p>
          </div>

          <div className="formElement">
            <div><label htmlFor="user_password_confirmation">Password confirmation</label></div>
            <input type="password" name="user[password_confirmation]" id="user_password_confirmation" value={this.state.passwordConfirmation} onChange={this.updatePasswordConfirmation}/>
          </div>

          <div>
            <button onClick={this.signUp}>Sign up</button>
          </div>
        </form>
      </div>
    )
  }

})

module.exports = UserSignUp;
