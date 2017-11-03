'use strict';

const express = require('express');
const pivent = require('../lib/pivnet');
const environments = require('../lib/environments');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const router = express.Router();
const ttl = 60 * 60;

router.get('/metrics/pivnet', (req, res) => {
  const key = 'pivnet';

  let value = cache.get(key);
  if (value) {
    return res.json(value).status(200);
  }

  return pivent.get((err, data) => {
    if(err) {
      return res.status(500).json({error: err, message: 'Error getting pivnet'});
    }
    cache.set(key, data, ttl);
    return res.json(data);
  });
});

router.get('/metrics/environments', (req, res) => {
  const key = 'environments';

  let value = cache.get(key);
  if (value) {
    return res.json(value).status(200);
  }

  return environments.get(function(err, data) {
    if(err) {
      return res.status(500).json({error: err, message: 'Error getting environments'});
    }

    cache.set(key, data, ttl);
    return res.json(data);
  });
});

module.exports = router;
