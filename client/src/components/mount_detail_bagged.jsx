const React = require('react');
// const DatePicker = require('react-datepicker');
const moment = require('moment');

// require('react-datepicker/dist/react-datepicker.css');

const MountDetailBagged = React.createClass({

  getInitialState: function(){
    return {
      bagged: this.props.focusMount.bagged
      // baggedDate: moment(),
    }
  },

  // handleDateChange: function(date) {
  //   this.setState({
  //     baggedDate: date
  //   });
  //   this.props.date(date)
  // },

  handleBaggedChange: function(event) {
    let status = event.target.checked;
    this.setState({bagged: status})
    this.props.bagged(status)
  },

  render: function() {
    let checked = this.props.focusMount.bagged;
    let opts = (this.props.disabled) ? {'disabled': 'disabled', 'checked': checked } : { 'checked': checked };
    
    return (
        <div className="flex-grid">
            <div className="grid-item"><label htmlFor="bagged">Bagged:</label></div>
            <div className="grid-item">
              <input type="checkbox" id="bagged" {...opts} onChange={this.handleBaggedChange}/>
            </div>
        </div>
    )
  }
});

module.exports = MountDetailBagged;