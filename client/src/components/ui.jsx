const React = require('react');
const MountView = require('./mountain_view')

const UI = React.createClass({

  render: function() {
    return (
      <MountView mapObject={this.props.mapObj}/>
    )
  }
})

module.exports = UI;