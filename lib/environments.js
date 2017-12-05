'use strict';

const api = require('./api');

let us1qaT3EnvironmentDataSource = {foundation: "T3", region: "US1-QA"};
const de1ProdEnvironmentDataSource = {foundation: "PROD", region: "DE1"};
const sg1ProdEnvironmentDataSource = {foundation: "PROD", region: "SG1"};

let environments = {};

environments.get = (done) => {
    var stubbedSources = [de1ProdEnvironmentDataSource, sg1ProdEnvironmentDataSource]
    var environmentDataSources = []
    let us1qaT3Url = process.env['QA_T3_URL']
    if(us1qaT3Url){
      us1qaT3EnvironmentDataSource = Object.assign({}, us1qaT3EnvironmentDataSource, {url: us1qaT3Url});
      environmentDataSources = [us1qaT3EnvironmentDataSource]
    } else {
      console.error("QA_T3_URL env var is undefined so the response will be stubbed instead")
      stubbedSources.push(us1qaT3EnvironmentDataSource)
    }

    let result = []
    stubbedSources.forEach(function(environmentDataSource){
      let mockedResponse = require(`../routes/fixtures/${environmentDataSource.region}-${environmentDataSource.foundation}/opsman-api.json`);
      let tile = decorateResponse(environmentDataSource, mockedResponse)
      result.push(tile);
    })

    var promises = environmentDataSources.map(function(environmentDataSource){
      return getBackEndResponse(environmentDataSource.url)
        .then((response) => {
          let tile = decorateResponse(environmentDataSource, response)
          result.push(tile);
        }).catch ((error) => {
          console.log(error)
        })
    })
    Promise.all(promises)
        .then(() => {
            const aggregate = {
                environments: result
            };
            return done(null, aggregate);
        })
        .catch(error => {
            return done(error);
        });
};

function decorateResponse(environmentDataSource, response){
  let tile = {foundation: environmentDataSource.foundation, region: environmentDataSource.region};
  tile = Object.assign({}, tile, {currentVersionERT: response.currentVersionERT, stagedVersionERT: response.stagedVersionERT});
  return tile;
}

function getBackEndResponse(url) {
  return new Promise((resolve, reject) => {
    api.get(url)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};


module.exports =  environments;
