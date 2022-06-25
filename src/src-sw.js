/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint no-use-before-define: 0 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

/* workbox.routing.registerRoute(
  ///https:\/\/gutendex\.com\/books/,
  /https:\/\/api\.exchangeratesapi\.io\/latest/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'litHub',
    plugins: [
      new workbox.expiration.ExpirationPlugin({

        // eslint-disable-next-line spaced-comment
        maxAgeSeconds: 10 * 60, //10 minutes
      }),
    ],
  }),
); */

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});
