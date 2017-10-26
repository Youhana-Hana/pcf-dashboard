'use strict';

let cisync = {};

cisync.get = function(pipeline, item, done) {

  cisyncPayload = require(`../routes/fixtures/${item.region.toLowerCase()}-${item.foundation.toLowerCase()}/${pipeline.pipelineName}.json`)
  return done(null, cisyncPayload);
}

module.exports = cisync;
