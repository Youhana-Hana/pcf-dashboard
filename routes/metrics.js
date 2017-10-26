'use strict';

const express = require('express');
const pivent = require('../lib/pivnet');
const environments = require('../lib/environments');

const router = express.Router();
router.get('/metrics/pivnet', (req, res) => {
  pivent.get((err, data) => {
    res.json(data).status(200);
  });
});

router.get('/metrics/environments', (req, res) => {
  environments.get(function(err, data) {
    res.json(data).status(200);
  });
});

module.exports = router;
