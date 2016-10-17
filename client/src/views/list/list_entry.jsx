var React = require('react');

var ListEntry = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  render: function() {
    return(<li onClick={this.clickHandler}>{this.props.children}</li>)
  }
})

var ListAnchor = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  render: function() {
    return(<li onClick={this.clickHandler}><a name={this.props.initial}>{this.props.children}</a></li>)
  }
})

module.exports = {
  ListEntry: ListEntry,
  ListAnchor: ListAnchor
}