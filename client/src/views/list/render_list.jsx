var React = require('react');
var ReactDOM = require('react-dom');
var List = require('./list.jsx')

var renderList = function(mtns, onclick) {
  ReactDOM.render(<List data={mtns} clicked={onclick}/>, document.getElementById('munroList'));
}

module.exports = renderList;