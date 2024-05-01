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

// Create a handler object to define custom behavior
const historyHandler = {
  apply: function(target, thisArg, args) {
    // Execute your additional logic before calling the original pushState function
    // For example, you can track navigation events here
    // console.log('Tracking navigation event for URL:', args[2]);
    handleLocationChange('pushState');

    // Call the original pushState function
    return target.apply(thisArg, args);
  },
};

// Create a proxy for window.history.pushState
const pushStateProxy = new Proxy(window.history.pushState, historyHandler);

const init = () => {
  _instance = {
    subscribe,
  };

  window.addEventListener('popstate', () => handleLocationChange('popstate'));

  // Override window.history.pushState with the proxy
  window.history.pushState = pushStateProxy;
};

export const registerLocationObserver = (): LocationObserver => {
  if (!_instance) {
    init();
  }
  return _instance;
};

export default registerLocationObserver;
