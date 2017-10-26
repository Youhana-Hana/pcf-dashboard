'use strict';

const request = require('superagent');

let api = {};

api.get = (url) => {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            .end((err, response) => {
                if (err) return reject(err);
                return resolve(JSON.parse(response.text));
            });
    });
};

module.exports = api;
