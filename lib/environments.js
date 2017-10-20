const cisync = require('./cisync');

let environments = {};

environments.get = function(done) {

let result = [];
  const list = [{id:"", name: "N", url: ""}, {id:"", name: "N", url: ""}, {id:"", name: "N", url: ""}];
  list.forEach(function(item) {
    cisync.get(function(err, data){

      result.push(data);
    });
  })

  return done(null, result);
}

module.exports =  environments;
