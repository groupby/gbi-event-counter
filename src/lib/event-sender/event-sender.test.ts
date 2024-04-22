import { beforeEach, describe, expect, it } from 'vitest';
import { registerEventSender } from './event-sender.ts';
import type { EventSender } from './types.ts';

describe('event-sender', () => {
  let sender1: EventSender;
  let sender2: EventSender;

  beforeEach(() => {
    sender1 = registerEventSender({ customerId: '1' });
    sender2 = registerEventSender({ customerId: '2' });
  });

  it('Should be a singleton', () => {
    // .toBe is used to assert if primitives are equal or that objects share the same reference
    expect(sender1).toBe(sender2);
  });
});
