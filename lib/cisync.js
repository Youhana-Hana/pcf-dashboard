'use strict';

let cisync = {};

cisync.get = function(source, item, done) {

  const cisyncPayload = require(`../routes/fixtures/${item.region}-${item.foundation}/${source.name}.json`)
  return done(null, cisyncPayload);
}

module.exports = cisync;
