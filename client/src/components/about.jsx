var React = require('react');

const About = React.createClass ({

  render: function() {
    return (
      <div>
        <p>Munro Bagger maps all of the Munros in Scotland, displays their weather and allows you to keep track of the ones you've bagged. The weather is a daily forecast taken from the Met Office.</p>
        <p>
        Munro Bagger was created as part of a <a className="user-link" target="_blank" href="https://codeclan.com/">CodeClan</a> project by Phil Crooks, John Easton & Siân Robinson Davies from Cohort 6.
        </p>
        <p>
          If you have any queries or suggestions, please get in touch on twitter!
          <br/>
          <a className="user-link" target="_blank" href="https://twitter.com/@MunroBaggerScot">@MunroBaggerScot</a>. Or drop us an email at <a className="user-link" href="mailto:munrobagger.scot@gmail.com">munrobagger.scot@gmail.com</a>
        </p>
      </div>
    )
  }

});

module.exports = About;
