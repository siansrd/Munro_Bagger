Project 3: Munro Bagger.

Task:
1. The mountain API has been added. It is available at http://localhost:3000/api/mountains. To get it working you will have to do an npm install (to pick up mongodb) then run "mongo < helpers/make_seeds/seeds.js". After that make sure that mongod and nodemon are running.

2. The mountain model has been created. To get an array of all mountains back from the API you have to do the following:
  m = new Mountains();
  m.all(function(mtns){
    myMountains = mtns;
  })
myMountains now contains the information for all 282 mountains.

3. Two bugs fixed:
  a. seeds.js (see 1, above), has now had the quotes stripped away from height, lat and lng.
  b. mountains.js now works with the array of mountains instead of the object containing the array.