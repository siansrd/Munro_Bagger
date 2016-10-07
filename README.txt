Project 3: Munro Bagger.

Task:
1. The mountain API has been added. It is available at http://localhost:3000/api/mountains. To get it working you will have to do an npm install (to pick up mongodb) then run "mongo < helpers/make_seeds/seeds.js". After that make sure that mongod and nodemon are running.

2. The mountain model has been created. To get an array of all mountains back from the API you have to do the following:
  new Mountains().all(function(mtns){
    myMountain = mtns;
  })
myMountains now contains the information for all 282 mountains.