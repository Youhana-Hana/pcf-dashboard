'use strict';

const express = require('express');
const hostDeProd = require('./fixtures/hostlookup-DE1-PROD.json');
const hostSingaporeProd = require('./fixtures/hostlookup-SG1-PROD.json');
const hostUsQA = require('./fixtures/hostlookup-US1-QA-T3.json');

const router = express.Router();
router.get('/host/:hostName', (req, res) => {
  let payload = "";
  switch(req.params.hostName) {
    case "opsman-api-on-prodde.com":
        payload = hostDeProd;
        break;
    case "ops.internal-runtime.int.us1.bosch-iot-cloud.com":
        payload = hostUsQA;
        break;
    case "opsman-api-on-prodsingapore.com":
        payload = hostSingaporeProd;
        break;
    default:
        payload = "Unknown";
  }
  res.json(payload).status(200);
});

module.exports = router;
