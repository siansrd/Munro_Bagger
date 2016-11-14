const React = require('react');

const Forecast = require('./forecast');
const Search = require('./search');
const LoginLink = require('./login_link');
const Logo = require('./logo');
const Filter = require('./filter');
const InfoBox = require('./info_box');

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
      infoBoxStatus:    null,
      user:             new User(),
      userLoggedIn:     false,
      mountainViews:    null
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
      if (!success) return
      this.setState({userLoggedIn: true, infoBoxStatus: null});
      this.state.user.getInfo(function() {
        this.state.mountainViews.userLogin(this.state.user);
        this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
      }.bind(this))
    }.bind(this))
  },

  setUserRegistration: function(email, password, confirmation) {
    // register with the server
    this.state.user.register(email, password, confirmation, function(success) {
      console.log("Registration successful:", success)
      if (!success) return;
      this.state.mountainViews.userLogin(this.state.user);
      this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
    }.bind(this))
  },

  logout: function(){
    // post logout request
    this.state.user.logout(function(success) {
      if (!success) return
      this.state.mountainViews.userLogout();
      this.props.mapObj.userLoggedOut();
    }.bind(this))
  },

  baggedStatusChanged: function(status) {
    this.setState({focusMountBagged: status})
    // disable the checkbox
    // this.state.focusMountain.backup();
    this.state.focusMountain.bagged = status;
    this.state.focusMountain.pin.changeBaggedState(status);
    this.state.focusMountain.save(function(success) {
      // we have a reply re-enable the checkbox
      if (success) {
       // this.state.focusMountain.pin.changeBaggedState(status);
      }
      else {
        // There was an error saving the data
        // this.state.focusMountain.restore();
        // revert the checkbox to the restored state
      }
    });
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

  render: function() {
    // TODO: Refactor this
    if (!this.state.mountainViews) return <div></div>;

    return (
      <div>
        <Logo/>
        <Search
          mountains={this.state.mountainViews.mountains}
          searchedMount={this.setFocusMountain}/>
        <LoginLink
          user={this.state.userLoggedIn}
          loginLinkClicked={this.setLoginForm}
          logoutLinkClicked={this.logout}/>
        <InfoBox
          focusMount={this.state.focusMountain}
          infoBox={this.state.infoBoxStatus}
          dayNum={this.state.dayNum}
          bagged={this.baggedStatusChanged}
          date={this.setDate}
          signUpClicked={this.setSignUpForm}
          forgotPassClicked={this.setPasswordForm}
          loginClicked={this.setLoginForm}
          user={this.setUser}
          userRegistration={this.setUserRegistration}
          userLoggedIn={this.state.userLoggedIn} />
        <Forecast
          selectForecast={this.setForecastDay}/>
      </div>
    )
  }
})

module.exports = UI;
