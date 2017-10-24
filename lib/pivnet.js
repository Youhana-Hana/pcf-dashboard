const api = require('./api');

let pivnet = {};

pivnet.get = (done) => {
  getErt()
    .then(body => {
      return done(null, body);
    })
    .catch(error => {
      return done(error);
    });
};


function getErt() {
  const URL = 'https://network.pivotal.io/api/v2/products/elastic-runtime/releases';

  return new Promise((resolve, reject) => {
    api.get(URL)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = pivnet;
