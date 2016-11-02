const React = require('react');
const DatePicker = require('react-datepicker');
const moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

const MountDetailBagged = React.createClass({

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

    return (
      <div className="flex-grid">
        <div className="grid-item">Bagged:</div>
        <div className="grid-item">
          <input type="checkbox" onClick={this.handleBaggedChange}/>
          <DatePicker 
            selected={this.state.startDate} 
            onChange={this.handleDateChange} />
          <button>Update</button>
        </div>
      </div>
    )

  }

});

module.exports = MountDetailBagged;