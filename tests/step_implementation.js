/* globals gauge*/

"use strict";

var request = require("request"),
    assert = require("assert");
var SERVER = "http://localhost:10010/";

// --------------------------
// Gauge step implementations
// --------------------------

gauge.step("Say hello as <name> and expect message: <msg>", function(name, msg, done) {
  // Send a HTTP request to the server
  request.get({baseUrl: SERVER, uri: "/hello",  qs: { name: name } }, function (err, res, body) {
    // If request had error, throw it
    if (err) throw err;
    // If the response received was HTTP Status 200, then proceed
    if (res.statusCode === 200) {
      // Assert on the content body of the API response
      assert.equal(JSON.stringify(msg), body);
      done();
    } else {
      // Throw error otherwise
      throw new Error("API response was not 200");
    }
  });
});
