import { register } from './gbi-universal-event-tracker';

export type {
  GBIUniversalEventTracker,
  GBIUniversalEventTrackerOptions,
} from './gbi-universal-event-tracker';

export type { GBITrackerEvent } from './lib/types.ts';

export default {
  registerGBIUniversalEventTracker: register,
};
