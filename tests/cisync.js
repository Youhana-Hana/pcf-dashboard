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

    const list = [{url: "", foundation: "PROD", region: "US"}, {url: "", foundation: "T3", region: "US"}, {url: "", foundation: "PROD", region: "SINGAPORE"}];

    cisync.get(list[0], function(err, data){
      expect(data).to.deep.equal(expectedCisyncPayloadUsProd)
      cisync.get(list[1], function(err, data) {
        expect(data).to.deep.equal(expectedCisyncPayloadUsT3)
        done();
      })
    })

  });

});
