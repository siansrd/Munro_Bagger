const React = require('react');

const Forecast = require('./forecast');
const Search = require('./search');
const LoginLink = require('./login_link');
const Logo = require('./logo');
const Filter = require('./filter');
const InfoBox = require('./info_box');

const Mountains = require('../models/mountains');
const MountainsView = require('../views/mountains_view');
const search = require('../utility').mountainSearch;
const User = require('../models/user');


const UI = React.createClass({

  getInitialState: function() {

    return {
      dayNum:           0,
      // filter:           "all", 
      ready:            false,
      focusMountain:    null,
      focusMountBagged: null,
      infoBoxStatus:    null,
      user:             null,
      userLoggedIn:     false, 
      mountainViews:    []
    }
  },

  setFocusMountain: function(mtnId) {
    const mtnView = search(this.state.mountainViews.mountains, mtnId);
    this.setState({focusMountain: mtnView})
    this.props.mapObj.openInfoWindowForMountain(mtnView.mountain);
    this.setState({infoBoxStatus: "mountain"})
  },

  componentDidMount: function() {
    let mtnsView = new MountainsView();
    mtnsView.all(function() {
      this.setState({mountainViews: mtnsView, ready: true});
      for (let mtnView of mtnsView.mountains) {
        this.props.mapObj.addPin(mtnView, this.setFocusMountain)
      }
    }.bind(this))
    let user = new User();
    this.setState({user: user})
  },

  setUser: function(email, password) {
    this.state.user.login(email, password, function(status, responseText){
      console.log("Login status:", status)
      if (status !== 201) return
      user.getInfo(function() {
        this.state.mountainViews.userLogin(user);
        this.props.mapObj.userLoggedIn(this.state.mountainViews.mountains)
      }.bind(this))
    }.bind(this))
  },

  logout: function(){
    // post logout request
  },

  baggedStatusChanged: function(status) {
    this.setState({focusMountBagged: status})
    console.log("UI:", this.state.focusMountain.mountain.name, this.state.focusMountBagged)
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
    if (!this.state.ready) return <div></div>;
    
    return (
      <div>
        <Forecast 
          selectForecast={this.setForecastDay}/>
        <Search 
          mountains={this.state.mountainViews.mountains} 
          searchedMount={this.setFocusMountain}/>
        <LoginLink 
          user={this.state.user}
          loginLinkClicked={this.setLoginForm}
          logoutLinkClicked={this.logout}/>
        <Logo/>
        <InfoBox 
          focusMount={this.state.focusMountain} 
          infoBox={this.state.infoBoxStatus} 
          dayNum={this.state.dayNum}
          bagged={this.baggedStatusChanged} 
          date={this.setDate}
          signUpClicked={this.setSignUpForm} 
          forgotPassClicked={this.setPasswordForm} 
          loginClicked={this.setLoginForm}
          user={this.setUser}/>
      </div>
    )
  }
})

module.exports = UI;