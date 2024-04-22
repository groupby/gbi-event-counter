export type EventType = 'location-changed' | 'other';

export interface GBITrackerEvent {
  /** Optional string to denote what type of event fired */
  type?: EventType;

  /** Optional key value pairs to include in the request */
  metadata?: { [key: string]: unknown };
}
