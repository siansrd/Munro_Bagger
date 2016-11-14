var React = require('react');

const Welcome = React.createClass ({

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  render: function() {
    return (
      <div>   
        <p>Munro Bagger maps all of the Munros in Scotland, displays their weather and allows you to keep track of the ones you've bagged. The weather is a daily forecast taken from the Met Office.</p>

        <div className="flex-grid">
          <div className="grid-item">Sunny:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-sunny.png"/></div>
          <div className="grid-item">Not Sunny:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-not-sunny.png"/></div>
        </div>
        <p><span className="user-link" onClick={this.clickSignUp}>Register</span> to track your bagged Munros.</p>
        <div className="flex-grid">
          <div className="grid-item">Bagged:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-bagged.png"/></div>
          <div className="grid-item">Not Bagged:</div>
          <div className="grid-item"><img className="icon" src="/public/images/mntn-not-bagged.png"/></div>
        </div>
      </div>
    )
  }

});

module.exports = Welcome;

