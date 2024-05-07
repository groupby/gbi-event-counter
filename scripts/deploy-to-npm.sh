#!/bin/bash

# Build first
pnpm run clean
pnpm run build:npm

pnpm run test:npm

# Then publish
pnpm publish --no-git-checks