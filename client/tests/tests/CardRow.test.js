import React from 'react';
import renderer from 'react-test-renderer';
import CardRow  from '../../src/components/CardRow/';

const rowWithURL = {
  leabel: 'LABEL',
  value: 'VALUE',
  url: 'URL'
};

it('test to see if the row renders correctly', () => {
  const cardRow = renderer
  .create(<CardRow row={rowWithURL} />)
  .toJSON();
  expect(cardRow).toMatchSnapshot();
});


it('test CardRow without URL', () => {

  let row = Object.assign({}, rowWithURL);
  delete row.url;

  const cardRow = renderer
  .create(<CardRow row={row} />)
  .toJSON();
  expect(cardRow).toMatchSnapshot();
});
