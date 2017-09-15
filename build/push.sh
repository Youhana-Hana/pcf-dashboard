#!/bin/sh

set -e
cf login -a http://api.vanilla.coke.cf-app.com/ -u admin -p OL4VQNTQ3z3wcTNrU1cd2GHiU_vLJWTs  -o YH -s dev --skip-ssl-validation &&
cf push
