const React = require('react');

const Forecast = require('./forecast');
const Search = require('./search');
const LoginLink = require('./login_link');
const Logo = require('./logo');
const Filter = require('./filter');
const InfoBox = require('./info_box');

const Mountains = require('../models/mountains');
const MountainView = require('../views/mountain_view');
var search = require('../utility').mountainSearch;


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
      mountains:        []
    }
  },

  componentDidMount: function() {
    new Mountains().all(function(mtns){
      let mountains = mtns.map(function(mtn) {
        var mv = new MountainView(mtn);
        return mv;
      });
      this.setState({mountains: mountains, ready: true});
    }.bind(this));
  },

  createMarker: function(mountain, dayNum, callback) {
    this.props.mapObj.addMarker(mountain, dayNum, callback)
  },

  setFocusMountain: function(mtnId) {
    const mtn = search(this.state.mountains, mtnId);
    this.setState({focusMountain: mtn})
    this.props.mapObj.openInfoWindowForMountain(mtn.mountain);
    this.setState({infoBoxStatus: "mountain"})
  },

  baggedStatusChanged: function(status) {
    this.setState({focusMountBagged: status})
    console.log("UI:", this.state.focusMountain.mountain.name, this.state.focusMountBagged)
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
    for (let mountain of this.state.mountains) {
      this.createMarker(mountain.mountain, this.state.dayNum, this.setFocusMountain)
    }
    
    return (
      <div>
        <Forecast selectForecast={this.setForecastDay}/>
        <Search mountains={this.state.mountains} searchedMount={this.setFocusMountain}/>
        <LoginLink linkClicked={this.setLoginForm}/>
        <Logo/>
        <Filter filterOption={this.setFilterOption}/>
        <InfoBox focusMount={this.state.focusMountain} infoBox={this.state.infoBoxStatus} bagged={this.baggedStatusChanged} signUpClicked={this.setSignUpForm} forgotPassClicked={this.setPasswordForm} loginClicked={this.setLoginForm}/>
      </div>
    )
  }
})

module.exports = UI;