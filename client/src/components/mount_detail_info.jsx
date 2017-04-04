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
    const dayNum = this.props.dayNum;
    const detail = this.props.focusMount.detail;
    const forecast = detail.forecasts.day[dayNum];

    const unavailable = "Not available";
    const queries = "???";
    
    const description = (forecast.description) ? forecast.description : unavailable;
    const tempMax = (forecast.temperature.max) ? forecast.temperature.max : queries;
    const tempFL = (forecast.temperature.feelsLike) ? forecast.temperature.feelsLike : queries;
    const windDirection = (forecast.wind.direction) ? forecast.wind.direction : queries;
    const windSpeed = (forecast.wind.speed) ? forecast.wind.speed : queries;
    const gusts = (forecast.wind.gusting) ? forecast.wind.gusting : queries;
    const visibility = (forecast.visibility) ? forecast.visibility : unavailable;

    // <div className="grid-item">Region:</div>
    // <div className="grid-item">{detail.region}</div>
    <table>
    <tr>
    <th scope="row">Beth</th>
    <td>8</td>
    <td>January 14</td>
    </tr>
    </table>

    return (
      <div>
        <h3>{detail.name}</h3>
        <h4>({detail.meaning})</h4>
        <table>
          <tr>
            <th scope="row">Height:</th>
            <td>{detail.height}m</td>
          </tr>
          <tr>
            <th scope="row">OS Grid Ref:</th>
            <td>{detail.gridRef.toString()}</td>
          </tr>
          <tr>
            <th scope="row">Lat/Long:</th>
            <td>{detail.latLng.lat}°, {detail.latLng.lng}°</td>
          </tr>
        </table>

        <div className="cond-title"><h3>Conditions {this.formatDay(this.props.dayNum)}:</h3></div>

        <table>
          <tr>
            <th scope="row">Weather:</th>
            <td>{description}</td>
          </tr>
          <tr>
            <th scope="row">Visibility:</th>
            <td>{visibility}</td>
          </tr>
          <tr>
            <th scope="row">Temperature:</th>
            <td>High of {tempMax}&deg;C (Feels like {tempFL}&deg;C)</td>
          </tr>
          <tr>
            <th scope="row">Wind:</th>
            <td>{windSpeed}mph {this.formatDirection(windDirection)} ({gusts}mph Gusts)</td>
          </tr>
          <tr>
            <th scope="row">Precipitation:</th>
            <td>{(forecast.pofp) ? forecast.pofp : queries}% probability</td>
          </tr>
          <tr>
            <th scope="row">Humidity:</th>
            <td>{(forecast.humidity) ? forecast.humidity : queries}%</td>
          </tr>
        </table>

      </div>
    )
  }


})

module.exports = MountDetailInfo;
