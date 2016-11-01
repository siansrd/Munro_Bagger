const React = require('react');
const DatePicker = require('react-datepicker');
const moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

const MountDetail = React.createClass({

  getInitialState: function(){
    return {
      startDate: moment()
    }
  },

  handleDateChange: function(date) {
    this.setState({
      startDate: date
    });
    this.props.date(date)
  },

  handleBaggedChange: function(event) {
    let status = event.target.checked;
    this.props.bagged(status)
  },

  render: function() {
    // if (!this.state.startDate) return <div></div>;
    return (
      <div>
        <h3>{this.props.focusMount.mountain.name}</h3>
        <h4>({this.props.focusMount.mountain.meaning})</h4>
        <div className="flex-grid">
          <div className="grid-item">Region:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.region}</div>
          <div className="grid-item">Height:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.height}m</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{this.props.focusMount.mountain.gridRef.letters} {this.props.focusMount.mountain.gridRef.eastings} {this.props.focusMount.mountain.gridRef.northings}</div>
          <div className="grid-item">Lat/Lon:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.latLng.lat} {this.props.focusMount.mountain.latLng.lng}</div>
          <div className="grid-item">Weather:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.forecasts.description}</div>
          <div className="grid-item">Temp:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.forecasts.temperature}</div>
          <div className="grid-item">Wind:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.forecasts.wind}</div>
          <div className="grid-item">Visibility:</div> 
          <div className="grid-item">{this.props.focusMount.mountain.forecasts.visibility}</div>
          <div className="grid-item">Bagged:</div>
          <div className="grid-item">
            <input type="checkbox" onClick={this.handleBaggedChange}/>
            <DatePicker 
              selected={this.state.startDate} 
              onChange={this.handleDateChange} />
            <button>Update</button>
          </div>
        </div>
      </div>
    )
  }
})




module.exports = MountDetail;