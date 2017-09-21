import React from 'react';
import renderer from 'react-test-renderer';
import Header  from '../../src/components/Header/';

it('test to see if  renders correctly', () => {
  const header = renderer
  .create(<Header />)
  .toJSON();
  expect(header).toMatchSnapshot();
});
