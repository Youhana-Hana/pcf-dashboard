import React from 'react';
import renderer from 'react-test-renderer';
import Environment  from '../../src/components/Environment/';

it('test to see if the environment renders correctly', () => {
  const environment = {
    currentVersionERT: "1.10.13",
    stagedVersionERT: "",
    currentVersionOpsManager: "1.11.11",
    stagedVersionOpsManager: "1.12.12"
  };

  const environmentView = renderer
  .create(<Environment env={environment} />)
  .toJSON();

  expect(environmentView).toMatchSnapshot();
});

it('test ERT Version only', () => {
  const environment = {
    currentVersionERT: "1.10.13",
    stagedVersionERT: "1.11.23"
  };
  
  const environmentView = renderer
        .create(<Environment env={environment} />)
        .toJSON();

  expect(environmentView).toMatchSnapshot();
});
