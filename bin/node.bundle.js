module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/leducduy/Downloads/emszalo/botpress-zalo";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(12);

var handlePromise = function handlePromise(next, promise) {
  return promise.then(function (res) {
    console.log('success');
    console.log(res);
    next();
    return res;
  }).catch(function (err) {
    console.log('error');
    console.log(err);
    next(err);
    throw err;
  });
};

var handleText = function handleText(event, next, zalo) {
  return handlePromise(next, zalo.getClient().api('sendmessage/text', 'POST', { uid: (0, _utils.sanitizeUserId)(event.raw.userId), message: event.text }));
};

module.exports = {
  text: handleText
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _outgoing = __webpack_require__(1);

var _outgoing2 = _interopRequireDefault(_outgoing);

var _incoming = __webpack_require__(4);

var _incoming2 = _interopRequireDefault(_incoming);

var _umm = __webpack_require__(6);

var _umm2 = _interopRequireDefault(_umm);

var _zalo = __webpack_require__(9);

var _zalo2 = _interopRequireDefault(_zalo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Botpress module template. This is your module's entry point.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             Please have a look at the docs for more information about config, init and ready.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             https://botpress.io/docs
                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */

var zalo = null;

var outgoingMiddleware = function outgoingMiddleware(event, next) {
  if (event.platform !== 'zalo') {
    return next();
  }

  if (!_outgoing2.default[event.type]) {
    return next('Unsupported event type: ' + event.type);
  }

  return _outgoing2.default[event.type](event, next, zalo);
};

var initializeZalo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bp, configurator) {
    var config, enabled;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return configurator.loadAll();

          case 2:
            config = _context.sent;


            zalo = new _zalo2.default(bp, config);
            // users = Users(bp, messenger)

            enabled = config.enabled;

            if (enabled) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', bp.logger.warn('[Messenger] Connection disabled'));

          case 7:
            return _context.abrupt('return', zalo);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function initializeZalo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  config: {
    oaID: { type: 'string', required: true, default: '', env: 'ZALO_OA_ID' },
    secretKey: { type: 'string', required: true, default: '', env: 'ZALO_SECRET_KEY' },
    enabled: { type: 'bool', required: true, default: true }
  },

  // eslint-disable-next-line no-unused-vars
  init: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(bp, configurator, helpers) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              bp.middlewares.register({
                name: 'zalo.sendMessages',
                type: 'outgoing',
                order: 101,
                handler: outgoingMiddleware,
                module: 'botpress-zalo',
                description: 'Sends out messages that targets platform = zalo. This middleware should be placed at the end as it swallows events once sent.'
              });

              bp.zalo = {};

              (0, _umm2.default)(bp); // Initializes Zalo in the UMM

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function init(_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(),

  // eslint-disable-next-line no-unused-vars
  ready: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(bp, configurator, helpers) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return initializeZalo(bp, configurator);

            case 2:
              (0, _incoming2.default)(bp, configurator, zalo);
              bp.zalo._internal = zalo;

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function ready(_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }()
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lruCache = __webpack_require__(5);

var _lruCache2 = _interopRequireDefault(_lruCache);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _outgoing = __webpack_require__(1);

var _outgoing2 = _interopRequireDefault(_outgoing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (bp, config, zalo) {
  var messagesCache = (0, _lruCache2.default)({
    max: 10000,
    maxAge: 60 * 60 * 1000
  });

  zalo.on('sendmsg', function (e) {
    var message = e.message,
        fromuid = e.fromuid;

    bp.middlewares.sendIncoming({
      platform: 'zalo',
      type: 'message',
      user: { id: 'zalo:' + fromuid },
      text: message,
      raw: e
    });
  });
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _actions = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUserId(event) {
  return event.user.id;
}

function _processOutgoing(_ref) {
  var event = _ref.event,
      blocName = _ref.blocName,
      instruction = _ref.instruction;

  var ins = Object.assign({}, instruction); // Create a shallow copy of the instruction

  if (!_lodash2.default.isNil(instruction.text)) {
    return (0, _actions.createText)(getUserId(event), instruction.text);
  }

  var strRep = util.inspect(instruction, false, 1);
  throw new Error('Unrecognized instruction on Zalo in bloc \'' + blocName + '\': ' + strRep);
}

module.exports = function (bp) {
  var _$at = _lodash2.default.at(bp, ['renderers', 'renderers.registerConnector']),
      _$at2 = _slicedToArray(_$at, 2),
      renderers = _$at2[0],
      registerConnector = _$at2[1];

  renderers && registerConnector && registerConnector({
    platform: 'zalo',
    processOutgoing: function processOutgoing(args) {
      return _processOutgoing(Object.assign({}, args, { bp: bp }));
    },
    templates: []
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createText = createText;

var _bluebird = __webpack_require__(8);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(obj) {
  var resolve = null;
  var reject = null;
  var promise = new _bluebird2.default(function (r, rj) {
    resolve = r;
    reject = rj;
  });

  var messageId = new Date().toISOString() + Math.random();
  var newEvent = Object.assign({
    // _promise: promise,
    // _resolve: resolve,
    // _reject: reject,
    __id: messageId
  }, obj);

  return newEvent;
};

function createText(userId, text) {
  return create({
    platform: 'zalo',
    text: text,
    type: 'text',
    raw: { userId: userId, text: text }
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zaloSdk = __webpack_require__(10);

var _eventemitter = __webpack_require__(11);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zalo = function (_EventEmitter) {
  _inherits(Zalo, _EventEmitter);

  function Zalo(bp, config) {
    _classCallCheck(this, Zalo);

    var _this = _possibleConstructorReturn(this, (Zalo.__proto__ || Object.getPrototypeOf(Zalo)).call(this));

    _this.zOAClient = new _zaloSdk.ZaloOA({
      oaid: config.oaID,
      secretkey: config.secretKey
    });

    _this.setConfig(config);
    _this.bp = bp;

    _this.app = bp.getRouter('botpress-zalo', {
      'bodyParser.json': false,
      auth: function auth(req) {
        return !/\/webhook/i.test(req.originalUrl);
      }
    });

    // this.app.use(
    //   bodyParser.json({
    //     verify: this._verifyRequestSignature.bind(this)
    //   })
    // )

    _this._initWebhook();
    return _this;
  }

  _createClass(Zalo, [{
    key: 'getClient',
    value: function getClient() {
      return this.zOAClient;
    }
  }, {
    key: 'setConfig',
    value: function setConfig(config) {
      this.config = Object.assign({}, this.config, config);
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.config;
    }
  }, {
    key: '_initWebhook',
    value: function _initWebhook() {
      var _this2 = this;

      this.app.get('/webhook', function (req, res) {
        var _req$query = req.query,
            event = _req$query.event,
            message = _req$query.message,
            fromuid = _req$query.fromuid,
            msgid = _req$query.msgid;

        switch (event) {
          case 'sendmsg':
            _this2._handleEvent(event, { message: message, fromuid: fromuid, msgid: msgid });
            break;
          default:

            break;
        }

        // Must send back a 200 within 20 seconds or the request will time out.
        res.sendStatus(200);
      });
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(type, event) {
      this.emit(type, event);
    }
  }]);

  return Zalo;
}(_eventemitter2.default);

exports.default = Zalo;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("zalo-sdk");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("eventemitter2");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeUserId = sanitizeUserId;
function sanitizeUserId(userId) {
  return userId.replace(/zalo:/gi, '');
}

/***/ })
/******/ ]);
//# sourceMappingURL=node.bundle.js.map