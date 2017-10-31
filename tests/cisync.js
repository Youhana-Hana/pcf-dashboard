const cisync = require('../lib/cisync.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const request = require('supertest');
const sinon = require('sinon');
const environments = require('../lib/environments.js');
const expectedCisyncPayloadUsProd = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');
const expectedCisyncPayloadUsT3 = require('../routes/fixtures/us-t3/dashboard-info-opsman.json');
const expectedCisyncPayloadSingaporeProd = require('../routes/fixtures/singapore-prod/dashboard-info-opsman.json');

describe('cisync', function() {

  it('retrieves different results based on item', function(done) {

    const pipelines = [{url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/erts/dashboard-info-opsman", pipelineName: "dashboard-info-opsman"},{url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/erts/dashboard-info-s3", pipelineName: "dashboard-info-s3"}]
    const list = [{foundation: "PROD", region: "US", pipelines:pipelines},
    {foundation: "T3", region: "US", pipelines:pipelines},
    {foundation: "PROD", region: "SINGAPORE", pipelines:pipelines}];

    cisync.get(list[0].pipelines[0], list[0], function(err, data){
      expect(data).to.deep.equal(expectedCisyncPayloadUsProd)
      cisync.get(list[1].pipelines[0], list[1], function(err, data) {
        expect(data).to.not.deep.equal(expectedCisyncPayloadUsT3)
        done();
      })
    })

  });

});
