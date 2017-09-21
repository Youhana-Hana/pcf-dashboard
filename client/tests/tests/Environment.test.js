import React from 'react';
import renderer from 'react-test-renderer';
import Environment  from '../../src/components/Environment/';


const environment = {
  "id": "us-t4",
  "env": "T4",
  "region": "US",
  "currentErtVersion": "1.10.13",
  "latestErtVersionInS3": "1.10.17",
  "pcfPipelineVersion": "1.15.1",
  "pcfPipelineStatus": {
    "status": "failed",
    "upgradeErtBuildNumber": "22",
    "upgradeErtBuildGlobalIdentifier": "56",
    "upgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/56",
    "lastSuccessfulUpgradeErtBuildUrl": "http://myconcourse-on-T4us.com/builds/55",
    "lastSuccessfulUpgradeErtBuildTimestamp": 1505748632000,
    "failedJobName": "configure-ert"
  }
};

it('test to see if the environment renders correctly', () => {
  const environmentView = renderer
  .create(<Environment env={environment} />)
  .toJSON();
  expect(environmentView).toMatchSnapshot();
});
