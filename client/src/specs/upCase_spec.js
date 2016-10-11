var upCase = require("../models/upCase");
var assert = require("assert");

describe("upCase", function(){

  it("should be upCase", function(){
    string = "This is a Funky kind of string and i'm going To Capitalise the first Letter in Each word"
    assert.strictEqual(upCase(string), "This Is A Funky Kind Of String And I'm Going To Capitalise The First Letter In Each Word");
  });
});
