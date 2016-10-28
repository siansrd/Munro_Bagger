const React = require('react');

const MountDetail = React.createClass({

  render: function() {

    return (
      <div id="mountDetail">
        <h3>{this.props.focusMount.mountain.name}</h3>
        <p>Height: {this.props.focusMount.mountain.height}m</p>
        <p>OS Grid Ref: {this.props.focusMount.mountain.gridRef.letters} {this.props.focusMount.mountain.gridRef.eastings} {this.props.focusMount.mountain.gridRef.northings}</p>
        <p>Lat/Lon: {this.props.focusMount.mountain.latLng.lat} {this.props.focusMount.mountain.latLng.lng}</p>
      </div>
    )
  }

})

module.exports = MountDetail;