const React = require('react');
import { Layout, Header, HeaderRow, HeaderTabs, Textfield, Menu, MenuItem, Tab, Content } from 'react-mdl';
const Scotland = require('./map')

const Forecast = require('./forecast');
const Search = require('./search');
const Logo = require('./logo');
const Filter = require('./filter');
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
      mapObj:           null,
      focusMountain:    null,
      focusMountBagged: null,
      checkboxDisabled: false,
      infoBoxStatus:    "welcome",
      user:             new User(),
      userLoggedIn:     false,
      mountainViews:    null,
      loginUnsuccessful: false,
      resetEmailExists:  true,
      signupEmailExists: false
    }
  },

  componentDidMount: function() {
    let mtnsView = new MountainsView();
    mtnsView.all(function() {
      this.setState({mountainViews: mtnsView});
      let mtns = mtnsView.mountains;
      for (let i = 0; i < mtns.length; i++) {
        this.state.mapObj.addPin(mtns[i], this.onMountainSelected);
      }
    }.bind(this))
  },

  //
  // START OF SERVER REQUEST SECTION
  // All callback functions that start with the word 'request' interact with the server
  //

  requestLogin: function(email, password) {
    this.state.user.login(email, password, function(success){
      if (!success) {
        // console.log("not success")
        this.setState({loginUnsuccessful: true})
      }
      else {
        this.setState({userLoggedIn: true, infoBoxStatus: "loginSuccess"});
        this.state.user.getInfo(function() {
          this.state.mountainViews.userLogin(this.state.user);
          this.state.mapObj.userLoggedIn(this.state.mountainViews.mountains)
        }.bind(this))
      }
    }.bind(this))
  },

  requestRegistration: function(email, password) {
    // console.log("Attempting registration")
    this.state.user.register(email, password, function(success, returned) {
      // console.log("Status", status);
      // console.log("Registration successful:", success);
      if (!success && returned.status === 422) {
        this.setState({signupEmailExists: true});
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
      this.this.state.mapObj.userLoggedOut();
      this.setState({userLoggedIn: false});
      this.setState({infoBoxStatus: "welcome"});
    }.bind(this))
  },

  requestPasswordReset: function(email){
    this.state.user.resetPassword(email, function(success){
      if (!success) {
        // console.log("not successful")
        this.setState({resetEmailExists: false});
      }
      else {
        // console.log("not successful")
        this.setState({infoBoxStatus: "passwordResetSuccess"})
      }
    }.bind(this))
    // TODO add if not success
  },

  requestChangePassword: function(password){
    this.state.user.changePassword(password, function(success){
      if (success) this.setState({infoBoxStatus: "changePasswordSuccess"})
    }.bind(this))
  },

  requestBaggedStatusChange: function(status) {
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

  //
  // START OF THE FORM DISPLAY SECTION
  // Functions that start 'set' and end 'Form' change the form displayed in the Infobox
  // The effect of these event-handlers is local to InfoBox
  //

  setLoginForm: function() {
    this.setState({infoBoxStatus: "login"})
  },

  setSignUpForm: function() {
    this.setState({infoBoxStatus: "signUp"})
  },

  setChangePasswordForm: function() {
    this.setState({infoBoxStatus: "changePassword"})
  },

  setPasswordForm: function() {
    this.setState({infoBoxStatus: "password"})
  },

  setAboutForm: function() {
    this.setState({infoBoxStatus: "contactUs"})
  },

  // setFilterOption: function(value) {
  //   this.setState({filter: value});
  //   console.log("UI: setFilterOption", this.state.filter);
  // },

  //
  // START OF THE GLOBAL EVENT HANDLERS SECTION
  // Functions starting with the word 'on' handle a user event that has impact across the UI
  //

  onMapLoaded: function(mapObj) {
    this.setState({mapObj: mapObj})
  },

  onForecastDaySelected: function(dayNum) {
    this.setState({dayNum: dayNum})
    this.state.mapObj.changeForecast(dayNum);
  },

  onMountainSelected: function(mtnView) {
    this.setState({focusMountain: mtnView})
    this.state.mapObj.openInfoWindowForMountain(mtnView.pin);
  },

  //
  // START OF THE INFOBOX COMPONENT SECTION
  // The InfoBox is a container that will hold the componenet returned by infoBoxComponents()
  // this.state.infoBoxStatus is used to determine which component should be displayed
  //

  infoBoxComponent: function(infoBoxState) {
    let components = {
      login:
        <UserLogin
          signUpClicked={this.setSignUpForm}
          forgotPassClicked={this.setPasswordForm}
          loginUnsuccessful={this.state.loginUnsuccessful}
          user={this.requestLogin}/>,
      loginSuccess:
        <UserLoginSuccess changePassClicked={this.setChangePasswordForm}/>,
      signUp:
        <UserSignUp 
          userRegistration={this.requestRegistration}
          signupEmailExists={this.state.signupEmailExists}/>,
      password:
        <UserNewPassword
          loginClicked={this.setLoginForm}
          signUpClicked={this.setSignUpForm}
          passwordReset={this.requestPasswordReset}
          resetEmailExists={this.state.resetEmailExists}/>,
      passwordResetSuccess:
        <UserPasswordResetSuccess/>,
      changePassword:
        <UserChangePassword submitChangePassword={this.requestChangePassword}/>,
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

    let mountain = null;
    if (this.state.focusMountain) {
      mountain = (
        <MountainDetail
          focusMount={this.state.focusMountain}
          dayNum={this.state.dayNum}
          bagged={this.requestBaggedStatusChange}
          disabled={this.state.checkboxDisabled}
          date={this.setDate}
          userLoggedIn={this.state.userLoggedIn} />
      )
    }

    var enabledIn, enabledOut, login;
    if (this.state.userLoggedIn) {
      enabledIn = {}
      enabledOut = {'disabled': 'disabled'}
      login = <MenuItem onClick={this.setLoginForm}>Logout</MenuItem>
    }
    else {
      enabledOut = {}
      enabledIn = {'disabled': 'disabled'}
      login = <MenuItem onClick={this.setLoginForm}>Login</MenuItem>
    }

    return (
      <div>
        <Layout fixedHeader>
          <Header scroll>
            <HeaderRow title="Munro Bagger">
              <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
              />
              <Search
                mountains={this.state.mountainViews.mountains}
                searchedMount={this.onMountainSelected} />
              <IconButton name="more_vert" id="menu-top-right" />
              <Menu target="menu-top-right" align="right" ripple>
                  {login}
                  <MenuItem onClick={this.setSignUpForm} {...enabledOut}>Register</MenuItem>
                  <MenuItem onClick={this.setChangePasswordForm} {...enabledIn}>Change Password</MenuItem>
                  <MenuItem onClick={this.setPasswordForm} {...enabledOut}>Reset Password</MenuItem>
                  <MenuItem onClick={this.setAboutForm}>About</MenuItem>
              </Menu>
            </HeaderRow>
            <HeaderTabs ripple activeTab={this.state.dayNum} onChange={this.onForecastDaySelected}>
              <Tab>Today</Tab>
              <Tab>Tomorrow</Tab>
              <Tab>Day After</Tab>
            </HeaderTabs>
          </Header>
          <Content>
              <Scotland mapLoaded={this.onMapLoaded}/>
              {mountain}
          </Content>
        </Layout>
      </div>
    )
  }
})

module.exports = UI;
