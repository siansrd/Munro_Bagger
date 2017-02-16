process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const assert = require("assert");
const ApiRequest = require('../models/api_request');
const server = require('../stubs').HttpServer;
const stubData = require("./stub_data");
const baseURL = "https://www.munrobagger.scot/";
const token = "JsonWebToken";


describe("API Request", function() {

  var apiRequest;

  describe("All Request Types", function() {

    beforeEach(function() {
      server.initialize();
      apiRequest = new ApiRequest();
    });

    it("Create a GET Request", function () {
      const url = baseURL + "munros";

      apiRequest.makeGetRequest(url, token, function(){});

      assert.strictEqual(server.requests[0].verb, "GET");
      assert.strictEqual(server.requests[0].url, url);
      assert.strictEqual(server.requests[0].content, null);
      assert.deepStrictEqual(server.requests[0].headers, { Authorization: 'Bearer JsonWebToken' });
    });

    it("Make a GET Request", function () {
      const url = baseURL + "munros";
      const json = stubData.jsonMunros();
      const callback = sinon.spy();

      server.respondWith("GET", url, [200, json]);

      apiRequest.makeGetRequest(url, token, callback);

      server.respond(); // Process all requests so far

      assert.strictEqual(callback.callCount, 1);
      const call = callback.getCall(0);
      assert.strictEqual(call.args[0], 200);
      assert.deepStrictEqual(call.args[1], JSON.parse(json));
    });

    it("Create a POST Request", function () {
      const url = baseURL + "users";
      const params = { user: { email: 'email@email.com', password: 'password' } };

      apiRequest.makePostRequest(url, params, null, function(){});

      assert.strictEqual(server.requests[0].verb, "POST");
      assert.strictEqual(server.requests[0].url, url);
      assert.strictEqual(server.requests[0].content, JSON.stringify(params));
      assert.deepStrictEqual(server.requests[0].headers, { 'Content-Type': 'application/json' });
    });

    it("Make a POST Request", function () {
      const url = baseURL + "users";
      const params = { user: { email: 'email@email.com', password: 'password' } };
      const json = JSON.stringify({ id: 11, email: 'email@email.com' });
      const callback = sinon.spy();

      server.respondWith("POST", url, [201, json]);

      apiRequest.makePostRequest(url, params, null, callback);

      server.respond(); // Process all requests so far

      assert.strictEqual(callback.callCount, 1);
      const call = callback.getCall(0);
      assert.strictEqual(call.args[0], 201);
      assert.deepStrictEqual(call.args[1], JSON.parse(json));
    });

    it("Create a PUT Request", function () {
      const url = baseURL + "bagged_munros/5";
      const params = { munro_id: 24, climbed_on: undefined }

      apiRequest.makePutRequest(url, params, token, function(){});

      assert.strictEqual(server.requests[0].verb, "PUT");
      assert.strictEqual(server.requests[0].url, url);
      assert.strictEqual(server.requests[0].content, JSON.stringify(params));
      assert.deepStrictEqual(server.requests[0].headers, { 'Content-Type': 'application/json', Authorization: 'Bearer JsonWebToken' });
    });

    it("Make a PUT Request", function () {
      const url = baseURL + "bagged_munros/5";
      const params = { munro_id: 24, climbed_on: undefined }
      const json = JSON.stringify({ munro_id: 24, climbed_on: null });
      const callback = sinon.spy();

      server.respondWith("PUT", url, [201, json]);

      apiRequest.makePutRequest(url, params, token, callback);

      server.respond();

      assert.strictEqual(callback.callCount, 1);
      const call = callback.getCall(0);
      assert.strictEqual(call.args.length, 2);
      assert.strictEqual(call.args[0], 201);
      assert.deepStrictEqual(call.args[1], JSON.parse(json));
    });

    it("Create a DELETE Request", function () {
      const url = baseURL + "sessions";

      apiRequest.makeDeleteRequest(url, null, token, function(){});

      assert.strictEqual(server.requests[0].verb, "DELETE");
      assert.strictEqual(server.requests[0].url, url);
      assert.strictEqual(server.requests[0].content, null);
      assert.deepStrictEqual(server.requests[0].headers, { Authorization: 'Bearer JsonWebToken' });
    });

    it("Make a DELETE Request", function () {
      const url = baseURL + "sessions";
      const callback = sinon.spy();

      server.respondWith("DELETE", url, [204]);

      apiRequest.makeDeleteRequest(url, null, token, callback);

      server.respond(); // Process all requests so far

      assert.strictEqual(callback.callCount, 1);
      const call = callback.getCall(0);
      assert.strictEqual(call.args.length, 2);
      assert.strictEqual(call.args[0], 204);
      assert.strictEqual(call.args[1], null);
    });
  });
});
