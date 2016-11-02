var React = require('react');

const Welcome = function(props) {

  return (
    <div>
      <p>Munro Bagger maps all of the Munros in Scotland, displays their weather and allows you to keep track of the ones you've bagged.</p>
      <p>The weather displayed is a daily forecast taken from the Met Office.</p>
      <p>Register to be able to track your bagged Munros</p>
    </div>
  )

};

module.exports = Welcome;