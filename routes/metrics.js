var express = require('express');
var router = express.Router();

router.get('/metrics', function(req, res, next) {
  const payload = require('./fixtures.json');
  res.json(payload).status(200);
});

module.exports = router;
