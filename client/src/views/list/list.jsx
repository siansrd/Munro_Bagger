var React = require('react');
var ListEntry = require('./list_entry.jsx').ListEntry;
var ListAnchor = require('./list_entry.jsx').ListAnchor;

var List = React.createClass({
  render: function() {

    var alphabet = [];

    for (var i = 0; i < 26; i++) {
      var letter = String.fromCharCode('A'.charCodeAt() + i);
      var result = this.props.data.filter(function(mv) {
        return mv.mountain.name[0] === letter;
      })
      if (result.length > 0) alphabet.push({ letter: letter, mountains: result});
    }

    var mtnList = [];

    for (i = 0; i < alphabet.length; i++) {
      var mtns = alphabet[i].mountains;
      mtnList.push(
        <ListAnchor
          key={mtns[0].id}
          id={mtns[0].id}
          clicked={this.props.clicked}
          initial={alphabet[i].letter}>
          {mtns[0].mountain.name}
        </ListAnchor>
      )
      for (var j = 1; j < mtns.length; j++) {
        mtnList.push(
          <ListEntry
            key={mtns[j].id}
            id={mtns[j].id}
            clicked={this.props.clicked}>
            {mtns[j].mountain.name}
          </ListEntry>
        )
      }
    }

    return(<div>{mtnList}</div>)
  }
})

module.exports = List;
