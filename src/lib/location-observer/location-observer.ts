import type { LocationChangeListener, LocationObserver } from './types.ts';

let _instance: LocationObserver;
let _listeners: LocationChangeListener[] = [];

const subscribe = (callback: LocationChangeListener) => {
  _listeners.push(callback);
  return () => {
    _listeners = _listeners.filter((listener) => listener !== callback);
  };
};

const handleLocationChange = (source: string) => {
  const location = window.location;
  _listeners.forEach((listener) => {
    listener(location, source);
  });
};

const init = () => {
  window.addEventListener('popstate', () => handleLocationChange('popstate'));

  window.history.pushState = new Proxy(window.history.pushState, {
    apply: function (target, thisArg, args) {
      handleLocationChange('pushState');
      return Reflect.apply(target, thisArg, args);
    },
  });

  _instance = {
    subscribe,
  };
};

export const registerLocationObserver = (): LocationObserver => {
  if (!_instance) {
    init();
  }
  return _instance;
};

export default registerLocationObserver;
