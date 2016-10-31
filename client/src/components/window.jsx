const React = require('react');
const Welcome = require('./welcome');
const MountainDetail = require('./mountain_detail');

const Window = React.createClass({

 render: function() {

  if (!this.props.focusMount) return (
    <div id="window">
      <Welcome/>
    </div>
  )

  return (
    <div id="window">
      <MountainDetail focusMount={this.props.focusMount} bagged={this.props.baggedStatusChanged}/>
    </div>
  )
 }

})

module.exports = Window;
