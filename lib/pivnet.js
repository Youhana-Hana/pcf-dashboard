'use strict';

const api = require('./api');
const _ = require('lodash');
const semver = require('semver');

const ertReleaseURL = 'https://network.pivotal.io/api/v2/products/elastic-runtime/releases';

const opsManagerReleaseURL = 'https://network.pivotal.io/api/v2/products/ops-manager/releases';

let pivnet = {};

pivnet.get = (done) => {
    Promise.all([getVersions(ertReleaseURL), getVersions(opsManagerReleaseURL)])
        .then(([ertVersions, opsManVersions]) => {
            let minorErtVersions = getTopMinorVersions(ertVersions);
            let minorOpsManVersions = getTopMinorVersions(opsManVersions);
            let mappedErtVersions = mapErtVersions(minorErtVersions);
            let mappedOpsManVersions = mapOpsManVersions(minorOpsManVersions);
            let result = { pivnet: {
                ertVersions: mappedErtVersions,
                opsManagerVersions: mappedOpsManVersions
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


function getTopMinorVersions(body) {
  let version = "";
  return _(body.releases)
    .filter(release => {
      return semver.valid(release.version);
    })
    .orderBy([release => semver.major(release.version), release => semver.minor(release.version), release => semver.patch(release.version)], ['desc', 'desc','desc'])
        .filter(release => {
      if(_.isEmpty(version)){
        version = semver.clean(release.version);
        return true;
      }

            if(semver.diff(version, release.version) == 'major' || semver.diff(version, release.version) == 'minor') {
        version = release.version;
        return true;
      }

      return false;
    })
    .take(3)
    .value();
}

function mapErtVersions(versions) {
    return _(versions)    
        .map(release => {
            return {
                id: `ert-${semver.major(release.version)}.${semver.minor(release.version)}.*`,
                latest: release.version,
                releaseDate: release.release_date,
                supportEndDate: release.end_of_support_date,
                releaseNotesUrl: `https://docs.pivotal.io/pivotalcf/${semver.major(release.version)}-${semver.minor(release.version)}/pcf-release-notes/runtime-rn.html#${release.version}`
            };
        })
        .value();
}

function mapOpsManVersions(versions) {
    return _(versions)    
        .map(release => {
            return {
                id: `opsman-${semver.major(release.version)}.${semver.minor(release.version)}.*`,
                latest: release.version,
                releaseDate: release.release_date,
                supportEndDate: release.end_of_support_date,
                releaseNotesUrl: `https://docs.pivotal.io/pivotalcf/${semver.major(release.version)}-${semver.minor(release.version)}/pcf-release-notes/opsmanager-rn.html#${release.version}`
            };
        })
        .value();
}
module.exports = pivnet;
