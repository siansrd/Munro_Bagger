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

  addTabs: function(){
    var str= "ABCDEFGHLMNPRST"
    var tabContainer= document.getElementById("munroTabs")

    var munroUL=document.createElement("ul");
    for (var i=0  ; i < str.length; i++){
      var initialLi=document.createElement("li");
      initialLi.innerText  = str.charAt(i);
      initialLi.onclick=this.openSection;
      munroUL.appendChild(initialLi)
    }
    tabContainer.appendChild(munroUL);
  },

  populateTabSections: function(myMountains){
    var alphabet = [];
    for (var c = 0; c < 26; c++) {
      letter = String.fromCharCode('A'.charCodeAt() + c);
      result = myMountains.filter(function(mtn) {
        return mtn.name[0] === letter;
      })
      if (result.length > 0) alphabet.push({ letter: letter, mountains: result});
    }

    // var munroList = document.createElement('ul');

    for (var i = 0;  i < alphabet.length; i++) {
      var mountains = alphabet[i].mountains;
      var divID = alphabet[i].letter;
      var munroDiv = document.createElement('div');
      munroDiv.setAttribute("id", divID);
      munroDiv.setAttribute("class", "singleItem");
      if ( i !== 0 ){
        munroDiv.setAttribute("style","display:none");
      };

      for(var j = 0; j < mountains.length; j++) {
        var munro = document.createElement('li');
        munro.innerText = mountains[j].name;
        munroDiv.appendChild(munro); 
      }
      document.getElementById("munroTabSections").appendChild(munroDiv);
    }
  },

  openSection: function(evt) {
     var i, tabcontent, tablinks;
     tabcontent = document.getElementsByClassName("tabcontent");
     for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
     }
     tablinks = document.getElementsByClassName("tablinks");
     for (i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" active", "");
     }
     document.getElementById(this.innerText).style.display = "block";
     console.log(this.innerText);
     evt.currentTarget.className += " active";
   },


  render: function() {
    var newMount = new Mountains();
    newMount.all(function(mtns){  
     // this.populateList(mtns);
      this.populateTabSections(mtns);
    }.bind(this)); 
    this.addTabs();
  }
};




module.exports = List;