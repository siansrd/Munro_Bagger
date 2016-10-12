var Map = require('../models/map');
var Mountains = require('../models/mountains');

var List = function(){
  this.render(); 
}

List.prototype = {
  populateList: function(myMountains){
    var currentInitial = "";
    for (var i = 0;  i < myMountains.length; i++){
      var getFirst = myMountains[i].name.charAt(0);
      console.log(getFirst);
      if (currentInitial == getFirst) { 
       var munro = document.createElement('li');
       munro.innerHTML = myMountains[i].name;
       document.getElementById('munroList').appendChild(munro); 
      }
      else {
        currentInitial=getFirst;
        var munro = document.createElement('li');
        var a = document.createElement("a")
        a.textContent = myMountains[i].name;
       // a.setAttribute('href',"#"+currentInitial);
        a.setAttribute('name',currentInitial);
        munro.appendChild(a);
        document.getElementById('munroList').appendChild(munro); 
      }


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


// populateList: function(myMountains){
//   var currentInitial = "A";
//   for (var i = 0;  i < myMountains.length; i++){
//     var getFirst = myMountains[i]name.charAt(1);
//     if (currentInitial == getFirst) { 
//       var munro = document.createElement('li');
//       munro.innerHTML = myMountains[i].name;
//       document.getElementById('munroList').appendChild(munro); 
//     }
//   };
// },