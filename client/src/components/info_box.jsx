const React = require('react');

const InfoBox = function(props){

  return (
    <div id="infoBox">
      {props.children}
    </div>
  )

}

module.exports = InfoBox;
