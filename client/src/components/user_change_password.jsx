var React = require('react');

const UserChangePassword = React.createClass ({

  getInitialState: function() {
    return {
      password: "",
      passwordConfirmation: "",
      mismatch: false
    }
  },

  updatePassword: function(event) {
    this.setState({password: event.target.value})
    console.log(this.state.password)
  },

  updatePasswordConfirmation: function(event) {
    this.setState({passwordConfirmation: event.target.value})
    console.log(this.state.passwordConfirmation)
  },

  passwordChange: function(event){
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirmation && Utility.passwordOK(this.state.password)) {
      this.props.changePassword(this.state.password);
    } else {
      this.setState({ passwordConfirmation: "", mismatch: true})
    } 
    // const request = new ApiRequest();
    // request.makePostRequest(url, content, function(status){console.log(status)})
  },

  render: function(){
    if (!this.state.mismatch) {
      return (
        <div>
          <form>
              <h4>Change Password</h4>
              <div className="formElement">
                  <label>Password</label>
                  <em>(6 characters minimum)</em><br />
                  <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
              </div>

              <div className="formElement">
                  <label>Password confirmation</label><br />
                  <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
              </div>
                <button onClick={this.passwordChange}>Change Password</button>
          </form>
        </div>
      )
    }

    if (this.state.mismatch) {
      return (
        <div>
          <form>
              <h4>Change Password</h4>
              <div className="formElement">
                  <label><em>Passwords must match and be 6 characters minimum</em></label><br/>
                  <label>Password</label><br/>
                  <input type="password" name="user[password]" id="user_password" onChange={this.updatePassword} />
              </div>

              <div className="formElement">
                  <label>Password confirmation</label><br />
                  <input type="password" name="user[password_confirmation]" id="user_password_confirmation" onChange={this.updatePasswordConfirmation}/>
              </div>
                <button onClick={this.passwordChange}>Change Password</button>
          </form>
        </div>
      )
    }

  }

})

module.exports = UserChangePassword;