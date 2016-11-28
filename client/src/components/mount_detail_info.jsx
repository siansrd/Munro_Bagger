const React = require('react');
const GridRef = require('../models/grid_ref');


const MountDetailInfo = React.createClass({

  formatDay: function(dayNum) {
    if (dayNum == 0) return "Today"
    if (dayNum == 1) return "Tomorrow"
    if (dayNum == 2) return "Day After"
  },

  formatDirection: function(direction) {
    const directions = { N: "North", E: "East", S: "South", W: "West" }
    if (direction.length == 1) return directions[direction]
    return direction
  },

  render: function() {
    let dayNum = this.props.dayNum;
    let forecast = this.props.focusMount.detail.forecasts.day[dayNum];
    const description = forecast.description
    const tempMax = forecast.temperature.max
    const tempFL = forecast.temperature.feelsLike
    const windDirection = forecast.wind.direction
    const windSpeed = forecast.wind.speed
    const gusts = forecast.wind.gusting
    const visibility = forecast.visibility

    console.log(gusts)
    console.log(visibility)
    console.log(this.props.focusMount.detail.gridRef.toString())

    return (
      <div>
        <h3>{this.props.focusMount.detail.name}</h3>
        <h4>({this.props.focusMount.detail.meaning})</h4>
        <div className="flex-grid">
          <div className="grid-item">Height:</div>
          <div className="grid-item">{this.props.focusMount.detail.height}m</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{this.props.focusMount.detail.gridRef.toString()}</div>
          <div className="grid-item">Lat/Long:</div>
          <div className="grid-item">{this.props.focusMount.detail.latLng.lat}°, {this.props.focusMount.detail.latLng.lng}°</div>
          <div className="grid-item">Region:</div>
          <div className="grid-item">{this.props.focusMount.detail.region}</div>
        </div>

        <div className="cond-title"><h3>Conditions {this.formatDay(this.props.dayNum)}:</h3></div>
        <div className="flex-grid">
          <div className="grid-item">Weather:</div>
          <div className="grid-item">{description}</div>
          <div className="grid-item">Visibility:</div>
          <div className="grid-item">{visibility}</div>
          <div className="grid-item">Temperature:</div>
          <div className="grid-item">High of {tempMax}&deg;C</div>
          <div className="grid-item"></div>
          <div className="grid-item">Feels like {tempFL}&deg;C</div>
          <div className="grid-item">Wind:</div>
          <div className="grid-item">{windSpeed}mph {this.formatDirection(windDirection)}</div>
          <div className="grid-item"></div>
          <div className="grid-item">Gusts of {gusts}mph</div>

        </div>
      </div>
    )
  }


})

module.exports = MountDetailInfo;
