const React = require('react');
const DatePicker = require('react-datepicker');
const moment = require('moment');
const MountDetailInfo = require('./mount_detail_info');
const MountDetailBagged = require('./mount_detail_bagged');

require('react-datepicker/dist/react-datepicker.css');

const MountDetail = React.createClass({

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
      <div>
        <MountDetailInfo 
          focusMount={this.props.focusMount}
          dayNum={this.props.dayNum} />

        <MountDetailBagged
          focusMount={this.props.focusMount} 
          bagged={this.props.bagged} />
      </div>
    )
    
  }
})




module.exports = MountDetail;