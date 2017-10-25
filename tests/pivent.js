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
    sinon.stub(api, 'get').resolves('[]');
  });

  afterEach(function() {
    api.get.restore();
  });

  it('should call api', function(done) {
    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(api.get.callCount).to.equal(2);
      done();
    });
  });
  
  it('should call pivent ert runtime endpoint', function(done) {
    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(api.get.args[0][0]).to.equal('https://network.pivotal.io/api/v2/products/elastic-runtime/releases');
      done();
    });
  });

  it('get top 3 minor versions', function(done) {
    api.get.resolves(require('./fixtures/ertReleases.json'));

    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(data.pivnet.ertVersions).to.deep.equal(expectedErtVersions);
      done(err);
    });
  });
  
  it('get top 3 opsManager minor versions', function(done) {
      api.get.onCall(1).resolves(require('./fixtures/opsManagerReleases.json'));
      pivnet.get(function(err, data) {
        expect(api.get.callCount).to.equal(2);
        expect(data.pivnet.opsManagerVersions.length).to.equal(3);
        expect(data.pivnet.opsManagerVersions).to.deep.equal(expectedOpsManagerVersions);
        done(err);
    });
  });
});

const expectedErtVersions = [{
      "id": "ert-1.12.*",
      "latest": "1.12.4",
      "releaseDate": "2017-10-12",
      "supportEndDate": "2018-06-30",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1.12/pcf-release-notes/runtime-rn.html#1.12.4"
    }, {
      "id": "ert-1.11.*",
      "latest": "1.11.16",
      "releaseDate": "2017-10-12",
      "supportEndDate": "2018-03-31",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/runtime-rn.html#1.11.16"
    }, {
      "id": "ert-1.10.*",
      "latest": "1.10.30",
      "releaseDate": "2017-10-12",
      "supportEndDate": "2017-12-31",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-10/pcf-release-notes/runtime-rn.html#1.10.30"
    }];

const expectedOpsManagerVersions = [{
      "id": "opsman-1.12.*",
      "latest": "1.12.2",
      "releaseDate": "2017-10-05",
      "supportEndDate": "2018-06-15",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/"
    }, {
      "id": "opsman-1.11.*",
      "latest": "1.11.12",
      "releaseDate": "2017-09-25",
      "supportEndDate": "2018-03-31",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/"
    }, {
      "id": "opsman-1.10.*",
      "latest": "1.10.17",
      "releaseDate": "2017-09-25",
      "supportEndDate": "2017-12-31",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-10/pcf-release-notes/"
    }];
