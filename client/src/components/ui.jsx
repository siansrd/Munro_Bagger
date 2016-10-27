const React = require('react');
const Mountains = require('../models/mountains');
const MountainDetail = require('./mountain_detail');

const UI = React.createClass({

  getInitialState: function() {

    const latlongs = [{lat: 57, lng: -1},{lat: 57.450861, lng: -1.604004},{lat: 56.450861, lng: -1.604004}]

    return {
      mountains:      latlongs,
      focusMountain:  null,
      user:           null
    }
  },

  componentDidMount: function() {
    new Mountains().all(){
      this.setState(mountains: mountains)   
    }.bind(this));
  },

  // MountainsView.prototype.all = function(onCompleted) {
  //   new Mountains().all(function(mtns){
  //     this.mountains = mtns.map(function(mtn) {
  //       var mv = new MountainView(mtn);
  //       mv.onChange = this.mountainViewChange.bind(this);
  //       return mv;
  //     }.bind(this));
  //     onCompleted(this.mountains);
  //   }.bind(this));
  // }



  createMarker: function(latlng) {
    this.props.mapObj.addMarker(latlng)
  },

  render: function() {

    this.state.mountains.map(function(mountain, index){
      this.createMarker(mountain)
    }.bind(this))
    
    return (
      <div>
        <MountainDetail/>
      </div>
    )
  }
})

module.exports = UI;