let cisync = {};

cisync.get = function(item, done) {

  cisyncPayload = require(`../routes/fixtures/${item.region.toLowerCase()}-${item.foundation.toLowerCase()}/dashboard-info-opsman.json`)
  return done(null, cisyncPayload);
}

module.exports = cisync;
