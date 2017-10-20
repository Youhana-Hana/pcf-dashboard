const environments = require('../lib/environments.js');
const usProd = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');
const usT3 = require('../routes/fixtures/us-t3/dashboard-info-opsman.json');
const singaporeProd = require('../routes/fixtures/singapore-prod/dashboard-info-opsman.json');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const cisync = require('../lib/cisync');

describe('environments', function() {

  beforeEach(function() {
    sinon.stub(cisync, 'get').yields(null, usProd);
  });

  afterEach(function() {
    cisync.get.restore();
  })

  it('should call cisync', function(done) {

    environments.get(function() {
      expect(cisync.get.callCount).to.equal(3);
      done();
    })

  })

  it('aggregate all environments', function(done) {
    cisync.get.onCall(1).yields(null, usT3);
    cisync.get.onCall(2).yields(null, singaporeProd);

    const expected = [usProd, usT3, singaporeProd];
    environments.get(function(err, data) {

      expect(data).to.deep.equal(expected);
      done();
    })
  })
})
