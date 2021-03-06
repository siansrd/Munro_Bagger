const React = require('react');

const Forecast = React.createClass ({

  getInitialState: function(){
    return {
      selected: "0"
    }
  },

  isFocus:function(value){
    return ((value===this.state.selected) ? 'active':'inactive');
  },

  changeForecast: function(event) {
    let dayNum = event.target.value
    this.props.selectForecast(dayNum)
    this.setState({selected: event.target.value})
  },

  render: function() {
    return (
      <div id="weather-buttons">
        <h3>Weather</h3>

        <div className="flex-grid-weather">
          <div className="grid-item-weather">
            <button 
              className={this.isFocus("0")} 
              value="0"
              onClick={this.changeForecast}>Today</button>
          </div>
          <div className="grid-item-weather">
            <button 
              className={this.isFocus("1")} 
              value="1" 
              onClick={this.changeForecast}>Tomorrow</button>
          </div>
          <div className="grid-item-weather">
            <button 
              className={this.isFocus("2")} 
              value="2" 
              onClick={this.changeForecast}>Day After</button>
          </div> 
        </div>

      </div>
    )
  }



})

module.exports = Forecast;