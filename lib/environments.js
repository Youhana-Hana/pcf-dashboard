'use strict';

const _ = require('lodash');
const api = require('./api');

// set different environments source as application environment variable called "ENVIRONMENTS"
// if environment has "url" data will be fetched from that URL, otherwise from local stub JSON file
const dummyData = '[{"foundation": "T3", "region": "QA"}, {"foundation": "PROD", "region": "London"}, {"foundation": "PROD", "region": "US"}]';

let environments = {};

environments.get = (done) => {
  
  let environmentDataSources = process.env['ENVIRONMENTS'] || dummyData;

  if(_.isEmpty(environmentDataSources)) {
    return done(null, []);
  }

  let result = [];
  environmentDataSources = JSON.parse(environmentDataSources);

  var promises = environmentDataSources.map(function(environmentDataSource) {
    return getResponse(environmentDataSource)
      .then((response) => {
        let tile = decorateResponse(environmentDataSource, response);
        result.push(tile);
      }).catch ((error) => {
        console.log(error);
      });
  });

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

function getResponse(environmentDataSource) {
  if(environmentDataSource.url) {
    return getBackEndResponse(environmentDataSource);
  }

  return getMockedResponse(environmentDataSource);
}

function getBackEndResponse(environmentDataSource) {
  return new Promise((resolve, reject) => {
    api.get(environmentDataSource.url)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

function getMockedResponse(environmentDataSource) {
  return new Promise((resolve, reject) => {
    let  response = require(`../routes/fixtures/${environmentDataSource.region}-${environmentDataSource.foundation}/opsman-api.json`);
    resolve(response);
  });
};

function decorateResponse(environmentDataSource, response){
  const environment= _.pick(environmentDataSource, ['foundation', 'region']);
  const versions= _.pick(response, ['currentVersionERT', 'stagedVersionERT', 'currentVersionOpsManager', 'stagedVersionOpsManager']);

  return Object.assign({}, environment, versions);
}

module.exports =  environments;
