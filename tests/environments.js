const environments = require('../lib/environments.js');
const deProdOpsMan = require('../routes/fixtures/DE1-PROD/opsman-api.json');
const usQAT3OpsMan = require('../routes/fixtures/US1-QA-T3/opsman-api.json');
const singaporeProdOpsMan = require('../routes/fixtures/SG1-PROD/opsman-api.json');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const cisync = require('../lib/cisync');

describe('environments', function() {

  beforeEach(function() {
    sinon.stub(cisync, 'get')
    cisync.get.onCall(0).yields(null, usQAT3OpsMan);
    cisync.get.onCall(1).yields(null, deProdOpsMan);
    cisync.get.onCall(2).yields(null, singaporeProdOpsMan);
  });

  afterEach(function() {
    cisync.get.restore();
  })

  it('should call real cisync for qa and mock cisync for all others when NODE_ENV = production', function(done) {
    let storedNodeEnv = process.env['NODE_ENV']
    let storedCISyncUrl = process.env['CI_SYNC_URL']
    process.env['NODE_ENV'] = 'production';
    process.env['CI_SYNC_URL'] = "https://cisynctester.apps.int.us1.bosch-iot-cloud.com/pcf-automation/metrics/source/";
    environments.get(function() {
      expect(cisync.get.callCount).to.equal(3);
      expect(cisync.get.args[0][0]).to.have.a.property('mocked', false);
      expect(cisync.get.args[1][0]).to.have.a.property('mocked', true);
      expect(cisync.get.args[1][0]).to.have.a.property('mocked', true);
      done();
    })

    process.env['NODE_ENV'] = storedNodeEnv
    process.env['CI_SYNC_URL'] = storedCISyncUrl

  })

  it('should call mock cisync for all when NODE_ENV != production', function(done) {

    let storedNodeEnv = process.env['NODE_ENV']
    let storedCISyncUrl = process.env['CI_SYNC_URL']
    process.env['NODE_ENV'] = 'development';
    delete process.env.CI_SYNC_URL
    environments.get(function() {
      expect(cisync.get.callCount).to.equal(3);
      expect(cisync.get.args[0][0]).to.have.a.property('mocked', true);
      expect(cisync.get.args[1][0]).to.have.a.property('mocked', true);
      expect(cisync.get.args[1][0]).to.have.a.property('mocked', true);
      done();
    })

    process.env['NODE_ENV'] = storedNodeEnv
    process.env['CI_SYNC_URL'] = storedCISyncUrl
  })

  it('aggregate all environments', function(done) {
    environments.get(function(err, data) {
      expect(data.environments.length).to.equal(3);
      expect(data).to.deep.equal(expectedAggregate);
      done();
    })
  })

  it('decorates the json with region and foundation', function(done) {
    const expected = usQAT3OpsMan;
    environments.get(function(err, data) {

      expect(data.environments[0]).to.deep.equal(expectedDecoratedUsQAT3);
      done();
    })
  })
})

const expectedDecoratedDeProd = {
    "foundation": "PROD",
    "region": "DE1",
    "currentVersionERT": "1.11.16 (fake)",
    "stagedVersionERT": ""
}
const expectedDecoratedUsQAT3 = {
    "foundation": "T3",
    "region": "US1-QA",
    "currentVersionERT": "1.11.18",
    "stagedVersionERT": "1.11.18"
}
const expectedDecoratedSingaporeProd = {
    "foundation": "PROD",
    "region": "SG1",
    "currentVersionERT": "1.11.16 (fake)",
    "stagedVersionERT": ""
}

const expectedAggregate = {
    environments: [expectedDecoratedUsQAT3, expectedDecoratedDeProd, expectedDecoratedSingaporeProd]
}
