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

    const us1QASources = [{url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                       {url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];
    const de1ProdSources = [{url:"https://cisynctester.apps.de1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                       {url:"https://cisynctester.apps.de1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];
    const sg1ProdSources = [{url:"https://cisynctester.apps.sg1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                       {url:"https://cisynctester.apps.sg1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];


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
