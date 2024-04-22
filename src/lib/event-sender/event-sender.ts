import { EventSender, EventSenderOptions } from './types.ts';
import { GBITrackerEvent } from '@/lib/types.ts';

let _instance: EventSender;
let _customerId: string;
const _url = 'https://www.gbi-not-defined.com';

const send = async (event: GBITrackerEvent) => {
  // Default options are marked with *
  const response = await fetch(_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer: _customerId, event }), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

const init = (options: EventSenderOptions) => {
  _customerId = options.customerId;
  _instance = {
    send,
  };
};

export const registerEventSender = (
  options: EventSenderOptions,
): EventSender => {
  if (!_instance) {
    init(options);
  }
  return _instance;
};

export default registerEventSender;
