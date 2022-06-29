/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint no-use-before-define: 0 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

if (workbox) {
  // eslint-disable-next-line prefer-const
  let offlineCapable = true;
  console.log('Workbox is loaded');
  workbox.precaching.precacheAndRoute(offlineCapable ? self.__WB_MANIFEST : []);

  workbox.routing.registerRoute(
    /http:\/\/gutendex\.com/,
    new workbox.strategies.NetworkFirst({
      cacheName: 'book-titles',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 10 * 60, // 10 minutes
        }),
      ],
    }),
  );
} else {
  console.log('Workbox did not load');
}

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});
