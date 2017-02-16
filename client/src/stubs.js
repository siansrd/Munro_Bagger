const navigator = {
  onLine: true
};

const XMLHttpRequest = function() {
  // Request
  this.verb = undefined;
  this.url = undefined;
  this.onload = undefined;
  this.headers = {};
  this.content = undefined;
  // Response
  this.status = undefined;
  this.responseText = undefined;
}

XMLHttpRequest.prototype.open = function(verb, url) {
  this.verb = verb;
  this.url = url;
}

XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
  if (name) this.headers[name] = value;
}

XMLHttpRequest.prototype.send = function(content = null) {
  this.content = content;
  HttpServer.receive(this);
}

XMLHttpRequest.prototype.willRespondWith = function(status, text) {
  this.status = status;
  this.responseText = text;
}

const HttpServer = {
  requests: null,
  responses: null,
  initialize: function() {
    this.requests = [];
    this.responses = [];
  },
  receive: function(request) {
    this.requests.push(request);
  },
  respondWith: function(verb, url, response) {
    this.responses.push({verb: verb, url: url, response: response})
  },
  respond: function() {
    for (let request of this.requests) {
      const respondWith = this.responses.find(function(item) {
        return ((item.verb === request.verb) && (item.url === request.url))
      });
      if (respondWith) {
        request.status = respondWith.response[0];
        if (respondWith.response[1]) request.responseText = respondWith.response[1];
        if (request.onload) request.onload();
      }
    }
  }
}

module.exports = {
  navigator: navigator,
  XMLHttpRequest: XMLHttpRequest,
  HttpServer: HttpServer
}