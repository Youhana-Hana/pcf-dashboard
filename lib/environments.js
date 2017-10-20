const environmentsPayload = require('../routes/fixtures/fixtures-environments.json');

let environments = {};

environments.get = function() {
 return environmentsPayload
}

module.exports =  environments;
