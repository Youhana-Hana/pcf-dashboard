const environments = require('../lib/environments.js');
const deProdOpsMan = require('../routes/fixtures/DE1-PROD/opsman-api.json');
const usQAT3OpsMan = require('../routes/fixtures/US1-QA-T3/opsman-api.json');
const singaporeProdOpsMan = require('../routes/fixtures/SG1-PROD/opsman-api.json');
const deProdS3 = require('../routes/fixtures/DE1-PROD/s3-api.json');
const usQAT3S3 = require('../routes/fixtures/US1-QA-T3/s3-api.json');
const singaporeProdS3 = require('../routes/fixtures/SG1-PROD/s3-api.json');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const cisync = require('../lib/cisync');

describe('environments', function() {

  beforeEach(function() {
    sinon.stub(cisync, 'get')
    cisync.get.onCall(0).yields(null, usQAT3OpsMan);
    cisync.get.onCall(1).yields(null, usQAT3S3);
    cisync.get.onCall(2).yields(null, deProdOpsMan);
    cisync.get.onCall(3).yields(null, deProdS3);
    cisync.get.onCall(4).yields(null, singaporeProdOpsMan);
    cisync.get.onCall(5).yields(null, singaporeProdS3);
  });

  afterEach(function() {
    cisync.get.restore();
  })

  it('should call cisync', function(done) {

    environments.get(function() {
      expect(cisync.get.callCount).to.equal(6);
      expect(cisync.get.args[0][0]).to.deep.equal({url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"});
      done();
    })

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
    "currentVersionERT": "1.11.16",
    "stagedVersionERT": "",
    "currentVersionERTInS3": "1.10.17"
}
const expectedDecoratedUsQAT3 = {
    "foundation": "T3",
    "region": "US1-QA",
    "currentVersionERT": "1.11.18",
    "stagedVersionERT": "1.11.18",
    "currentVersionERTInS3": "1.10.18"
}
const expectedDecoratedSingaporeProd = {
    "foundation": "PROD",
    "region": "SG1",
    "currentVersionERT": "",
    "stagedVersionERT": "",
    "currentVersionERTInS3": "1.10.17"
}

const expectedAggregate = {
    environments: [expectedDecoratedUsQAT3, expectedDecoratedDeProd, expectedDecoratedSingaporeProd]
}
