import { beforeEach, describe, expect, it } from 'vitest';
import { registerGBIUniversalEventTracker } from './gbi-universal-event-tracker.ts';
import type { GBIUniversalEventTracker } from './types.ts';

describe('gbi-universal-event-tracker', () => {
  let tracker1: GBIUniversalEventTracker;
  let tracker2: GBIUniversalEventTracker;

  beforeEach(() => {
    tracker1 = registerGBIUniversalEventTracker({ customerId: '1' });
    tracker2 = registerGBIUniversalEventTracker({ customerId: '2' });
  });

  it('Should be a singleton', () => {
    // .toBe is used to assert if primitives are equal or that objects share the same reference
    expect(tracker1).toBe(tracker2);
  });
});
