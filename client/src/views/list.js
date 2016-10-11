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
    var str= "AB"
   // var str= "ABCDEFGHLMNPRST"
    // var htmlText=""
    // var headerText = "<ul class=\"tab\">"
    // for (var i=0  ; i < str.length; i++){
    //   var chr= str.charAt(i);
    //   htmlText = htmlText + "<li id='tabs'><a href=\"#\" class=\"tablinks\" onclick=\"openSection(event, '"+chr+"')\">"+chr+"   |</a></li>";
    // }
    // htmlText=htmlText+"</ul></TD></TABLE><hr>"
    //   //document.write(htmlText+"</ul></TABLE>");
    //  // document.write(htmlText);
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
      this.populateList(mtns);
    }.bind(this)); 

    this.addTabs();
  }
};




module.exports = List;