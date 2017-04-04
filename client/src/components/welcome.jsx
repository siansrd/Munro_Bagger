var React = require('react');

const Welcome = React.createClass ({

  clickSignUp: function() {
    this.props.signUpClicked()
  },

  render: function() {
    return (
      <div>  

        <p>Click the icons on the map for more details about the Munros and their weather.</p>
        <p><span className="user-link" role="link" onClick={this.clickSignUp}>Register</span> to track your bagged Munros.</p>
        <h4>Key</h4>
        <table>
          <tr>
            <td>
              <img className="icon" alt="icon indicating sunny mountain" src="/public/images/mntn-sunny.png"/>
              <img className="icon" alt="icon indicating mountain with no sun" src="/public/images/mntn-not-sunny.png"/>
            </td>
            <td>- Munro (Sunny/Not Sunny)</td>
          </tr>

          <tr>
            <td>
              <img className="icon" alt="icon indicating mountain is bagged and sunny" src="/public/images/mntn-bagged-sunny.png"/>
              <img className="icon" alt="icon indicating mountain is bagged but not sunny" src="/public/images/mntn-bagged.png"/>
            </td>
            <td>- Bagged (Sunny/Not Sunny)</td>
          </tr>

          <tr>
            <td>
              <img className="icon" src="/public/images/mntn-not-bagged-sunny.png"/>
              <img className="icon" src="/public/images/mntn-not-bagged.png"/>
            </td>
            <td>- Not Bagged (Sunny/Not Sunny)</td>
          </tr>

        </table>

      </div>
    )
  }

});

module.exports = Welcome;

