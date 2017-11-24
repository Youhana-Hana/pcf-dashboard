'use strict';

const cisync = require('./cisync');

let environments = {};

environments.get = function(done) {

  let result = [];

  let us1QACISync = ""
  let us1QASources = ""
  if(process.env.CI_SYNC_URL) {
    us1QACISync = process.env.CI_SYNC_URL
    us1QASources = [{url:us1QACISync + "ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api", mocked:false}];
  } else {
    console.log("WARNING: Env Var not found for CI_SYNC_URL so will use mocked response")
    us1QASources = [{url:"ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];
  }
  const de1ProdCISync = "https://cisynctester.apps.de1.bosch-iot-cloud.com/pcf-automation/metrics/source/"
  const sg1ProdCISync = "https://cisynctester.apps.sg1.bosch-iot-cloud.com/pcf-automation/metrics/source/"
  const de1ProdSources = [{url:de1ProdCISync + "ops.internal-runtime.de1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];
  const sg1ProdSources = [{url:sg1ProdCISync + "ops.internal-runtime.sg1.bosch-iot-cloud.com", name: "opsman-api", mocked:true}];

  const list = [{foundation: "T3", region: "US1-QA", sources:us1QASources},
  {foundation: "PROD", region: "DE1", sources:de1ProdSources},
  {foundation: "PROD", region: "SG1", sources:sg1ProdSources}];

  list.forEach(function(item) {
    let tile = {foundation: item.foundation, region: item.region};
    item.sources.forEach(function(source){
      cisync.get(source, item, function(err, data) {
        if(source.name == "opsman-api"){
          tile = Object.assign({}, tile, {currentVersionERT: data.currentVersionERT, stagedVersionERT: data.stagedVersionERT});
        }
      });
    });
    result.push(tile);
  });
  const aggregate = {
      environments: result
  };
  return done(null, aggregate);
};

module.exports =  environments;
