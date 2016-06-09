// GET messages
var get = function (req, res) {
  console.log("Sending message list", db.msgs);
  res.json(db.msgs);
};

// POST messages
var post = function (req, res) {
  var msg = req.swagger.params.msg.value || "";
  db.msgs.push(msg);
  console.log("Inserting message", msg);
  res.json("Ok");
};

// DELETE messages
var clear = function (req, res) {
  console.log("Clearing messages");
  db.msgs = [];
  res.json("Ok");
};

module.exports = { get: get, post: post, delete: clear };
