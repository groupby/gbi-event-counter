import { describe, expect, it } from 'vitest';
import { add, sub } from '@/gbi-universal-event-tracker';

describe('Utility | Main', () => {
  it('add - should add the given two numbers', async () => {
    expect(add(4, 2)).toEqual(6);
  });

  it('sub - should subtract the given two numbers', async () => {
    expect(sub(4, 2)).toEqual(2);
  });

  it('checks GBI__LIB_NAME', () => {
    expect(GBI__LIB_NAME).toEqual('gbi-event-counter');
  });

  it('checks GBI__LIB_VERSION', () => {
    expect(GBI__LIB_VERSION).toEqual('0.1.0');
  });
});