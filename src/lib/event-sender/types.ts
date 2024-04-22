import { GBITrackerEvent } from '@/lib/types.ts';

export interface EventSender {
  send(event: GBITrackerEvent): void;
}

export interface EventSenderOptions {
  customerId: string;
}
