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

eval("/* eslint-disable no-underscore-dangle */\n\n/* eslint-disable no-restricted-globals */\n\n/* eslint-disable no-undef */\n\n/* eslint no-use-before-define: 0 */\nimportScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');\nworkbox.precaching.precacheAndRoute([{'revision':'ff8bb5f82ae9922d6ddab03b7a7361f1','url':'bundle.js'},{'revision':'7461b811843679b9d0b8f795814915e8','url':'index.html'}]);\n/* workbox.routing.registerRoute(\n  ///https:\\/\\/gutendex\\.com\\/books/,\n  /https:\\/\\/api\\.exchangeratesapi\\.io\\/latest/,\n  new workbox.strategies.NetworkFirst({\n    cacheName: 'litHub',\n    plugins: [\n      new workbox.expiration.ExpirationPlugin({\n\n        // eslint-disable-next-line spaced-comment\n        maxAgeSeconds: 10 * 60, //10 minutes\n      }),\n    ],\n  }),\n); */\n\naddEventListener('message', function (event) {\n  if (event.data && event.data.type === 'SKIP_WAITING') {\n    skipWaiting();\n  }\n});\n\n//# sourceURL=webpack://lit-hub/./src/src-sw.js?");

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