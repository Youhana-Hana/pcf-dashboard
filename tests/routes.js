const metrics = require('../routes/metrics.js');
const mocha =  require("mocha");
const sinon =  require("sinon");
const expect =  require("chai").expect;

describe('routes', function() {
  let res;

  beforeEach(function() {
    res = {
      json: sinon.stub(),
      status: sinon.stub()
    }
  })

  // it('pivnet', function() {
  //   metrics.get('metrics/pivnet', function({}, res) {
  //
  //     expect(res.json.callCount).to.equal(1) ;
  //     console.log(res.json.args)

// expect(res.json.callCount).to.equal(1);
    // expect(res.json.args[0][0]).to.deep.equal('xxxxxx');

  // })
})
