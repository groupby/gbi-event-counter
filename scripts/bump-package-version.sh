#!/bin/bash

# ----------------------------------
. ./scripts/_base.sh
# ----------------------------------

COMPONENT=$1

#NEW_VERSION=$(node -e "console.log(require('./scripts/node/increment-version.cjs').incrementVersion(process.argv[1], process.argv[2]))" "${VERSION}" "${COMPONENT}")
NEW_VERSION=$(get_new_package_version "${VERSION}" "${COMPONENT}")
NEW_BRANCH="release/v${NEW_VERSION}"

set_package_version "${NEW_VERSION}"

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