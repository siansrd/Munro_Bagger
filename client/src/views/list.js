var Map = require('../models/map');
var Mountains = require('../models/mountains');

var List = function(){
  this.render(); 
}

List.prototype = {
  populateList: function(myMountains){
    for (var i = 0;  i < myMountains.length; i++){
       var munro = document.createElement('li');
       munro.innerHTML = myMountains[i].name;
       document.getElementById('munroList').appendChild(munro); 
    };
  },
  render: function() {
    var newMount = new Mountains();
    newMount.all(function(mtns){  
      this.populateList(mtns);
    }.bind(this)); 
  }
};


module.exports = List;