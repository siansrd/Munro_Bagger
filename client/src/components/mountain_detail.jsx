const React = require('react');
// const DatePicker = require('react-datepicker');
const moment = require('moment');
const MountDetailInfo = require('./mount_detail_info');
const MountDetailBagged = require('./mount_detail_bagged');

// require('react-datepicker/dist/react-datepicker.css');

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

    if (!this.props.userLoggedIn) return (
      <div>
        <MountDetailInfo
          focusMount={this.props.focusMount}
          dayNum={this.props.dayNum} />
      </div>
    )

    return (
      <div>
        <MountDetailInfo
          focusMount={this.props.focusMount}
          dayNum={this.props.dayNum} />

        <MountDetailBagged
          focusMount={this.props.focusMount}
          bagged={this.props.bagged}
          disabled={this.props.disabled} />
      </div>
    )

  }
})




module.exports = MountDetail;
