import { beforeEach, describe, expect, it } from 'vitest';
import { registerLocationObserver } from './location-observer.ts';
import type { LocationObserver } from './types.ts';

describe('location-observer', () => {
  let observer1: LocationObserver;
  let observer2: LocationObserver;

  beforeEach(() => {
    observer1 = registerLocationObserver();
    observer2 = registerLocationObserver();
  });

  it('Should be a singleton', () => {
    // .toBe is used to assert if primitives are equal or that objects share the same reference
    expect(observer1).toBe(observer2);
  });
});
