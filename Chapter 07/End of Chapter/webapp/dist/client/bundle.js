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

/***/ "./static/client.js":
/*!**************************!*\
  !*** ./static/client.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function() {\r\n    document.getElementById(\"btn\").addEventListener(\"click\", sendReq);\r\n});\r\nsendReq = async () => {\r\n    let payload = [];\r\n    for (let i = 0; i < 5; i++) {\r\n        payload.push({ id: i, message: `Payload Message: ${i}\\n`});\r\n    }\r\n    const response = await fetch(\"/read\", {\r\n        method: \"POST\", body: JSON.stringify(payload), \r\n        headers: {\r\n            \"Content-Type\": \"application/json\"\r\n        }\r\n    })\r\n    document.getElementById(\"msg\").textContent = response.statusText;\r\n    document.getElementById(\"body\").textContent \r\n        = `Resp: ${await response.text()}`;\r\n}\r\n\n\n//# sourceURL=webpack://webapp/./static/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./static/client.js"]();
/******/ 	
/******/ })()
;