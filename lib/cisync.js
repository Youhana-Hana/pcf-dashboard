const cisyncPayload = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');

let cisync = {};

cisync.get = function(item, done) {
  return done(null, cisyncPayload);
}

module.exports = cisync;
