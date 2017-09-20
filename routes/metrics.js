const express = require('express');
const payload = require('./fixtures.json');

const router = express.Router();
router.get('/metrics', (req, res) => {
  res.json(payload).status(200);
});

module.exports = router;
