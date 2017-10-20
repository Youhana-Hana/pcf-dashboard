const cisyncPayload = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');

let cisync = {};

cisync.get = function(done) {
  return done(null, cisyncPayload);
}

module.exports = cisync;
