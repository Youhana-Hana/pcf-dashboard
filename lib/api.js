const request = require('request');

let api = {};

api.get = (url) => {
    return new Promise((resolve, reject) => {
        request
            .get(url, (error, response, body) => {
              if(error) {
                return reject(error);
              }

                return resolve(body);

            });

    });
};

module.exports = api;
