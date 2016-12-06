const React = require('react');
const GridRef = require('../models/grid_ref');


const MountDetailInfo = React.createClass({

  formatDay: function(dayNum) {
    const days = ["Today", "Tomorrow", "Day After"];
    return days[dayNum];
  },

  formatDirection: function(direction) {
    const directions = { N: "North", E: "East", S: "South", W: "West" }
    if (direction.length == 1) return directions[direction]
    return direction
  },

  render: function() {
    const dayNum = this.props.dayNum;
    const detail = this.props.focusMount.detail;
    const forecast = detail.forecasts.day[dayNum];

    return (
      <div>
        <h3>{detail.name}</h3>
        <h4>({detail.meaning})</h4>
        <div className="flex-grid">
          <div className="grid-item">Height:</div>
          <div className="grid-item">{detail.height}m</div>
          <div className="grid-item">OS Grid Ref:</div>
          <div className="grid-item">{detail.gridRef.toString()}</div>
          <div className="grid-item">Lat/Long:</div>
          <div className="grid-item">{detail.latLng.lat}°, {detail.latLng.lng}°</div>
          <div className="grid-item">Region:</div>
          <div className="grid-item">{detail.region}</div>
        </div>

        <div className="cond-title"><h3>Conditions {this.formatDay(this.props.dayNum)}:</h3></div>
        <div className="flex-grid">
          <div className="grid-item">Weather:</div>
          <div className="grid-item">{forecast.description}</div>
          <div className="grid-item">Visibility:</div>
          <div className="grid-item">{forecast.visibility}</div>
          <div className="grid-item">Temperature:</div>
          <div className="grid-item">High of {forecast.temperature.max}&deg;C</div>
          <div className="grid-item"></div>
          <div className="grid-item">Feels like {forecast.temperature.feelsLike}&deg;C</div>
          <div className="grid-item">Wind:</div>
          <div className="grid-item">{forecast.wind.speed}mph {this.formatDirection(forecast.wind.direction)}</div>
          <div className="grid-item"></div>
          <div className="grid-item">Gusts of {forecast.wind.gusting}mph</div>

        </div>
      </div>
    )
  }


})

module.exports = MountDetailInfo;
