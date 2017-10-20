import React from 'react';
import renderer from 'react-test-renderer';
import Environment  from '../../src/components/Environment/';


const environment = {
  "id": "us-t3",
  "foundation": "T3",
  "region": "US",
  "products": {
    "name": "elastic-runtime",
    "currentVersionERT": "1.10.13",
    "stagedVersionERT": "",
    "currentVersionERTInS3": "1.10.17",
    "pcfPipelineVersion": "1.15.1",
    "pipelineStatus": "failed",
    "buildInfo": {
      "pipelineName": "upgrade-tile-ert",
      "buildNumber": "22",
      "buildGlobalIdentifier": "56",
      "buildUrl": "http://myconcourse-on-us-t3.com/builds/55",
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
