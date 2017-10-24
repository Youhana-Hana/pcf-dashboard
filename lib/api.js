let api = {};

const pivnetPayload = require('../routes/fixtures/fixtures-pivnet.json');
api.get = (url) => {
  return new Promise((resolve, reject) => {
    return resolve(pivnetPayload);
  });
};

module.exports = api;
