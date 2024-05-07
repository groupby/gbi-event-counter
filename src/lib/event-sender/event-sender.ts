import { GBITrackerEvent } from '@/lib/types.ts';
import { SendEventOptions } from './types.ts';

export const send = async (
  event: GBITrackerEvent,
  options: SendEventOptions,
) => {
  const { customerId, url } = options;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer: customerId, event }),
  });
  return response.json();
};
