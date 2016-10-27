const React = require('react');
const MountView = require('./mountain_view')

const UI = React.createClass({

  getInitialState: function() {

    const latlongs = [{lat: 57, lng: -1},{lat: 57.450861, lng: -1.604004},{lat: 56.450861, lng: -1.604004}]

    return {
      mountains: latlongs
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
      <h3>Yo</h3>
    )
  }
})

module.exports = UI;