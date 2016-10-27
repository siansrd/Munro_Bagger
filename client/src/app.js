const React = require('react');
const ReactDOM = require('react-dom');
const MapObject = require('./models/map_obj.js')
const UI = require('./components/ui')

window.onload = function(){
  ReactDOM.render(
    <UI mapObject={new MapObject(document.getElementById('map'))}/>,
    document.getElementById('ui')
  );
}