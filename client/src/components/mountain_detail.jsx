const React = require('react');

const MountDetail = React.createClass({

  handleBaggedChange: function(event) {
    let status = event.target.checked;
    this.props.bagged(status)
  },

  render: function() {

    return (
      <div>
        <h3>{this.props.focusMount.mountain.name}</h3>
        <div className="flex-grid">
          <div className="grid-item">Height:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.height}m</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{this.props.focusMount.mountain.gridRef.letters} {this.props.focusMount.mountain.gridRef.eastings} {this.props.focusMount.mountain.gridRef.northings}</div>
          <div className="grid-item">Lat/Lon:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.latLng.lat} {this.props.focusMount.mountain.latLng.lng}</div>
          <div className="grid-item">Bagged:</div>
          <div className="grid-item"><input type="checkbox" onClick={this.handleBaggedChange}/></div>
        </div>
      </div>
    )
  }
})




module.exports = MountDetail;