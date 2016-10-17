var createListEntry = function(mtn, map) {
  var munro = document.createElement('li');
  munro.innerHTML = mtn.mountain.name;
  munro.onclick = function() {
     map.zoomToPin(mtn.pin);
  }
  document.getElementById('munroList').appendChild(munro); 
}

var List = function(ui){
  this.ui = ui;
  this.mountainsView = ui.getMountainsView();
  this.populateList(this.mountainsView.mountains); 
}

List.prototype = {
  populateList: function(myMountains){

    var map = this.ui.getMap();
    var currentInitial = "";

    for (var i = 0;  i < myMountains.length; i++){
      var getFirst = myMountains[i].mountain.name.charAt(0);
      if (currentInitial == getFirst) { 
        createListEntry(myMountains[i], map);
      }
      else {
        currentInitial = getFirst;
        var munro = document.createElement('li');
        var a = document.createElement("a")
        a.textContent = myMountains[i].mountain.name;
       // a.setAttribute('href',"#"+currentInitial);
        a.setAttribute('name',currentInitial);
        munro.appendChild(a);
        document.getElementById('munroList').appendChild(munro); 
      }
    };
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