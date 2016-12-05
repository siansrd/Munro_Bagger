const React = require('react');
const ReactDOM = require('react-dom');
const UI = require('./components/ui');

window.onload = function(){
  ReactDOM.render(<UI />, document.getElementById('ui'));
}