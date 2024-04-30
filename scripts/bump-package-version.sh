#!/bin/bash

# ----------------------------------
. ./scripts/_base.sh
# ----------------------------------

COMPONENT=$1

NEW_VERSION=$(node -e "console.log(require('./scripts/node/increment-version.cjs').incrementVersion(process.argv[1], process.argv[2]))" "${VERSION}" "${COMPONENT}")
NEW_BRANCH="release/v${NEW_VERSION}"
JS_FILE_NAME=$(get_js_name "$NEW_VERSION")
TYPES_FILE_NAME=$(get_types_name "$NEW_VERSION")

jq ".version = \"$NEW_VERSION\"" package.json > tmp.json && mv tmp.json package.json
jq ".main = \"${DIST_DIR}/${JS_FILE_NAME}\"" package.json > tmp.json && mv tmp.json package.json
jq ".types = \"${DIST_DIR}/${TYPES_FILE_NAME}\"" package.json > tmp.json && mv tmp.json package.json

log() {
  echo "-------------- bump-package-version.sh --------------"
  echo "-----------------------------------------------------"
  echo "PWD: $PWD"
  echo "NAME: $NAME"
  echo "VERSION: $VERSION"
  echo "DIST_DIR: $DIST_DIR"
  echo "CDN_DIR: $CDN_DIR"
  echo "COMPONENT: ${COMPONENT}"
  echo "NEW_VERSION: ${NEW_VERSION}"
  echo "JS_FILE_NAME: ${JS_FILE_NAME}"
  echo "TYPES_FILE_NAME: ${TYPES_FILE_NAME}"
  echo "NEW_BRANCH: ${NEW_BRANCH}"
  echo "-----------------------------------------------------"
  echo ""
}

log

# Push updated package.json to new release branch
git checkout -b "${NEW_BRANCH}"
git add "package.json"
git commit -m "Release ${NAME} v${NEW_VERSION}"
git push -u origin "${NEW_BRANCH}"