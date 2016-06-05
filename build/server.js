/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _door = __webpack_require__(2);
	
	var _door2 = _interopRequireDefault(_door);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var express = __webpack_require__(4),
	    app = express(),
	    server = __webpack_require__(5).Server(app),
	    io = __webpack_require__(6)(server),
	    port = 8001,
	    socketPort = 8002,
	    bodyParser = __webpack_require__(7);
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	io.set('transports', ['websocket']);
	
	app.all('/', function (req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    next();
	});
	
	app.get('/', function (req, res) {
	    res.send("Hello from the garage");
	});
	app.get('/open', function (req, res) {
	    return _door2.default.getOpen(req, res);
	});
	app.post('/open', function (req, res) {
	    return _door2.default.setOpen(req, res);
	});
	
	app.listen(port, function () {
	    console.log("Garage door server running on port: " + port);
	    console.log("Websocket port: " + socketPort);
	});
	
	server.listen(socketPort);
	
	io.on('connection', function (socket) {
	    console.log("socket connected");
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _door = __webpack_require__(3);
	
	var _door2 = _interopRequireDefault(_door);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var garage = new _door2.default();
	
	exports.default = {
	    getOpen: function getOpen(req, res) {
	        garage.getOpen();
	        res.send(garage);
	    },
	    setOpen: function setOpen(req, res) {
	        if (req.body.open === "true") {
	            garage.setOpen(true);
	        } else {
	            garage.setOpen(false);
	        }
	        res.send(garage);
	    },
	    getLocks: function getLocks(req, res) {
	        res.send();
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Door = function () {
	    function Door() {
	        _classCallCheck(this, Door);
	
	        this.open = false;
	        this.locks = [];
	    }
	
	    _createClass(Door, [{
	        key: "getOpen",
	        value: function getOpen() {
	            return this.open;
	        }
	    }, {
	        key: "setOpen",
	        value: function setOpen(val) {
	            this.open = val;
	            return this.open;
	        }
	    }]);
	
	    return Door;
	}();
	
	exports.default = Door;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map