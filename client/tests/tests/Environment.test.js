import React from 'react';
import renderer from 'react-test-renderer';
import Environment  from '../../src/components/Environment/';


const environment = {
  "id": "us-t4",
  "foundation": "T4",
  "region": "US",
  "products": {
    "name": "elastic-runtime",
    "currentVersion": "1.10.13",
    "stagedVersion": "",
    "currentVersionInS3": "1.10.17",
    "pcfPipelineVersion": "1.15.1",
    "pipelineStatus": "failed",
    "buildInfo": {
      "pipelineName": "upgrade-tile-ert",
      "buildNumber": "22",
      "buildGlobalIdentifier": "56",
      "buildUrl": "http://myconcourse-on-T4us.com/builds/55",
      "failedJobName": "configure-ert"
    }
  }
};

it('test to see if the environment renders correctly', () => {
  const environmentView = renderer
  .create(<Environment env={environment} />)
  .toJSON();
  expect(environmentView).toMatchSnapshot();
});
