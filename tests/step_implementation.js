/* globals gauge*/

"use strict";

var request = require("request"),
    assert = require("assert");

var SERVER = process.env.API_BASE;

/**
 * Step implementation to send messages
 */
gauge.step("Send message <msg>", function(msg, done) {
  // Send a HTTP request to the server
  request({ method: "POST", baseUrl: SERVER, uri: "/messages",  json: { msg: msg } }, function (err, res, body) {
    try {
      // If request had error, throw it
      if (err) {
        throw err;
      }
      // If the response received was HTTP Status 200, then proceed
      if (res.statusCode !== 200) {
        throw new Error("HTTP Status " + res.statusCode + ". " + body);
      }

      // Assert on the content body of the API response
      assert.equal("Ok", body);
      done();
    } catch (err) {
      done(err);
    }
  });
});


/**
 * Step implementation to retrieve messages
 */
gauge.step("Retrieve messages and validate <msgs>", function(msgs, done) {
  var msglist = msgs.rows.map(function (row) {
    return row.cells[0];
  });
  // Send a HTTP request to the server
  request({ baseUrl: SERVER, uri: "/messages", json: true }, function (err, res, body) {
    try {
      // If request had error, throw it
      if (err) {
        throw err;
      }
      // If the response received was HTTP Status 200, then proceed
      if (res.statusCode !== 200) {
        throw new Error("HTTP Status " + res.statusCode + ". " + body);
      }

      gauge.message("Response received: " + body);
      assert.equal(msglist.length, body.length, "Match number of messages retrieved");

      if (msglist) {
        // Assert on the content body of the API response
        body.forEach(function (item, i) {
          var parsedmsg = JSON.parse(item).msg;
          assert.equal(parsedmsg, msglist[i], "Match message " + parsedmsg);
        });
      }
      done();
    } catch (err) {
      done(err);
    }
  });
});


/**
 * Step implementation to clear messages buffer
 */
gauge.step("Clear messages", function(done) {
  // Send a HTTP request to the server
  request({ method: "DELETE", baseUrl: SERVER, uri: "/messages",  json: true }, function (err, res, body) {
    try {
      // If request had error, throw it
      if (err) {
        throw err;
      }
      // If the response received was HTTP Status 200, then proceed
      if (res.statusCode !== 200) {
        throw new Error("HTTP Status " + res.statusCode + ". " + body);
      }

      // Assert on the content body of the API response
      assert.equal("Ok", body);
      done();
    } catch (err) {
      done(err);
    }
  });
});
