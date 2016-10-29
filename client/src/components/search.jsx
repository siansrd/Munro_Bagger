const React = require ('react');
import Autosuggest from 'react-autosuggest';

const Search = React.createClass({

  getInitialState: function() {
    return {
      value: "",
      suggestions: []
    }
  },

  getSuggestions: function(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.mountains.filter(mount =>
      mount.mountain.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  },

  getSuggestionValue: function(suggestion) {return suggestion.mountain.name},

  renderSuggestion: function(suggestion){
    return (
    <div>
      {suggestion.name}
    </div>
    )
  },

  onChange: function(event, { newValue }) {
    this.setState({
      value: newValue
    });
  },

  onSuggestionsFetchRequested: function({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  },

  onSuggestionsClearRequested: function() {
    this.setState({
      suggestions: []
    });
  },

  render: function() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search Munros',
      value,
      onChange: this.onChange
    };
    

    return (

      <div id="search">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
})

module.exports = Search;

