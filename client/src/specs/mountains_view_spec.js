const MountainsView = require("../views/mountains_view");
const Mountains = require("../models/mountains");
const UserMountain = require("../models/user_mountain")
const stubData = require("./stub_data");
const sinon = require("sinon");
const assert = require("assert");

describe("MountainsView", function(){

  var mountainsView;
  var modelStub;
  var user;

  before(function(){
  	mountainsView = new MountainsView();
  	modelStub = sinon.stub(mountainsView._mountainsModel, "_fetchFromNetwork");
  	modelStub.yields(stubData.munros);
  	user = {
  		baggedList: [
  			new UserMountain({id:  4, munro_id: 1, climbed_on: null}),
	  		new UserMountain({id:  9, munro_id: 3, climbed_on: null}),
	  		new UserMountain({id: 16, munro_id: 5, climbed_on: null})
  		]
  	}
  	mountainsView.all(function(){});
  })

  after(function(){
  	modelStub.restore();
  })

  it ( 'Has mountains', function() {
  	assert.strictEqual(mountainsView.mountains.length, 5);
  })

  it ( 'Has the right mountains', function() {
  	assert.strictEqual(mountainsView.mountains[0].id, 1);
  	assert.strictEqual(mountainsView.mountains[1].id, 2);
  	assert.strictEqual(mountainsView.mountains[2].id, 3);
  	assert.strictEqual(mountainsView.mountains[3].id, 4);
  	assert.strictEqual(mountainsView.mountains[4].id, 5);
  })

  it ( 'Creates forecastDates.max', function() {
    assert.strictEqual(mountainsView.forecastDates.max, "2017-02-05T17:00:00Z");
  })

  it ( 'Creates forecastDates.min', function() {
    assert.strictEqual(mountainsView.forecastDates.min, "2017-02-05T17:00:00Z");
  })

  it ( 'Creates forecastDates.ave', function() {
    assert.strictEqual(mountainsView.forecastDates.ave, "2017-02-05T17:00:00Z");
  })

  it ( 'Calculates forecastDates.aligned', function() {
    assert.strictEqual(mountainsView.forecastDates.aligned, true);
  })

  it ( 'Saves user on login', function() {
  	mountainsView.userLogin(user);
  	assert.strictEqual(mountainsView._user, user);
  })

  it ( 'Saves user bagged list on login', function() {
  	assert.strictEqual(mountainsView.mountains[0]._status, user.baggedList[0]);
  	assert.strictEqual(mountainsView.mountains[1]._status, null);
  	assert.strictEqual(mountainsView.mountains[2]._status, user.baggedList[1]);
  	assert.strictEqual(mountainsView.mountains[3]._status, null);
  	assert.strictEqual(mountainsView.mountains[4]._status, user.baggedList[2]);  	
  })

  it ( 'Forgets user on logout', function() {
  	mountainsView.userLogout();
  	assert.strictEqual(mountainsView._user, null);
  })

  it ( 'Forgets user bagged list on logout', function() {
  	assert.strictEqual(mountainsView.mountains[0]._status, null);
  	assert.strictEqual(mountainsView.mountains[1]._status, null);
  	assert.strictEqual(mountainsView.mountains[2]._status, null);
  	assert.strictEqual(mountainsView.mountains[3]._status, null);
  	assert.strictEqual(mountainsView.mountains[4]._status, null);  	
  })

})
