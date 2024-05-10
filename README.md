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
  "types": "dist/gbi-event-counter-<NEW_VERSION>.d.ts"
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

## Public interface

The library exposes an object with such a signature:

```typescript
{
  registerGBIUniversalEventTracker: (
    options: GBIUniversalEventTrackerOptions,
  ) => GBIUniversalEventTracker;
  getInstance: () => GBIUniversalEventTracker;
}
```

In case of CDN usage library exposes this object as `GBIEventCounter` variable:

```html
<script src="https://cdn.groupbycloud.com/gbi-event-counter-0.1.18-dev.min.js"></script>
<script>
  const tracker = GBIEventCounter.registerGBIUniversalEventTracker({
    customerId: 'customer-1',
  });
</script>
```

In case of NPM usage it doesn't matter how to name it cause it's exported as a default:

```typescript
import GBITracker from 'gbi-event-counter';

const tracker = GBITracker.registerGBIUniversalEventTracker({
  customerId: 'customer 1',
});
```

Also, it provides such interfaces:

```typescript
interface GBIUniversalEventTrackerOptions {
  customerId: string;
  /** if false, the tracker will not add the listener to the history state and track for SPAs */
  listenToPushState?: boolean;
  /** optionally override the url this posts to. Default endpoint TBD */
  overrideUrl?: string;
}

interface GBIUniversalEventTracker {
  trackEvent: (event?: GBITrackerEvent) => void;
}

interface GBITrackerEvent {
  /** Optional string to denote what type of event fired */
  type?: EventType;

  /** Optional key value pairs to include in the request */
  metadata?: { [key: string]: unknown };
}
```

## Examples

There are two live examples under `examples` directory.

### inline

Simple html page - example of using the library via CDN.
It shows the principle of using the library:

1. Connect the script by adding the `<script>` tag:

```html
<script src="https://cdn.groupbycloud.com/gbi-event-counter-<VERSION>.min.js"></script>
```

2. Use it:

```html
<script>
  const tracker = GBIEventCounter.registerGBIUniversalEventTracker({
    customerId: 'customer-1',
    listenToPushState: true,
  });
  tracker.trackEvent();
</script>
```

### react-ts

Simple React application written in typescript with navigation provided by react-router.

This example shows how to use the library from NPM.

1. Install npm package using your package manager like this:

```shell
pnpm install gbi-event-counter
```

2. Import it in some component:

```typescript
import GBITracker from 'gbi-event-counter';
```

3. Use it:

```typescript
// 1. Register an event tracker
const tracker = GBITracker.registerGBIUniversalEventTracker({
  customerId: 'customer 1',
  listenToPushState: true,
});
// NOTE: if you call GBITracker.registerGBIUniversalEventTracker second time it will return already created tracker
// instead of creating a new one. Be aware of this.

// 2. Use the tracker instance
tracker.trackEvent();

// 3. or if you have no link to it you can get it right away
const theSameTrackerInstance = GBITracker.getInstance();
theSameTrackerInstance.trackEvent();
```
