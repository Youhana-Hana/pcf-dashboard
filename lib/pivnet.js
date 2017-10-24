'use strict';
const pivnetPayload = require('../routes/fixtures/fixtures-pivnet.json');

let pivnet = {};

pivnet.get = (done) => {
  return done(null, pivnetPayload);
};

module.exports = pivnet;
