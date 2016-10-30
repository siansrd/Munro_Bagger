const React = require('react');

const Forecast = React.createClass ({

  changeForecast: function(event) {
    let dayNum = event.target.value
    this.props.selectForecast(dayNum);
  },

  render: function() {
    return (
      <div id="weather-buttons">
        <button value="0" onClick={this.changeForecast}>Today</button>
        <button value="1" onClick={this.changeForecast}>Tomorrow</button>
        <button value="2" onClick={this.changeForecast}>Day After</button>
      </div>
    )
  }



})

module.exports = Forecast;