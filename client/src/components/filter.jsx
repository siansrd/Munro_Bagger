const React = require('react');

const Filter = React.createClass({

  render: function() {

    return (
      <div id="filter">
        <label>Filter:</label>
        <input type="radio" name="filter" value="all"/>
        <label>All</label>
        <input type="radio" name="filter" value="bagged"/>
        <label>Bagged</label>
        <input type="radio" name="filter" value="notBagged"/>
        <label>Not Bagged</label>
      </div>
    )
  }

})

module.exports = Filter;