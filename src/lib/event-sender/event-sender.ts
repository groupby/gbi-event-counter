import { GBITrackerEvent } from '@/lib/types.ts';
import { SendEventOptions } from './types.ts';

export const send = async (
  event: GBITrackerEvent,
  options: SendEventOptions,
) => {
  const { customerId, url } = options;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer: customerId, event }),
    });
    return response.json();
  } catch (e) {
    throw new Error((e as Error)?.message ?? 'Error sending event');
  }
};
