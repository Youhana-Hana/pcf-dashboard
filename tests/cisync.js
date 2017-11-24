const cisync = require('../lib/cisync.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const request = require('supertest');
const sinon = require('sinon');
const environments = require('../lib/environments.js');
const expectedCisyncPayloadDeProd = require('../routes/fixtures/DE1-PROD/opsman-api.json');
const expectedCisyncPayloadUsT3 = require('../routes/fixtures/US1-QA-T3/opsman-api.json');
const expectedCisyncPayloadSingaporeProd = require('../routes/fixtures/SG1-PROD/opsman-api.json');

describe('cisync', function() {

  it('retrieves different results based on item', function(done) {

    const us1QACISync = "https://cisynctester.apps.int.us1.bosch-iot-cloud.com/pcf-automation/metrics/source/"
    const de1ProdCISync = "https://cisynctester.apps.de1.bosch-iot-cloud.com/pcf-automation/metrics/source/"
    const sg1ProdCISync = "https://cisynctester.apps.sg1.bosch-iot-cloud.com/pcf-automation/metrics/source/"
    const us1QASources = [{url:us1QACISync + "ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];
    const de1ProdSources = [{url:de1ProdCISync + "ops.internal-runtime.de1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];
    const sg1ProdSources = [{url:sg1ProdCISync + "ops.internal-runtime.sg1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];

    const list = [{foundation: "T3", region: "US1-QA", sources:us1QASources},
          {foundation: "PROD", region: "DE1", sources:de1ProdSources},
          {foundation: "PROD", region: "SG1", sources:sg1ProdSources}];

    cisync.get(list[0].sources[0], list[0], function(err, data){
      expect(data).to.deep.equal(expectedCisyncPayloadUsT3)
      cisync.get(list[1].sources[0], list[1], function(err, data) {
        expect(data).to.deep.equal(expectedCisyncPayloadDeProd)
        done();
      })
    })

  });

});
