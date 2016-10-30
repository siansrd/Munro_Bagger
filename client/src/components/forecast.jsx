const React = require('react');

const Forecast = React.createClass ({

  render: function() {

    return (
      <div id="weather-buttons">
        <button id="day0">Today</button>
        <button id="day1">Tomorrow</button>
        <button id="day2">Day After</button>
      </div>
    )

  }



})

module.exports = Forecast;