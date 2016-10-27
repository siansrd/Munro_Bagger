const React = require('react');
const ReactDOM = require('react-dom');
const MapObject = require('./models/map_obj.js')
const UI = require('./components/ui')

window.onload = function(){
  const mapObj = new MapObject(document.getElementById('map'));
  ReactDOM.render(
    <UI mapObj={mapObj}/>,
    document.getElementById('ui')
  );
}