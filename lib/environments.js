const cisync = require('./cisync');

let environments = {};

environments.get = function(done) {

let result = [];
  const pipelines = [{url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/erts/dashboard-info-opsman", pipelineName: "dashboard-info-opsman"},
                     {url:"https://cisynctester.apps.int.us1.bosch-iot-cloud.com/erts/dashboard-info-s3", pipelineName: "dashboard-info-s3"}];

  const list = [{foundation: "PROD", region: "US", pipelines:pipelines},
  {foundation: "T3", region: "US", pipelines:pipelines},
  {foundation: "PROD", region: "SINGAPORE", pipelines:pipelines}];

  list.forEach(function(item) {
    let tile = {foundation: item.foundation, region: item.region};
    item.pipelines.forEach(function(pipeline){
      cisync.get(pipeline, item, function(err, data) {
        if(pipeline.pipelineName == "dashboard-info-opsman"){
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
