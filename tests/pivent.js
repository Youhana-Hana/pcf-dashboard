const environments = require('../lib/environments.js');
const usProdOpsMan = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');
const usT3OpsMan = require('../routes/fixtures/us-t3/dashboard-info-opsman.json');
const singaporeProdOpsMan = require('../routes/fixtures/singapore-prod/dashboard-info-opsman.json');
const usProdS3 = require('../routes/fixtures/us-prod/dashboard-info-s3.json');
const usT3S3 = require('../routes/fixtures/us-t3/dashboard-info-s3.json');
const singaporeProdS3 = require('../routes/fixtures/singapore-prod/dashboard-info-s3.json');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const cisync = require('../lib/cisync');

describe('environments', function() {

  beforeEach(function() {
    sinon.stub(cisync, 'get').yields(null, usProdOpsMan);
    cisync.get.onCall(0).yields(null, usProdOpsMan);
    cisync.get.onCall(1).yields(null, usProdS3);
    cisync.get.onCall(2).yields(null, usT3OpsMan);
    cisync.get.onCall(3).yields(null, usT3S3);
    cisync.get.onCall(4).yields(null, singaporeProdOpsMan);
    cisync.get.onCall(5).yields(null, singaporeProdS3);
  });

  afterEach(function() {
    cisync.get.restore();
  })

  it('should call cisync', function(done) {

    environments.get(function() {
      expect(cisync.get.callCount).to.equal(6);
      expect(cisync.get.args[0][0]).to.deep.equal({url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/erts/dashboard-info-opsman", pipelineName: "dashboard-info-opsman"});
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
    const expected = usProdOpsMan;
    environments.get(function(err, data) {

      expect(data.environments[0]).to.deep.equal(expectedDecoratedUsProd);
      done();
    })
  })
})

const expectedDecoratedUsProd = {
    "foundation": "PROD",
    "region": "US",
    "currentVersionERT": "1.10.13",
    "stagedVersionERT": "",
    "currentVersionERTInS3": "1.10.17"
}
const expectedDecoratedUsT3 = {
    "foundation": "T3",
    "region": "US",
    "currentVersionERT": "1.10.13",
    "stagedVersionERT": "",
    "currentVersionERTInS3": "1.10.18"
}
const expectedDecoratedSingaporeProd = {
    "foundation": "PROD",
    "region": "SINGAPORE",
    "currentVersionERT": "1.10.12",
    "stagedVersionERT": "1.10.13",
    "currentVersionERTInS3": "1.10.17"
}

const expectedAggregate = {
    environments: [expectedDecoratedUsProd, expectedDecoratedUsT3, expectedDecoratedSingaporeProd]
}
