import React from 'react';
import renderer from 'react-test-renderer';
import Footer  from '../../src/components/Footer/';

it('test to see if  renders correctly', () => {
  const footer = renderer
  .create(<Footer />)
  .toJSON();
  expect(footer).toMatchSnapshot();
});
