const metrics = require('../routes/metrics.js');
const mocha =  require("mocha");
const expect =  require("chai").expect;
const request = require('supertest');
const app = require('../app');

describe('routes', function() {
  it('pivnet', function(done) {
    request(app)
      .get('/metrics/pivnet')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.deep.equal(require('../routes/fixtures/fixtures-pivnet.json'));
        return done(err);
      });
  });

});
