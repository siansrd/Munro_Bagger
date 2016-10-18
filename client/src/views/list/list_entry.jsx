var React = require('react');

var ListEntry = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var changed = (this.props.highlighted !== nextProps.highlighted);
    return changed;
  },

  render: function() {
    var style = (this.props.highlighted) ? {color: "red"} : {};
    return(
      <li
        onClick={this.clickHandler}
        style={style}>
        {this.props.children}
      </li>
    );
  }
})

var ListAnchor = React.createClass({

  clickHandler: function() {
    this.props.clicked(this.props.id);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var changed = (this.props.highlighted !== nextProps.highlighted);
    return changed;
  },

  render: function() {
    var style = (this.props.highlighted) ? {color: "red"} : {};
    return(
      <li
        onClick={this.clickHandler}>
        <a
          name={this.props.initial}
          style={style}>
          {this.props.children}
        </a>
      </li>
    );
  }
})

module.exports = {
  ListEntry: ListEntry,
  ListAnchor: ListAnchor
}