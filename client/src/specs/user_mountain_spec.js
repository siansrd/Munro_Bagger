const UserMountain = require("../models/user_mountain");
const assert = require("assert");

describe("UserMountain", function(){

  var mountain;

  describe("Mountain from database", function(){

	  before(function(){
	    mountain = new UserMountain({ id: 34, munro_id: 5, climbed_on: null });
	  })

	  it ( 'Is bagged', function() {
	  	assert.strictEqual(mountain.bagged, true);
	  });

	  it ( 'Is not dirty', function() {
	  	assert.strictEqual(mountain.isDirty(), false);
	  });

	  it ( 'Has correct id', function() {
	  	assert.strictEqual(mountain.id, 5);
	  });

	  it ( 'Has correct originId', function() {
	  	assert.strictEqual(mountain._originId, 34);
	  });

	  it ( 'Has no bagged date', function() {
	  	assert.strictEqual(mountain.climbedOn, null);
	  });

	  it ( 'Sets dirty flag when date changed', function() {
	  	mountain.climbedOn = "2001-01-01";
	  	assert.strictEqual(mountain.climbedOn, "2001-01-01");
	  	assert.strictEqual(mountain.isDirty(), true);
	  })

	})

	describe("New Mountain", function(){

	  before(function(){
	    mountain = new UserMountain({ munro_id: 4, climbed_on: "2000-01-01" });
	  })

	  it ( 'Is not bagged', function() {
	  	assert.strictEqual(mountain.bagged, false);
	  });

	  it ( 'Is not dirty', function() {
	  	assert.strictEqual(mountain.isDirty(), false);
	  });

	  it ( 'Has correct id', function() {
	  	assert.strictEqual(mountain.id, 4);
	  });

	  it ( 'Has no originId', function() {
	  	assert.strictEqual(mountain._originId, undefined);
	  });

	  it ( 'Has bagged date', function() {
	  	assert.strictEqual(mountain.climbedOn, "2000-01-01");
	  });

	  it ( 'Sets dirty flag when bagged changed', function() {
	  	mountain.bagged = true;
	  	assert.strictEqual(mountain.bagged, true);
	  	assert.strictEqual(mountain.isDirty(), true);
	  })

	})

	describe("Mountain methods", function(){

		var date;

	  before(function(){
	    mountain = new UserMountain({ id: 42, munro_id: 1, climbed_on: null });
	    date = "2002-02-02";
	    mountain.climbedOn = date;
	  });

	  it ( 'Creates export object', function() {
	  	assert.deepStrictEqual(mountain.export(), { munro_id: 1, climbed_on: date });
	  });

	  it ( 'Creates a backup', function() {
	  	assert.deepStrictEqual(mountain.backup(), { climbedOn: date, bagged: true, dirty: true })
	  });

	  it ( 'Restores from backup', function () {
	  	const backup = mountain.backup();
	  	const newDate = "2003-03-03";
	  	mountain.climbedOn = newDate;
	  	mountain.bagged = false;
	  	assert.strictEqual(mountain.climbedOn, newDate);
	  	assert.strictEqual(mountain.bagged, false);
	  	mountain.restore(backup);
	  	assert.strictEqual(mountain.climbedOn, date);
	  	assert.strictEqual(mountain.bagged, true);	
	  })
	})
})