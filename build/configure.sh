#!/bin/sh

set -e
cf create-org YH && 
cf target -o YH &&
cf create-space dev &&
cf create-space-quota dev -i 1G -a 100 -m 100G -r 1000 &&
cf set-space-quota dev dev &&
cf target -o YH -s dev
