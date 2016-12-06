const React = require('react');
import { Dialog, DialogTitle, DialogContent, DialogActions, Textfield, Button } from 'react-mdl';

const ApiRequest = require('../models/api_request')

const UserLogin = React.createClass({

  getInitialState: function() {
    return {
      openDialog: true,
      email: "",
      password: ""
    }
  },

  handleOpenDialog() {
    this.setState({openDialog: true});
  },

  handleCloseDialog() {
    this.setState({openDialog: false});
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
    this.handleCloseDialog();
    this.props.user(this.state.email, this.state.password)
  },

  clickSignUp: function() {
    this.handleCloseDialog();
    this.props.signUpClicked()
  },

  clickForgotPass: function() {
    this.handleCloseDialog();
    this.props.forgotPassClicked()
  },

  render: function(){

    const errorMessage = (this.props.loginUnsuccessful) ? "Those details don't match our records, please try again" : "" ;


      return (
        <Dialog open={this.state.openDialog}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Textfield
              required={true}
              onChange={this.updateEmail}
              label="Email..."
              style={{width: '200px'}}
            />
            <Textfield
              required={true}
              type="password"
              onChange={this.updatePassword}
              label="Password..."
              style={{width: '200px'}}
            />
          </DialogContent>
          <DialogActions fullWidth>
            <Button type='button' onClick={this.signIn}>Login</Button>
            <Button type='button' onClick={this.clickSignUp}>Register</Button>
            <p className="user-link" onClick={this.clickForgotPass}>Forgot your password?</p>
          </DialogActions>
        </Dialog>
      )
  }
})


module.exports = UserLogin;