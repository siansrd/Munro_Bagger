let ApiRequest = function() {
};

ApiRequest.prototype._makeRequest = function(httpVerb, url, expected, callback, content) {
  let request = new XMLHttpRequest()
  request.open(httpVerb, url);
  request.withCredentials = true;
  if (content) request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    console.log(httpVerb, "request to", url, "returned status", this.status);
    let status = expected.find(function(code) {
      return(code === this.status)
    }.bind(this))
    if (!status) return;
    let reply = (status === 204) ? null : JSON.parse(this.responseText);
    callback(status, reply);
  };
  let json = (content) ? JSON.stringify(content) : null;
  request.send(json);
}

ApiRequest.prototype.makeGetRequest = function(url, callback) {
  this._makeRequest("GET", url, [200], callback)
};

ApiRequest.prototype.makePostRequest = function(url, content, callback) {
  this._makeRequest("POST", url, [200, 201], callback, content)
}

ApiRequest.prototype.makePutRequest = function(url, content, callback) {
  this._makeRequest("PUT", url, [200, 201], callback, content)
}

ApiRequest.prototype.makeDeleteRequest = function(url, content, callback) {
  this._makeRequest("DELETE", url, [200, 201, 204], callback, content);
}

module.exports = ApiRequest;