var React = require('react');

const AboutLink = React.createClass({

  onClickAbout: function(){
    this.props.aboutLinkClicked();
  },

  render: function(){

    return (
      <div id="aboutLink" className="menu-link" onClick={this.onClickAbout}>
        <h4>About</h4>
      </div>
    )
  }
});

module.exports = AboutLink;