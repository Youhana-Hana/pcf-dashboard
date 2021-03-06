const environments = require('../lib/environments.js');
const usQAT3OpsMan = require('../routes/fixtures/US1-QA-T3/opsman-api.json');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const api = require('../lib/api');

describe('environments', function() {
  beforeEach(function() {
    sinon.stub(api, 'get');
    api.get.onCall(0).resolves(usQAT3OpsMan);
    process.env.ENVIRONMENTS = '[{"foundation": "T3", "region": "US1-QA", "url": "https://fake.url"}, {"foundation": "PROD", "region": "DE1"}, {"foundation": "PROD", "region": "SG1"}]';
  });

  afterEach(function() {
    api.get.restore();
    delete process.env.ENVIRONMENTS;
  });

  it('aggregate all environments and should call real API for qa and mock the response for all others', function(done) {
    var expectedNoOfResponses = 3;
    var expectedNoOfAPICalls = 1;
    environments.get(function(err, data) {
      try {
        expect(data.environments.length).to.equal(expectedNoOfResponses);
        expect(data).to.deep.equal(expectedAggregate);
        expect(api.get.callCount).to.equal(expectedNoOfAPICalls);
        return done(err);
      } catch(err) {
        return done(err);
      }
    });
  });

  it('decorates the json with region and foundation', function(done) {
    environments.get(function(err, data) {
      // one api call to api.get which happens last
      expect(data.environments[2]).to.deep.equal(expectedDecoratedUsQAT3);
      done();
    });
  });
  
  it('will return empty array enr env var not set', function(done) {
    delete process.env.ENVIRONMENTS;
    environments.get(function(err, data) {
      try {
        expect(data).to.be.empty;
        return done(err);
      } catch(err) {
        return done(err);
      }
    });
  });

  it('include OpsManager if exists', function(done) {
    const response = {
      "currentVersionERT": "1.11.18",
      "stagedVersionERT": "1.11.18",
      "currentVersionOpsManager": "1.11.11",
      "stagedVersionOpsManager": "1.12.12"
    };

    api.get.onCall(0).resolves(response);
    environments.get(function(err, data) {
      try {
        // one api call to api.get which happens last
        expect(data.environments[2]).to.deep.equal(expectedQAIncludingOpsManager);
        return done(err);
      } catch(err) {
        return done(err);
      }
    });
  });
});

const expectedDecoratedDeProd = {
  "foundation": "PROD",
  "region": "DE1",
  "currentVersionERT": "1.11.16 (fake)",
  "stagedVersionERT": "",
  "currentVersionOpsManager": "1.12.10 (fake)",
  "stagedVersionOpsManager": "1.12.12 (fake)"
};

const expectedDecoratedUsQAT3 = {
  "foundation": "T3",
  "region": "US1-QA",
  "currentVersionERT": "1.11.18 (fake)",
  "stagedVersionERT": "1.11.18 (fake)"
};

const expectedDecoratedSingaporeProd = {
  "foundation": "PROD",
  "region": "SG1",
  "currentVersionERT": "1.11.16 (fake)",
  "stagedVersionERT": "",
  "currentVersionOpsManager": "1.11.10 (fake)",
  "stagedVersionOpsManager": ""
};

const expectedQAIncludingOpsManager = {
  "foundation": "T3",
  "region": "US1-QA",
  "currentVersionERT": "1.11.18",
  "stagedVersionERT": "1.11.18",
  "currentVersionOpsManager": "1.11.11",
  "stagedVersionOpsManager": "1.12.12"
};

const expectedAggregate = {
  environments: [expectedDecoratedDeProd, expectedDecoratedSingaporeProd, expectedDecoratedUsQAT3]
}
