#!/usr/bin/env bash
set -ex
yarn install
exec "$@"