const api = require('./api');
const _ = require('lodash');
const semver = require('semver');

const ertReleaseURL = 'https://network.pivotal.io/api/v2/products/elastic-runtime/releases';

const opsManagerReleaseURL = 'https://network.pivotal.io/api/v2/products/ops-manager/releases';

let pivnet = {};

pivnet.get = (done) => {
    Promise.all([getVersions(ertReleaseURL), getVersions(opsManagerReleaseURL)])
        .then(([ertVersions, opsManVersions]) => {
            let minorErtVersions = getTopMinorVersions(ertVersions, 'ert');
            let minorOpsManVersions = getTopMinorVersions(opsManVersions, 'opsman');
            let result = { pivnet: {
                ertVersions: minorErtVersions,
                opsManagerVersions: minorOpsManVersions
            }};
            return done(null, result);
        })
        .catch(error => {
            return done(error);
        });
};


function getVersions(url) {
  return new Promise((resolve, reject) => {
    api.get(url)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};


function getTopMinorVersions(body, prefix) {
  let version = "";
  return _(body.releases)
    .filter(release => {
      if(!semver.valid(release.version)) {
        return false;
      }

      if(_.isEmpty(version)){
        version = semver.clean(release.version);
        return true;
      }

      if(semver.diff(version, release.version) == 'minor') {
        version = release.version;
        return true;
      }

      return false;
    })
    .take(3)
    .map(release => {
      return {
        id: `${prefix}-${semver.major(release.version)}.${semver.minor(release.version)}.*`,
        latest: release.version,
        releaseDate: release.release_date,
        supportEndDate: release.end_of_support_date,
        releaseNotesUrl: `${release.release_notes_url}#${release.version}`
      };
    })
    .value();
}

module.exports = pivnet;
