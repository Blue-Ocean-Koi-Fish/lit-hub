/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/src-sw.js":
/*!***********************!*\
  !*** ./src/src-sw.js ***!
  \***********************/
/***/ (() => {

eval("/* eslint-disable prefer-arrow-callback */\n\n/* eslint-disable no-underscore-dangle */\n\n/* eslint-disable no-restricted-globals */\n\n/* eslint-disable no-undef */\n\n/* eslint no-use-before-define: 0 */\nimportScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');\n\nif (workbox) {\n  // eslint-disable-next-line prefer-const\n  var offlineCapable = true;\n  console.log('Workbox is loaded');\n  workbox.precaching.precacheAndRoute(offlineCapable ? [{'revision':null,'url':'10cd0ab2fec081ace003.otf'},{'revision':null,'url':'6dd1904501ff5df803ea.otf'},{'revision':'6e9ec464cf5641859bb278e759389d59','url':'bundle.js'},{'revision':null,'url':'dd7be6b3a768c760d197.otf'},{'revision':null,'url':'f30767aba1a60671bea0.webp'},{'revision':null,'url':'f98cdc9bc71407ec132a.png'},{'revision':null,'url':'fd3a200fdcff3bfea9f6.otf'},{'revision':'9bce8577d2287f53aebb4bcc2614c0c1','url':'index.html'}] : []);\n  workbox.routing.registerRoute(/http:\\/\\/gutendex\\.com/, new workbox.strategies.NetworkFirst({\n    cacheName: 'book-titles',\n    plugins: [new workbox.expiration.ExpirationPlugin({\n      maxAgeSeconds: 10 * 60 // 10 minutes\n\n    })]\n  }));\n} else {\n  console.log('Workbox did not load');\n}\n\naddEventListener('message', function (event) {\n  if (event.data && event.data.type === 'SKIP_WAITING') {\n    skipWaiting();\n  }\n});\n\n//# sourceURL=webpack://lit-hub/./src/src-sw.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/src-sw.js"]();
/******/ 	
/******/ })()
;