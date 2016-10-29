const React = require ('react');

const Search = React.createClass({

  render: function() {
    return (
      <div id="search">
        <form>
          Search <input type="text" name="search"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
})

module.exports = Search;