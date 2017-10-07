const express = require('express');
const regionUs = require('./fixtures/regions-us.json');
const regionSingapore = require('./fixtures/regions-singapore.json');
const regions = require('./fixtures/regions.json');

const router = express.Router();
router.get('/regions', (req, res) => {
  res.json(regions).status(200);
});
router.get('/regions/host/:hostName', (req, res) => {
  let payload = "";
  switch(req.params.hostName) {
    case "myconcourse-on-produs.com":
        payload = regionUs;
        break;
    case "myconcourse-on-qaus.com":
        payload = regionUs;
        break;
    case "myconcourse-on-prodsingapore.com":
        payload = regionSingapore;
        break;
    default:
        payload = "Unknown";
  }
  res.json(payload).status(200);
});

module.exports = router;
