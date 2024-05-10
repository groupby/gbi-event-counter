import { GBITrackerEvent } from '@/lib/types.ts';

export interface GBIUniversalEventTrackerOptions {
  customerId: string;
  /** if false, the tracker will not add the listener to the history state and track for SPAs */
  listenToPushState?: boolean;
  /** optionally override the url this posts to. Default endpoint TBD */
  overrideUrl?: string;
}

export interface GBIUniversalEventTracker {
  trackEvent: (event?: GBITrackerEvent) => void;
}
