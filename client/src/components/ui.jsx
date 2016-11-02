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
      filter:           "all", 
      ready:            false,
      focusMountain:    null,
      focusMountBagged: null,
      infoBoxStatus:    null,
      user:             null,
      mountainViews:    [],
      user:             null
    }
  },

  componentDidMount: function() {
    let mtnsView = new MountainsView();
    mtnsView.all(function() {
      this.setState({mountainViews: mtnsView, ready: true});
    }.bind(this))
  },

  setUser: function(email) {
    let user = new User();
    this.setState({user: user})
    user.getInfo(function() {
      this.state.mountainViews.userLogin(user);
      console.log(this.state.mountainViews)
    }.bind(this))
  },

  createMarker: function(mountain, dayNum, callback) {
    this.props.mapObj.addMarker(mountain, dayNum, callback)
  },

  setFocusMountain: function(mtnId) {
    const mtnView = search(this.state.mountainViews.mountains, mtnId);
    this.setState({focusMountain: mtnView})
    console.log("Set focus Mountain", mtnView)
    this.props.mapObj.openInfoWindowForMountain(mtnView.mountain);
    this.setState({infoBoxStatus: "mountain"})
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

  setFilterOption: function(value) {
    this.setState({filter: value});
    console.log("UI: setFilterOption", this.state.filter);
  },

  setForecastDay: function(dayNum) {
    this.setState({dayNum: dayNum})
  },

  render: function() {
    
    // TODO: Refactor this
    if (!this.state.ready) return <div></div>;
    
    this.props.mapObj.clearMarkers();
    for (let mountain of this.state.mountainViews.mountains) {
      this.createMarker(mountain, this.state.dayNum, this.setFocusMountain)
    }
    
    return (
      <div>
        <Forecast 
          selectForecast={this.setForecastDay}/>
        <Search 
          mountains={this.state.mountainViews.mountains} 
          searchedMount={this.setFocusMountain}/>
        <LoginLink 
          linkClicked={this.setLoginForm}/>
        <Logo/>
        <Filter 
          filterOption={this.setFilterOption}/>
        <InfoBox 
          focusMount={this.state.focusMountain} 
          infoBox={this.state.infoBoxStatus} 
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