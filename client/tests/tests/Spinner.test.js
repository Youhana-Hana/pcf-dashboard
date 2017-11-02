import React from 'react';
import renderer from 'react-test-renderer';
import Spinner  from '../../src/components/Spinner/';

it('test to see if the spinner renders correctly', () => {
  const spinner = renderer
        .create(<Spinner size="12" loading="true" />)
  .toJSON();
  expect(spinner).toMatchSnapshot();
});
