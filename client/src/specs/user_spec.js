var User = require("../models/user");
var assert = require("assert");

describe("User", function(){
  var user;

  before(function() {
    user = new User("user2@codeclan.com");
  })

  it ( 'has no mountain data', function() {
    assert.strictEqual(user.hasClimbed("1"), undefined);
  })

  it ( 'has mountain data', function() {
    user.getInfo(function() {
      assert.strictEqual(user.hasClimbed("1"), true);
    })
  })

  it ( 'can change mountain data', function() {
    user.getInfo(function() {
      assert.strictEqual(user.hasClimbed("2"), false);
      user.setHasClimbed("2", true);
      assert.strictEqual(user.hasClimbed("2"), true);
    })
  })

})