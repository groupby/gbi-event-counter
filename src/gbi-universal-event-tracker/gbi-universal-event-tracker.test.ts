import { beforeEach, describe, expect, it } from 'vitest';
import { register } from './gbi-universal-event-tracker.ts';
import type { GBIUniversalEventTracker } from './types.ts';

describe('gbi-universal-event-tracker', () => {
  let tracker1: GBIUniversalEventTracker;
  let tracker2: GBIUniversalEventTracker;

  beforeEach(() => {
    tracker1 = register({ customerId: '1' });
    tracker2 = register({ customerId: '2' });
  });

  it('Should be a singleton', () => {
    // .toBe is used to assert if primitives are equal or that objects share the same reference
    expect(tracker1).toBe(tracker2);
  });

  it('Should be initialized on the first call to "register" only', () => {
    expect(tracker1).toBe(tracker2);
  });
});
