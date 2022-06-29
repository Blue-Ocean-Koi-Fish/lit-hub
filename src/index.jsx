/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Workbox } from 'workbox-window';
import App from './app';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/sw.js');
    const updateButton = document.querySelector("#update");
    wb.addEventListener('waiting', (event) => {
      console.log(
        `A new service worker has installed, but it can't activate
          until all tabs running the current version have fully unloaded.`,
      );
      // updateButton.classList.add('show');

      //  This was giving a TypeError
      // Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
      updateButton.addEventListener('click', () => {
      // Set up a listener that will reload the page as soon as the previously
      // waiting service worker has taken control.
        wb.addEventListener("controlling", (event) => {
          window.location.reload();
        });
        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        wb.messageSW({ type: 'SKIP_WAITING' });
      });
    });

    wb.register();
  });
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);
