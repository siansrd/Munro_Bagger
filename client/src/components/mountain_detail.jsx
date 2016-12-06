const React = require('react');

import { Card, CardTitle, CardText, CardActions } from 'react-mdl';

// const DatePicker = require('react-datepicker');
// const moment = require('moment');
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

<Card shadow={0} style={{width: '256px', height: '256px', background: '#3E4EB8'}}>
    <CardTitle expand style={{alignItems: 'flex-start', color: '#fff'}}>
        <h4 style={{marginTop: '0'}}>
            Featured event:<br />
            May 24, 2016<br />
            7-11pm
        </h4>
    </CardTitle>
    <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
        <Button colored style={{color: '#fff'}}>Add to Calendar</Button>
        <div className="mdl-layout-spacer"></div>
        <Icon name="event" />
    </CardActions>
</Card>