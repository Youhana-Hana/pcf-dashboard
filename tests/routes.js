const metrics = require('../routes/metrics.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../app');
const environments = require('../lib/environments.js');

describe('routes', function() {
  beforeEach(function(){
    sinon.stub(environments, 'get').yields(null, 'ENVIRONMENTS');
  })

  afterEach(function(){
    environments.get.restore();
  })

  it('pivnet', function(done) {
    request(app)
      .get('/metrics/pivnet')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal(require('../routes/fixtures/fixtures-pivnet.json'));
        return done(err);
      });
  });
  it('environments', function(done) {
    request(app)
      .get('/metrics/environments')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.equal('ENVIRONMENTS');
        return done(err);
      });
  });
  it('get-environments', function(done) {
    request(app)
      .get('/metrics/environments')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.equal('ENVIRONMENTS');
        expect(environments.get.callCount).to.equal(1);
        return done(err);
      });
  });

});
