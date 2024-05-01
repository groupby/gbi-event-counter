import type { LocationChangeListener, LocationObserver } from './types.ts';

let _instance: LocationObserver;
let _listeners: LocationChangeListener[] = [];

const handleLocationChange = (source: string) => {
  const location = window.location;
  _listeners.forEach((listener) => {
    listener(location, source);
  });
};

const subscribe = (callback: LocationChangeListener) => {
  _listeners.push(callback);
  return () => {
    _listeners = _listeners.filter((listener) => listener !== callback);
  };
};

const init = () => {
  _instance = {
    subscribe,
  };

  window.addEventListener('popstate', () => handleLocationChange('popstate'));

  // window.history.pushState = new Proxy(window.history.pushState, {
  //   apply: (target, thisArg, argArray) => {
  //     // trigger here what you need
  //     handleLocationChange('pushState');
  //     return target.apply(thisArg, argArray);
  //   },
  // });

  type HistoryPushState = typeof window.history.pushState;

  const target = (value: HistoryPushState) => {
    return typeof value;
  };

  interface Target {
    (value: HistoryPushState): string;

    types: string[];
  }

  const getter: Required<Target> = {
    types: ['string', 'number', 'boolean', 'undefined', 'object', 'function'],
  };

  const proxy = new Proxy<Target>(target as Target, {
    apply(target, thisArg: any, argArray: any[]): any {

      handleLocationChange('pushState');

      return Reflect.apply(target, thisArg, argArray);
    },
    get(_: Target, p: string, receiver: any): any {
      return Reflect.get(getter, p, receiver);
    },
  });

  proxy(window.history.pushState);
};

export const registerLocationObserver = (): LocationObserver => {
  if (!_instance) {
    init();
  }
  return _instance;
};

export default registerLocationObserver;
