const pivnet = require('../lib/pivnet.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const sinon = require('sinon');
const api = require('../lib/api');

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

  it('should call pivnet ert releases endpoint', function(done) {
    pivnet.get(function(err, data) {
      expect(err).to.not.exist;
      expect(api.get.args[0][0]).to.equal('https://network.pivotal.io/api/v2/products/elastic-runtime/releases');
      done();
    });
  });

  it('get top 3 minor versions', function(done) {
    api.get.resolves(require('./fixtures/ert-releases.json'));

    pivnet.get(function(err, data) {
      try {
      expect(err).to.not.exist;
        expect(data.pivnet.ertVersions.length).to.equal(3);
      expect(data.pivnet.ertVersions).to.deep.equal(expectedErtVersions);
      done(err);
      } catch(err) {
        done(err);
      }
    });
  });

  it('get top 3 opsManager minor versions', function(done) {
      api.get.onCall(1).resolves(require('./fixtures/ops-manager-releases.json'));

      pivnet.get(function(err, data) {
          try {
              expect(api.get.callCount).to.equal(2);
              expect(data.pivnet.opsManagerVersions.length).to.equal(3);
              expect(data.pivnet.opsManagerVersions).to.deep.equal(expectedOpsManagerVersions);
              return done(err);
          } catch(err) {
              return done(err);
          }
    });
  });

  it('get correct payload', function(done) {
    api.get.onCall(0).resolves(require('./fixtures/ert-releases.json'));
    api.get.onCall(1).resolves(require('./fixtures/ops-manager-releases.json'));

    pivnet.get(function(err, data) {
      try {
        const expectedPayload = {
          pivnet: {
            ertVersions: expectedErtVersions,
            opsManagerVersions: expectedOpsManagerVersions
          }};

        expect(data).to.deep.equal(expectedPayload);
        return done(err);
      } catch(err) {
        return done(err);
      }
    });
  });

it('ert and opsManager releases out of order', function(done) {
  api.get.onCall(0).resolves(require('./fixtures/ert-releases-out-of-order.json'));
  api.get.onCall(1).resolves(require('./fixtures/ops-manager-releases-out-of-order.json'));

  pivnet.get(function(err, data) {
    try {
      const expectedPayload = {
        pivnet: {
          ertVersions: expectedErtVersionsOutOfOrder,
          opsManagerVersions: expectedOpsManagerVersions
        }};

      expect(data).to.deep.equal(expectedPayload);
      return done(err);
    } catch(err) {
      return done(err);
    }
  });
});
    
    it('ert and opsManager releases 2.0', function(done) {
        api.get.onCall(0).resolves(require('./fixtures/ert-releases-2.0.json'));
        api.get.onCall(1).resolves(require('./fixtures/ops-manager-releases-2.0.json'));

        pivnet.get(function(err, data) {
            try {
                const expectedPayload = {
                    pivnet: {
                        ertVersions: expectedErtVersions20,
                        opsManagerVersions: expectedOpsManagerVersions20
                    }};

                expect(data).to.deep.equal(expectedPayload);
                return done(err);
            } catch(err) {
                return done(err);
            }
        });
    });
});

const expectedErtVersions = [{
      "id": "ert-1.12.*",
      "latest": "1.12.4",
      "releaseDate": "2017-10-12",
      "supportEndDate": "2018-06-30",
      "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/runtime-rn.html#1.12.4"
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

const expectedErtVersionsOutOfOrder = [{
    "id": "ert-2.0.*",
    "latest": "2.0.0",
    "releaseDate": "2017-12-19",
    "supportEndDate": "2018-03-31",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/2-0/pcf-release-notes/runtime-rn.html#2.0.0"
},{
    "id": "ert-1.12.*",
    "latest": "1.12.4",
    "releaseDate": "2017-10-12",
    "supportEndDate": "2018-06-30",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/runtime-rn.html#1.12.4"
}, {
    "id": "ert-1.11.*",
    "latest": "1.11.16",
    "releaseDate": "2017-10-12",
    "supportEndDate": "2018-03-31",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/runtime-rn.html#1.11.16"
}];

const expectedErtVersions20 = [{
    "id": "ert-2.0.*",
    "latest": "2.0.0",
    "releaseDate": "2017-12-13",
    "supportEndDate": "2018-09-30",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/2-0/pcf-release-notes/runtime-rn.html#2.0.0"
}, {
    "id": "ert-1.12.*",
    "latest": "1.12.9",
    "releaseDate": "2017-12-09",
    "supportEndDate": "2018-06-30",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/runtime-rn.html#1.12.9"
}, {
    "id": "ert-1.11.*",
    "latest": "1.11.21",
    "releaseDate": "2017-12-09",
    "supportEndDate": "2018-03-31",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/runtime-rn.html#1.11.21"
}];

const expectedOpsManagerVersions = [{
      "id": "opsman-1.12.*",
      "latest": "1.12.2",
      "releaseDate": "2017-10-05",
      "supportEndDate": "2018-06-15",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/opsmanager-rn.html#1.12.2"
    }, {
      "id": "opsman-1.11.*",
      "latest": "1.11.12",
      "releaseDate": "2017-09-25",
      "supportEndDate": "2018-03-31",
        "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/opsmanager-rn.html#1.11.12"
    }, {
      "id": "opsman-1.10.*",
      "latest": "1.10.17",
      "releaseDate": "2017-09-25",
      "supportEndDate": "2017-12-31",
        "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-10/pcf-release-notes/opsmanager-rn.html#1.10.17"
    }];

const expectedOpsManagerVersions20 = [{
    "id": "opsman-2.0.*",
    "latest": "2.0.2",
    "releaseDate": "2018-01-08",
    "supportEndDate": "2018-09-15",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/2-0/pcf-release-notes/opsmanager-rn.html#2.0.2"
},{
    "id": "opsman-1.12.*",
    "latest": "1.12.9",
    "releaseDate": "2017-12-28",
    "supportEndDate": "2018-06-15",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-12/pcf-release-notes/opsmanager-rn.html#1.12.9"
}, {
    "id": "opsman-1.11.*",
    "latest": "1.11.18",
    "releaseDate": "2017-12-28",
    "supportEndDate": "2018-03-31",
    "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-release-notes/opsmanager-rn.html#1.11.18"
}];
