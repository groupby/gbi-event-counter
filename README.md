# gbi-event-counter

## Overview

## Installation

### pnpm

In this project, PNPM is the package manager, ensuring efficient dependency management and consistent builds.

Since **v16.13**, Node.js is shipping [Corepack](https://nodejs.org/api/corepack.html) for managing package managers. This is an
experimental
feature, so you need to enable it by
running:

```shell
corepack enable pnpm
```

```shell
corepack use pnpm@latest
```

#### Links

- [How to install pnpm](https://pnpm.io/installation)
- [Using Corepack](https://pnpm.io/installation#using-corepack)

### Dependencies

```shell
pnpm install
```

## Bumping package version

Bumping the package version is a process of several steps:

1. Edit `package.json` fields:

```json lines
{
  "version": "<NEW_VERSION>",
  "main": "dist/gbi-event-counter-<NEW_VERSION>.min.js",
  "types": "dist/gbi-event-counter-<NEW_VERSION>.d.ts",
}
```

2. Create new release branch `release/v<NEW_VERSION>` with updated `package.json` file
3. Merge this branch into `main` through either PR or directly

There is an automation for steps 1 and 2. What is needed is to run a shell script locally from the root of the project this way:

```shell
sh scripts/bump-package-version.sh <COMPONENT>
```

where `<COMPONENT>` is either `major`, `minor`, `patch` or `dev` meaning which component of semver should to bump up. `dev` mean to bump up
the patch component and add `-dev` suffix. So that if current version is `1.0.0` and this script
run: `sh scripts/bump-package-version.sh dev` then the resulting version will be `1.0.1-dev`.

## Distribution

Distributed as both an NPM package and through a Content Delivery Network (CDN), this project offers users versatility in consumption and
integration methods.

### Prerequisites

1. Installation step done
2. New package version is already set at least locally (see "Bumping package version" section)

### CDN

For distribution via CDN, the process entails executing a shell script locally from the project root directory:

```shell
sh scripts/deploy-to-cdn.sh
```

NOTE: To run this script successfully it's needed to have a write pernmissions to the [CDN](https://github.com/groupby/cdn) repository.

### NPM

```shell
sh scripts/deploy-to-npm.sh
```

## Examples