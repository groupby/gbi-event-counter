import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { registerLocationObserver } from '@/lib/location-observer';
import type { LocationObserver } from './types.ts';

describe('location-observer', () => {
  let observer1: LocationObserver;
  let observer2: LocationObserver;
  let callback: Mock<[Location, string], void>;
  let unsubscribe: () => void;

  beforeEach(() => {
    observer1 = registerLocationObserver();
    observer2 = registerLocationObserver();
    callback = vi.fn();
    unsubscribe = observer1.subscribe(callback);
  });

  afterEach(() => {
    unsubscribe();
  });

  it('Should not be a singleton', () => {
    // .toBe is used to assert if primitives are equal or that objects share the same reference
    expect(observer1).toBe(observer2);
  });

  it('Should call handler on pushState', () => {
    window.history.pushState({}, '');

    expect(callback).toHaveBeenCalledTimes(1);

    const theFirstCall = callback.mock.calls[0];
    const theSecondArg = theFirstCall[1];

    expect(theSecondArg).toBe('pushState');
  });

  it('Should call handler on popstate', () => {
    const popstateEvent = new Event('popstate');
    window.dispatchEvent(popstateEvent);

    expect(callback).toHaveBeenCalledTimes(1);

    const theFirstCall = callback.mock.calls[0];
    const theSecondArgOfTheFirstCall = theFirstCall[1];

    expect(theSecondArgOfTheFirstCall).toBe('popstate');
  });
});
