const React = require('react');

const Forecast = require('./forecast');
const Search = require('./search');
const Menu = require('./menu');
const Logo = require('./logo');
const Filter = require('./filter');
const InfoBox = require('./info_box');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');
const UserLogin = require('./user_login');
const UserLoginSuccess = require('./user_login_success');
const UserSignUp = require('./user_signup');
const UserNewPassword = require('./user_new_password');
const UserChangePassword = require('./user_change_password');
const UserPasswordResetSuccess = require('./user_pass_reset_success')
const About = require('./about');

const MountainsView = require('../views/mountains_view');
const search = require('../utility').mountainSearch;
const User = require('../models/user');

const UI = React.createClass({

  getInitialState: function() {

    return {
      dayNum:           0,
      // filter:           "all",
      focusMountain:    null,
      focusMountBagged: null,
      checkboxDisabled: false,
      infoBoxStatus:    "welcome",
      user:             new User(),
      userLoggedIn:     false,
      mountainViews:    null,
      loginUnsuccessful: false,
      resetEmailExists: true
    }
  },

  setFocusMountain: function(mtnId) {
    const mtnView = search(this.state.mountainViews.mountains, mtnId);
    this.setState({focusMountain: mtnView})
    this.props.mapObj.openInfoWindowForMountain(mtnView.pin);
    this.setState({infoBoxStatus: "mountain"})
  },

  componentDidMount: function() {
    let mtnsView = new MountainsView();
    mtnsView.all(function() {
      this.setState({mountainViews: mtnsView});
      for (let mtnView of mtnsView.mountains) {
        this.props.mapObj.addPin(mtnView, this.setFocusMountain);
      }
    }.bind(this))
  },

  setUser: function(email, password) {
    this.state.user.login(email, password, function(success){
      if (!success) {
        console.log("not success")
        this.setState({loginUnsuccessful: true})
      }
      else {
        this.setState({userLoggedIn: true, infoBoxStatus: null, infoBoxStatus: "loginSuccess"});
        this.state.user.getInfo(function() {
          this.state.mountainViews.userLogin(this.state.user);
          this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
        }.bind(this)) 
      }
    }.bind(this))
  },

  setUserRegistration: function(email, password) {
    // register with the server
    console.log("Attempting registration")
    this.state.user.register(email, password, function(success) {
      console.log("Registration successful:", success)
      if (!success) return;
      // this.state.mountainViews.userLogin(this.state.user);
      // this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
      this.setLoginForm();
    }.bind(this))
  },

  logout: function(){
    this.state.user.logout(function(success) {
      if (!success) return
      this.state.mountainViews.userLogout();
      this.props.mapObj.userLoggedOut();
      this.setState({userLoggedIn: false, infoBoxStatus: null})
    }.bind(this))
  },

  passwordReset: function(email){
    this.state.user.resetPassword(email, function(success){
      if (!success) {
        console.log("not successful")
        this.setState({resetEmailExists: false});
      }
      else {
        console.log("not successful")
        this.setState({infoBoxStatus: "passwordResetSuccess"})
      }
    }.bind(this))
    // TODO add if not success
  },

  submitChangePassword: function(password){
    this.state.user.changePassword(password, function(success){
      if (success) this.setState({infoBoxStatus: "changePasswordSuccess"})
    }.bind(this))  
  },

  changePassword: function(){
    this.setState({infoBoxStatus: "changePassword"})
  },

  baggedStatusChanged: function(status) {
    this.setState({focusMountBagged: status, checkboxDisabled: true})
    this.state.focusMountain.backup();
    this.state.focusMountain.bagged = status;
    this.state.focusMountain.pin.changeBaggedState(status);
    this.state.focusMountain.save(function(success) {
      if (!success) status = !status;
      this.setState({checkboxDisabled: false, focusMountBagged: status}, function() { 
        console.log("Change state enable:", this.state.checkboxDisabled)
      })
      
      if (!success) {
        // There was an error saving the data
        this.state.focusMountain.pin.changeBaggedState(!status);
        this.state.focusMountain.restore();
      }
    }.bind(this));
  },

  setDate: function() {
    // Do something here with date
  },

  setLoginForm: function() {
    this.setState({infoBoxStatus: "login"})
  },

  setSignUpForm: function() {
    this.setState({infoBoxStatus: "signUp"})
  },

  setPasswordForm: function() {
    this.setState({infoBoxStatus: "password"})
  },

  setContactForm: function() {
    this.setState({infoBoxStatus: "about"})
  },

  setAboutInfo: function() {
    this.setState({infoBoxStatus: "contactUs"})
  },

  // setFilterOption: function(value) {
  //   this.setState({filter: value});
  //   console.log("UI: setFilterOption", this.state.filter);
  // },

  setForecastDay: function(dayNum) {
    this.setState({dayNum: dayNum})
    this.props.mapObj.changeForecast(dayNum);
  },

  infoBoxComponent: function(infoBoxState) {
    let components = {
      mountain: 
        <MountainDetail
          focusMount={this.state.focusMountain}
          dayNum={this.state.dayNum}
          bagged={this.baggedStatusChanged}
          disabled={this.state.checkboxDisabled}
          date={this.setDate}
          userLoggedIn={this.state.userLoggedIn} />,
      login: 
        <UserLogin
          signUpClicked={this.setSignUpForm}
          forgotPassClicked={this.setPasswordForm}
          loginUnsuccessful={this.state.loginUnsuccessful}
          user={this.setUser}/>,
      loginSuccess:
        <UserLoginSuccess changePassClicked={this.changePassword}/>,
      signUp:
        <UserSignUp userRegistration={this.setUserRegistration}/>,  
      password:
        <UserNewPassword
          loginClicked={this.setLoginForm}
          signUpClicked={this.setSignUpForm}
          passwordReset={this.passwordReset}
          resetEmailExists={this.state.resetEmailExists}/>,
      passwordResetSuccess:
        <UserPasswordResetSuccess/>,
      changePassword:
        <UserChangePassword submitChangePassword={this.props.submitChangePassword}/>,
      changePasswordSuccess:
        <h4>Your password was changed successfully</h4>,
      contactUs:
        <About/>,
      welcome:
        <Welcome signUpClicked={this.setSignUpForm}/>,
    }
    return components[infoBoxState];
  },

  render: function() {
    // TODO: Refactor this
    if (!this.state.mountainViews) return <div></div>;

    return (
      <div>
        <Menu
          user={this.state.userLoggedIn}
          loginLinkClicked={this.setLoginForm}
          logoutLinkClicked={this.logout}
          aboutLinkClicked={this.setAboutInfo}/>
        <Logo/>
        <Search
          mountains={this.state.mountainViews.mountains}
          searchedMount={this.setFocusMountain}/>
        <InfoBox>{this.infoBoxComponent(this.state.infoBoxStatus)}</InfoBox>
        <Forecast
          selectForecast={this.setForecastDay}/>
      </div>
    )
  }
})

module.exports = UI;
