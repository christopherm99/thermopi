const { setTarget } = require("../../schedule");

module.exports = {
  get(req, res) {
    res.app.locals.target
      ? res.send(res.app.locals.target)
      : res.status(503).send("Service Unavailable: Target Unset");
  },
  post(req, res) {
    try {
      setTarget(res.app, req.body.value, req.body.persistent);
    } catch (err) {
      res.status(400).send("Bad Request: " + err.message);
      return;
    }
    res.status(202).send("Accepted");
  }
};
