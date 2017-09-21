import request from 'superagent/lib/client';

export default {
  get: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .end((err, response) => {
          if (err) return reject(err);
          return resolve(JSON.parse(response.text));
        });
    });
  }
};
