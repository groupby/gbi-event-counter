#!/bin/bash

readonly NAME=$(jq -r '.name' package.json)
readonly VERSION=$(jq -r '.version' package.json)
readonly MAJOR_VERSION=$(echo "${VERSION}" | cut -d '.' -f 1)
readonly CDN_INTERNAL_PATH="static/javascript"
readonly CDN_DIR="cdn/${CDN_INTERNAL_PATH}"
readonly DIST_DIR="dist"
readonly JS_SUFFIX="min.js"
readonly MAP_SUFFIX="${JS_SUFFIX}.map"
readonly TYPES_SUFFIX="d.ts"
readonly JS_GLOB="${NAME}*.${JS_SUFFIX}"
readonly MAP_GLOB="${NAME}*.${MAP_SUFFIX}"
readonly TYPES_GLOB="${NAME}*.${TYPES_SUFFIX}"

log() {
  echo "------------------- _constants.sh -------------------"
  echo "-----------------------------------------------------"
  echo "PWD: $PWD"
  echo "NAME: $NAME"
  echo "VERSION: $VERSION"
  echo "MAJOR_VERSION: $MAJOR_VERSION"
  echo "DIST_DIR: $DIST_DIR"
  echo "CDN_DIR: $CDN_DIR"
  echo "JS_GLOB: $JS_GLOB"
  echo "MAP_GLOB: $MAP_GLOB"
  echo "TYPES_GLOB: $TYPES_GLOB"
  echo "-----------------------------------------------------"
  echo ""
}

log

get_name() {
  local version=$1
  local suffix=$2
  local result="${NAME}-${version}.${suffix}"
  echo "$result"
}

get_js_name() {
  get_name "$1" "${JS_SUFFIX}"
}

get_js_map_name() {
  get_name "$1" "${MAP_SUFFIX}"
}

get_types_name() {
  get_name "$1" "${TYPES_SUFFIX}"
}