const React = require('react');
const ReactDOM = require('react-dom');
const MapObject = require('../views/map')

const Map = React.createClass({

	componentDidMount: function() {
  	const node = ReactDOM.findDOMNode(this.refs.map);
  	const mapObj = new MapObject(node);
  	this.props.mapLoaded(mapObj);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		return false;
	},

  render: function(){
  	return (
	    <div ref='map' className='map'>
	    </div>
	  )
  }
});

module.exports = Map;