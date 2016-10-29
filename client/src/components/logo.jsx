const React = require('react');

const Logo = React.createClass({

  render: function() {
    return (
      <div id="logo">
        <img alt="logo" src="/public/images/munrobagger_logo.png"/>
      </div>
    )
  }

});

module.exports = Logo