const metrics = require('../routes/metrics.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const request = require('supertest');
const sinon = require('sinon');
const app = require('../app');
const environments = require('../lib/environments.js');
const pivnet = require('../lib/pivnet.js');

describe('routes', function() {
  
  describe('pivnet', function() {
    beforeEach(function(){
      sinon.stub(pivnet, 'get').yields(null, 'PIVNET');
    });

    afterEach(function(){
      pivnet.get.restore();
    });

    it('pivnet error', function(done) {
      pivnet.get.yields('ERROR');

      request(app)
        .get('/metrics/pivnet')
        .expect(500)
        .end(function(err, res) {
          expect(res.body).to.deep.equal({error:'ERROR', message: 'Error getting pivnet'});
          expect(pivnet.get.callCount).to.equal(1);
          return done(err);
        });
    });
    
    it('pivnet', function(done) {
      request(app)
        .get('/metrics/pivnet')
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.equal('PIVNET');
          expect(pivnet.get.callCount).to.equal(1);
          return done(err);
        });
    });

    it('cache pivnet', function(done) {
      request(app)
        .get('/metrics/pivnet')
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.equal('PIVNET');
          expect(pivnet.get.callCount).to.equal(0);
          return done(err);
        });
    });
  });

  describe('Environments', function() {
    beforeEach(function(){
      sinon.stub(environments, 'get').yields(null, 'ENVIRONMENTS');
    });

    afterEach(function(){
      environments.get.restore();
    });

    it('error', function(done) {
      environments.get.yields('ERROR');

      request(app)
        .get('/metrics/environments')
        .expect(500)
        .end(function(err, res) {
          expect(res.body).to.deep.equal({error:'ERROR', message: 'Error getting environments'});
          expect(environments.get.callCount).to.equal(1);
          return done(err);
        });
    });

    it('environments', function(done) {
      request(app)
        .get('/metrics/environments')
        .expect(200)
        .end(function(err, res) {
          expect(environments.get.callCount).to.equal(1);
          expect(res.body).to.equal('ENVIRONMENTS');
          return done(err);
        });
    });

    it('cache', function(done) {
      request(app)
        .get('/metrics/environments')
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.equal('ENVIRONMENTS');
          expect(environments.get.callCount).to.equal(0);
          return done(err);
        });
    });
  });
});
