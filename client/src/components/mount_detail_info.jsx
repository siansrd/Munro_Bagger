const React = require('react');


const MountDetailInfo = React.createClass({

  formatDay: function(dayNum) {
    if (dayNum == 0) return "Today"
    if (dayNum == 1) return "Tomorrow"
    if (dayNum == 2) return "Day After"
  },

  render: function() {
    let dayNum = this.props.dayNum
    const description = this.props.focusMount.detail.forecasts.day[dayNum].description
    const tempMax = this.props.focusMount.detail.forecasts.day[dayNum].temperature.max
    const tempFL = this.props.focusMount.detail.forecasts.day[dayNum].temperature.feelsLike
    const windDirection = this.props.focusMount.detail.forecasts.day[dayNum].wind.direction
    const windSpeed = this.props.focusMount.detail.forecasts.day[dayNum].wind.speed
    const gusts = this.props.focusMount.detail.forecasts.day[dayNum].wind.gusting

    console.log(gusts)

    return (
      <div>
        <h3>{this.props.focusMount.detail.name}</h3>
        <h4>({this.props.focusMount.detail.meaning})</h4>
        <div className="flex-grid">
          <div className="grid-item">Height:</div>
          <div className="grid-item">{this.props.focusMount.detail.height}m</div>
          <div className="grid-item">Region:</div>
          <div className="grid-item">{this.props.focusMount.detail.region}</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{this.props.focusMount.detail.gridRef.letters} {this.props.focusMount.detail.gridRef.eastings} {this.props.focusMount.detail.gridRef.northings}</div>
          <div className="grid-item">Lat/Lon:</div>
          <div className="grid-item">{this.props.focusMount.detail.latLng.lat}°, {this.props.focusMount.detail.latLng.lng}°</div>
        </div>

        <div className="grid-item"><h3>Conditions {this.formatDay(this.props.dayNum)}:</h3></div>
        <div className="flex-grid">
          <div className="grid-item">Weather:</div>
          <div className="grid-item">{description}</div>
          <div className="grid-item">Temp(max):</div>
          <div className="grid-item">{tempMax}&deg;C</div>
          <div className="grid-item">Feels Like:</div>
          <div className="grid-item">{tempFL}&deg;C</div>
          <div className="grid-item">Wind:</div>
          <div className="grid-item">{windDirection} {windSpeed}mph</div>
          <div className="grid-item">Gusts:</div>
          <div className="grid-item">{gusts}mph</div>
        </div>
      </div>
    )
  }


})

module.exports = MountDetailInfo;
