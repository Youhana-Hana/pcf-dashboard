const express = require('express');
const deprecatedPayload = require('./fixtures/deprecated/fixtures.json');
const pivnetPayload = require('./fixtures/fixtures-pivnet.json');
const environmentsPayload = require('./fixtures/fixtures-environments.json');
const opsman = require('./fixtures/dashboard-info-opsman.json');
const pivnet = require('./fixtures/dashboard-info-pivnet.json');

const router = express.Router();
router.get('/metrics', (req, res) => {
  res.json(deprecatedPayload).status(200);
});
router.get('/metrics/pivnet', (req, res) => {
  res.json(pivnetPayload).status(200);
});
router.get('/metrics/environments', (req, res) => {
  res.json(environmentsPayload).status(200);
});
router.get('/metrics/pipeline/:pipelineName/region/:region/foundation/:foundation', (req, res) => {
  let payload = "";
  let path = './fixtures/' + req.params.region + '-' + req.params.foundation + '/' + req.params.pipelineName + '.json'
  switch(req.params.pipelineName) {
    case "upgrade-tile-ert":
    case "pivnet-to-s3":
        payload = require(path);
        break;
    case "dashboard-info-opsman":
        payload = opsman;
        break;
    case "dashboard-info-pivnet":
        payload = pivnet;
        break;
    default:
        res.json("Not found for: " + req.params.pipelineName + ' ' + req.params.region + ' ' + req.params.foundation).status(404);
        return;
  }
  res.json(payload).status(200);
});

module.exports = router;
