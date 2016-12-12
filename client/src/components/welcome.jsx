var React = require('react');

const Welcome = React.createClass ({

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  render: function() {
    return (
      <div>  

        <p>Click the icons on the map for more details about the Munros and their weather.</p>
        <p><span className="user-link" onClick={this.clickSignUp}>Register</span> to track your bagged Munros.</p>
        <h4>Key</h4>
        <div className="flex-grid">
          <div className="grid-item-key">
            <img className="icon" src="/public/images/mntn-sunny.png"/>
            <img className="icon" src="/public/images/mntn-not-sunny.png"/>
          </div>
          <div className="grid-item-key">- Munro (Sunny/Not Sunny)</div>
          <div className="grid-item-key">
            <img className="icon" src="/public/images/mntn-bagged-sunny.png"/>
            <img className="icon" src="/public/images/mntn-bagged.png"/>
          </div>
          <div className="grid-item-key">- Bagged (Sunny/Not Sunny)</div>
          <div className="grid-item-key">
            <img className="icon" src="/public/images/mntn-not-bagged-sunny.png"/>
            <img className="icon" src="/public/images/mntn-not-bagged.png"/>
          </div>
          <div className="grid-item-key">- Not Bagged (Sunny/Not Sunny)</div>
        </div>

      </div>
    )
  }

});

module.exports = Welcome;

