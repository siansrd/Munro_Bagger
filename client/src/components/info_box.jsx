const React = require('react');

const InfoBox = React.createClass({

 render: function() {

  return (
    <div id="infoBox">
      {this.props.children}
    </div>
  )

 }
})

module.exports = InfoBox;
