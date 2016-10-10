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
  // createTabs: function() {
  //   var tabs = document.createElement('ul');
  //   var container = document.getElementById('tabsContainer').appendChild(tabs);
  //   var tab = document.createElement('li');
  //   var tabLink = "<a href="#" class="tablinks" onclick="openCity(event, 'London')">London</a>"
  //   tab.innerHTML = tabLink;
  //   tabs.appendChild(tab);


  // },
  render: function() {
    var newMount = new Mountains();
    newMount.all(function(mtns){  
      this.populateList(mtns);
    }.bind(this)); 
    this.createTabs();
  }
};


module.exports = List;