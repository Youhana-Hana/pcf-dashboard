'use strict';

const request = require('superagent');

let cisync = {};

cisync.get = function(source, item, done) {
  let cisyncPayload = ""
  if(source.mocked){
    console.log("Using mocked version of CI Sync for " + `${item.region}-${item.foundation}`)
    cisyncPayload = require(`../routes/fixtures/${item.region}-${item.foundation}/${source.name}.json`)
  } else {
    let url = source.url
    request.get(url, function(err, res){
      console.log("Calling CISync API with GET for " + `${item.region}-${item.foundation}`)
      if (err) {
        console.log(err)
        throw err;
      }
      console.log(res.text);
      cisyncPayload = res.text;
    });

  }
  return done(null, cisyncPayload);
}

module.exports = cisync;
