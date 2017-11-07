'use strict';

let cisync = {};

cisync.get = function(pipeline, item, done) {

  const cisyncPayload = require(`../routes/fixtures/${item.region}-${item.foundation}/${pipeline.name}.json`)
  return done(null, cisyncPayload);
}

module.exports = cisync;
