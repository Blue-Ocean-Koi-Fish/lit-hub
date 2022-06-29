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

eval("/* eslint-disable prefer-arrow-callback */\n\n/* eslint-disable no-underscore-dangle */\n\n/* eslint-disable no-restricted-globals */\n\n/* eslint-disable no-undef */\n\n/* eslint no-use-before-define: 0 */\nimportScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');\n\nif (workbox) {\n  // eslint-disable-next-line prefer-const\n  var offlineCapable = true;\n  console.log('Workbox is loaded');\n  workbox.precaching.precacheAndRoute(offlineCapable ? [{'revision':'d2fd4d612854f6afa096241bb13d81ad','url':'bundle.js'},{'revision':'7512e08e34bb8acec7e4cf4b828e0100','url':'index.html'}] : []);\n  workbox.routing.registerRoute(/http:\\/\\/gutendex\\.com/, new workbox.strategies.NetworkFirst({\n    cacheName: 'book-titles',\n    plugins: [new workbox.expiration.ExpirationPlugin({\n      maxAgeSeconds: 10 * 60 // 10 minutes\n\n    })]\n  }));\n} else {\n  console.log('Workbox did not load');\n}\n\naddEventListener('message', function (event) {\n  if (event.data && event.data.type === 'SKIP_WAITING') {\n    skipWaiting();\n  }\n});\n\n//# sourceURL=webpack://lit-hub/./src/src-sw.js?");

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
