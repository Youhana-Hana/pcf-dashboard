const cisyncPayload = require('../routes/fixtures/fixtures-environments.json');

let cisync = {};

cisync.get = function() {
  return cisyncPayload
}

module.exports = cisync;
