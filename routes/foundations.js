const express = require('express');
const foundations = require('./fixtures/foundations.json');

const router = express.Router();
router.get('/foundations', (req, res) => {
  res.json(foundations).status(200);
});

module.exports = router;
