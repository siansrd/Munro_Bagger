var React = require('react');

const ContactUs = React.createClass ({

  render: function() {
    return (
      <div>
        <p>
        Munro Bagger was created as part of a <a className="user-link" href="https://codeclan.com/">CodeClan</a> project by Sian Robinson Davies, Phil Crooks & John Easton from Cohort 6.
        </p>
        <p>
          If you have any queries or suggestions, please get in touch on twitter!
          <br/>
          <a className="user-link" href="https://twitter.com/johneas10">@johneas10</a>
          <br/>
          <a className="user-link" href="https://twitter.com/sayssian">@sayssian</a>
          <br/>
          <a className="user-link" href="https://twitter.com/phil_crooks">@phil_crooks</a>
          </p>
        <p>
          Alternatively, drop us an email <a className="user-link" href="INSERT EMAIL ADDRESS HERE">here.</a>
        </p>
      </div>
    )
  }

});

module.exports = ContactUs;
