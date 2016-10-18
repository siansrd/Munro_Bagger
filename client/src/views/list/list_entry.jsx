var React = require('react');

var ListEntry = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  render: function() {
    var style = (this.props.highlighted) ? {color: "red"} : {};
    console.log(this.props.highlighted);
    return(<li onClick={this.clickHandler} style={style}>{this.props.children}</li>);
  }
})

var ListAnchor = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  render: function() {
    var style = (this.props.highlighted) ? {color: "red"} : {};
    console.log(this.props.highlighted);
    return(<li onClick={this.clickHandler}><a name={this.props.initial} style={style}>{this.props.children}</a></li>);
  }
})

module.exports = {
  ListEntry: ListEntry,
  ListAnchor: ListAnchor
}