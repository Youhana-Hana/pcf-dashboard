const pivnet = require('../lib/pivnet.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const api = require('../lib/api');

const usProdOpsMan = require('../routes/fixtures/us-prod/dashboard-info-opsman.json');
const usT3OpsMan = require('../routes/fixtures/us-t3/dashboard-info-opsman.json');
const singaporeProdOpsMan = require('../routes/fixtures/singapore-prod/dashboard-info-opsman.json');
const usProdS3 = require('../routes/fixtures/us-prod/dashboard-info-s3.json');
const usT3S3 = require('../routes/fixtures/us-t3/dashboard-info-s3.json');
const singaporeProdS3 = require('../routes/fixtures/singapore-prod/dashboard-info-s3.json');

describe('pivnet', function() {

  beforeEach(function() {
    sinon.stub(api, 'get').resolves(usProdOpsMan);
  });

  afterEach(function() {
    api.get.restore();
  });

  it('should call api', function(done) {
    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(api.get.callCount).to.equal(1);
      done();
    });
  });
  
  it('should call pivent ert reuntime endpoint', function(done) {
    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(api.get.args[0][0]).to.equal('https://network.pivotal.io/api/v2/products/elastic-runtime/releases');
      done();
    });
  });
});

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
