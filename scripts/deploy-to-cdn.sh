#!/bin/bash

# For prod, we deploy the specific version of the artifact, ex. "1.2.3", and we
# replace the major version of the artifact with the specific version, ex.
# replace "1" with the contents of "1.2.3". This enables the artifact to be
# automatically picked up by CDN users. It is effectively "pushed to prod".

# ----------------------------------
. ./scripts/_base.sh
# ----------------------------------

JS_FILE_NAME=$(get_js_name "$VERSION")
MIN_JS_FILE_NAME=$(get_min_js_name "$VERSION")

JS_MAJOR_FILE_NAME=$(get_js_name "$MAJOR_VERSION")
MIN_JS_MAJOR_FILE_NAME=$(get_min_js_name "$MAJOR_VERSION")

NEW_CDN_BRANCH="${NAME}-${VERSION}"

CDN_JS_GLOB="${CDN_INTERNAL_PATH}/${JS_GLOB}"

log() {
  echo "----------------- deploy-to-cdn.sh ------------------"
  echo "-----------------------------------------------------"
  echo "PWD: $PWD"
  echo "NAME: $NAME"
  echo "VERSION: $VERSION"
  echo "MAJOR_VERSION: $MAJOR_VERSION"
  echo "JS_FILE_NAME: $JS_FILE_NAME"
  echo "MIN_JS_FILE_NAME: $MIN_JS_FILE_NAME"
  echo "JS_MAJOR_FILE_NAME: $JS_MAJOR_FILE_NAME"
  echo "MIN_JS_MAJOR_FILE_NAME: $MIN_JS_MAJOR_FILE_NAME"
  echo "NEW_CDN_BRANCH: $NEW_CDN_BRANCH"
  echo "CDN_JS_GLOB: $CDN_JS_GLOB"
  echo "-----------------------------------------------------"
  echo ""
}

log

# Build first
pnpm run clean
pnpm run build:cdn

# Then deploy
set -e
rm -rf cdn

set -e
git clone git@github.com:groupby/cdn.git

# Create current version
cp "${DIST_DIR}/${JS_FILE_NAME}" "${CDN_DIR}/${JS_FILE_NAME}"
cp "${DIST_DIR}/${MIN_JS_FILE_NAME}" "${CDN_DIR}/${MIN_JS_FILE_NAME}"

# Update latest major version
cp "${CDN_DIR}/${JS_FILE_NAME}" "${CDN_DIR}/${JS_MAJOR_FILE_NAME}"
cp "${CDN_DIR}/${MIN_JS_FILE_NAME}" "${CDN_DIR}/${MIN_JS_MAJOR_FILE_NAME}"


# Push new files to new CDN branch
cd cdn
git checkout -b "${NEW_CDN_BRANCH}"
git add "${CDN_JS_GLOB}"
git commit -m "Release ${NAME} v${CURRENT_VERSION}"
git push -u origin "${NEW_CDN_BRANCH}"
