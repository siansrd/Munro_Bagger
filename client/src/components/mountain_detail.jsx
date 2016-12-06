const React = require('react');

import { Card, CardTitle, CardText, CardActions } from 'react-mdl';

// const DatePicker = require('react-datepicker');
// const moment = require('moment');
const MountDetailBagged = require('./mountain_detail_bagged');

// require('react-datepicker/dist/react-datepicker.css');

const MountDetail = React.createClass({

  formatDay: function(dayNum) {
    const days = ["Today", "Tomorrow", "the Day After"];
    return days[dayNum];
  },

  formatDirection: function(direction) {
    const directions = { N: "North", E: "East", S: "South", W: "West" }
    if (direction.length == 1) return directions[direction]
    return direction
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

    const dayNum = this.props.dayNum;
    const detail = this.props.focusMount.detail;
    const forecast = detail.forecasts.day[dayNum];

    let bagged = null;
    if (this.props.userLoggedIn) {
      bagged = (
        <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
          <MountDetailBagged
            focusMount={this.props.focusMount}
            bagged={this.props.bagged}
            disabled={this.props.disabled} />
        </CardActions>
      )
    }

    return (
      <Card shadow={6} style={{float:'right', width: '325px', height: '400px', margin: '30px'}}>
        <CardTitle expand style={{display: 'block', background: '#3E4EB8', color: '#fff'}}>
          <h5 style={{margin: '5px 0px'}}>{detail.name}</h5>
          <p style={{margin: '0px'}}>({detail.meaning})</p>
        </CardTitle>
        <CardText>
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
          <div className="cond-title"><h6 style={{color: 'black'}}>Conditions {this.formatDay(this.props.dayNum)}</h6></div>
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
        </CardText>
        {bagged}
      </Card>
    )

  }
})

module.exports = MountDetail;
