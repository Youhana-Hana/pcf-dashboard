'use strict';

const cisync = require('./cisync');

let environments = {};

environments.get = function(done) {

let result = [];
  const us1QASources = [{url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                     {url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];
  const de1ProdSources = [{url:"https://cisynctester.apps.de1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                     {url:"https://cisynctester.apps.de1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];
  const sg1ProdSources = [{url:"https://cisynctester.apps.sg1.bosch-iot-cloud.com/metrics/source/ops.internal-runtime.int.us1.bosch-iot-cloud.com", name: "opsman-api"},
                     {url:"https://cisynctester.apps.sg1.bosch-iot-cloud.com/metrics/source/s3-host", name: "s3-api"}];


  const list = [{foundation: "PROD", region: "DE1", sources:de1ProdSources},
  {foundation: "T3", region: "US1-QA", sources:us1QASources},
  {foundation: "PROD", region: "SG1", sources:sg1ProdSources}];

  list.forEach(function(item) {
    let tile = {foundation: item.foundation, region: item.region};
    item.sources.forEach(function(source){
      cisync.get(source, item, function(err, data) {
        if(source.name == "opsman-api"){
          tile = Object.assign({}, tile, {currentVersionERT: data.currentVersionERT, stagedVersionERT: data.stagedVersionERT});
        } else {
          tile = Object.assign({}, tile , {currentVersionERTInS3: data.currentVersionERTInS3});
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
