import type { LocationChangeListener, LocationObserver } from './types.ts';

let _instance: LocationObserver;
let _listeners: LocationChangeListener[] = [];

const handleLocationChange = () => {
  const location = window.location;
  _listeners.forEach((listener) => {
    listener(location);
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

  window.addEventListener('popstate', handleLocationChange);
  /*
    window.addEventListener('popstate', function(event) {
      // This function will be called whenever the browser's history changes
      // You can access the new URL from event.state or document.location
      const newURL = event.state || document.location;
      console.log('Location changed to: ' + newURL);
    });
  */
};

export const registerLocationObserver = (): LocationObserver => {
  if (!_instance) {
    init();
  }
  return _instance;
};

export default registerLocationObserver;
