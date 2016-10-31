const React = require('react');
const MountainDetail = require('./mountain_detail');

const Window = React.createClass({

 render: function() {
  return (
    <div id="window">
      <MountainDetail focusMount={this.props.focusMount} bagged={this.props.baggedStatusChanged}/>
    </div>
  )
 }

})

module.exports = Window;
