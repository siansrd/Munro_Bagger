const React = require('react');


const MountDetailInfo = React.createClass({

  formatDay: function() {

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
          <div className="grid-item">Region:</div>
          <div className="grid-item">{this.props.focusMount.detail.region}</div>
          <div className="grid-item">Height:</div>
          <div className="grid-item">{this.props.focusMount.detail.height}m</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{this.props.focusMount.detail.gridRef.letters} {this.props.focusMount.detail.gridRef.eastings} {this.props.focusMount.detail.gridRef.northings}</div>
          <div className="grid-item">Lat/Lon:</div>
          <div className="grid-item">{this.props.focusMount.detail.latLng.lat} {this.props.focusMount.detail.latLng.lng}</div>

          <div className="grid-item">Weather {this.props.dayNum}:</div>
          <div className="grid-item">{description}</div>
          <div className="grid-item">Temp:</div>
          <div className="grid-item">Max: {tempMax}&deg;C, Feels Like: {tempFL}&deg;C</div>
          <div className="grid-item">Wind:</div>
          <div className="grid-item">{windDirection} {windSpeed}mph, Gusts: {gusts}mph</div>
        </div>
      </div>
    )
  }


})

module.exports = MountDetailInfo;
