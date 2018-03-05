'use strict';

const request = require('superagent');
// require('superagent-proxy')(request);

let api = {};

api.get = (url) => {
    return new Promise((resolve, reject) => {
        request
            .get(url)
            // .proxy("http://127.0.0.1:18080")
            .end((err, response) => {
                if (err) return reject(err);
                return resolve(JSON.parse(response.text));
            });
    });
};

module.exports = api;
