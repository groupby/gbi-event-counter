import { describe, expect, it, vi } from 'vitest';
import { GBITrackerEvent } from '@/lib/types.ts';
import { send } from './event-sender.ts';

describe('event-sender', () => {
  const url = 'https://www.google.com/';

  it('Should fetch URL passed', () => {
    const fetchSpy = vi.spyOn(window, 'fetch');

    const event: GBITrackerEvent = {
      type: 'other',
    };
    send(event, { customerId: '1', url });

    expect(fetchSpy).toHaveBeenCalledOnce();

    const theFirstCall = fetchSpy.mock.calls[0];
    const callUrl = theFirstCall[0];

    expect(callUrl).toBe(url);
  });
});
