const React = require('react');
const Mountains = require('../models/mountains');
// const MountainDetail = require('./mountain_detail');
const MountainView = require('../views/mountain_view');


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
      console.log(mountains[0]);
    }.bind(this));
  },

  createMarker: function(mountain, callback) {
    this.props.mapObj.addMarker(mountain, callback)

  },

  onMarkerClick: function(mountId) {
    // TODO : setstate in here
    console.log('clicked in ui')
  },

  render: function() {

    if (!this.state.ready) return <div></div>;
    console.log("in render");
    console.log("in redner", this.state.mountains[0]);

    for (let mountain of this.state.mountains) {
      this.createMarker(mountain.mountain, this.onMarkerClick)
    }

    // this.state.mountains.forEach(function(mountainDetail, index){
    //   this.createMarker(mountainDetail.mountain, this.onMarkerClick)
    // }.bind(this))
    
    return (
      <div>
        <h3>Hi</h3>
      </div>
    )
  }
})

module.exports = UI;