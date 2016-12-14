const React = require('react');

const Logo = React.createClass({

  onClickLogo: function(){
    this.props.logoLinkClicked();
  },

  render: function() {

    return (
      <div id="logo" onClick={this.onClickLogo}>
        <h1>Munro Bagger</h1>
      </div>
    )
  }

});

module.exports = Logo