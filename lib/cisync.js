'use strict';

const api = require('./api');

let cisync = {};

cisync.get = (source, item) => {
  return new Promise((resolve, reject) => {
      let cisyncPayload = "";
      if(source.mocked){
        console.log("Using mocked version of CI Sync for " + `${item.region}-${item.foundation}`);
        cisyncPayload = require(`../routes/fixtures/${item.region}-${item.foundation}/${source.name}.json`);
        return resolve(cisyncPayload);
      } else {
        console.log("Calling CISync API with GET for " + `${item.region}-${item.foundation}`);

        let url = source.url;
        api.get(url)
          .then(response => {
            console.log("CISYnc...");
            console.log(response)
            return resolve(response);
          })
          .catch(error => {
            return resolve(error);
          });
      }
  });

}

module.exports = cisync;
