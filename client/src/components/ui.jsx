const React = require('react');
const Mountains = require('../models/mountains');
const MountainDetail = require('./mountain_detail');
const MountainView = require('../views/mountain_view');
var search = require('../utility').mountainSearch;


const UI = React.createClass({

  getInitialState: function() {

    return {
      ready:          false,
      focusMountain:  null,
      user:           null,
      mountains:      []
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

  render: function() {

    // TODO: Refactor this
    if (!this.state.ready) return <div></div>;
    
    for (let mountain of this.state.mountains) {
      this.createMarker(mountain.mountain, this.onMarkerClick)
    }
    
    return (
      <div>
        <MountainDetail focusMount={this.state.focusMountain}/>
      </div>
    )
  }
})

module.exports = UI;