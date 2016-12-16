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
      errorMsg:         null
    }
  },

  logAndSetState(state) {
    console.log("Changing state: ", state);
    this.setState(state);
  },

  componentDidMount: function() {
    let mtnsView = new MountainsView();
    mtnsView.all(function() {
      this.logAndSetState({mountainViews: mtnsView});
      let mtns = mtnsView.mountains;
      for (let i = 0; i < mtns.length; i++) {
        this.props.mapObj.addPin(mtns[i], this.onMountainSelected);
      }
    }.bind(this))
  },

  //
  // START OF SERVER REQUEST SECTION
  // All callback functions that start with the word 'request' interact with the server
  //

  requestLogin: function(email, password) {
    this.state.user.login(email, password, function(success, returned){
      if (!success) {
        this.logAndSetState({errorMsg: returned, infoBoxStatus: 'login' });
      }
      else {
        this.logAndSetState({userLoggedIn: true, infoBoxStatus: "loginSuccess", errorMsg: null});
        this.state.user.getInfo(function() {
          this.state.mountainViews.userLogin(this.state.user);
          this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
        }.bind(this))
      }
    }.bind(this))
  },

  requestRegistration: function(email, password) {
    this.state.user.register(email, password, function(success, returned) {
      if (!success) {
        this.logAndSetState({errorMsg: returned, infoBoxStatus: 'signUp' });
      }
      else if (success) {
        this.setLoginForm();
      }
    }.bind(this))
  },

  requestLogout: function(){
    this.state.user.logout(function(success) {
      if (!success) return;
      this.state.mountainViews.userLogout();
      this.props.mapObj.userLoggedOut();
      this.logAndSetState({userLoggedIn: false, infoBoxStatus: "welcome"});
    }.bind(this))
  },

  requestPasswordReset: function(email){
    this.state.user.resetPassword(email, function(success, returned){
      if (!success) {
        this.logAndSetState({errorMsg: returned, infoBoxStatus: 'password' });
      }
      else {
        this.logAndSetState({errorMsg: null, infoBoxStatus: "passwordResetSuccess"})
      }
    }.bind(this))
  },

  requestChangePassword: function(password){
    this.state.user.changePassword(password, function(success, returned){
      if (!success) {
        this.logAndSetState({errorMsg: returned, infoBoxStatus: 'changePassword' });
      }
      else {
        this.logAndSetState({errorMsg: null, infoBoxStatus: "changePasswordSuccess"})
      }
    }.bind(this))
  },

  requestBaggedStatusChange: function(status) {
    this.logAndSetState({focusMountBagged: status, checkboxDisabled: true})
    this.state.focusMountain.backup();
    this.state.focusMountain.bagged = status;
    this.state.focusMountain.pin.changeBaggedState(status);
    this.state.focusMountain.save(function(success, returned) {
      if (!success) {
        // There was an error saving the data
        status = !status;
        this.state.focusMountain.pin.changeBaggedState(status);
        this.state.focusMountain.restore();
        this.logAndSetState({errorMsg: returned, infoBoxStatus: 'mountain' });
      }
      this.logAndSetState({checkboxDisabled: false, focusMountBagged: status}, function() {
        console.log("Change state enable:", this.state.checkboxDisabled)
      })
    }.bind(this));
  },

  setHome: function() {
    this.logAndSetState({infoBoxStatus: "welcome"})
  },

  setDate: function() {
    // Do something here with date
  },


  //
  // START OF THE FORM DISPLAY SECTION
  // Functions that start 'set' and end 'Form' change the form displayed in the Infobox
  // The effect of these event-handlers is local to InfoBox
  //

  setLoginForm: function() {
    this.logAndSetState({infoBoxStatus: "login", errorMsg: null});
  },

  setSignUpForm: function() {
    this.logAndSetState({infoBoxStatus: "signUp", errorMsg: null})
  },

  setChangePasswordForm: function() {
    this.logAndSetState({infoBoxStatus: "changePassword", errorMsg: null})
  },

  setPasswordForm: function() {
    this.logAndSetState({infoBoxStatus: "password", errorMsg: null})
  },

  setContactForm: function() {
    this.logAndSetState({infoBoxStatus: "about", errorMsg: null})
  },

  setAboutInfo: function() {
    this.logAndSetState({infoBoxStatus: "contactUs", errorMsg: null})
  },

  // setFilterOption: function(value) {
  //   this.logAndSetState({filter: value});
  //   console.log("UI: setFilterOption", this.state.filter);
  // },

  //
  // START OF THE GLOBAL EVENT HANDLERS SECTION
  // Functions starting with the word 'on' handle a user event that has impact across the UI
  //

  onForecastDaySelected: function(dayNum) {
    this.logAndSetState({dayNum: dayNum})
    this.props.mapObj.changeForecast(dayNum);
  },

  onMountainSelected: function(mtnId) {
    const mtnView = search(this.state.mountainViews.mountains, mtnId);
    this.props.mapObj.openInfoWindowForMountain(mtnView.pin);
    this.logAndSetState({focusMountain: mtnView, infoBoxStatus: "mountain"})
  },

  //
  // START OF THE INFOBOX COMPONENT SECTION
  // The InfoBox is a container that will hold the componenet returned by infoBoxComponents()
  // this.state.infoBoxStatus is used to determine which component should be displayed
  //

  infoBoxComponent: function(infoBoxState) {
    let components = {
      mountain:
        <MountainDetail
          focusMount={this.state.focusMountain}
          dayNum={this.state.dayNum}
          bagged={this.requestBaggedStatusChange}
          disabled={this.state.checkboxDisabled}
          date={this.setDate}
          userLoggedIn={this.state.userLoggedIn}
          error={this.state.errorMsg}/>,
      login:
        <UserLogin
          signUpClicked={this.setSignUpForm}
          forgotPassClicked={this.setPasswordForm}
          loginUnsuccessful={this.state.loginUnsuccessful}
          user={this.requestLogin}
          error={this.state.errorMsg}/>,
      loginSuccess:
        <UserLoginSuccess changePassClicked={this.setChangePasswordForm}/>,
      signUp:
        <UserSignUp 
          userRegistration={this.requestRegistration}
          signupEmailExists={this.state.signupEmailExists}
          error={this.state.errorMsg}/>,
      password:
        <UserNewPassword
          loginClicked={this.setLoginForm}
          signUpClicked={this.setSignUpForm}
          passwordReset={this.requestPasswordReset}
          error={this.state.errorMsg}/>,
      passwordResetSuccess:
        <UserPasswordResetSuccess/>,
      changePassword:
        <UserChangePassword 
        submitChangePassword={this.requestChangePassword}
        error={this.state.errorMsg}/>,
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

    console.log("Rendering UI")
    // TODO: Refactor this
    if (!this.state.mountainViews) return <div></div>;

    return (
      <div>
        <Menu
          user={this.state.userLoggedIn}
          loginLinkClicked={this.setLoginForm}
          logoutLinkClicked={this.requestLogout}
          aboutLinkClicked={this.setAboutInfo}/>
        <Logo
          logoLinkClicked={this.setHome}/>
        <Search
          mountains={this.state.mountainViews.mountains}
          searchedMount={this.onMountainSelected}/>
        <InfoBox>{this.infoBoxComponent(this.state.infoBoxStatus)}</InfoBox>
        <Forecast
          selectForecast={this.onForecastDaySelected}/>
      </div>
    )
  }
})

module.exports = UI;
