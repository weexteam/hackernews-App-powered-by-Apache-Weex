//banner

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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.install = install;
	
	var _semver = __webpack_require__(61);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	__webpack_require__(27);
	
	var _components = __webpack_require__(18);
	
	var components = _interopRequireWildcard(_components);
	
	var _viewport = __webpack_require__(31);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Vue from 'vue'
	function install(Vue) {
	  var htmlRegex = /^html:/i;
	  Vue.config.isReservedTag = function (tag) {
	    return htmlRegex.test(tag);
	  };
	  Vue.config.parsePlatformTagName = function (tag) {
	    return tag.replace(htmlRegex, '');
	  };
	
	  for (var name in components) {
	    Vue.component(name, components[name]);
	  }
	
	  /* istanbul ignore next */
	  if (true) {
	    console.log('[Vue Renderer] Registered components: ' + ('[' + Object.keys(components).join(', ') + '].'));
	  }
	}
	
	/* eslint-disable no-undef */
	if (typeof Vue === 'undefined') {
	  console.error('[Vue Renderer] `Vue` is not defined!');
	} else {
	  /* istanbul ignore next */
	  if (("development") === 'development' && _semver2.default.lt(Vue.version, '2.1.5')) {
	    console.warn('[Vue Renderer] The version of Vue should be ' + ('greater than 2.1.5, current is ' + Vue.version + '.'));
	  }
	
	  (0, _viewport.setViewport)();
	
	  Vue.use({ install: install });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configure = configure;
	exports.validateStyles = validateStyles;
	exports.validateProps = validateProps;
	
	var _style = __webpack_require__(30);
	
	var styleValidator = _interopRequireWildcard(_style);
	
	var _prop = __webpack_require__(29);
	
	var propValidator = _interopRequireWildcard(_prop);
	
	var _utils = __webpack_require__(2);
	
	var _check = __webpack_require__(28);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var onfail = function nope() {};
	var showConsole = true;
	
	function warn() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var message = args.join(' ');
	  showConsole && console.log(message);
	  onfail(message);
	  return message;
	}
	
	/**
	 * Configure the validator.
	 * @param {Object} configs
	 */
	function configure() {
	  var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  showConsole = !configs.silent;
	  if (typeof configs.onfail === 'function') {
	    onfail = configs.onfail;
	  }
	}
	
	/**
	 * Validate the styles of the component.
	 * @param {String} type
	 * @param {Object} styles
	 */
	function validateStyles(type) {
	  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var isValid = true;
	  for (var key in styles) {
	    if (!(0, _check.isSupportedStyle)(type, (0, _utils.hyphenate)(key))) {
	      isValid = false;
	      warn('[Style Validator] <' + type + '> is not support to use the "' + key + '" style.');
	    } else {
	      var validator = styleValidator[(0, _utils.camelize)(key)] || styleValidator.common;
	      if (!validator(styles[key], (0, _utils.hyphenate)(key))) {
	        isValid = false;
	        warn('[Style Validator] The style "' + key + '" is not support the "' + styles[key] + '" value.');
	      }
	    }
	  }
	  return isValid;
	}
	
	/**
	 * Validate the properties of the component.
	 * @param {String} type
	 * @param {Object} props
	 */
	function validateProps(type) {
	  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var isValid = true;
	  for (var key in props) {
	    var validator = propValidator[(0, _utils.camelize)(key)];
	    if (validator && !validator(props[key])) {
	      isValid = false;
	      warn('[Property Validator] The property "' + key + '" is not support the "' + props[key] + '" value.');
	    }
	  }
	  return isValid;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cached = cached;
	exports.extend = extend;
	exports.bind = bind;
	exports.debounce = debounce;
	exports.throttle = throttle;
	/**
	 * Create a cached version of a pure function.
	 */
	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = exports.camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) {
	    return c.toUpperCase();
	  });
	});
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = exports.capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	});
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = exports.hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
	});
	
	/**
	 * Mix properties into target object.
	 */
	function extend(to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to;
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	function debounce(func, wait) {
	  var timerId = void 0;
	  function later() {
	    timerId = null;
	    func.apply(null);
	  }
	  return function () {
	    clearTimeout(timerId);
	    timerId = setTimeout(later, wait);
	  };
	}
	
	function throttle(func, wait) {
	  var last = 0;
	  return function () {
	    var context = this;
	    var time = new Date().getTime();
	    if (time - last > wait) {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      func.apply(context, args);
	      last = time;
	    }
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(6)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    count: [Number, String],
	    active: [Number, String]
	  },
	  render: function render(createElement) {
	    var children = [];
	    for (var i = 0; i < Number(this.count); ++i) {
	      var classNames = ['weex-indicator-item'];
	      if (i === Number(this.active)) {
	        classNames.push('weex-indicator-item-active');
	      }
	      children.push(createElement('menuitem', {
	        staticClass: classNames.join(' ')
	      }));
	    }
	    return createElement('menu', {
	      attrs: { 'weex-type': 'indicator' },
	      staticClass: 'weex-indicator'
	    }, children);
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  methods: {
	    reachBottom: function reachBottom() {
	      var wrapper = this.$refs.wrapper;
	      var inner = this.$refs.inner;
	      var offset = Number(this.loadmoreoffset) || 0;
	
	      if (wrapper && inner) {
	        var innerHeight = inner.getBoundingClientRect().height;
	        var wrapperHeight = wrapper.getBoundingClientRect().height;
	        return wrapper.scrollTop >= innerHeight - wrapperHeight - offset;
	      }
	      return false;
	    }
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(46)
	  , createDesc = __webpack_require__(51);
	module.exports = __webpack_require__(5) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(13)
	  , defined = __webpack_require__(10);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	exports.default = {
	  props: {
	    src: String,
	    resize: {
	      validator: function validator(value) {
	        /* istanbul ignore next */
	        return ['cover', 'contain', 'stretch'].indexOf(value) !== -1;
	      }
	    }
	  },
	
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('image', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    /* istanbul ignore next */
	    if (!this.src && ("development") === 'development') {
	      console.warn('[Vue Renderer] The <image> component must have the "src" attribute.');
	    }
	
	    var cssText = 'background-image:url("' + this.src + '");';
	
	    // compatibility: http://caniuse.com/#search=background-size
	    cssText += this.resize && this.resize !== 'stretch' ? 'background-size: ' + this.resize + ';' : 'background-size: 100% 100%;';
	
	    return createElement('figure', {
	      attrs: { 'weex-type': 'image' },
	      staticClass: 'weex-image',
	      style: cssText
	    });
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.web = exports.text = exports.indicator = exports.slider = exports.scroller = exports.cell = exports.list = exports.image = exports.switch = undefined;
	
	var _switch2 = __webpack_require__(24);
	
	var _switch3 = _interopRequireDefault(_switch2);
	
	var _image = __webpack_require__(17);
	
	var _image2 = _interopRequireDefault(_image);
	
	var _list = __webpack_require__(20);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _cell = __webpack_require__(19);
	
	var _cell2 = _interopRequireDefault(_cell);
	
	var _scroller = __webpack_require__(21);
	
	var _scroller2 = _interopRequireDefault(_scroller);
	
	var _slider = __webpack_require__(22);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	var _indicator = __webpack_require__(8);
	
	var _indicator2 = _interopRequireDefault(_indicator);
	
	var _text = __webpack_require__(25);
	
	var _text2 = _interopRequireDefault(_text);
	
	var _web = __webpack_require__(26);
	
	var _web2 = _interopRequireDefault(_web);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.switch = _switch3.default;
	exports.image = _image2.default;
	exports.list = _list2.default;
	exports.cell = _cell2.default;
	exports.scroller = _scroller2.default;
	exports.slider = _slider2.default;
	exports.indicator = _indicator2.default;
	exports.text = _text2.default;
	exports.web = _web2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	exports.default = {
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('cell', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('section', {
	      attrs: { 'weex-type': 'cell' },
	      staticClass: 'weex-cell'
	    }, this.$slots.default);
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	var _rect = __webpack_require__(9);
	
	var _rect2 = _interopRequireDefault(_rect);
	
	var _event = __webpack_require__(63);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_rect2.default, _event2.default],
	  props: {
	    loadmoreoffset: {
	      type: [String, Number],
	      default: 0
	    }
	  },
	
	  methods: {
	    handleScroll: function handleScroll(event) {
	      if (this.reachBottom()) {
	        this.$emit('loadmore', this.createCustomEvent('loadmore'));
	      }
	    }
	  },
	
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('list', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('main', {
	      ref: 'wrapper',
	      attrs: { 'weex-type': 'list' },
	      staticClass: 'weex-list weex-list-wrapper',
	      on: {
	        scroll: (0, _utils.debounce)((0, _utils.bind)(this.handleScroll, this), 100)
	      }
	    }, [createElement('mark', { ref: 'topMark', staticClass: 'weex-list-top-mark' }), createElement('div', {
	      ref: 'inner',
	      staticClass: 'weex-list-inner'
	    }, this.$slots.default), createElement('mark', { ref: 'bottomMark', staticClass: 'weex-list-bottom-mark' })]);
	  }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	var _rect = __webpack_require__(9);
	
	var _rect2 = _interopRequireDefault(_rect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_rect2.default],
	  props: {
	    loadmoreoffset: {
	      type: [String, Number],
	      default: 0
	    }
	  },
	
	  methods: {
	    handleScroll: function handleScroll(event) {
	      if (this.reachBottom()) {
	        this.$emit('loadmore', event);
	      }
	    }
	  },
	
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('scroller', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('main', {
	      ref: 'wrapper',
	      attrs: { 'weex-type': 'scroller' },
	      staticClass: 'weex-scroller weex-scroller-wrapper',
	      on: {
	        scroll: (0, _utils.debounce)((0, _utils.bind)(this.handleScroll, this), 100)
	      }
	    }, [createElement('mark', { ref: 'topMark', staticClass: 'weex-scroller-top-mark' }), createElement('div', {
	      ref: 'inner',
	      staticClass: 'weex-scroller-inner'
	    }, this.$slots.default), createElement('mark', { ref: 'bottomMark', staticClass: 'weex-scroller-bottom-mark' })]);
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	var _indicator = __webpack_require__(8);
	
	var _indicator2 = _interopRequireDefault(_indicator);
	
	var _event = __webpack_require__(63);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _slideMixin = __webpack_require__(23);
	
	var _slideMixin2 = _interopRequireDefault(_slideMixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_event2.default, _slideMixin2.default],
	  components: { indicator: _indicator2.default },
	  props: {
	    'auto-play': {
	      type: [String, Boolean],
	      default: false
	    },
	    interval: {
	      type: [String, Number],
	      default: 3000
	    }
	  },
	
	  data: function data() {
	    return {
	      currentIndex: 0,
	      frameCount: 0
	    };
	  },
	
	
	  methods: {
	    computeWrapperSize: function computeWrapperSize() {
	      var wrapper = this.$refs.wrapper;
	      if (wrapper) {
	        var rect = wrapper.getBoundingClientRect();
	        this.wrapperWidth = rect.width;
	        this.wrapperHeight = rect.height;
	      }
	    },
	    updateLayout: function updateLayout() {
	      this.computeWrapperSize();
	      var inner = this.$refs.inner;
	      if (inner) {
	        inner.style.width = this.wrapperWidth * this.frameCount + 'px';
	      }
	    }
	  },
	
	  created: function created() {
	    var _this = this;
	
	    this.$nextTick(function () {
	      _this.updateLayout();
	    });
	  },
	  mounted: function mounted() {
	    var _this2 = this;
	
	    if (this.autoPlay) {
	      (function () {
	        var interval = Number(_this2.interval);
	        _this2._lastSlideTime = Date.now();
	
	        var autoPlayFn = (0, _utils.bind)(function () {
	          clearTimeout(this._autoPlayTimer);
	          var now = Date.now();
	          var nextTick = interval - now + this._lastSlideTime;
	          nextTick = nextTick > 100 ? nextTick : interval;
	
	          this.next();
	          this._lastSlideTime = now;
	          this._autoPlayTimer = setTimeout(autoPlayFn, nextTick);
	        }, _this2);
	
	        _this2._autoPlayTimer = setTimeout(autoPlayFn, interval);
	      })();
	    }
	  },
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('slider', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    var children = this.$slots.default || [];
	    var innerElements = children.map(function (vnode) {
	      return createElement('li', {
	        staticClass: 'weex-slider-cell'
	      }, [vnode]);
	    });
	    this.frameCount = innerElements.length;
	
	    return createElement('nav', {
	      ref: 'wrapper',
	      attrs: { 'weex-type': 'slider' },
	      staticClass: 'weex-slider weex-slider-wrapper',
	      on: {
	        touchstart: this.handleTouchStart,
	        touchmove: (0, _utils.throttle)((0, _utils.bind)(this.handleTouchMove, this), 25),
	        touchend: this.handleTouchEnd
	      }
	    }, [createElement('ul', {
	      ref: 'inner',
	      staticClass: 'weex-slider-inner'
	    }, innerElements), createElement(_indicator2.default, {
	      attrs: {
	        count: this.frameCount,
	        active: this.currentIndex
	      }
	    })]);
	  }
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  methods: {
	    slideTo: function slideTo(index) {
	      // let newIndex = (index | 0) // % this.frameCount
	      var newIndex = (index | 0) % this.frameCount; // scroll to left
	      newIndex = Math.max(newIndex, 0);
	      newIndex = Math.min(newIndex, this.frameCount - 1);
	
	      var offset = -newIndex * this.wrapperWidth;
	      var inner = this.$refs.inner;
	
	      if (inner) {
	        // TODO: will-change | set styles together
	        inner.style.transition = 'transform .2s ease-in-out';
	        inner.style.transform = 'translate3d(' + offset + 'px, 0, 0)';
	        setTimeout(function () {
	          inner.style.transition = '';
	        }, 200);
	      }
	      if (newIndex !== this.currentIndex) {
	        this.currentIndex = newIndex;
	        this.$emit('change', this.createEvent('change', {
	          index: this.currentIndex
	        }));
	      }
	    },
	    next: function next() {
	      this.slideTo(this.currentIndex + 1);
	    },
	    prev: function prev() {
	      this.slideTo(this.currentIndex - 1);
	    },
	    handleTouchStart: function handleTouchStart(event) {
	      event.preventDefault();
	      event.stopPropagation();
	      // console.log('touch start', event)
	      var touch = event.changedTouches[0];
	      // console.log('touch start', event.target, event.target.pageY)
	      // console.log('touches', touch)
	      this._touchParams = {
	        originalTransform: this.$refs.inner.style.transform,
	        startTouchEvent: touch,
	        startX: touch.pageX,
	        startY: touch.pageY,
	        timeStamp: event.timeStamp
	      };
	    },
	    handleTouchMove: function handleTouchMove(event) {
	      event.preventDefault();
	      event.stopPropagation();
	      // console.log('touch move')
	      if (this._touchParams) {
	        var inner = this.$refs.inner;
	        var startX = this._touchParams.startX;
	
	        var touch = event.changedTouches[0];
	        var offsetX = touch.pageX - startX;
	        // console.log('offsetX', offsetX, 'startX', startX, 'pageX', touch.pageX)
	        this._touchParams.offsetX = offsetX;
	
	        if (inner && offsetX) {
	          // console.log('transform', `${offsetX - this.currentIndex * this.wrapperWidth}`)
	          inner.style.transform = 'translate3d(' + (offsetX - this.currentIndex * this.wrapperWidth) + 'px, 0, 0)';
	        }
	      }
	    },
	    handleTouchEnd: function handleTouchEnd(event) {
	      event.preventDefault();
	      event.stopPropagation();
	      // console.log('touch end')
	      var inner = this.$refs.inner;
	      if (this._touchParams) {
	        var offsetX = this._touchParams.offsetX;
	        // console.log('touch pageX:', touch.pageX, ', offsetX:', offsetX)
	
	        if (inner) {
	          var reset = Math.abs(offsetX / this.wrapperWidth) < 0.2;
	          var direction = offsetX > 0 ? 1 : -1;
	          var newIndex = reset ? this.currentIndex : this.currentIndex - direction;
	
	          // console.log('reset:', reset, ', newIndex:', newIndex)
	          this.slideTo(newIndex);
	        }
	      }
	      delete this._touchParams;
	    }
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	exports.default = {
	  props: {
	    checked: {
	      type: [Boolean, String],
	      default: false
	    },
	    disabled: {
	      type: [Boolean, String],
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      isChecked: this.checked !== 'false' && this.checked !== false,
	      isDisabled: this.disabled !== 'false' && this.disabled !== false
	    };
	  },
	
	  computed: {
	    wrapperClass: function wrapperClass() {
	      var classArray = ['weex-switch'];
	      this.isChecked && classArray.push('weex-switch-checked');
	      this.isDisabled && classArray.push('weex-switch-disabled');
	      return classArray.join(' ');
	    }
	  },
	  methods: {
	    toggle: function toggle() {
	      // TODO: handle the events
	      if (!this.isDisabled) {
	        this.isChecked = !this.isChecked;
	        this.$emit('change', { value: this.isChecked });
	      }
	    }
	  },
	
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('switch', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('span', {
	      attrs: { 'weex-type': 'switch' },
	      staticClass: this.wrapperClass,
	      on: { click: this.toggle }
	    }, [createElement('small', { staticClass: 'weex-switch-inner' })]);
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	/**
	 * Get text styles
	 */
	function getTextStyle() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var lines = parseInt(props.lines) || 0;
	  if (lines > 0) {
	    return {
	      overflow: 'hidden',
	      textOverflow: 'ellipsis',
	      webkitLineClamp: lines
	    };
	  }
	}
	
	exports.default = {
	  props: {
	    lines: [Number, String],
	    value: [String]
	  },
	
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('text', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('p', {
	      attrs: { 'weex-type': 'text' },
	      staticClass: 'weex-text',
	      staticStyle: getTextStyle(this)
	    }, this.$slots.default || [this.value]);
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _validator = __webpack_require__(1);
	
	exports.default = {
	  props: {
	    src: String
	  },
	  render: function render(createElement) {
	    /* istanbul ignore next */
	    if (true) {
	      (0, _validator.validateStyles)('web', this.$vnode.data && this.$vnode.data.staticStyle);
	    }
	
	    return createElement('iframe', {
	      attrs: {
	        'weex-type': 'web',
	        src: this.src
	      },
	      staticClass: 'weex-web'
	    });
	  }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(32);
	
	__webpack_require__(33);
	
	__webpack_require__(34);
	
	// TODO: Promise polyfill
	
	// TODO: parse UA
	var ua = navigator.userAgent;
	
	window.WXEnvironment = {
	  platform: 'Web',
	  userAgent: ua,
	  appName: navigator.appName,
	  appVersion: navigator.appVersion, // maybe too long
	  weexVersion: '',
	  osName: '',
	  osVersion: '',
	  deviceWidth: window.innerWidth,
	  deviceHeight: window.innerHeight
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flatten = flatten;
	exports.checkSupported = checkSupported;
	exports.isSupportedStyle = isSupportedStyle;
	exports.isSupportedProp = isSupportedProp;
	var supportedProperties = {
	  '@common': ['id', 'ref', 'style', 'class', 'append']
	};
	
	var supportedStyles = {
	  '@box-model': ['width', 'height', 'position', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
	  '@border': ['border-style', 'border-width', 'border-color', 'border-radius', 'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'],
	  '@flexbox': ['display', 'flex', 'flex-direction', 'justify-content', 'align-items', 'flex-wrap'],
	  '@font': ['font-size', 'font-weight', 'font-style', 'font-family'],
	  '@colors': ['color', 'background-color', 'opacity'],
	  text: ['@box-model', '@border', '@flexbox', '@font', '@colors', 'text-align', 'text-decoration', 'text-overflow']
	};
	
	/**
	 * Flatten a multiple dimension array.
	 */
	function flatten(array) {
	  return array.reduce(function (dist, item) {
	    return dist.concat(Array.isArray(item) ? flatten(item) : item);
	  }, []);
	}
	
	/**
	 * Check if the value is in the list.
	 * @param {String} type
	 * @param {String} value
	 * @param {Object} dict
	 */
	function checkSupported(type, value) {
	  var dict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	  if (type && value && dict[type]) {
	    return flatten(dict[type].map(function (k) {
	      return dict[k] || k;
	    })).indexOf(value) !== -1;
	  }
	  return true;
	}
	
	/**
	 * Check if the style is supported for the component.
	 * @param {String} type
	 * @param {String} style
	 */
	function isSupportedStyle(type, style) {
	  return checkSupported(type, style, supportedStyles);
	}
	
	/**
	 * Check if the property is supported for the component.
	 * @param {String} type
	 * @param {String} property
	 */
	function isSupportedProp(type, prop) {
	  return checkSupported(type, prop, supportedProperties);
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isString = isString;
	function isString(value) {
	  return Object.prototype.toString.call(value) === '[object String]';
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isCSSColor = isCSSColor;
	exports.isCSSLength = isCSSLength;
	exports.position = position;
	exports.opacity = opacity;
	exports.display = display;
	exports.flexDirection = flexDirection;
	exports.justifyContent = justifyContent;
	exports.alignItems = alignItems;
	exports.flex = flex;
	exports.fontStyle = fontStyle;
	exports.fontWeight = fontWeight;
	exports.textDecoration = textDecoration;
	exports.textAlign = textAlign;
	exports.overflow = overflow;
	exports.textOverflow = textOverflow;
	exports.common = common;
	
	/**
	 * Validate the CSS color value.
	 */
	function isCSSColor(value) {
	  return (/^[a-z]+$/i.test(value) // match color name
	    || /^#([a-f0-9]{3}){1,2}$/i.test(value) // match #ABCDEF
	    || /^rgb\s*\((\s*[0-9.]+\s*,){2}\s*[0-9.]+\s*\)/i.test(value) // match rgb(0,0,0)
	    || /^rgba\s*\((\s*[0-9.]+\s*,){3}\s*[0-9.]+\s*\)/i.test(value)
	  ); // match rgba(0,0,0,0)
	}
	
	function isCSSLength(value) {
	  return (/^[+-]?[0-9]+.?([0-9]+)?(px|%)?$/.test(String(value))
	  );
	}
	
	function position(value) {
	  return ['absolute', 'relative', 'fixed', 'sticky'].indexOf(value) !== -1;
	}
	
	function opacity(value) {
	  var count = parseFloat(value);
	  return count >= 0 && count <= 1;
	}
	
	function display(value) {
	  return ['block', 'flex'].indexOf(value) !== -1;
	}
	
	function flexDirection(value) {
	  return ['row', 'column'].indexOf(value) !== -1;
	}
	
	function justifyContent(value) {
	  return ['flex-start', 'flex-end', 'center', 'space-between'].indexOf(value) !== -1;
	}
	
	function alignItems(value) {
	  return ['stretch', 'flex-start', 'flex-end', 'center'].indexOf(value) !== -1;
	}
	
	function flex(value) {
	  return (/^\d{1,3}$/.test(String(value))
	  );
	}
	
	function fontStyle(value) {
	  return ['normal', 'italic', 'oblique'].indexOf(value) !== -1;
	}
	
	function fontWeight(value) {
	  return ['normal', 'bold', 'light', 'bolder', 'lighter'].indexOf(value) !== -1;
	}
	
	function textDecoration(value) {
	  return ['none', 'underline', 'line-through'].indexOf(value) !== -1;
	}
	
	function textAlign(value) {
	  return ['left', 'center', 'right'].indexOf(value) !== -1;
	}
	
	function overflow(value) {
	  return ['visible', 'hidden'].indexOf(value) !== -1;
	}
	
	function textOverflow(value) {
	  return ['clip', 'ellipsis'].indexOf(value) !== -1;
	}
	
	/**
	 * Common style validator.
	 * @param {any} value
	 * @param {String} key
	 */
	function common(value, key) {
	  if (/^[\w-]*color$/.test(String(key))) {
	    return isCSSColor(value);
	  }
	
	  if (/^(width|height)$/.test(String(key))) {
	    return isCSSLength(value);
	  }
	
	  // checkout border-radius
	  if (/^border-((top|right|bottom|left)-){0,2}(width|radius)$/.test(String(key))) {
	    return isCSSLength(value);
	  }
	
	  // check border-style
	  if (/border-((top|right|bottom|left)-)?style/.test(String(key))) {
	    return ['solid', 'dashed', 'dotted'].indexOf(value) !== -1;
	  }
	
	  if (/^((margin|padding)-)?(top|right|bottom|left)/.test(String(key))) {
	    return isCSSLength(value);
	  }
	
	  switch (String(key)) {
	    case 'font-size':
	      return isCSSLength(value);
	  }
	
	  return true;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setViewport = setViewport;
	var DEFAULT_VIEWPORT_WIDTH = 750;
	
	function setViewport() {
	  var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var doc = window.document;
	
	  if (doc) {
	    var screenWidth = window.screen.width;
	    var scale = screenWidth / DEFAULT_VIEWPORT_WIDTH;
	
	    var contents = ['width=' + DEFAULT_VIEWPORT_WIDTH, 'initial-scale=' + scale, 'maximum-scale=' + scale, 'minimum-scale=' + scale, 'user-scalable=no'];
	
	    var meta = doc.querySelector('meta[name="viewport"]');
	    if (!meta) {
	      meta = doc.createElement('meta');
	      meta.setAttribute('name', 'viewport');
	      document.querySelector('head').appendChild(meta);
	    }
	
	    meta.setAttribute('content', contents.join(','));
	  }
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	/* eslint-disable */
	
	// Production steps of ECMA-262, Edition 6, 22.1.2.1
	// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
	
	/* istanbul ignore if */
	if (!Array.from) {
	  Array.from = function () {
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number === 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };
	
	    // The length property of the from method is 1.
	    return function from(arrayLike /*, mapFn, thisArg */) {
	      // 1. Let C be the this value.
	      var C = this;
	
	      // 2. Let items be ToObject(arrayLike).
	      var items = Object(arrayLike);
	
	      // 3. ReturnIfAbrupt(items).
	      if (arrayLike == null) {
	        throw new TypeError('Array.from requires an array-like object - not null or undefined');
	      }
	
	      // 4. If mapfn is undefined, then let mapping be false.
	      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
	      var T;
	      if (typeof mapFn !== 'undefined') {
	        // 5. else
	        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
	        if (!isCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }
	
	        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }
	
	      // 10. Let lenValue be Get(items, "length").
	      // 11. Let len be ToLength(lenValue).
	      var len = toLength(items.length);
	
	      // 13. If IsConstructor(C) is true, then
	      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
	      // 14. a. Else, Let A be ArrayCreate(len).
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
	
	      // 16. Let k be 0.
	      var k = 0;
	      // 17. Repeat, while k < len… (also steps a - h)
	      var kValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          A[k] = kValue;
	        }
	        k += 1;
	      }
	      // 18. Let putStatus be Put(A, "length", len, true).
	      A.length = len;
	      // 20. Return A.
	      return A;
	    };
	  }();
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(35);

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	/* eslint-disable */
	
	// https://gist.github.com/WebReflection/5593554
	
	/* istanbul ignore if */
	if (!Object.setPrototypeOf) {
	  Object.setPrototypeOf = function (Object, magic) {
	    var set;
	    function setPrototypeOf(O, proto) {
	      set.call(O, proto);
	      return O;
	    }
	    try {
	      // this works already in Firefox and Safari
	      set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
	      set.call({}, null);
	    } catch (e) {
	      if (
	      // IE < 11 cannot be shimmed
	      Object.prototype !== {}[magic] ||
	      // neither can any browser that actually
	      // implemented __proto__ correctly
	      // (all but old V8 will return here)
	      { __proto__: null }.__proto__ === void 0
	      // this case means null objects cannot be passed
	      // through setPrototypeOf in a reliable way
	      // which means here a **Sham** is needed instead
	      ) {
	          return;
	        }
	      // nodejs 0.8 and 0.10 are (buggy and..) fine here
	      // probably Chrome or some old Mobile stock browser
	      set = function set(proto) {
	        this[magic] = proto;
	      };
	      // please note that this will **not** work
	      // in those browsers that do not inherit
	      // __proto__ by mistake from Object.prototype
	      // in these cases we should probably throw an error
	      // or at least be informed about the issue
	      setPrototypeOf.polyfill = setPrototypeOf(setPrototypeOf({}, null), Object.prototype) instanceof Object;
	      // setPrototypeOf.polyfill === true means it works as meant
	      // setPrototypeOf.polyfill === false means it's not 100% reliable
	      // setPrototypeOf.polyfill === undefined
	      // or
	      // setPrototypeOf.polyfill ==  null means it's not a polyfill
	      // which means it works as expected
	      // we can even delete Object.prototype.__proto__;
	    }
	    return setPrototypeOf;
	  }(Object, '__proto__');
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	module.exports = __webpack_require__(4).Object.assign;

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(15)
	  , toLength  = __webpack_require__(56)
	  , toIndex   = __webpack_require__(55);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(36);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7)
	  , document = __webpack_require__(3).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(3)
	  , core      = __webpack_require__(4)
	  , hide      = __webpack_require__(12)
	  , redefine  = __webpack_require__(52)
	  , ctx       = __webpack_require__(40)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(5) && !__webpack_require__(6)(function(){
	  return Object.defineProperty(__webpack_require__(41)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(49)
	  , gOPS     = __webpack_require__(47)
	  , pIE      = __webpack_require__(50)
	  , toObject = __webpack_require__(57)
	  , IObject  = __webpack_require__(13)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(6)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(37)
	  , IE8_DOM_DEFINE = __webpack_require__(44)
	  , toPrimitive    = __webpack_require__(58)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(11)
	  , toIObject    = __webpack_require__(15)
	  , arrayIndexOf = __webpack_require__(38)(false)
	  , IE_PROTO     = __webpack_require__(53)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(42);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(3)
	  , hide      = __webpack_require__(12)
	  , has       = __webpack_require__(11)
	  , SRC       = __webpack_require__(16)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(4).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(54)('keys')
	  , uid    = __webpack_require__(16);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(3)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(14)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(14)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(10);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(7);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(43);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(45)});

/***/ },
/* 60 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;
	
	// The debug function is excluded entirely from the minified version.
	/* nomin */ var debug;
	/* nomin */ if (typeof process === 'object' &&
	    /* nomin */ ({"NODE_ENV":"development"}) &&
	    /* nomin */ ({"NODE_ENV":"development"}).NODE_DEBUG &&
	    /* nomin */ /\bsemver\b/i.test(({"NODE_ENV":"development"}).NODE_DEBUG))
	  /* nomin */ debug = function() {
	    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
	    /* nomin */ args.unshift('SEMVER');
	    /* nomin */ console.log.apply(console, args);
	    /* nomin */ };
	/* nomin */ else
	  /* nomin */ debug = function() {};
	
	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';
	
	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	
	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;
	
	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.
	
	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.
	
	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
	
	
	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.
	
	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
	
	
	// ## Main Version
	// Three dot-separated numeric identifiers.
	
	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
	                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
	                   '(' + src[NUMERICIDENTIFIER] + ')';
	
	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
	                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
	                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
	
	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.
	
	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
	                            '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
	                                 '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	
	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.
	
	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
	                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
	
	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
	                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
	
	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.
	
	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
	
	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.
	
	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
	             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
	
	
	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.
	
	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.
	
	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] +
	                src[PRERELEASE] + '?' +
	                src[BUILD] + '?';
	
	src[FULL] = '^' + FULLPLAIN + '$';
	
	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
	                 src[PRERELEASELOOSE] + '?' +
	                 src[BUILD] + '?';
	
	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';
	
	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';
	
	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
	
	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
	                   '(?:' + src[PRERELEASE] + ')?' +
	                   src[BUILD] + '?' +
	                   ')?)?';
	
	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
	                        '(?:' + src[PRERELEASELOOSE] + ')?' +
	                        src[BUILD] + '?' +
	                        ')?)?';
	
	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
	
	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';
	
	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';
	
	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
	
	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';
	
	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';
	
	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
	
	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
	
	
	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
	                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
	
	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';
	
	
	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
	                   '\\s+-\\s+' +
	                   '(' + src[XRANGEPLAIN] + ')' +
	                   '\\s*$';
	
	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
	                        '\\s+-\\s+' +
	                        '(' + src[XRANGEPLAINLOOSE] + ')' +
	                        '\\s*$';
	
	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';
	
	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i])
	    re[i] = new RegExp(src[i]);
	}
	
	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer)
	    return version;
	
	  if (typeof version !== 'string')
	    return null;
	
	  if (version.length > MAX_LENGTH)
	    return null;
	
	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version))
	    return null;
	
	  try {
	    return new SemVer(version, loose);
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}
	
	
	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}
	
	exports.SemVer = SemVer;
	
	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
	    if (version.loose === loose)
	      return version;
	    else
	      version = version.version;
	  } else if (typeof version !== 'string') {
	    throw new TypeError('Invalid Version: ' + version);
	  }
	
	  if (version.length > MAX_LENGTH)
	    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
	
	  if (!(this instanceof SemVer))
	    return new SemVer(version, loose);
	
	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
	
	  if (!m)
	    throw new TypeError('Invalid Version: ' + version);
	
	  this.raw = version;
	
	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];
	
	  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
	    throw new TypeError('Invalid major version')
	
	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
	    throw new TypeError('Invalid minor version')
	
	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
	    throw new TypeError('Invalid patch version')
	
	  // numberify any prerelease numeric ids
	  if (!m[4])
	    this.prerelease = [];
	  else
	    this.prerelease = m[4].split('.').map(function(id) {
	      if (/^[0-9]+$/.test(id)) {
	        var num = +id;
	        if (num >= 0 && num < MAX_SAFE_INTEGER)
	          return num;
	      }
	      return id;
	    });
	
	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}
	
	SemVer.prototype.format = function() {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length)
	    this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};
	
	SemVer.prototype.toString = function() {
	  return this.version;
	};
	
	SemVer.prototype.compare = function(other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer))
	    other = new SemVer(other, this.loose);
	
	  return this.compareMain(other) || this.comparePre(other);
	};
	
	SemVer.prototype.compareMain = function(other) {
	  if (!(other instanceof SemVer))
	    other = new SemVer(other, this.loose);
	
	  return compareIdentifiers(this.major, other.major) ||
	         compareIdentifiers(this.minor, other.minor) ||
	         compareIdentifiers(this.patch, other.patch);
	};
	
	SemVer.prototype.comparePre = function(other) {
	  if (!(other instanceof SemVer))
	    other = new SemVer(other, this.loose);
	
	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length)
	    return -1;
	  else if (!this.prerelease.length && other.prerelease.length)
	    return 1;
	  else if (!this.prerelease.length && !other.prerelease.length)
	    return 0;
	
	  var i = 0;
	  do {
	    var a = this.prerelease[i];
	    var b = other.prerelease[i];
	    debug('prerelease compare', i, a, b);
	    if (a === undefined && b === undefined)
	      return 0;
	    else if (b === undefined)
	      return 1;
	    else if (a === undefined)
	      return -1;
	    else if (a === b)
	      continue;
	    else
	      return compareIdentifiers(a, b);
	  } while (++i);
	};
	
	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function(release, identifier) {
	  switch (release) {
	    case 'premajor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor = 0;
	      this.major++;
	      this.inc('pre', identifier);
	      break;
	    case 'preminor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor++;
	      this.inc('pre', identifier);
	      break;
	    case 'prepatch':
	      // If this is already a prerelease, it will bump to the next version
	      // drop any prereleases that might already exist, since they are not
	      // relevant at this point.
	      this.prerelease.length = 0;
	      this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	    // If the input is a non-prerelease version, this acts the same as
	    // prepatch.
	    case 'prerelease':
	      if (this.prerelease.length === 0)
	        this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	
	    case 'major':
	      // If this is a pre-major version, bump up to the same major version.
	      // Otherwise increment major.
	      // 1.0.0-5 bumps to 1.0.0
	      // 1.1.0 bumps to 2.0.0
	      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
	        this.major++;
	      this.minor = 0;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'minor':
	      // If this is a pre-minor version, bump up to the same minor version.
	      // Otherwise increment minor.
	      // 1.2.0-5 bumps to 1.2.0
	      // 1.2.1 bumps to 1.3.0
	      if (this.patch !== 0 || this.prerelease.length === 0)
	        this.minor++;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'patch':
	      // If this is not a pre-release version, it will increment the patch.
	      // If it is a pre-release it will bump up to the same patch version.
	      // 1.2.0-5 patches to 1.2.0
	      // 1.2.0 patches to 1.2.1
	      if (this.prerelease.length === 0)
	        this.patch++;
	      this.prerelease = [];
	      break;
	    // This probably shouldn't be used publicly.
	    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	    case 'pre':
	      if (this.prerelease.length === 0)
	        this.prerelease = [0];
	      else {
	        var i = this.prerelease.length;
	        while (--i >= 0) {
	          if (typeof this.prerelease[i] === 'number') {
	            this.prerelease[i]++;
	            i = -2;
	          }
	        }
	        if (i === -1) // didn't increment anything
	          this.prerelease.push(0);
	      }
	      if (identifier) {
	        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	        if (this.prerelease[0] === identifier) {
	          if (isNaN(this.prerelease[1]))
	            this.prerelease = [identifier, 0];
	        } else
	          this.prerelease = [identifier, 0];
	      }
	      break;
	
	    default:
	      throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};
	
	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof(loose) === 'string') {
	    identifier = loose;
	    loose = undefined;
	  }
	
	  try {
	    return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
	    return null;
	  } else {
	    var v1 = parse(version1);
	    var v2 = parse(version2);
	    if (v1.prerelease.length || v2.prerelease.length) {
	      for (var key in v1) {
	        if (key === 'major' || key === 'minor' || key === 'patch') {
	          if (v1[key] !== v2[key]) {
	            return 'pre'+key;
	          }
	        }
	      }
	      return 'prerelease';
	    }
	    for (var key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return key;
	        }
	      }
	    }
	  }
	}
	
	exports.compareIdentifiers = compareIdentifiers;
	
	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);
	
	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }
	
	  return (anum && !bnum) ? -1 :
	         (bnum && !anum) ? 1 :
	         a < b ? -1 :
	         a > b ? 1 :
	         0;
	}
	
	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}
	
	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}
	
	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}
	
	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}
	
	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(b);
	}
	
	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}
	
	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}
	
	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function(a, b) {
	    return exports.compare(a, b, loose);
	  });
	}
	
	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function(a, b) {
	    return exports.rcompare(a, b, loose);
	  });
	}
	
	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}
	
	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}
	
	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}
	
	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}
	
	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}
	
	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}
	
	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') a = a.version;
	      if (typeof b === 'object') b = b.version;
	      ret = a === b;
	      break;
	    case '!==':
	      if (typeof a === 'object') a = a.version;
	      if (typeof b === 'object') b = b.version;
	      ret = a !== b;
	      break;
	    case '': case '=': case '==': ret = eq(a, b, loose); break;
	    case '!=': ret = neq(a, b, loose); break;
	    case '>': ret = gt(a, b, loose); break;
	    case '>=': ret = gte(a, b, loose); break;
	    case '<': ret = lt(a, b, loose); break;
	    case '<=': ret = lte(a, b, loose); break;
	    default: throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}
	
	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
	    if (comp.loose === loose)
	      return comp;
	    else
	      comp = comp.value;
	  }
	
	  if (!(this instanceof Comparator))
	    return new Comparator(comp, loose);
	
	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);
	
	  if (this.semver === ANY)
	    this.value = '';
	  else
	    this.value = this.operator + this.semver.version;
	
	  debug('comp', this);
	}
	
	var ANY = {};
	Comparator.prototype.parse = function(comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);
	
	  if (!m)
	    throw new TypeError('Invalid comparator: ' + comp);
	
	  this.operator = m[1];
	  if (this.operator === '=')
	    this.operator = '';
	
	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2])
	    this.semver = ANY;
	  else
	    this.semver = new SemVer(m[2], this.loose);
	};
	
	Comparator.prototype.toString = function() {
	  return this.value;
	};
	
	Comparator.prototype.test = function(version) {
	  debug('Comparator.test', version, this.loose);
	
	  if (this.semver === ANY)
	    return true;
	
	  if (typeof version === 'string')
	    version = new SemVer(version, this.loose);
	
	  return cmp(version, this.operator, this.semver, this.loose);
	};
	
	
	exports.Range = Range;
	function Range(range, loose) {
	  if ((range instanceof Range) && range.loose === loose)
	    return range;
	
	  if (!(this instanceof Range))
	    return new Range(range, loose);
	
	  this.loose = loose;
	
	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
	    return this.parseRange(range.trim());
	  }, this).filter(function(c) {
	    // throw out any that are not relevant for whatever reason
	    return c.length;
	  });
	
	  if (!this.set.length) {
	    throw new TypeError('Invalid SemVer Range: ' + range);
	  }
	
	  this.format();
	}
	
	Range.prototype.format = function() {
	  this.range = this.set.map(function(comps) {
	    return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};
	
	Range.prototype.toString = function() {
	  return this.range;
	};
	
	Range.prototype.parseRange = function(range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);
	
	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);
	
	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);
	
	  // normalize spaces
	  range = range.split(/\s+/).join(' ');
	
	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.
	
	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function(comp) {
	    return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
	    // in loose mode, throw out any that are not valid comparators
	    set = set.filter(function(comp) {
	      return !!comp.match(compRe);
	    });
	  }
	  set = set.map(function(comp) {
	    return new Comparator(comp, loose);
	  });
	
	  return set;
	};
	
	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function(comp) {
	    return comp.map(function(c) {
	      return c.value;
	    }).join(' ').trim().split(' ');
	  });
	}
	
	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}
	
	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}
	
	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
	    return replaceTilde(comp, loose);
	  }).join(' ');
	}
	
	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function(_, M, m, p, pr) {
	    debug('tilde', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M))
	      ret = '';
	    else if (isX(m))
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    else if (isX(p))
	      // ~1.2 == >=1.2.0 <1.3.0
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    else if (pr) {
	      debug('replaceTilde pr', pr);
	      if (pr.charAt(0) !== '-')
	        pr = '-' + pr;
	      ret = '>=' + M + '.' + m + '.' + p + pr +
	            ' <' + M + '.' + (+m + 1) + '.0';
	    } else
	      // ~1.2.3 == >=1.2.3 <1.3.0
	      ret = '>=' + M + '.' + m + '.' + p +
	            ' <' + M + '.' + (+m + 1) + '.0';
	
	    debug('tilde return', ret);
	    return ret;
	  });
	}
	
	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function(comp) {
	    return replaceCaret(comp, loose);
	  }).join(' ');
	}
	
	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function(_, M, m, p, pr) {
	    debug('caret', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M))
	      ret = '';
	    else if (isX(m))
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    else if (isX(p)) {
	      if (M === '0')
	        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	      else
	        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (pr.charAt(0) !== '-')
	        pr = '-' + pr;
	      if (M === '0') {
	        if (m === '0')
	          ret = '>=' + M + '.' + m + '.' + p + pr +
	                ' <' + M + '.' + m + '.' + (+p + 1);
	        else
	          ret = '>=' + M + '.' + m + '.' + p + pr +
	                ' <' + M + '.' + (+m + 1) + '.0';
	      } else
	        ret = '>=' + M + '.' + m + '.' + p + pr +
	              ' <' + (+M + 1) + '.0.0';
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0')
	          ret = '>=' + M + '.' + m + '.' + p +
	                ' <' + M + '.' + m + '.' + (+p + 1);
	        else
	          ret = '>=' + M + '.' + m + '.' + p +
	                ' <' + M + '.' + (+m + 1) + '.0';
	      } else
	        ret = '>=' + M + '.' + m + '.' + p +
	              ' <' + (+M + 1) + '.0.0';
	    }
	
	    debug('caret return', ret);
	    return ret;
	  });
	}
	
	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function(comp) {
	    return replaceXRange(comp, loose);
	  }).join(' ');
	}
	
	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    var xM = isX(M);
	    var xm = xM || isX(m);
	    var xp = xm || isX(p);
	    var anyX = xp;
	
	    if (gtlt === '=' && anyX)
	      gtlt = '';
	
	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // replace X with 0
	      if (xm)
	        m = 0;
	      if (xp)
	        p = 0;
	
	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        // >1.2.3 => >= 1.2.4
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else if (xp) {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm)
	          M = +M + 1;
	        else
	          m = +m + 1;
	      }
	
	      ret = gtlt + M + '.' + m + '.' + p;
	    } else if (xm) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (xp) {
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    }
	
	    debug('xRange return', ret);
	
	    return ret;
	  });
	}
	
	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}
	
	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0,
	                       from, fM, fm, fp, fpr, fb,
	                       to, tM, tm, tp, tpr, tb) {
	
	  if (isX(fM))
	    from = '';
	  else if (isX(fm))
	    from = '>=' + fM + '.0.0';
	  else if (isX(fp))
	    from = '>=' + fM + '.' + fm + '.0';
	  else
	    from = '>=' + from;
	
	  if (isX(tM))
	    to = '';
	  else if (isX(tm))
	    to = '<' + (+tM + 1) + '.0.0';
	  else if (isX(tp))
	    to = '<' + tM + '.' + (+tm + 1) + '.0';
	  else if (tpr)
	    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
	  else
	    to = '<=' + to;
	
	  return (from + ' ' + to).trim();
	}
	
	
	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function(version) {
	  if (!version)
	    return false;
	
	  if (typeof version === 'string')
	    version = new SemVer(version, this.loose);
	
	  for (var i = 0; i < this.set.length; i++) {
	    if (testSet(this.set[i], version))
	      return true;
	  }
	  return false;
	};
	
	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
	    if (!set[i].test(version))
	      return false;
	  }
	
	  if (version.prerelease.length) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (var i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === ANY)
	        continue;
	
	      if (set[i].semver.prerelease.length > 0) {
	        var allowed = set[i].semver;
	        if (allowed.major === version.major &&
	            allowed.minor === version.minor &&
	            allowed.patch === version.patch)
	          return true;
	      }
	    }
	
	    // Version has a -pre, but it's not one of the ones we like.
	    return false;
	  }
	
	  return true;
	}
	
	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
	    range = new Range(range, loose);
	  } catch (er) {
	    return false;
	  }
	  return range.test(version);
	}
	
	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  return versions.filter(function(version) {
	    return satisfies(version, range, loose);
	  }).sort(function(a, b) {
	    return rcompare(a, b, loose);
	  })[0] || null;
	}
	
	exports.minSatisfying = minSatisfying;
	function minSatisfying(versions, range, loose) {
	  return versions.filter(function(version) {
	    return satisfies(version, range, loose);
	  }).sort(function(a, b) {
	    return compare(a, b, loose);
	  })[0] || null;
	}
	
	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, loose).range || '*';
	  } catch (er) {
	    return null;
	  }
	}
	
	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}
	
	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}
	
	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);
	
	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break;
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break;
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }
	
	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
	    return false;
	  }
	
	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.
	
	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];
	
	    var high = null;
	    var low = null;
	
	    comparators.forEach(function(comparator) {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0')
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, loose)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, loose)) {
	        low = comparator;
	      }
	    });
	
	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false;
	    }
	
	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false;
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	exports.prerelease = prerelease;
	function prerelease(version, loose) {
	  var parsed = parse(version, loose);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 62 */,
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(2);
	
	exports.default = {
	  methods: {
	    /**
	     * Create Event.
	     * @param {DOMString} type
	     * @param {Object} props
	     */
	    createEvent: function createEvent(type, props) {
	      var event = new Event(type, { bubbles: false });
	      event.preventDefault();
	      event.stopPropagation();
	
	      (0, _utils.extend)(event, props);
	
	      Object.defineProperty(event, 'target', {
	        enumerable: true,
	        value: this || null
	      });
	
	      return event;
	    },
	
	
	    /**
	     * Create Custom Event.
	     * @param {DOMString} type
	     * @param {Object} props
	     */
	    createCustomEvent: function createCustomEvent(type, props) {
	      // compatibility: http://caniuse.com/#search=customevent
	      // const event = new CustomEvent(type)
	      var event = document.createEvent('CustomEvent');
	      event.initCustomEvent(type, false, true, {});
	      event.preventDefault();
	      event.stopPropagation();
	
	      (0, _utils.extend)(event, props);
	
	      Object.defineProperty(event, 'target', {
	        enumerable: true,
	        value: this || null
	      });
	
	      return event;
	    },
	
	
	    /**
	     * Check and emit longpress event.
	     * @param {Object} event
	     */
	    handleLongPress: function handleLongPress(event) {
	      // TODO: check the condition
	      this.$emit('longpress', this.createCustomEvent('longpress'));
	    },
	
	
	    /**
	     * Check and emit appear event.
	     * @param {Object} event
	     */
	    handleAppear: function handleAppear(event) {
	      // TODO: check the condition
	      this.$emit('appear', this.createCustomEvent('appear'));
	    },
	
	
	    /**
	     * Check and emit disappear event.
	     * @param {Object} event
	     */
	    handDisappear: function handDisappear(event) {
	      // TODO: check the condition
	      this.$emit('disappear', this.createCustomEvent('disappear'));
	    }
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQwNzFkNGJjZGI3MWM1ODAxZjAiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL3ZhbGlkYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL3V0aWxzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL2luZGljYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL21peGlucy9yZWN0LmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwid2VicGFjazovLy8uL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9pbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL2xpc3QvY2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvbGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3NsaWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3N3aXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvd2ViLmpzIiwid2VicGFjazovLy8uL2h0bWw1L3JlbmRlci92dWUvZW52LmpzIiwid2VicGFjazovLy8uL2h0bWw1L3JlbmRlci92dWUvdmFsaWRhdG9yL2NoZWNrLmpzIiwid2VicGFjazovLy8uL2h0bWw1L3JlbmRlci92dWUvdmFsaWRhdG9yL3Byb3AuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS92YWxpZGF0b3Ivc3R5bGUuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS92aWV3cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9zaGFyZWQvYXJyYXlGcm9tLmpzIiwid2VicGFjazovLy8uL2h0bWw1L3NoYXJlZC9vYmplY3RBc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvc2hhcmVkL29iamVjdFNldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvcHJvY2Vzcy8wLjExLjkvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vLm5wbWluc3RhbGwvc2VtdmVyLzUuMy4wL3NlbXZlci9zZW12ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcmVuZGVyL3Z1ZS9taXhpbnMvZXZlbnQuanMiXSwibmFtZXMiOlsiaW5zdGFsbCIsImNvbXBvbmVudHMiLCJWdWUiLCJodG1sUmVnZXgiLCJjb25maWciLCJpc1Jlc2VydmVkVGFnIiwidGVzdCIsInRhZyIsInBhcnNlUGxhdGZvcm1UYWdOYW1lIiwicmVwbGFjZSIsIm5hbWUiLCJjb21wb25lbnQiLCJjb25zb2xlIiwibG9nIiwiT2JqZWN0Iiwia2V5cyIsImpvaW4iLCJlcnJvciIsImx0IiwidmVyc2lvbiIsIndhcm4iLCJ1c2UiLCJjb25maWd1cmUiLCJ2YWxpZGF0ZVN0eWxlcyIsInZhbGlkYXRlUHJvcHMiLCJzdHlsZVZhbGlkYXRvciIsInByb3BWYWxpZGF0b3IiLCJvbmZhaWwiLCJub3BlIiwic2hvd0NvbnNvbGUiLCJhcmdzIiwibWVzc2FnZSIsImNvbmZpZ3MiLCJzaWxlbnQiLCJ0eXBlIiwic3R5bGVzIiwiaXNWYWxpZCIsImtleSIsInZhbGlkYXRvciIsImNvbW1vbiIsInByb3BzIiwiY2FjaGVkIiwiZXh0ZW5kIiwiYmluZCIsImRlYm91bmNlIiwidGhyb3R0bGUiLCJmbiIsImNhY2hlIiwiY3JlYXRlIiwiY2FjaGVkRm4iLCJzdHIiLCJoaXQiLCJjYW1lbGl6ZVJFIiwiY2FtZWxpemUiLCJfIiwiYyIsInRvVXBwZXJDYXNlIiwiY2FwaXRhbGl6ZSIsImNoYXJBdCIsInNsaWNlIiwiaHlwaGVuYXRlUkUiLCJoeXBoZW5hdGUiLCJ0b0xvd2VyQ2FzZSIsInRvIiwiX2Zyb20iLCJjdHgiLCJhIiwibCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFwcGx5IiwiY2FsbCIsImZ1bmMiLCJ3YWl0IiwidGltZXJJZCIsImxhdGVyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImxhc3QiLCJjb250ZXh0IiwidGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiY291bnQiLCJOdW1iZXIiLCJTdHJpbmciLCJhY3RpdmUiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY2hpbGRyZW4iLCJpIiwiY2xhc3NOYW1lcyIsInB1c2giLCJzdGF0aWNDbGFzcyIsImF0dHJzIiwibWV0aG9kcyIsInJlYWNoQm90dG9tIiwid3JhcHBlciIsIiRyZWZzIiwiaW5uZXIiLCJvZmZzZXQiLCJsb2FkbW9yZW9mZnNldCIsImlubmVySGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0Iiwid3JhcHBlckhlaWdodCIsInNjcm9sbFRvcCIsInNyYyIsInJlc2l6ZSIsInZhbHVlIiwiaW5kZXhPZiIsIiR2bm9kZSIsImRhdGEiLCJzdGF0aWNTdHlsZSIsImNzc1RleHQiLCJzdHlsZSIsInN3aXRjaCIsImltYWdlIiwibGlzdCIsImNlbGwiLCJzY3JvbGxlciIsInNsaWRlciIsImluZGljYXRvciIsInRleHQiLCJ3ZWIiLCIkc2xvdHMiLCJkZWZhdWx0IiwibWl4aW5zIiwiaGFuZGxlU2Nyb2xsIiwiZXZlbnQiLCIkZW1pdCIsImNyZWF0ZUN1c3RvbUV2ZW50IiwicmVmIiwib24iLCJzY3JvbGwiLCJCb29sZWFuIiwiaW50ZXJ2YWwiLCJjdXJyZW50SW5kZXgiLCJmcmFtZUNvdW50IiwiY29tcHV0ZVdyYXBwZXJTaXplIiwicmVjdCIsIndyYXBwZXJXaWR0aCIsIndpZHRoIiwidXBkYXRlTGF5b3V0IiwiY3JlYXRlZCIsIiRuZXh0VGljayIsIm1vdW50ZWQiLCJhdXRvUGxheSIsIl9sYXN0U2xpZGVUaW1lIiwibm93IiwiYXV0b1BsYXlGbiIsIl9hdXRvUGxheVRpbWVyIiwibmV4dFRpY2siLCJuZXh0IiwiaW5uZXJFbGVtZW50cyIsIm1hcCIsInZub2RlIiwidG91Y2hzdGFydCIsImhhbmRsZVRvdWNoU3RhcnQiLCJ0b3VjaG1vdmUiLCJoYW5kbGVUb3VjaE1vdmUiLCJ0b3VjaGVuZCIsImhhbmRsZVRvdWNoRW5kIiwic2xpZGVUbyIsImluZGV4IiwibmV3SW5kZXgiLCJNYXRoIiwibWF4IiwibWluIiwidHJhbnNpdGlvbiIsInRyYW5zZm9ybSIsImNyZWF0ZUV2ZW50IiwicHJldiIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwidG91Y2giLCJjaGFuZ2VkVG91Y2hlcyIsIl90b3VjaFBhcmFtcyIsIm9yaWdpbmFsVHJhbnNmb3JtIiwic3RhcnRUb3VjaEV2ZW50Iiwic3RhcnRYIiwicGFnZVgiLCJzdGFydFkiLCJwYWdlWSIsInRpbWVTdGFtcCIsIm9mZnNldFgiLCJyZXNldCIsImFicyIsImRpcmVjdGlvbiIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImlzQ2hlY2tlZCIsImlzRGlzYWJsZWQiLCJjb21wdXRlZCIsIndyYXBwZXJDbGFzcyIsImNsYXNzQXJyYXkiLCJ0b2dnbGUiLCJjbGljayIsImdldFRleHRTdHlsZSIsImxpbmVzIiwicGFyc2VJbnQiLCJvdmVyZmxvdyIsInRleHRPdmVyZmxvdyIsIndlYmtpdExpbmVDbGFtcCIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwid2luZG93IiwiV1hFbnZpcm9ubWVudCIsInBsYXRmb3JtIiwiYXBwTmFtZSIsImFwcFZlcnNpb24iLCJ3ZWV4VmVyc2lvbiIsIm9zTmFtZSIsIm9zVmVyc2lvbiIsImRldmljZVdpZHRoIiwiaW5uZXJXaWR0aCIsImRldmljZUhlaWdodCIsImZsYXR0ZW4iLCJjaGVja1N1cHBvcnRlZCIsImlzU3VwcG9ydGVkU3R5bGUiLCJpc1N1cHBvcnRlZFByb3AiLCJzdXBwb3J0ZWRQcm9wZXJ0aWVzIiwic3VwcG9ydGVkU3R5bGVzIiwiYXJyYXkiLCJyZWR1Y2UiLCJkaXN0IiwiaXRlbSIsImNvbmNhdCIsIkFycmF5IiwiaXNBcnJheSIsImRpY3QiLCJrIiwicHJvcCIsImlzU3RyaW5nIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0NTU0NvbG9yIiwiaXNDU1NMZW5ndGgiLCJwb3NpdGlvbiIsIm9wYWNpdHkiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsImZsZXgiLCJmb250U3R5bGUiLCJmb250V2VpZ2h0IiwidGV4dERlY29yYXRpb24iLCJ0ZXh0QWxpZ24iLCJwYXJzZUZsb2F0Iiwic2V0Vmlld3BvcnQiLCJERUZBVUxUX1ZJRVdQT1JUX1dJRFRIIiwiZG9jIiwiZG9jdW1lbnQiLCJzY3JlZW5XaWR0aCIsInNjcmVlbiIsInNjYWxlIiwiY29udGVudHMiLCJtZXRhIiwicXVlcnlTZWxlY3RvciIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwiZnJvbSIsInRvU3RyIiwiaXNDYWxsYWJsZSIsInRvSW50ZWdlciIsIm51bWJlciIsImlzTmFOIiwiaXNGaW5pdGUiLCJmbG9vciIsIm1heFNhZmVJbnRlZ2VyIiwicG93IiwidG9MZW5ndGgiLCJsZW4iLCJhcnJheUxpa2UiLCJDIiwiaXRlbXMiLCJUeXBlRXJyb3IiLCJtYXBGbiIsInVuZGVmaW5lZCIsIlQiLCJBIiwia1ZhbHVlIiwic2V0UHJvdG90eXBlT2YiLCJtYWdpYyIsInNldCIsIk8iLCJwcm90byIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImUiLCJfX3Byb3RvX18iLCJwb2x5ZmlsbCIsIkV2ZW50IiwiYnViYmxlcyIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImluaXRDdXN0b21FdmVudCIsImhhbmRsZUxvbmdQcmVzcyIsImhhbmRsZUFwcGVhciIsImhhbmREaXNhcHBlYXIiXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztTQ2hDZ0JBLE8sR0FBQUEsTzs7QUFMaEI7Ozs7QUFDQTs7QUFDQTs7S0FBWUMsVTs7QUFDWjs7Ozs7O0FBSkE7QUFNTyxVQUFTRCxPQUFULENBQWtCRSxHQUFsQixFQUF1QjtBQUM1QixPQUFNQyxZQUFZLFNBQWxCO0FBQ0FELE9BQUlFLE1BQUosQ0FBV0MsYUFBWCxHQUEyQjtBQUFBLFlBQU9GLFVBQVVHLElBQVYsQ0FBZUMsR0FBZixDQUFQO0FBQUEsSUFBM0I7QUFDQUwsT0FBSUUsTUFBSixDQUFXSSxvQkFBWCxHQUFrQztBQUFBLFlBQU9ELElBQUlFLE9BQUosQ0FBWU4sU0FBWixFQUF1QixFQUF2QixDQUFQO0FBQUEsSUFBbEM7O0FBRUEsUUFBSyxJQUFNTyxJQUFYLElBQW1CVCxVQUFuQixFQUErQjtBQUM3QkMsU0FBSVMsU0FBSixDQUFjRCxJQUFkLEVBQW9CVCxXQUFXUyxJQUFYLENBQXBCO0FBQ0Q7O0FBRUQ7QUFDQSxPQUFJLElBQUosRUFBNEM7QUFDMUNFLGFBQVFDLEdBQVIsQ0FBWSxrREFDSkMsT0FBT0MsSUFBUCxDQUFZZCxVQUFaLEVBQXdCZSxJQUF4QixDQUE2QixJQUE3QixDQURJLFFBQVo7QUFFRDtBQUNGOztBQUVEO0FBQ0EsS0FBSSxPQUFPZCxHQUFQLEtBQWUsV0FBbkIs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQ25MdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXdEO0FBQ3hELHVDQUFzQztBQUN0QyxxQ0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLHFDQUFvQztBQUNwQyx1Q0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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OiJ2dWUtcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwNDA3MWQ0YmNkYjcxYzU4MDFmMCIsIi8vIGltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQgJy4vZW52J1xuaW1wb3J0ICogYXMgY29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMnXG5pbXBvcnQgeyBzZXRWaWV3cG9ydCB9IGZyb20gJy4vdmlld3BvcnQnXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsIChWdWUpIHtcbiAgY29uc3QgaHRtbFJlZ2V4ID0gL15odG1sOi9pXG4gIFZ1ZS5jb25maWcuaXNSZXNlcnZlZFRhZyA9IHRhZyA9PiBodG1sUmVnZXgudGVzdCh0YWcpXG4gIFZ1ZS5jb25maWcucGFyc2VQbGF0Zm9ybVRhZ05hbWUgPSB0YWcgPT4gdGFnLnJlcGxhY2UoaHRtbFJlZ2V4LCAnJylcblxuICBmb3IgKGNvbnN0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIFZ1ZS5jb21wb25lbnQobmFtZSwgY29tcG9uZW50c1tuYW1lXSlcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgIGNvbnNvbGUubG9nKGBbVnVlIFJlbmRlcmVyXSBSZWdpc3RlcmVkIGNvbXBvbmVudHM6IGBcbiAgICAgICsgYFske09iamVjdC5rZXlzKGNvbXBvbmVudHMpLmpvaW4oJywgJyl9XS5gKVxuICB9XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5pZiAodHlwZW9mIFZ1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc29sZS5lcnJvcignW1Z1ZSBSZW5kZXJlcl0gYFZ1ZWAgaXMgbm90IGRlZmluZWQhJylcbn1cbmVsc2Uge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCdcbiAgICAmJiBzZW12ZXIubHQoVnVlLnZlcnNpb24sICcyLjEuNScpKSB7XG4gICAgY29uc29sZS53YXJuKGBbVnVlIFJlbmRlcmVyXSBUaGUgdmVyc2lvbiBvZiBWdWUgc2hvdWxkIGJlIGAgK1xuICAgICAgYGdyZWF0ZXIgdGhhbiAyLjEuNSwgY3VycmVudCBpcyAke1Z1ZS52ZXJzaW9ufS5gKVxuICB9XG5cbiAgc2V0Vmlld3BvcnQoKVxuXG4gIFZ1ZS51c2UoeyBpbnN0YWxsIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9odG1sNS9yZW5kZXIvdnVlL2luZGV4LmpzIiwiaW1wb3J0ICogYXMgc3R5bGVWYWxpZGF0b3IgZnJvbSAnLi9zdHlsZSdcbmltcG9ydCAqIGFzIHByb3BWYWxpZGF0b3IgZnJvbSAnLi9wcm9wJ1xuaW1wb3J0IHsgaHlwaGVuYXRlLCBjYW1lbGl6ZSB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgaXNTdXBwb3J0ZWRTdHlsZSB9IGZyb20gJy4vY2hlY2snXG5cbmxldCBvbmZhaWwgPSBmdW5jdGlvbiBub3BlICgpIHt9XG5sZXQgc2hvd0NvbnNvbGUgPSB0cnVlXG5cbmZ1bmN0aW9uIHdhcm4gKC4uLmFyZ3MpIHtcbiAgY29uc3QgbWVzc2FnZSA9IGFyZ3Muam9pbignICcpXG4gIHNob3dDb25zb2xlICYmIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gIG9uZmFpbChtZXNzYWdlKVxuICByZXR1cm4gbWVzc2FnZVxufVxuXG4vKipcbiAqIENvbmZpZ3VyZSB0aGUgdmFsaWRhdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZSAoY29uZmlncyA9IHt9KSB7XG4gIHNob3dDb25zb2xlID0gIWNvbmZpZ3Muc2lsZW50XG4gIGlmICh0eXBlb2YgY29uZmlncy5vbmZhaWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvbmZhaWwgPSBjb25maWdzLm9uZmFpbFxuICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHN0eWxlcyBvZiB0aGUgY29tcG9uZW50LlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlU3R5bGVzICh0eXBlLCBzdHlsZXMgPSB7fSkge1xuICBsZXQgaXNWYWxpZCA9IHRydWVcbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGVzKSB7XG4gICAgaWYgKCFpc1N1cHBvcnRlZFN0eWxlKHR5cGUsIGh5cGhlbmF0ZShrZXkpKSkge1xuICAgICAgaXNWYWxpZCA9IGZhbHNlXG4gICAgICB3YXJuKGBbU3R5bGUgVmFsaWRhdG9yXSA8JHt0eXBlfT4gaXMgbm90IHN1cHBvcnQgdG8gdXNlIHRoZSBcIiR7a2V5fVwiIHN0eWxlLmApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgdmFsaWRhdG9yID0gc3R5bGVWYWxpZGF0b3JbY2FtZWxpemUoa2V5KV0gfHwgc3R5bGVWYWxpZGF0b3IuY29tbW9uXG4gICAgICBpZiAoIXZhbGlkYXRvcihzdHlsZXNba2V5XSwgaHlwaGVuYXRlKGtleSkpKSB7XG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZVxuICAgICAgICB3YXJuKGBbU3R5bGUgVmFsaWRhdG9yXSBUaGUgc3R5bGUgXCIke2tleX1cIiBpcyBub3Qgc3VwcG9ydCB0aGUgXCIke3N0eWxlc1trZXldfVwiIHZhbHVlLmApXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpc1ZhbGlkXG59XG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUHJvcHMgKHR5cGUsIHByb3BzID0ge30pIHtcbiAgbGV0IGlzVmFsaWQgPSB0cnVlXG4gIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gcHJvcFZhbGlkYXRvcltjYW1lbGl6ZShrZXkpXVxuICAgIGlmICh2YWxpZGF0b3IgJiYgIXZhbGlkYXRvcihwcm9wc1trZXldKSkge1xuICAgICAgaXNWYWxpZCA9IGZhbHNlXG4gICAgICB3YXJuKGBbUHJvcGVydHkgVmFsaWRhdG9yXSBUaGUgcHJvcGVydHkgXCIke2tleX1cIiBpcyBub3Qgc3VwcG9ydCB0aGUgXCIke3Byb3BzW2tleV19XCIgdmFsdWUuYClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGlzVmFsaWRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvdmFsaWRhdG9yL2luZGV4LmpzIiwiLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIGNvbnN0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl1cbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSlcbiAgfVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cbiAqL1xuY29uc3QgY2FtZWxpemVSRSA9IC8tKFxcdykvZ1xuZXhwb3J0IGNvbnN0IGNhbWVsaXplID0gY2FjaGVkKHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCAoXywgYykgPT4gYy50b1VwcGVyQ2FzZSgpKVxufSlcblxuLyoqXG4gKiBDYXBpdGFsaXplIGEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY2FwaXRhbGl6ZSA9IGNhY2hlZChzdHIgPT4ge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59KVxuXG4vKipcbiAqIEh5cGhlbmF0ZSBhIGNhbWVsQ2FzZSBzdHJpbmcuXG4gKi9cbmNvbnN0IGh5cGhlbmF0ZVJFID0gLyhbXi1dKShbQS1aXSkvZ1xuZXhwb3J0IGNvbnN0IGh5cGhlbmF0ZSA9IGNhY2hlZChzdHIgPT4ge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpXG4gICAgLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpXG4gICAgLnRvTG93ZXJDYXNlKClcbn0pXG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kICh0bywgX2Zyb20pIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gX2Zyb20pIHtcbiAgICB0b1trZXldID0gX2Zyb21ba2V5XVxuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgIGNvbnN0IGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChmdW5jLCB3YWl0KSB7XG4gIGxldCB0aW1lcklkXG4gIGZ1bmN0aW9uIGxhdGVyICgpIHtcbiAgICB0aW1lcklkID0gbnVsbFxuICAgIGZ1bmMuYXBwbHkobnVsbClcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lcklkKVxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZSAoZnVuYywgd2FpdCkge1xuICBsZXQgbGFzdCA9IDBcbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICBpZiAodGltZSAtIGxhc3QgPiB3YWl0KSB7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICBsYXN0ID0gdGltZVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS91dGlscy5qcyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGNvdW50OiBbTnVtYmVyLCBTdHJpbmddLFxuICAgIGFjdGl2ZTogW051bWJlciwgU3RyaW5nXVxuICB9LFxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOdW1iZXIodGhpcy5jb3VudCk7ICsraSkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IFsnd2VleC1pbmRpY2F0b3ItaXRlbSddXG4gICAgICBpZiAoaSA9PT0gTnVtYmVyKHRoaXMuYWN0aXZlKSkge1xuICAgICAgICBjbGFzc05hbWVzLnB1c2goJ3dlZXgtaW5kaWNhdG9yLWl0ZW0tYWN0aXZlJylcbiAgICAgIH1cbiAgICAgIGNoaWxkcmVuLnB1c2goY3JlYXRlRWxlbWVudCgnbWVudWl0ZW0nLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBjbGFzc05hbWVzLmpvaW4oJyAnKVxuICAgICAgfSkpXG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdtZW51Jywge1xuICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICdpbmRpY2F0b3InIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtaW5kaWNhdG9yJ1xuICAgIH0sIGNoaWxkcmVuKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL2luZGljYXRvci5qcyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuICAgIHJlYWNoQm90dG9tICgpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gTnVtYmVyKHRoaXMubG9hZG1vcmVvZmZzZXQpIHx8IDBcblxuICAgICAgaWYgKHdyYXBwZXIgJiYgaW5uZXIpIHtcbiAgICAgICAgY29uc3QgaW5uZXJIZWlnaHQgPSBpbm5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICAgICAgY29uc3Qgd3JhcHBlckhlaWdodCA9IHdyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICAgIHJldHVybiB3cmFwcGVyLnNjcm9sbFRvcCA+PSBpbm5lckhlaWdodCAtIHdyYXBwZXJIZWlnaHQgLSBvZmZzZXRcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS9taXhpbnMvcmVjdC5qcyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgdmFsaWRhdGVTdHlsZXMgfSBmcm9tICcuLi92YWxpZGF0b3InXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvcHM6IHtcbiAgICBzcmM6IFN0cmluZyxcbiAgICByZXNpemU6IHtcbiAgICAgIHZhbGlkYXRvciAodmFsdWUpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIFsnY292ZXInLCAnY29udGFpbicsICdzdHJldGNoJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygnaW1hZ2UnLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoIXRoaXMuc3JjICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtWdWUgUmVuZGVyZXJdIFRoZSA8aW1hZ2U+IGNvbXBvbmVudCBtdXN0IGhhdmUgdGhlIFwic3JjXCIgYXR0cmlidXRlLmApXG4gICAgfVxuXG4gICAgbGV0IGNzc1RleHQgPSBgYmFja2dyb3VuZC1pbWFnZTp1cmwoXCIke3RoaXMuc3JjfVwiKTtgXG5cbiAgICAvLyBjb21wYXRpYmlsaXR5OiBodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1iYWNrZ3JvdW5kLXNpemVcbiAgICBjc3NUZXh0ICs9ICh0aGlzLnJlc2l6ZSAmJiB0aGlzLnJlc2l6ZSAhPT0gJ3N0cmV0Y2gnKVxuICAgICAgPyBgYmFja2dyb3VuZC1zaXplOiAke3RoaXMucmVzaXplfTtgXG4gICAgICA6IGBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtgXG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnZmlndXJlJywge1xuICAgICAgYXR0cnM6IHsgJ3dlZXgtdHlwZSc6ICdpbWFnZScgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1pbWFnZScsXG4gICAgICBzdHlsZTogY3NzVGV4dFxuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9pbWFnZS5qcyIsImltcG9ydCBfc3dpdGNoIGZyb20gJy4vc3dpdGNoJ1xuZXhwb3J0IHsgX3N3aXRjaCBhcyBzd2l0Y2ggfVxuXG5pbXBvcnQgaW1hZ2UgZnJvbSAnLi9pbWFnZSdcbmltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCdcbmltcG9ydCBjZWxsIGZyb20gJy4vbGlzdC9jZWxsJ1xuaW1wb3J0IHNjcm9sbGVyIGZyb20gJy4vc2Nyb2xsZXInXG5pbXBvcnQgc2xpZGVyIGZyb20gJy4vc2xpZGVyJ1xuaW1wb3J0IGluZGljYXRvciBmcm9tICcuL3NsaWRlci9pbmRpY2F0b3InXG5pbXBvcnQgdGV4dCBmcm9tICcuL3RleHQnXG5pbXBvcnQgd2ViIGZyb20gJy4vd2ViJ1xuXG5leHBvcnQge1xuICBpbWFnZSxcbiAgbGlzdCxcbiAgY2VsbCxcbiAgc2Nyb2xsZXIsXG4gIHNsaWRlcixcbiAgaW5kaWNhdG9yLFxuICB0ZXh0LFxuICB3ZWJcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9pbmRleC5qcyIsImltcG9ydCB7IHZhbGlkYXRlU3R5bGVzIH0gZnJvbSAnLi4vLi4vdmFsaWRhdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygnY2VsbCcsIHRoaXMuJHZub2RlLmRhdGEgJiYgdGhpcy4kdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSlcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnc2VjdGlvbicsIHtcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnY2VsbCcgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1jZWxsJ1xuICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9saXN0L2NlbGwuanMiLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uLy4uL3ZhbGlkYXRvcidcbmltcG9ydCB7IGRlYm91bmNlLCBiaW5kIH0gZnJvbSAnLi4vLi4vdXRpbHMnXG5pbXBvcnQgcmVjdE1peGluIGZyb20gJy4uLy4uL21peGlucy9yZWN0J1xuaW1wb3J0IGV2ZW50TWl4aW4gZnJvbSAnLi4vLi4vbWl4aW5zL2V2ZW50J1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1peGluczogW3JlY3RNaXhpbiwgZXZlbnRNaXhpbl0sXG4gIHByb3BzOiB7XG4gICAgbG9hZG1vcmVvZmZzZXQ6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVTY3JvbGwgKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5yZWFjaEJvdHRvbSgpKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2xvYWRtb3JlJywgdGhpcy5jcmVhdGVDdXN0b21FdmVudCgnbG9hZG1vcmUnKSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHZhbGlkYXRlU3R5bGVzKCdsaXN0JywgdGhpcy4kdm5vZGUuZGF0YSAmJiB0aGlzLiR2bm9kZS5kYXRhLnN0YXRpY1N0eWxlKVxuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdtYWluJywge1xuICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ2xpc3QnIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtbGlzdCB3ZWV4LWxpc3Qtd3JhcHBlcicsXG4gICAgICBvbjoge1xuICAgICAgICBzY3JvbGw6IGRlYm91bmNlKGJpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpLCAxMDApXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgY3JlYXRlRWxlbWVudCgnbWFyaycsIHsgcmVmOiAndG9wTWFyaycsIHN0YXRpY0NsYXNzOiAnd2VleC1saXN0LXRvcC1tYXJrJyB9KSxcbiAgICAgIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgcmVmOiAnaW5uZXInLFxuICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtbGlzdC1pbm5lcidcbiAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpLFxuICAgICAgY3JlYXRlRWxlbWVudCgnbWFyaycsIHsgcmVmOiAnYm90dG9tTWFyaycsIHN0YXRpY0NsYXNzOiAnd2VleC1saXN0LWJvdHRvbS1tYXJrJyB9KVxuICAgIF0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9saXN0L2luZGV4LmpzIiwiaW1wb3J0IHsgdmFsaWRhdGVTdHlsZXMgfSBmcm9tICcuLi92YWxpZGF0b3InXG5pbXBvcnQgeyBkZWJvdW5jZSwgYmluZCB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHJlY3RNaXhpbiBmcm9tICcuLi9taXhpbnMvcmVjdCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBtaXhpbnM6IFtyZWN0TWl4aW5dLFxuICBwcm9wczoge1xuICAgIGxvYWRtb3Jlb2Zmc2V0OiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlU2Nyb2xsIChldmVudCkge1xuICAgICAgaWYgKHRoaXMucmVhY2hCb3R0b20oKSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdsb2FkbW9yZScsIGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ3Njcm9sbGVyJywgdGhpcy4kdm5vZGUuZGF0YSAmJiB0aGlzLiR2bm9kZS5kYXRhLnN0YXRpY1N0eWxlKVxuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdtYWluJywge1xuICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICBhdHRyczogeyAnd2VleC10eXBlJzogJ3Njcm9sbGVyJyB9LFxuICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXNjcm9sbGVyIHdlZXgtc2Nyb2xsZXItd3JhcHBlcicsXG4gICAgICBvbjoge1xuICAgICAgICBzY3JvbGw6IGRlYm91bmNlKGJpbmQodGhpcy5oYW5kbGVTY3JvbGwsIHRoaXMpLCAxMDApXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgY3JlYXRlRWxlbWVudCgnbWFyaycsIHsgcmVmOiAndG9wTWFyaycsIHN0YXRpY0NsYXNzOiAnd2VleC1zY3JvbGxlci10b3AtbWFyaycgfSksXG4gICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHJlZjogJ2lubmVyJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd3ZWV4LXNjcm9sbGVyLWlubmVyJ1xuICAgICAgfSwgdGhpcy4kc2xvdHMuZGVmYXVsdCksXG4gICAgICBjcmVhdGVFbGVtZW50KCdtYXJrJywgeyByZWY6ICdib3R0b21NYXJrJywgc3RhdGljQ2xhc3M6ICd3ZWV4LXNjcm9sbGVyLWJvdHRvbS1tYXJrJyB9KVxuICAgIF0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9zY3JvbGxlci5qcyIsImltcG9ydCB7IHZhbGlkYXRlU3R5bGVzIH0gZnJvbSAnLi4vLi4vdmFsaWRhdG9yJ1xuaW1wb3J0IHsgdGhyb3R0bGUsIGJpbmQgfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCBpbmRpY2F0b3IgZnJvbSAnLi9pbmRpY2F0b3InXG5pbXBvcnQgZXZlbnRNaXhpbiBmcm9tICcuLi8uLi9taXhpbnMvZXZlbnQnXG5pbXBvcnQgc2xpZGVNaXhpbiBmcm9tICcuL3NsaWRlTWl4aW4nXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWl4aW5zOiBbZXZlbnRNaXhpbiwgc2xpZGVNaXhpbl0sXG4gIGNvbXBvbmVudHM6IHsgaW5kaWNhdG9yIH0sXG4gIHByb3BzOiB7XG4gICAgJ2F1dG8tcGxheSc6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEJvb2xlYW5dLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGludGVydmFsOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogMzAwMFxuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudEluZGV4OiAwLFxuICAgICAgZnJhbWVDb3VudDogMFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgY29tcHV0ZVdyYXBwZXJTaXplICgpIHtcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLiRyZWZzLndyYXBwZXJcbiAgICAgIGlmICh3cmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHRoaXMud3JhcHBlcldpZHRoID0gcmVjdC53aWR0aFxuICAgICAgICB0aGlzLndyYXBwZXJIZWlnaHQgPSByZWN0LmhlaWdodFxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVMYXlvdXQgKCkge1xuICAgICAgdGhpcy5jb21wdXRlV3JhcHBlclNpemUoKVxuICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXG4gICAgICBpZiAoaW5uZXIpIHtcbiAgICAgICAgaW5uZXIuc3R5bGUud2lkdGggPSB0aGlzLndyYXBwZXJXaWR0aCAqIHRoaXMuZnJhbWVDb3VudCArICdweCdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVMYXlvdXQoKVxuICAgIH0pXG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gTnVtYmVyKHRoaXMuaW50ZXJ2YWwpXG4gICAgICB0aGlzLl9sYXN0U2xpZGVUaW1lID0gRGF0ZS5ub3coKVxuXG4gICAgICBjb25zdCBhdXRvUGxheUZuID0gYmluZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hdXRvUGxheVRpbWVyKVxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgICAgIGxldCBuZXh0VGljayA9IGludGVydmFsIC0gbm93ICsgdGhpcy5fbGFzdFNsaWRlVGltZVxuICAgICAgICBuZXh0VGljayA9IG5leHRUaWNrID4gMTAwID8gbmV4dFRpY2sgOiBpbnRlcnZhbFxuXG4gICAgICAgIHRoaXMubmV4dCgpXG4gICAgICAgIHRoaXMuX2xhc3RTbGlkZVRpbWUgPSBub3dcbiAgICAgICAgdGhpcy5fYXV0b1BsYXlUaW1lciA9IHNldFRpbWVvdXQoYXV0b1BsYXlGbiwgbmV4dFRpY2spXG4gICAgICB9LCB0aGlzKVxuXG4gICAgICB0aGlzLl9hdXRvUGxheVRpbWVyID0gc2V0VGltZW91dChhdXRvUGxheUZuLCBpbnRlcnZhbClcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChjcmVhdGVFbGVtZW50KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHZhbGlkYXRlU3R5bGVzKCdzbGlkZXInLCB0aGlzLiR2bm9kZS5kYXRhICYmIHRoaXMuJHZub2RlLmRhdGEuc3RhdGljU3R5bGUpXG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdXG4gICAgY29uc3QgaW5uZXJFbGVtZW50cyA9IGNoaWxkcmVuLm1hcCh2bm9kZSA9PiBjcmVhdGVFbGVtZW50KCdsaScsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1zbGlkZXItY2VsbCdcbiAgICB9LCBbdm5vZGVdKSlcbiAgICB0aGlzLmZyYW1lQ291bnQgPSBpbm5lckVsZW1lbnRzLmxlbmd0aFxuXG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG4gICAgICAnbmF2JyxcbiAgICAgIHtcbiAgICAgICAgcmVmOiAnd3JhcHBlcicsXG4gICAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnc2xpZGVyJyB9LFxuICAgICAgICBzdGF0aWNDbGFzczogJ3dlZXgtc2xpZGVyIHdlZXgtc2xpZGVyLXdyYXBwZXInLFxuICAgICAgICBvbjoge1xuICAgICAgICAgIHRvdWNoc3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcbiAgICAgICAgICB0b3VjaG1vdmU6IHRocm90dGxlKGJpbmQodGhpcy5oYW5kbGVUb3VjaE1vdmUsIHRoaXMpLCAyNSksXG4gICAgICAgICAgdG91Y2hlbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgY3JlYXRlRWxlbWVudCgndWwnLCB7XG4gICAgICAgICAgcmVmOiAnaW5uZXInLFxuICAgICAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC1zbGlkZXItaW5uZXInXG4gICAgICAgIH0sIGlubmVyRWxlbWVudHMpLFxuICAgICAgICBjcmVhdGVFbGVtZW50KGluZGljYXRvciwge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBjb3VudDogdGhpcy5mcmFtZUNvdW50LFxuICAgICAgICAgICAgYWN0aXZlOiB0aGlzLmN1cnJlbnRJbmRleFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy9zbGlkZXIvaW5kZXguanMiLCJleHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICBzbGlkZVRvIChpbmRleCkge1xuICAgICAgLy8gbGV0IG5ld0luZGV4ID0gKGluZGV4IHwgMCkgLy8gJSB0aGlzLmZyYW1lQ291bnRcbiAgICAgIGxldCBuZXdJbmRleCA9IChpbmRleCB8IDApICUgdGhpcy5mcmFtZUNvdW50IC8vIHNjcm9sbCB0byBsZWZ0XG4gICAgICBuZXdJbmRleCA9IE1hdGgubWF4KG5ld0luZGV4LCAwKVxuICAgICAgbmV3SW5kZXggPSBNYXRoLm1pbihuZXdJbmRleCwgdGhpcy5mcmFtZUNvdW50IC0gMSlcblxuICAgICAgY29uc3Qgb2Zmc2V0ID0gLW5ld0luZGV4ICogdGhpcy53cmFwcGVyV2lkdGhcbiAgICAgIGNvbnN0IGlubmVyID0gdGhpcy4kcmVmcy5pbm5lclxuXG4gICAgICBpZiAoaW5uZXIpIHtcbiAgICAgICAgLy8gVE9ETzogd2lsbC1jaGFuZ2UgfCBzZXQgc3R5bGVzIHRvZ2V0aGVyXG4gICAgICAgIGlubmVyLnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtIC4ycyBlYXNlLWluLW91dGBcbiAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7b2Zmc2V0fXB4LCAwLCAwKWBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNpdGlvbiA9ICcnXG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICAgIGlmIChuZXdJbmRleCAhPT0gdGhpcy5jdXJyZW50SW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBuZXdJbmRleFxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmNyZWF0ZUV2ZW50KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgaW5kZXg6IHRoaXMuY3VycmVudEluZGV4XG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBuZXh0ICgpIHtcbiAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLmN1cnJlbnRJbmRleCArIDEpXG4gICAgfSxcblxuICAgIHByZXYgKCkge1xuICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuY3VycmVudEluZGV4IC0gMSlcbiAgICB9LFxuXG4gICAgaGFuZGxlVG91Y2hTdGFydCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggc3RhcnQnLCBldmVudClcbiAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBzdGFydCcsIGV2ZW50LnRhcmdldCwgZXZlbnQudGFyZ2V0LnBhZ2VZKVxuICAgICAgLy8gY29uc29sZS5sb2coJ3RvdWNoZXMnLCB0b3VjaClcbiAgICAgIHRoaXMuX3RvdWNoUGFyYW1zID0ge1xuICAgICAgICBvcmlnaW5hbFRyYW5zZm9ybTogdGhpcy4kcmVmcy5pbm5lci5zdHlsZS50cmFuc2Zvcm0sXG4gICAgICAgIHN0YXJ0VG91Y2hFdmVudDogdG91Y2gsXG4gICAgICAgIHN0YXJ0WDogdG91Y2gucGFnZVgsXG4gICAgICAgIHN0YXJ0WTogdG91Y2gucGFnZVksXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wXG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoTW92ZSAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggbW92ZScpXG4gICAgICBpZiAodGhpcy5fdG91Y2hQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXG4gICAgICAgIGNvbnN0IHsgc3RhcnRYIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXG4gICAgICAgIGNvbnN0IG9mZnNldFggPSB0b3VjaC5wYWdlWCAtIHN0YXJ0WFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb2Zmc2V0WCcsIG9mZnNldFgsICdzdGFydFgnLCBzdGFydFgsICdwYWdlWCcsIHRvdWNoLnBhZ2VYKVxuICAgICAgICB0aGlzLl90b3VjaFBhcmFtcy5vZmZzZXRYID0gb2Zmc2V0WFxuXG4gICAgICAgIGlmIChpbm5lciAmJiBvZmZzZXRYKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3RyYW5zZm9ybScsIGAke29mZnNldFggLSB0aGlzLmN1cnJlbnRJbmRleCAqIHRoaXMud3JhcHBlcldpZHRofWApXG4gICAgICAgICAgaW5uZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7b2Zmc2V0WCAtIHRoaXMuY3VycmVudEluZGV4ICogdGhpcy53cmFwcGVyV2lkdGh9cHgsIDAsIDApYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZVRvdWNoRW5kIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3VjaCBlbmQnKVxuICAgICAgY29uc3QgaW5uZXIgPSB0aGlzLiRyZWZzLmlubmVyXG4gICAgICBpZiAodGhpcy5fdG91Y2hQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBvZmZzZXRYIH0gPSB0aGlzLl90b3VjaFBhcmFtc1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndG91Y2ggcGFnZVg6JywgdG91Y2gucGFnZVgsICcsIG9mZnNldFg6Jywgb2Zmc2V0WClcbiAgICAgICAgaWYgKGlubmVyKSB7XG4gICAgICAgICAgY29uc3QgcmVzZXQgPSBNYXRoLmFicyhvZmZzZXRYIC8gdGhpcy53cmFwcGVyV2lkdGgpIDwgMC4yXG4gICAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gb2Zmc2V0WCA+IDAgPyAxIDogLTFcbiAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IHJlc2V0ID8gdGhpcy5jdXJyZW50SW5kZXggOiAodGhpcy5jdXJyZW50SW5kZXggLSBkaXJlY3Rpb24pXG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzZXQ6JywgcmVzZXQsICcsIG5ld0luZGV4OicsIG5ld0luZGV4KVxuICAgICAgICAgIHRoaXMuc2xpZGVUbyhuZXdJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoUGFyYW1zXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9odG1sNS9yZW5kZXIvdnVlL2NvbXBvbmVudHMvc2xpZGVyL3NsaWRlTWl4aW4uanMiLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGRpc2FibGVkOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDaGVja2VkOiAodGhpcy5jaGVja2VkICE9PSAnZmFsc2UnICYmIHRoaXMuY2hlY2tlZCAhPT0gZmFsc2UpLFxuICAgICAgaXNEaXNhYmxlZDogKHRoaXMuZGlzYWJsZWQgIT09ICdmYWxzZScgJiYgdGhpcy5kaXNhYmxlZCAhPT0gZmFsc2UpXG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHdyYXBwZXJDbGFzcyAoKSB7XG4gICAgICBjb25zdCBjbGFzc0FycmF5ID0gWyd3ZWV4LXN3aXRjaCddXG4gICAgICB0aGlzLmlzQ2hlY2tlZCAmJiBjbGFzc0FycmF5LnB1c2goJ3dlZXgtc3dpdGNoLWNoZWNrZWQnKVxuICAgICAgdGhpcy5pc0Rpc2FibGVkICYmIGNsYXNzQXJyYXkucHVzaCgnd2VleC1zd2l0Y2gtZGlzYWJsZWQnKVxuICAgICAgcmV0dXJuIGNsYXNzQXJyYXkuam9pbignICcpXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlICgpIHtcbiAgICAgIC8vIFRPRE86IGhhbmRsZSB0aGUgZXZlbnRzXG4gICAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9ICF0aGlzLmlzQ2hlY2tlZFxuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB7IHZhbHVlOiB0aGlzLmlzQ2hlY2tlZCB9KVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGNyZWF0ZUVsZW1lbnQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgdmFsaWRhdGVTdHlsZXMoJ3N3aXRjaCcsIHRoaXMuJHZub2RlLmRhdGEgJiYgdGhpcy4kdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSlcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAnc3dpdGNoJyB9LFxuICAgICAgc3RhdGljQ2xhc3M6IHRoaXMud3JhcHBlckNsYXNzLFxuICAgICAgb246IHsgY2xpY2s6IHRoaXMudG9nZ2xlIH1cbiAgICB9LCBbY3JlYXRlRWxlbWVudCgnc21hbGwnLCB7IHN0YXRpY0NsYXNzOiAnd2VleC1zd2l0Y2gtaW5uZXInIH0pXSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3N3aXRjaC5qcyIsImltcG9ydCB7IHZhbGlkYXRlU3R5bGVzIH0gZnJvbSAnLi4vdmFsaWRhdG9yJ1xuXG4vKipcbiAqIEdldCB0ZXh0IHN0eWxlc1xuICovXG5mdW5jdGlvbiBnZXRUZXh0U3R5bGUgKHByb3BzID0ge30pIHtcbiAgY29uc3QgbGluZXMgPSBwYXJzZUludChwcm9wcy5saW5lcykgfHwgMFxuICBpZiAobGluZXMgPiAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgIHdlYmtpdExpbmVDbGFtcDogbGluZXNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIGxpbmVzOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgIHZhbHVlOiBbU3RyaW5nXVxuICB9LFxuXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygndGV4dCcsIHRoaXMuJHZub2RlLmRhdGEgJiYgdGhpcy4kdm5vZGUuZGF0YS5zdGF0aWNTdHlsZSlcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCgncCcsIHtcbiAgICAgIGF0dHJzOiB7ICd3ZWV4LXR5cGUnOiAndGV4dCcgfSxcbiAgICAgIHN0YXRpY0NsYXNzOiAnd2VleC10ZXh0JyxcbiAgICAgIHN0YXRpY1N0eWxlOiBnZXRUZXh0U3R5bGUodGhpcylcbiAgICB9LCB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFt0aGlzLnZhbHVlXSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS9jb21wb25lbnRzL3RleHQuanMiLCJpbXBvcnQgeyB2YWxpZGF0ZVN0eWxlcyB9IGZyb20gJy4uL3ZhbGlkYXRvcidcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIHNyYzogU3RyaW5nXG4gIH0sXG4gIHJlbmRlciAoY3JlYXRlRWxlbWVudCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICB2YWxpZGF0ZVN0eWxlcygnd2ViJywgdGhpcy4kdm5vZGUuZGF0YSAmJiB0aGlzLiR2bm9kZS5kYXRhLnN0YXRpY1N0eWxlKVxuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KCdpZnJhbWUnLCB7XG4gICAgICBhdHRyczoge1xuICAgICAgICAnd2VleC10eXBlJzogJ3dlYicsXG4gICAgICAgIHNyYzogdGhpcy5zcmNcbiAgICAgIH0sXG4gICAgICBzdGF0aWNDbGFzczogJ3dlZXgtd2ViJ1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvY29tcG9uZW50cy93ZWIuanMiLCJpbXBvcnQgJy4uLy4uL3NoYXJlZC9hcnJheUZyb20nXG5pbXBvcnQgJy4uLy4uL3NoYXJlZC9vYmplY3RBc3NpZ24nXG5pbXBvcnQgJy4uLy4uL3NoYXJlZC9vYmplY3RTZXRQcm90b3R5cGVPZidcbi8vIFRPRE86IFByb21pc2UgcG9seWZpbGxcblxuLy8gVE9ETzogcGFyc2UgVUFcbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuXG53aW5kb3cuV1hFbnZpcm9ubWVudCA9IHtcbiAgcGxhdGZvcm06ICdXZWInLFxuICB1c2VyQWdlbnQ6IHVhLFxuICBhcHBOYW1lOiBuYXZpZ2F0b3IuYXBwTmFtZSxcbiAgYXBwVmVyc2lvbjogbmF2aWdhdG9yLmFwcFZlcnNpb24sIC8vIG1heWJlIHRvbyBsb25nXG4gIHdlZXhWZXJzaW9uOiAnJyxcbiAgb3NOYW1lOiAnJyxcbiAgb3NWZXJzaW9uOiAnJyxcbiAgZGV2aWNlV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICBkZXZpY2VIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS9lbnYuanMiLCJjb25zdCBzdXBwb3J0ZWRQcm9wZXJ0aWVzID0ge1xuICAnQGNvbW1vbic6IFtcbiAgICAnaWQnLCAncmVmJywgJ3N0eWxlJywgJ2NsYXNzJywgJ2FwcGVuZCdcbiAgXVxufVxuXG5jb25zdCBzdXBwb3J0ZWRTdHlsZXMgPSB7XG4gICdAYm94LW1vZGVsJzogW1xuICAgICd3aWR0aCcsICdoZWlnaHQnLCAncG9zaXRpb24nLFxuICAgICdwYWRkaW5nLXRvcCcsICdwYWRkaW5nLWJvdHRvbScsICdwYWRkaW5nLWxlZnQnLCAncGFkZGluZy1yaWdodCcsXG4gICAgJ21hcmdpbi10b3AnLCAnbWFyZ2luLWJvdHRvbScsICdtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnXG4gIF0sXG4gICdAYm9yZGVyJzogW1xuICAgICdib3JkZXItc3R5bGUnLCAnYm9yZGVyLXdpZHRoJywgJ2JvcmRlci1jb2xvcicsICdib3JkZXItcmFkaXVzJyxcbiAgICAnYm9yZGVyLXRvcC1zdHlsZScsICdib3JkZXItcmlnaHQtc3R5bGUnLCAnYm9yZGVyLWJvdHRvbS1zdHlsZScsICdib3JkZXItbGVmdC1zdHlsZScsXG4gICAgJ2JvcmRlci10b3Atd2lkdGgnLCAnYm9yZGVyLXJpZ2h0LXdpZHRoJywgJ2JvcmRlci1ib3R0b20td2lkdGgnLCAnYm9yZGVyLWxlZnQtd2lkdGgnLFxuICAgICdib3JkZXItdG9wLWNvbG9yJywgJ2JvcmRlci1yaWdodC1jb2xvcicsICdib3JkZXItYm90dG9tLWNvbG9yJywgJ2JvcmRlci1sZWZ0LWNvbG9yJyxcbiAgICAnYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cycsICdib3JkZXItdG9wLXJpZ2h0LXJhZGl1cycsICdib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzJywgJ2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzJ1xuICBdLFxuICAnQGZsZXhib3gnOiBbXG4gICAgJ2Rpc3BsYXknLCAnZmxleCcsICdmbGV4LWRpcmVjdGlvbicsICdqdXN0aWZ5LWNvbnRlbnQnLCAnYWxpZ24taXRlbXMnLCAnZmxleC13cmFwJ1xuICBdLFxuICAnQGZvbnQnOiBbXG4gICAgJ2ZvbnQtc2l6ZScsICdmb250LXdlaWdodCcsICdmb250LXN0eWxlJywgJ2ZvbnQtZmFtaWx5J1xuICBdLFxuICAnQGNvbG9ycyc6IFtcbiAgICAnY29sb3InLCAnYmFja2dyb3VuZC1jb2xvcicsICdvcGFjaXR5J1xuICBdLFxuICB0ZXh0OiBbXG4gICAgJ0Bib3gtbW9kZWwnLCAnQGJvcmRlcicsICdAZmxleGJveCcsICdAZm9udCcsICdAY29sb3JzJyxcbiAgICAndGV4dC1hbGlnbicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1vdmVyZmxvdydcbiAgXVxufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBtdWx0aXBsZSBkaW1lbnNpb24gYXJyYXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuIChhcnJheSkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKChkaXN0LCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGRpc3QuY29uY2F0KEFycmF5LmlzQXJyYXkoaXRlbSkgPyBmbGF0dGVuKGl0ZW0pIDogaXRlbSlcbiAgfSwgW10pXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGluIHRoZSBsaXN0LlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IGRpY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU3VwcG9ydGVkICh0eXBlLCB2YWx1ZSwgZGljdCA9IHt9KSB7XG4gIGlmICh0eXBlICYmIHZhbHVlICYmIGRpY3RbdHlwZV0pIHtcbiAgICByZXR1cm4gZmxhdHRlbihkaWN0W3R5cGVdLm1hcChrID0+IGRpY3Rba10gfHwgaykpLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHN0eWxlIGlzIHN1cHBvcnRlZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3VwcG9ydGVkU3R5bGUgKHR5cGUsIHN0eWxlKSB7XG4gIHJldHVybiBjaGVja1N1cHBvcnRlZCh0eXBlLCBzdHlsZSwgc3VwcG9ydGVkU3R5bGVzKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgZm9yIHRoZSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N1cHBvcnRlZFByb3AgKHR5cGUsIHByb3ApIHtcbiAgcmV0dXJuIGNoZWNrU3VwcG9ydGVkKHR5cGUsIHByb3AsIHN1cHBvcnRlZFByb3BlcnRpZXMpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9odG1sNS9yZW5kZXIvdnVlL3ZhbGlkYXRvci9jaGVjay5qcyIsIlxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nICh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3JlbmRlci92dWUvdmFsaWRhdG9yL3Byb3AuanMiLCJcbi8qKlxuICogVmFsaWRhdGUgdGhlIENTUyBjb2xvciB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ1NTQ29sb3IgKHZhbHVlKSB7XG4gIHJldHVybiAvXlthLXpdKyQvaS50ZXN0KHZhbHVlKSAvLyBtYXRjaCBjb2xvciBuYW1lXG4gICAgfHwgL14jKFthLWYwLTldezN9KXsxLDJ9JC9pLnRlc3QodmFsdWUpIC8vIG1hdGNoICNBQkNERUZcbiAgICB8fCAvXnJnYlxccypcXCgoXFxzKlswLTkuXStcXHMqLCl7Mn1cXHMqWzAtOS5dK1xccypcXCkvaS50ZXN0KHZhbHVlKSAvLyBtYXRjaCByZ2IoMCwwLDApXG4gICAgfHwgL15yZ2JhXFxzKlxcKChcXHMqWzAtOS5dK1xccyosKXszfVxccypbMC05Ll0rXFxzKlxcKS9pLnRlc3QodmFsdWUpIC8vIG1hdGNoIHJnYmEoMCwwLDAsMClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ1NTTGVuZ3RoICh2YWx1ZSkge1xuICByZXR1cm4gL15bKy1dP1swLTldKy4/KFswLTldKyk/KHB4fCUpPyQvLnRlc3QoU3RyaW5nKHZhbHVlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gWydhYnNvbHV0ZScsICdyZWxhdGl2ZScsICdmaXhlZCcsICdzdGlja3knXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wYWNpdHkgKHZhbHVlKSB7XG4gIGNvbnN0IGNvdW50ID0gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgcmV0dXJuIGNvdW50ID49IDAgJiYgY291bnQgPD0gMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheSAodmFsdWUpIHtcbiAgcmV0dXJuIFsnYmxvY2snLCAnZmxleCddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxleERpcmVjdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIFsncm93JywgJ2NvbHVtbiddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVzdGlmeUNvbnRlbnQgKHZhbHVlKSB7XG4gIHJldHVybiBbJ2ZsZXgtc3RhcnQnLCAnZmxleC1lbmQnLCAnY2VudGVyJywgJ3NwYWNlLWJldHdlZW4nXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsaWduSXRlbXMgKHZhbHVlKSB7XG4gIHJldHVybiBbJ3N0cmV0Y2gnLCAnZmxleC1zdGFydCcsICdmbGV4LWVuZCcsICdjZW50ZXInXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsZXggKHZhbHVlKSB7XG4gIHJldHVybiAvXlxcZHsxLDN9JC8udGVzdChTdHJpbmcodmFsdWUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9udFN0eWxlICh2YWx1ZSkge1xuICByZXR1cm4gWydub3JtYWwnLCAnaXRhbGljJywgJ29ibGlxdWUnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvbnRXZWlnaHQgKHZhbHVlKSB7XG4gIHJldHVybiBbJ25vcm1hbCcsICdib2xkJywgJ2xpZ2h0JywgJ2JvbGRlcicsICdsaWdodGVyJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0RGVjb3JhdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIFsnbm9uZScsICd1bmRlcmxpbmUnLCAnbGluZS10aHJvdWdoJ10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXh0QWxpZ24gKHZhbHVlKSB7XG4gIHJldHVybiBbJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0J10uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdmVyZmxvdyAodmFsdWUpIHtcbiAgcmV0dXJuIFsndmlzaWJsZScsICdoaWRkZW4nXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRleHRPdmVyZmxvdyAodmFsdWUpIHtcbiAgcmV0dXJuIFsnY2xpcCcsICdlbGxpcHNpcyddLmluZGV4T2YodmFsdWUpICE9PSAtMVxufVxuXG4vKipcbiAqIENvbW1vbiBzdHlsZSB2YWxpZGF0b3IuXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1vbiAodmFsdWUsIGtleSkge1xuICBpZiAoL15bXFx3LV0qY29sb3IkLy50ZXN0KFN0cmluZyhrZXkpKSkge1xuICAgIHJldHVybiBpc0NTU0NvbG9yKHZhbHVlKVxuICB9XG5cbiAgaWYgKC9eKHdpZHRofGhlaWdodCkkLy50ZXN0KFN0cmluZyhrZXkpKSkge1xuICAgIHJldHVybiBpc0NTU0xlbmd0aCh2YWx1ZSlcbiAgfVxuXG4gIC8vIGNoZWNrb3V0IGJvcmRlci1yYWRpdXNcbiAgaWYgKC9eYm9yZGVyLSgodG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KS0pezAsMn0od2lkdGh8cmFkaXVzKSQvLnRlc3QoU3RyaW5nKGtleSkpKSB7XG4gICAgcmV0dXJuIGlzQ1NTTGVuZ3RoKHZhbHVlKVxuICB9XG5cbiAgLy8gY2hlY2sgYm9yZGVyLXN0eWxlXG4gIGlmICgvYm9yZGVyLSgodG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KS0pP3N0eWxlLy50ZXN0KFN0cmluZyhrZXkpKSkge1xuICAgIHJldHVybiBbJ3NvbGlkJywgJ2Rhc2hlZCcsICdkb3R0ZWQnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgfVxuXG4gIGlmICgvXigobWFyZ2lufHBhZGRpbmcpLSk/KHRvcHxyaWdodHxib3R0b218bGVmdCkvLnRlc3QoU3RyaW5nKGtleSkpKSB7XG4gICAgcmV0dXJuIGlzQ1NTTGVuZ3RoKHZhbHVlKVxuICB9XG5cbiAgc3dpdGNoIChTdHJpbmcoa2V5KSkge1xuICAgIGNhc2UgJ2ZvbnQtc2l6ZSc6IHJldHVybiBpc0NTU0xlbmd0aCh2YWx1ZSlcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9odG1sNS9yZW5kZXIvdnVlL3ZhbGlkYXRvci9zdHlsZS5qcyIsImNvbnN0IERFRkFVTFRfVklFV1BPUlRfV0lEVEggPSA3NTBcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZpZXdwb3J0IChjb25maWdzID0ge30pIHtcbiAgY29uc3QgZG9jID0gd2luZG93LmRvY3VtZW50XG5cbiAgaWYgKGRvYykge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aFxuICAgIGNvbnN0IHNjYWxlID0gc2NyZWVuV2lkdGggLyBERUZBVUxUX1ZJRVdQT1JUX1dJRFRIXG5cbiAgICBjb25zdCBjb250ZW50cyA9IFtcbiAgICAgIGB3aWR0aD0ke0RFRkFVTFRfVklFV1BPUlRfV0lEVEh9YCxcbiAgICAgIGBpbml0aWFsLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGBtYXhpbXVtLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGBtaW5pbXVtLXNjYWxlPSR7c2NhbGV9YCxcbiAgICAgIGB1c2VyLXNjYWxhYmxlPW5vYFxuICAgIF1cblxuICAgIGxldCBtZXRhID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInZpZXdwb3J0XCJdJylcbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIG1ldGEgPSBkb2MuY3JlYXRlRWxlbWVudCgnbWV0YScpXG4gICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnbmFtZScsICd2aWV3cG9ydCcpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobWV0YSlcbiAgICB9XG5cbiAgICBtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsIGNvbnRlbnRzLmpvaW4oJywnKSlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS92aWV3cG9ydC5qcyIsIi8qIGVzbGludC1kaXNhYmxlICovXG5cbi8vIFByb2R1Y3Rpb24gc3RlcHMgb2YgRUNNQS0yNjIsIEVkaXRpb24gNiwgMjIuMS4yLjFcbi8vIFJlZmVyZW5jZTogaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWFycmF5LmZyb21cblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIUFycmF5LmZyb20pIHtcbiAgQXJyYXkuZnJvbSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgIHZhciBpc0NhbGxhYmxlID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfTtcbiAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7XG4gICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICB9XG4gICAgICByZXR1cm4gKG51bWJlciA+IDAgPyAxIDogLTEpICogTWF0aC5mbG9vcihNYXRoLmFicyhudW1iZXIpKTtcbiAgICB9O1xuICAgIHZhciBtYXhTYWZlSW50ZWdlciA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gICAgdmFyIHRvTGVuZ3RoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcbiAgICB9O1xuXG4gICAgLy8gVGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiB0aGUgZnJvbSBtZXRob2QgaXMgMS5cbiAgICByZXR1cm4gZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwRm4sIHRoaXNBcmcgKi8pIHtcbiAgICAgIC8vIDEuIExldCBDIGJlIHRoZSB0aGlzIHZhbHVlLlxuICAgICAgdmFyIEMgPSB0aGlzO1xuXG4gICAgICAvLyAyLiBMZXQgaXRlbXMgYmUgVG9PYmplY3QoYXJyYXlMaWtlKS5cbiAgICAgIHZhciBpdGVtcyA9IE9iamVjdChhcnJheUxpa2UpO1xuXG4gICAgICAvLyAzLiBSZXR1cm5JZkFicnVwdChpdGVtcykuXG4gICAgICBpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgfVxuXG4gICAgICAvLyA0LiBJZiBtYXBmbiBpcyB1bmRlZmluZWQsIHRoZW4gbGV0IG1hcHBpbmcgYmUgZmFsc2UuXG4gICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xuICAgICAgdmFyIFQ7XG4gICAgICBpZiAodHlwZW9mIG1hcEZuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyA1LiBlbHNlXG4gICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgaWYgKCFpc0NhbGxhYmxlKG1hcEZuKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb206IHdoZW4gcHJvdmlkZWQsIHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA1LiBiLiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgIFQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxuICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxuICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgIC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cbiAgICAgIC8vIDEzLiBhLiBMZXQgQSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kIG9mIEMgd2l0aCBhbiBhcmd1bWVudCBsaXN0IGNvbnRhaW5pbmcgdGhlIHNpbmdsZSBpdGVtIGxlbi5cbiAgICAgIC8vIDE0LiBhLiBFbHNlLCBMZXQgQSBiZSBBcnJheUNyZWF0ZShsZW4pLlxuICAgICAgdmFyIEEgPSBpc0NhbGxhYmxlKEMpID8gT2JqZWN0KG5ldyBDKGxlbikpIDogbmV3IEFycmF5KGxlbik7XG5cbiAgICAgIC8vIDE2LiBMZXQgayBiZSAwLlxuICAgICAgdmFyIGsgPSAwO1xuICAgICAgLy8gMTcuIFJlcGVhdCwgd2hpbGUgayA8IGxlbuKApiAoYWxzbyBzdGVwcyBhIC0gaClcbiAgICAgIHZhciBrVmFsdWU7XG4gICAgICB3aGlsZSAoayA8IGxlbikge1xuICAgICAgICBrVmFsdWUgPSBpdGVtc1trXTtcbiAgICAgICAgaWYgKG1hcEZuKSB7XG4gICAgICAgICAgQVtrXSA9IHR5cGVvZiBUID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGtWYWx1ZSwgaykgOiBtYXBGbi5jYWxsKFQsIGtWYWx1ZSwgayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgQVtrXSA9IGtWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBrICs9IDE7XG4gICAgICB9XG4gICAgICAvLyAxOC4gTGV0IHB1dFN0YXR1cyBiZSBQdXQoQSwgXCJsZW5ndGhcIiwgbGVuLCB0cnVlKS5cbiAgICAgIEEubGVuZ3RoID0gbGVuO1xuICAgICAgLy8gMjAuIFJldHVybiBBLlxuICAgICAgcmV0dXJuIEE7XG4gICAgfTtcbiAgfSgpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3NoYXJlZC9hcnJheUZyb20uanMiLCJpbXBvcnQgJ2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbidcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3NoYXJlZC9vYmplY3RBc3NpZ24uanMiLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uLzU1OTM1NTRcblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIU9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICBPYmplY3Quc2V0UHJvdG90eXBlT2YgPSAoZnVuY3Rpb24oT2JqZWN0LCBtYWdpYykge1xuICAgIHZhciBzZXQ7XG4gICAgZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICAgIHNldC5jYWxsKE8sIHByb3RvKTtcbiAgICAgIHJldHVybiBPO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gdGhpcyB3b3JrcyBhbHJlYWR5IGluIEZpcmVmb3ggYW5kIFNhZmFyaVxuICAgICAgc2V0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QucHJvdG90eXBlLCBtYWdpYykuc2V0O1xuICAgICAgc2V0LmNhbGwoe30sIG51bGwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gSUUgPCAxMSBjYW5ub3QgYmUgc2hpbW1lZFxuICAgICAgICBPYmplY3QucHJvdG90eXBlICE9PSB7fVttYWdpY10gfHxcbiAgICAgICAgLy8gbmVpdGhlciBjYW4gYW55IGJyb3dzZXIgdGhhdCBhY3R1YWxseVxuICAgICAgICAvLyBpbXBsZW1lbnRlZCBfX3Byb3RvX18gY29ycmVjdGx5XG4gICAgICAgIC8vIChhbGwgYnV0IG9sZCBWOCB3aWxsIHJldHVybiBoZXJlKVxuICAgICAgICB7X19wcm90b19fOiBudWxsfS5fX3Byb3RvX18gPT09IHZvaWQgMFxuICAgICAgICAvLyB0aGlzIGNhc2UgbWVhbnMgbnVsbCBvYmplY3RzIGNhbm5vdCBiZSBwYXNzZWRcbiAgICAgICAgLy8gdGhyb3VnaCBzZXRQcm90b3R5cGVPZiBpbiBhIHJlbGlhYmxlIHdheVxuICAgICAgICAvLyB3aGljaCBtZWFucyBoZXJlIGEgKipTaGFtKiogaXMgbmVlZGVkIGluc3RlYWRcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBub2RlanMgMC44IGFuZCAwLjEwIGFyZSAoYnVnZ3kgYW5kLi4pIGZpbmUgaGVyZVxuICAgICAgLy8gcHJvYmFibHkgQ2hyb21lIG9yIHNvbWUgb2xkIE1vYmlsZSBzdG9jayBicm93c2VyXG4gICAgICBzZXQgPSBmdW5jdGlvbihwcm90bykge1xuICAgICAgICB0aGlzW21hZ2ljXSA9IHByb3RvO1xuICAgICAgfTtcbiAgICAgIC8vIHBsZWFzZSBub3RlIHRoYXQgdGhpcyB3aWxsICoqbm90Kiogd29ya1xuICAgICAgLy8gaW4gdGhvc2UgYnJvd3NlcnMgdGhhdCBkbyBub3QgaW5oZXJpdFxuICAgICAgLy8gX19wcm90b19fIGJ5IG1pc3Rha2UgZnJvbSBPYmplY3QucHJvdG90eXBlXG4gICAgICAvLyBpbiB0aGVzZSBjYXNlcyB3ZSBzaG91bGQgcHJvYmFibHkgdGhyb3cgYW4gZXJyb3JcbiAgICAgIC8vIG9yIGF0IGxlYXN0IGJlIGluZm9ybWVkIGFib3V0IHRoZSBpc3N1ZVxuICAgICAgc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPSBzZXRQcm90b3R5cGVPZihcbiAgICAgICAgc2V0UHJvdG90eXBlT2Yoe30sIG51bGwpLFxuICAgICAgICBPYmplY3QucHJvdG90eXBlXG4gICAgICApIGluc3RhbmNlb2YgT2JqZWN0O1xuICAgICAgLy8gc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPT09IHRydWUgbWVhbnMgaXQgd29ya3MgYXMgbWVhbnRcbiAgICAgIC8vIHNldFByb3RvdHlwZU9mLnBvbHlmaWxsID09PSBmYWxzZSBtZWFucyBpdCdzIG5vdCAxMDAlIHJlbGlhYmxlXG4gICAgICAvLyBzZXRQcm90b3R5cGVPZi5wb2x5ZmlsbCA9PT0gdW5kZWZpbmVkXG4gICAgICAvLyBvclxuICAgICAgLy8gc2V0UHJvdG90eXBlT2YucG9seWZpbGwgPT0gIG51bGwgbWVhbnMgaXQncyBub3QgYSBwb2x5ZmlsbFxuICAgICAgLy8gd2hpY2ggbWVhbnMgaXQgd29ya3MgYXMgZXhwZWN0ZWRcbiAgICAgIC8vIHdlIGNhbiBldmVuIGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fcHJvdG9fXztcbiAgICB9XG4gICAgcmV0dXJuIHNldFByb3RvdHlwZU9mO1xuICB9KE9iamVjdCwgJ19fcHJvdG9fXycpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2h0bWw1L3NoYXJlZC9vYmplY3RTZXRQcm90b3R5cGVPZi5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjQuMS9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi40LjEvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuNC4xL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8ubnBtaW5zdGFsbC9wcm9jZXNzLzAuMTEuOS9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlcjtcblxuLy8gVGhlIGRlYnVnIGZ1bmN0aW9uIGlzIGV4Y2x1ZGVkIGVudGlyZWx5IGZyb20gdGhlIG1pbmlmaWVkIHZlcnNpb24uXG4vKiBub21pbiAqLyB2YXIgZGVidWc7XG4vKiBub21pbiAqLyBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgLyogbm9taW4gKi8gL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgLyogbm9taW4gKi8gdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIC8qIG5vbWluICovIGFyZ3MudW5zaGlmdCgnU0VNVkVSJyk7XG4gICAgLyogbm9taW4gKi8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgLyogbm9taW4gKi8gfTtcbi8qIG5vbWluICovIGVsc2VcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgOTAwNzE5OTI1NDc0MDk5MTtcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXTtcbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdO1xudmFyIFIgPSAwO1xuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConO1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJztcblxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonO1xuXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKys7XG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrO1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknO1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSc7XG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrKztcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrO1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJztcblxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKys7XG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/Jztcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JztcblxudmFyIExPT1NFID0gUisrO1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCc7XG5cbnZhciBHVExUID0gUisrO1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSc7XG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJztcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJztcblxudmFyIFhSQU5HRVBMQUlOID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRSA9IFIrKztcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFhSQU5HRUxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrKztcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG52YXIgVElMREVUUklNID0gUisrO1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpO1xudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxudmFyIFRJTERFID0gUisrO1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBUSUxERUxPT1NFID0gUisrO1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrO1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJztcblxudmFyIENBUkVUVFJJTSA9IFIrKztcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKyc7XG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXic7XG5cbnZhciBDQVJFVCA9IFIrKztcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgQ0FSRVRMT09TRSA9IFIrKztcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrKztcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCc7XG52YXIgQ09NUEFSQVRPUiA9IFIrKztcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrKztcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJztcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnO1xuXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrO1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConO1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pO1xuICBpZiAoIXJlW2ldKVxuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pO1xufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5mdW5jdGlvbiBwYXJzZSh2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcilcbiAgICByZXR1cm4gdmVyc2lvbjtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHIgPSBsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdO1xuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWQ7XG5mdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsO1xufVxuXG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhbjtcbmZ1bmN0aW9uIGNsZWFuKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBsb29zZSk7XG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbDtcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXI7XG5cbmZ1bmN0aW9uIFNlbVZlcih2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIGVsc2VcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gobG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSk7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuXG4gIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV07XG4gIHRoaXMubWlub3IgPSArbVsyXTtcbiAgdGhpcy5wYXRjaCA9ICttWzNdO1xuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gIGVsc2VcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkO1xuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUilcbiAgICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlkO1xuICAgIH0pO1xuXG4gIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW107XG4gIHRoaXMuZm9ybWF0KCk7XG59XG5cblNlbVZlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudmVyc2lvbiA9IHRoaXMubWFqb3IgKyAnLicgKyB0aGlzLm1pbm9yICsgJy4nICsgdGhpcy5wYXRjaDtcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgdGhpcy52ZXJzaW9uICs9ICctJyArIHRoaXMucHJlcmVsZWFzZS5qb2luKCcuJyk7XG4gIHJldHVybiB0aGlzLnZlcnNpb247XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZlcnNpb247XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbihvdGhlcikge1xuICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMubG9vc2UsIG90aGVyKTtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIHRoaXMuY29tcGFyZU1haW4ob3RoZXIpIHx8IHRoaXMuY29tcGFyZVByZShvdGhlcik7XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVNYWluID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaCk7XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVQcmUgPSBmdW5jdGlvbihvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAtMTtcbiAgZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gMDtcblxuICB2YXIgaSA9IDA7XG4gIGRvIHtcbiAgICB2YXIgYSA9IHRoaXMucHJlcmVsZWFzZVtpXTtcbiAgICB2YXIgYiA9IG90aGVyLnByZXJlbGVhc2VbaV07XG4gICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpO1xuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIC0xO1xuICAgIGVsc2UgaWYgKGEgPT09IGIpXG4gICAgICBjb250aW51ZTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpO1xuICB9IHdoaWxlICgrK2kpO1xufTtcblxuLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuU2VtVmVyLnByb3RvdHlwZS5pbmMgPSBmdW5jdGlvbihyZWxlYXNlLCBpZGVudGlmaWVyKSB7XG4gIHN3aXRjaCAocmVsZWFzZSkge1xuICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMubWFqb3IrKztcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ByZW1pbm9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLm1pbm9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgLy8gcHJlcGF0Y2guXG4gICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21ham9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWFqb3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtYWpvciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtYWpvci5cbiAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgIC8vIDEuMS4wIGJ1bXBzIHRvIDIuMC4wXG4gICAgICBpZiAodGhpcy5taW5vciAhPT0gMCB8fCB0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMubWFqb3IrKztcbiAgICAgIHRoaXMubWlub3IgPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21pbm9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWlub3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtaW5vciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgIC8vIDEuMi4wLTUgYnVtcHMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4xIGJ1bXBzIHRvIDEuMy4wXG4gICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1pbm9yKys7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAvLyBJZiBpdCBpcyBhIHByZS1yZWxlYXNlIGl0IHdpbGwgYnVtcCB1cCB0byB0aGUgc2FtZSBwYXRjaCB2ZXJzaW9uLlxuICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5wYXRjaCsrO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICAvLyBUaGlzIHByb2JhYmx5IHNob3VsZG4ndCBiZSB1c2VkIHB1YmxpY2x5LlxuICAgIC8vIDEuMC4wIFwicHJlXCIgd291bGQgYmVjb21lIDEuMC4wLTAgd2hpY2ggaXMgdGhlIHdyb25nIGRpcmVjdGlvbi5cbiAgICBjYXNlICdwcmUnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFswXTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlW2ldKys7XG4gICAgICAgICAgICBpID0gLTI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAtMSkgLy8gZGlkbid0IGluY3JlbWVudCBhbnl0aGluZ1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApO1xuICAgICAgfVxuICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgLy8gMS4yLjAtYmV0YS4xIGJ1bXBzIHRvIDEuMi4wLWJldGEuMixcbiAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZVswXSA9PT0gaWRlbnRpZmllcikge1xuICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKVxuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiAnICsgcmVsZWFzZSk7XG4gIH1cbiAgdGhpcy5mb3JtYXQoKTtcbiAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5pbmMgPSBpbmM7XG5mdW5jdGlvbiBpbmModmVyc2lvbiwgcmVsZWFzZSwgbG9vc2UsIGlkZW50aWZpZXIpIHtcbiAgaWYgKHR5cGVvZihsb29zZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgaWRlbnRpZmllciA9IGxvb3NlO1xuICAgIGxvb3NlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIpLnZlcnNpb247XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0cy5kaWZmID0gZGlmZjtcbmZ1bmN0aW9uIGRpZmYodmVyc2lvbjEsIHZlcnNpb24yKSB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHYxID0gcGFyc2UodmVyc2lvbjEpO1xuICAgIHZhciB2MiA9IHBhcnNlKHZlcnNpb24yKTtcbiAgICBpZiAodjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcmUnK2tleTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAncHJlcmVsZWFzZSc7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmNvbXBhcmVJZGVudGlmaWVycyA9IGNvbXBhcmVJZGVudGlmaWVycztcblxudmFyIG51bWVyaWMgPSAvXlswLTldKyQvO1xuZnVuY3Rpb24gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgdmFyIGFudW0gPSBudW1lcmljLnRlc3QoYSk7XG4gIHZhciBibnVtID0gbnVtZXJpYy50ZXN0KGIpO1xuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2E7XG4gICAgYiA9ICtiO1xuICB9XG5cbiAgcmV0dXJuIChhbnVtICYmICFibnVtKSA/IC0xIDpcbiAgICAgICAgIChibnVtICYmICFhbnVtKSA/IDEgOlxuICAgICAgICAgYSA8IGIgPyAtMSA6XG4gICAgICAgICBhID4gYiA/IDEgOlxuICAgICAgICAgMDtcbn1cblxuZXhwb3J0cy5yY29tcGFyZUlkZW50aWZpZXJzID0gcmNvbXBhcmVJZGVudGlmaWVycztcbmZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpO1xufVxuXG5leHBvcnRzLm1ham9yID0gbWFqb3I7XG5mdW5jdGlvbiBtYWpvcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3I7XG59XG5cbmV4cG9ydHMubWlub3IgPSBtaW5vcjtcbmZ1bmN0aW9uIG1pbm9yKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vcjtcbn1cblxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoO1xuZnVuY3Rpb24gcGF0Y2goYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoO1xufVxuXG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlO1xuZnVuY3Rpb24gY29tcGFyZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShiKTtcbn1cblxuZXhwb3J0cy5jb21wYXJlTG9vc2UgPSBjb21wYXJlTG9vc2U7XG5mdW5jdGlvbiBjb21wYXJlTG9vc2UoYSwgYikge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCB0cnVlKTtcbn1cblxuZXhwb3J0cy5yY29tcGFyZSA9IHJjb21wYXJlO1xuZnVuY3Rpb24gcmNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYiwgYSwgbG9vc2UpO1xufVxuXG5leHBvcnRzLnNvcnQgPSBzb3J0O1xuZnVuY3Rpb24gc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5jb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSk7XG59XG5cbmV4cG9ydHMucnNvcnQgPSByc29ydDtcbmZ1bmN0aW9uIHJzb3J0KGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLnJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuZ3QgPSBndDtcbmZ1bmN0aW9uIGd0KGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+IDA7XG59XG5cbmV4cG9ydHMubHQgPSBsdDtcbmZ1bmN0aW9uIGx0KGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDA7XG59XG5cbmV4cG9ydHMuZXEgPSBlcTtcbmZ1bmN0aW9uIGVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMDtcbn1cblxuZXhwb3J0cy5uZXEgPSBuZXE7XG5mdW5jdGlvbiBuZXEoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwO1xufVxuXG5leHBvcnRzLmd0ZSA9IGd0ZTtcbmZ1bmN0aW9uIGd0ZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMDtcbn1cblxuZXhwb3J0cy5sdGUgPSBsdGU7XG5mdW5jdGlvbiBsdGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDA7XG59XG5cbmV4cG9ydHMuY21wID0gY21wO1xuZnVuY3Rpb24gY21wKGEsIG9wLCBiLCBsb29zZSkge1xuICB2YXIgcmV0O1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIGEgPSBhLnZlcnNpb247XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgcmV0ID0gYSA9PT0gYjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgIT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICcnOiBjYXNlICc9JzogY2FzZSAnPT0nOiByZXQgPSBlcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJyE9JzogcmV0ID0gbmVxKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPic6IHJldCA9IGd0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPj0nOiByZXQgPSBndGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc8JzogcmV0ID0gbHQoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc8PSc6IHJldCA9IGx0ZShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3BlcmF0b3I6ICcgKyBvcCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0cy5Db21wYXJhdG9yID0gQ29tcGFyYXRvcjtcbmZ1bmN0aW9uIENvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgaWYgKGNvbXAubG9vc2UgPT09IGxvb3NlKVxuICAgICAgcmV0dXJuIGNvbXA7XG4gICAgZWxzZVxuICAgICAgY29tcCA9IGNvbXAudmFsdWU7XG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpXG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcblxuICBkZWJ1ZygnY29tcGFyYXRvcicsIGNvbXAsIGxvb3NlKTtcbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICB0aGlzLnBhcnNlKGNvbXApO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgZWxzZVxuICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wZXJhdG9yICsgdGhpcy5zZW12ZXIudmVyc2lvbjtcblxuICBkZWJ1ZygnY29tcCcsIHRoaXMpO1xufVxuXG52YXIgQU5ZID0ge307XG5Db21wYXJhdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKGNvbXApIHtcbiAgdmFyIHIgPSB0aGlzLmxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgbSA9IGNvbXAubWF0Y2gocik7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY29tcGFyYXRvcjogJyArIGNvbXApO1xuXG4gIHRoaXMub3BlcmF0b3IgPSBtWzFdO1xuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJz0nKVxuICAgIHRoaXMub3BlcmF0b3IgPSAnJztcblxuICAvLyBpZiBpdCBsaXRlcmFsbHkgaXMganVzdCAnPicgb3IgJycgdGhlbiBhbGxvdyBhbnl0aGluZy5cbiAgaWYgKCFtWzJdKVxuICAgIHRoaXMuc2VtdmVyID0gQU5ZO1xuICBlbHNlXG4gICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMubG9vc2UpO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWU7XG59O1xuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24odmVyc2lvbikge1xuICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gY21wKHZlcnNpb24sIHRoaXMub3BlcmF0b3IsIHRoaXMuc2VtdmVyLCB0aGlzLmxvb3NlKTtcbn07XG5cblxuZXhwb3J0cy5SYW5nZSA9IFJhbmdlO1xuZnVuY3Rpb24gUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIGlmICgocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkgJiYgcmFuZ2UubG9vc2UgPT09IGxvb3NlKVxuICAgIHJldHVybiByYW5nZTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmFuZ2UpKVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcblxuICB0aGlzLmxvb3NlID0gbG9vc2U7XG5cbiAgLy8gRmlyc3QsIHNwbGl0IGJhc2VkIG9uIGJvb2xlYW4gb3IgfHxcbiAgdGhpcy5yYXcgPSByYW5nZTtcbiAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24ocmFuZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZVJhbmdlKHJhbmdlLnRyaW0oKSk7XG4gIH0sIHRoaXMpLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgLy8gdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgcmVsZXZhbnQgZm9yIHdoYXRldmVyIHJlYXNvblxuICAgIHJldHVybiBjLmxlbmd0aDtcbiAgfSk7XG5cbiAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFNlbVZlciBSYW5nZTogJyArIHJhbmdlKTtcbiAgfVxuXG4gIHRoaXMuZm9ybWF0KCk7XG59XG5cblJhbmdlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0Lm1hcChmdW5jdGlvbihjb21wcykge1xuICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpO1xuICB9KS5qb2luKCd8fCcpLnRyaW0oKTtcbiAgcmV0dXJuIHRoaXMucmFuZ2U7XG59O1xuXG5SYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmFuZ2U7XG59O1xuXG5SYW5nZS5wcm90b3R5cGUucGFyc2VSYW5nZSA9IGZ1bmN0aW9uKHJhbmdlKSB7XG4gIHZhciBsb29zZSA9IHRoaXMubG9vc2U7XG4gIHJhbmdlID0gcmFuZ2UudHJpbSgpO1xuICBkZWJ1ZygncmFuZ2UnLCByYW5nZSwgbG9vc2UpO1xuICAvLyBgMS4yLjMgLSAxLjIuNGAgPT4gYD49MS4yLjMgPD0xLjIuNGBcbiAgdmFyIGhyID0gbG9vc2UgPyByZVtIWVBIRU5SQU5HRUxPT1NFXSA6IHJlW0hZUEhFTlJBTkdFXTtcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKGhyLCBoeXBoZW5SZXBsYWNlKTtcbiAgZGVidWcoJ2h5cGhlbiByZXBsYWNlJywgcmFuZ2UpO1xuICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NPTVBBUkFUT1JUUklNXSwgY29tcGFyYXRvclRyaW1SZXBsYWNlKTtcbiAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVtDT01QQVJBVE9SVFJJTV0pO1xuXG4gIC8vIGB+IDEuMi4zYCA9PiBgfjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSk7XG5cbiAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDQVJFVFRSSU1dLCBjYXJldFRyaW1SZXBsYWNlKTtcblxuICAvLyBub3JtYWxpemUgc3BhY2VzXG4gIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJyk7XG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICB2YXIgY29tcFJlID0gbG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl07XG4gIHZhciBzZXQgPSByYW5nZS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHBhcnNlQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKS5zcGxpdCgvXFxzKy8pO1xuICBpZiAodGhpcy5sb29zZSkge1xuICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgc2V0ID0gc2V0LmZpbHRlcihmdW5jdGlvbihjb21wKSB7XG4gICAgICByZXR1cm4gISFjb21wLm1hdGNoKGNvbXBSZSk7XG4gICAgfSk7XG4gIH1cbiAgc2V0ID0gc2V0Lm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHNldDtcbn07XG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmV4cG9ydHMudG9Db21wYXJhdG9ycyA9IHRvQ29tcGFyYXRvcnM7XG5mdW5jdGlvbiB0b0NvbXBhcmF0b3JzKHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSkuc2V0Lm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIGNvbXAubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgIH0pLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKTtcbiAgfSk7XG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmZ1bmN0aW9uIHBhcnNlQ29tcGFyYXRvcihjb21wLCBsb29zZSkge1xuICBkZWJ1ZygnY29tcCcsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3N0YXJzJywgY29tcCk7XG4gIHJldHVybiBjb21wO1xufVxuXG5mdW5jdGlvbiBpc1goaWQpIHtcbiAgcmV0dXJuICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJztcbn1cblxuLy8gfiwgfj4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyB+MiwgfjIueCwgfjIueC54LCB+PjIsIH4+Mi54IH4+Mi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjBcbi8vIH4xLjIuMywgfj4xLjIuMyAtLT4gPj0xLjIuMyA8MS4zLjBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjBcbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpIHtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW1RJTERFTE9PU0VdIDogcmVbVElMREVdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSlcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMCA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfSBlbHNlXG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIGxvb3NlKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJylcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgbG9vc2UpO1xuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpIHtcbiAgY29tcCA9IGNvbXAudHJpbSgpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpO1xuICAgIHZhciB4TSA9IGlzWChNKTtcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSk7XG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApO1xuICAgIHZhciBhbnlYID0geHA7XG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpXG4gICAgICBndGx0ID0gJyc7XG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKVxuICAgICAgICBtID0gMDtcbiAgICAgIGlmICh4cClcbiAgICAgICAgcCA9IDA7XG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nO1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxO1xuICAgICAgICAgIG0gPSAwO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgbSA9ICttICsgMTtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnO1xuICAgICAgICBpZiAoeG0pXG4gICAgICAgICAgTSA9ICtNICsgMTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG0gPSArbSArIDE7XG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHA7XG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIGxvb3NlKTtcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJyk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW0hZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wXG5mdW5jdGlvbiBoeXBoZW5SZXBsYWNlKCQwLFxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICAgICAgICAgICAgICAgICAgICAgICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuXG4gIGlmIChpc1goZk0pKVxuICAgIGZyb20gPSAnJztcbiAgZWxzZSBpZiAoaXNYKGZtKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1goZnApKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCc7XG4gIGVsc2VcbiAgICBmcm9tID0gJz49JyArIGZyb207XG5cbiAgaWYgKGlzWCh0TSkpXG4gICAgdG8gPSAnJztcbiAgZWxzZSBpZiAoaXNYKHRtKSlcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKHRwKSlcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJztcbiAgZWxzZSBpZiAodHByKVxuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwcjtcbiAgZWxzZVxuICAgIHRvID0gJzw9JyArIHRvO1xuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKCk7XG59XG5cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGlmICghdmVyc2lvbilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24pKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZnVuY3Rpb24gdGVzdFNldChzZXQsIHZlcnNpb24pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcik7XG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlcjtcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydHMuc2F0aXNmaWVzID0gc2F0aXNmaWVzO1xuZnVuY3Rpb24gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pO1xufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nO1xuZnVuY3Rpb24gbWF4U2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24odmVyc2lvbikge1xuICAgIHJldHVybiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKTtcbiAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIHJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSlbMF0gfHwgbnVsbDtcbn1cblxuZXhwb3J0cy5taW5TYXRpc2Z5aW5nID0gbWluU2F0aXNmeWluZztcbmZ1bmN0aW9uIG1pblNhdGlzZnlpbmcodmVyc2lvbnMsIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gdmVyc2lvbnMuZmlsdGVyKGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSlbMF0gfHwgbnVsbDtcbn1cblxuZXhwb3J0cy52YWxpZFJhbmdlID0gdmFsaWRSYW5nZTtcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5yYW5nZSB8fCAnKic7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0cjtcbmZ1bmN0aW9uIGx0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8JywgbG9vc2UpO1xufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0cjtcbmZ1bmN0aW9uIGd0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+JywgbG9vc2UpO1xufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlO1xuZnVuY3Rpb24gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgaGlsbywgbG9vc2UpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXA7XG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0O1xuICAgICAgbHRlZm4gPSBsdGU7XG4gICAgICBsdGZuID0gbHQ7XG4gICAgICBjb21wID0gJz4nO1xuICAgICAgZWNvbXAgPSAnPj0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHQ7XG4gICAgICBsdGVmbiA9IGd0ZTtcbiAgICAgIGx0Zm4gPSBndDtcbiAgICAgIGNvbXAgPSAnPCc7XG4gICAgICBlY29tcCA9ICc8PSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKTtcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXTtcblxuICAgIHZhciBoaWdoID0gbnVsbDtcbiAgICB2YXIgbG93ID0gbnVsbDtcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24oY29tcGFyYXRvcikge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3I7XG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvcjtcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydHMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2U7XG5mdW5jdGlvbiBwcmVyZWxlYXNlKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZSh2ZXJzaW9uLCBsb29zZSk7XG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLm5wbWluc3RhbGwvc2VtdmVyLzUuMy4wL3NlbXZlci9zZW12ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgRXZlbnQuXG4gICAgICogQHBhcmFtIHtET01TdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICAgKi9cbiAgICBjcmVhdGVFdmVudCAodHlwZSwgcHJvcHMpIHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUsIHsgYnViYmxlczogZmFsc2UgfSlcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgIGV4dGVuZChldmVudCwgcHJvcHMpXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3RhcmdldCcsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHRoaXMgfHwgbnVsbFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGV2ZW50XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBDdXN0b20gRXZlbnQuXG4gICAgICogQHBhcmFtIHtET01TdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICAgKi9cbiAgICBjcmVhdGVDdXN0b21FdmVudCAodHlwZSwgcHJvcHMpIHtcbiAgICAgIC8vIGNvbXBhdGliaWxpdHk6IGh0dHA6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPWN1c3RvbWV2ZW50XG4gICAgICAvLyBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlKVxuICAgICAgY29uc3QgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKVxuICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCB0cnVlLCB7fSlcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgIGV4dGVuZChldmVudCwgcHJvcHMpXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ3RhcmdldCcsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHRoaXMgfHwgbnVsbFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGV2ZW50XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGFuZCBlbWl0IGxvbmdwcmVzcyBldmVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVMb25nUHJlc3MgKGV2ZW50KSB7XG4gICAgICAvLyBUT0RPOiBjaGVjayB0aGUgY29uZGl0aW9uXG4gICAgICB0aGlzLiRlbWl0KCdsb25ncHJlc3MnLCB0aGlzLmNyZWF0ZUN1c3RvbUV2ZW50KCdsb25ncHJlc3MnKSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgYW5kIGVtaXQgYXBwZWFyIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIGhhbmRsZUFwcGVhciAoZXZlbnQpIHtcbiAgICAgIC8vIFRPRE86IGNoZWNrIHRoZSBjb25kaXRpb25cbiAgICAgIHRoaXMuJGVtaXQoJ2FwcGVhcicsIHRoaXMuY3JlYXRlQ3VzdG9tRXZlbnQoJ2FwcGVhcicpKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBhbmQgZW1pdCBkaXNhcHBlYXIgZXZlbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgaGFuZERpc2FwcGVhciAoZXZlbnQpIHtcbiAgICAgIC8vIFRPRE86IGNoZWNrIHRoZSBjb25kaXRpb25cbiAgICAgIHRoaXMuJGVtaXQoJ2Rpc2FwcGVhcicsIHRoaXMuY3JlYXRlQ3VzdG9tRXZlbnQoJ2Rpc2FwcGVhcicpKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaHRtbDUvcmVuZGVyL3Z1ZS9taXhpbnMvZXZlbnQuanMiXSwic291cmNlUm9vdCI6IiJ9