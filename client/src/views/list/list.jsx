var React = require('react');
var ListEntry = require('./list_entry.jsx').ListEntry;
var ListAnchor = require('./list_entry.jsx').ListAnchor;

var List = React.createClass({

  getInitialState: function() {

    var alphabet = [];

    for (var i = 0; i < 26; i++) {
      var letter = String.fromCharCode('A'.charCodeAt() + i);
      var result = this.props.data.filter(function(mv) {
        return mv.mountain.name[0] === letter;
      })
      if (result.length > 0) alphabet.push({ letter: letter, mountains: result});
    }

    return {
      alphabet: alphabet,
      selected: null
    }
  },

  clickHandler: function(mtnId) {
    // TODO: Ask for the list to be redrawn with entry mtnId highlighted

    this.setState({selected: mtnId});
    this.render();
    this.props.clicked(mtnId);
  },

  render: function() {

    var mtnList = [];
    var alphabet = this.state.alphabet;
    for (var i = 0; i < alphabet.length; i++) {
      var mtns = alphabet[i].mountains;
      mtnList.push(
        <ListAnchor
          key={mtns[0].id}
          id={mtns[0].id}
          clicked={this.clickHandler}
          initial={alphabet[i].letter}
          highlighted={this.state.selected===mtns[0].id}>
          {mtns[0].mountain.name}
        </ListAnchor>
      )
      for (var j = 1; j < mtns.length; j++) {
        mtnList.push(
          <ListEntry
            key={mtns[j].id}
            id={mtns[j].id}
            clicked={this.clickHandler}
            highlighted={this.state.selected===mtns[j].id}>
            {mtns[j].mountain.name}
          </ListEntry>
        )
      }
    }

    return(<div>{mtnList}</div>)
  }
})

module.exports = List;
