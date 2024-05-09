#!/bin/bash

# Build first
pnpm run clean
pnpm run build:npm

pnpm run test

# Then publish
pnpm publish --no-git-checks