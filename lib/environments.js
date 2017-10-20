const cisync = require('./cisync');

let environments = {};

environments.get = function(done) {

let result = [];
  const list = [{url: "", foundation: "PROD", region: "US"}, {url: "", foundation: "T3", region: "US"}, {url: "", foundation: "PROD", region: "SINGAPORE"}];

  list.forEach(function(item) {
    cisync.get(function(err, data){
      const output = Object.assign({}, data, {foundation: item.foundation, region: item.region})
      result.push(output);
    });
  })
  const aggregate = {
      environments: result
  }
  return done(null, aggregate);
}

module.exports =  environments;
