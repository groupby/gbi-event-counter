// export const libName = GBI__LIB_NAME;
// export const libVersion = GBI__LIB_VERSION;
//
// export default {
//   libName,
//   libVersion
// };

import {
  GBIUniversalEventTracker,
  GBIUniversalEventTrackerOptions,
} from './types.ts';

import {
  type LocationObserver,
  registerLocationObserver,
} from '@/lib/location-observer';
import type { GBITrackerEvent } from '@/lib/types.ts';
import { type EventSender, registerEventSender } from '@/lib/event-sender';

let _tracker: GBIUniversalEventTracker;
let _customerId: string;
/** if false, the tracker will not add the listener to the history state and track for SPAs */
let _listenToPushState: boolean;
/** optionally override the url this posts to. Default endpoint TBD */
let _overrideUrl: string | null;

let _locationObserver: LocationObserver;
let _eventSender: EventSender;

const trackEvent = (event?: GBITrackerEvent) => {
  console.log('customerId:', _customerId);
  console.log('listenToPushState:', _listenToPushState);
  console.log('overrideUrl:', _overrideUrl ?? '-');
  console.log('eventType:', event?.type ?? '-');
  console.log('metadata:', event?.metadata ? 'metadata exists' : '-');
  _eventSender.send({
    type: event?.type ?? 'other',
    metadata: event?.metadata ?? {
      message: `Sending an event... for "${_customerId}" customer`,
    },
  });
};

const init = (options: GBIUniversalEventTrackerOptions) => {
  const { customerId, listenToPushState, overrideUrl } = options;
  _customerId = customerId;
  _listenToPushState = listenToPushState ?? false;
  _overrideUrl = overrideUrl ?? null;

  _eventSender = registerEventSender({ customerId });

  _tracker = {
    trackEvent,
  };
  if (listenToPushState) {
    _locationObserver = registerLocationObserver();
    _locationObserver.subscribe((location) => {
      _tracker.trackEvent({
        type: 'location-changed',
        metadata: { location },
      });
    });
  }
};

export const registerGBIUniversalEventTracker = (
  options: GBIUniversalEventTrackerOptions,
): GBIUniversalEventTracker => {
  if (!_tracker) {
    init(options);
  }
  return _tracker;
};
