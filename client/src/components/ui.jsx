const React = require('react');

const Logo = require('./logo');
const MountainDetail = require('./mountain_detail');
const Filter = require('./filter');

const Mountains = require('../models/mountains');
const MountainView = require('../views/mountain_view');
var search = require('../utility').mountainSearch;


const UI = React.createClass({

  getInitialState: function() {

    return {
      ready:            false,
      focusMountain:    null,
      focusMountBagged: null,
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

  createMarker: function(mountain, callback) {
    this.props.mapObj.addMarker(mountain, callback)

  },

  onMarkerClick: function(mtnId) {
    const mtn = search(this.state.mountains, mtnId);
    this.setState({focusMountain: mtn})
  },

  baggedStatusChanged: function(status) {
    this.setState({focusMountBagged: status})
    console.log("baggedStatusChanged", this.state.focusMountBagged)
  },

  setFilterOption: function(value) {
    console.log("setFilterOption", value);
  },

  render: function() {

    // TODO: Refactor this
    if (!this.state.ready) return <div></div>;
    
    for (let mountain of this.state.mountains) {
      this.createMarker(mountain.mountain, this.onMarkerClick)
    }
    
    return (
      <div>
        <Logo/>
        <MountainDetail focusMount={this.state.focusMountain} bagged={this.baggedStatusChanged}/>
        <Filter filterOption={this.setFilterOption}/>
      </div>
    )
  }
})

module.exports = UI;