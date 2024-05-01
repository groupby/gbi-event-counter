import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import GBITracker from 'gbi-event-counter';

const tracker = GBITracker.registerGBIUniversalEventTracker({
  customerId: 'customer 1',
  listenToPushState: true,
});

// const orgPushState = window.history.pushState;
// window.history.pushState = function() {
//   console.log('here : ', arguments);
//   orgPushState.apply(this, arguments);
// };


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
