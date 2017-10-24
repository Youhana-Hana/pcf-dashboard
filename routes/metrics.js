const express = require('express');
const deprecatedPayload = require('./fixtures/deprecated/fixtures.json');
const pivnetPayload = require('./fixtures/fixtures-pivnet.json');
const environmentsPayload = require('./fixtures/fixtures-environments.json');
const opsman = require('./fixtures/dashboard-info-opsman.json');
const pivnet = require('./fixtures/dashboard-info-pivnet.json');
const environments = require('../lib/environments');

const router = express.Router();
router.get('/metrics/pivnet', (req, res) => {
  res.json(pivnetPayload).status(200);
});
router.get('/metrics/environments', (req, res) => {
  environments.get(function(err, data) {
    res.json(data).status(200);
  });
});

module.exports = router;
