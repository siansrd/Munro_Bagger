const React = require('react');
const MountainDetail = require('./mountain_detail')

const UI = React.createClass({

  getInitialState: function() {

    const latlongs = [{lat: 57, lng: -1},{lat: 57.450861, lng: -1.604004},{lat: 56.450861, lng: -1.604004}]

    return {
      mountains:      latlongs,
      focusMountain:  null,
      user:           null
    }
  },

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