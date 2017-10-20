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
    cisync.get.onCall(1).yields(null, usT3);
    cisync.get.onCall(2).yields(null, singaporeProd);
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

    environments.get(function(err, data) {
      expect(data.environments.length).to.equal(3);
      expect(data).to.deep.equal(expectedAggregate);
      done();
    })
  })

  it('decorates the json with region and foundation', function(done) {
    const expected = usProd;
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
    "buildInfo": {
      "pipelineName": "dashboard-info-opsman",
      "buildNumber": "12",
      "buildGlobalIdentifier": "52",
      "buildUrl": "http://myconcourse-on-us-prod.com/builds/52",
      "jobName": "opsman-api-get"
    }
}
const expectedDecoratedUsT3 = {
    "foundation": "T3",
    "region": "US",
    "currentVersionERT": "1.10.13",
    "stagedVersionERT": "",
    "buildInfo": {
      "pipelineName": "dashboard-info-opsman",
      "buildNumber": "12",
      "buildGlobalIdentifier": "52",
      "buildUrl": "http://myconcourse-on-us-qa.com/builds/52",
      "jobName": "opsman-api-get"
    }
}
const expectedDecoratedSingaporeProd = {
    "foundation": "PROD",
    "region": "SINGAPORE",
    "currentVersionERT": "1.10.12",
    "stagedVersionERT": "1.10.13",
    "buildInfo": {
      "pipelineName": "dashboard-info-opsman",
      "buildNumber": "12",
      "buildGlobalIdentifier": "52",
      "buildUrl": "http://myconcourse-on-singapore-prod.com/builds/52",
      "jobName": "opsman-api-get"
    }
}

const expectedAggregate = {
    environments: [expectedDecoratedUsProd, expectedDecoratedUsT3, expectedDecoratedSingaporeProd]
}
