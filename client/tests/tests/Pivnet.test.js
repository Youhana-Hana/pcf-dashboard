import React from 'react';
import renderer from 'react-test-renderer';
import Pivnet  from '../../src/components/Pivnet/';


const ertVersions= [{
  "id": "ert-1.11.*",
  "latest": "1.11.10",
  "releaseDate": "2017-08-18",
  "supportEndDate": "2018-03-31",
  "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-11/pcf-releaseNotes/runtime-rn.html#1.11.10"
}, {
  "id": "ert-1.10.*",
  "latest": "1.10.24",
  "releaseDate": "2017-08-18",
  "supportEndDate": "2017-12-31",
  "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-10/pcf-releaseNotes/runtime-rn.html#1.10.24"
}, {
  "id": "ert-1.9.*",
  "latest": "1.9.37",
  "releaseDate": "2017-08-18",
  "supportEndDate": "2017-09-30",
  "releaseNotesUrl": "https://docs.pivotal.io/pivotalcf/1-9/pcf-releaseNotes/runtime-rn.html#1.9.37"
}];

it('test to see if renders correctly', () => {
  const versions = renderer
  .create(<Pivnet versions={ertVersions} />)
  .toJSON();
  expect(versions).toMatchSnapshot();
});
