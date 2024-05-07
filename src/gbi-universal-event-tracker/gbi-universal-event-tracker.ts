import {
  GBIUniversalEventTracker,
  GBIUniversalEventTrackerOptions,
} from './types.ts';

import { registerLocationObserver } from '@/lib/location-observer';
import type { GBITrackerEvent } from '@/lib/types.ts';
import { send } from '@/lib/event-sender';

let _tracker: GBIUniversalEventTracker;
let _customerId: string;
let _url: string;
/** if false, the tracker will not add the listener to the history state and track for SPAs */
let _listenToPushState: boolean;

const init = (options: GBIUniversalEventTrackerOptions) => {
  const { customerId, listenToPushState, overrideUrl } = options;
  _customerId = customerId;
  _listenToPushState = listenToPushState ?? false;
  _url = overrideUrl ?? 'https://www.gbi-not-defined.com';

  const trackEvent = (event?: GBITrackerEvent) => {
    console.log('customerId:', _customerId);
    console.log('listenToPushState:', _listenToPushState);
    console.log('url:', _url);
    console.log('eventType:', event?.type ?? '-');
    console.log('metadata:', event?.metadata ? 'metadata exists' : '-');
    void send(
      {
        type: event?.type ?? 'other',
        metadata: event?.metadata ?? {
          message: `Sending an event... for "${_customerId}" customer`,
        },
      },
      { customerId: _customerId, url: _url },
    );
  };

  _tracker = {
    trackEvent,
  };

  if (listenToPushState) {
    registerLocationObserver().subscribe((location, source) => {
      _tracker?.trackEvent({
        type: 'location-changed',
        metadata: { location, source },
      });
    });
  }
};

export const register = (
  options: GBIUniversalEventTrackerOptions,
): GBIUniversalEventTracker => {
  if (!_tracker) {
    init(options);
  }
  return _tracker;
};

export const getInstance = () => {
  if (!_tracker) {
    throw new Error(
      'Not initialized! Make sure you already called "register" function.',
    );
  }
  return _tracker;
};
