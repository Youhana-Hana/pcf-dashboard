'use strict';

const api = require('./api');

let cisync = {};

cisync.get = function(source, item, done) {
  let cisyncPayload = "";
  if(source.mocked){
    console.log("Using mocked version of CI Sync for " + `${item.region}-${item.foundation}`);
    cisyncPayload = require(`../routes/fixtures/${item.region}-${item.foundation}/${source.name}.json`);
    return done(null, cisyncPayload);
  } else {
    console.log("Calling CISync API with GET for " + `${item.region}-${item.foundation}`);

    let url = source.url;
    url = 'https://network.pivotal.io/api/v2/products/elastic-runtime/releases';
    api.get(url)
      .then(response => {
        return done(null, response);
      })
      .catch(error => {
        return done(error);
      });
  }
}

module.exports = cisync;
