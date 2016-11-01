const React = require('react');

const Filter = React.createClass({

  getInitialState: function () {
    return {
      selectedOption: 'all'
    }
  },


  handleFilterChange: function(event) {
    let value = event.target.value;
    this.setState({selectedOption: value});
    this.props.filterOption(value);
  },


  render: function() {

    return (
      <div id="filter">
        <label>Filter:</label>
        <label>All
          <input type="radio" name="filter" value="all" checked={this.state.selectedOption === 'all'} onChange={this.handleFilterChange} />
        </label>
        <label>Bagged
          <input type="radio" name="filter" value="bagged" checked={this.state.selectedOption === 'bagged'} onChange={this.handleFilterChange}/>
        </label>
        <label>Not Bagged
          <input type="radio" name="filter" value="notBagged" checked={this.state.selectedOption === 'notBagged'} onChange={this.handleFilterChange}/>
        </label>
      </div>
    )
  }

})

module.exports = Filter;