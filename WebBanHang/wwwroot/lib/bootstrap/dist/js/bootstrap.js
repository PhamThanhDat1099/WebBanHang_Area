/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, function (exports, $, Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        } // Disable Popper.js if we have a static display

      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap.js.map
@charset "UTF-8";
/*!
 * Bootswatch v5.3.6 (https://bootswatch.com)
 * Theme: cyborg
 * Copyright 2012-2025 Thomas Park
 * Licensed under MIT
 * Based on Bootstrap
*/
/*!
 * Bootstrap  v5.3.6 (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
: root,
    [data - bs - theme=light] {
    --bs - blue: #2a9fd6;
    --bs - indigo: #6610f2;
    --bs - purple: #6f42c1;
    --bs - pink: #e83e8c;
    --bs - red: #c00;
    --bs - orange: #fd7e14;
    --bs - yellow: #f80;
    --bs - green: #77b300;
    --bs - teal: #20c997;
    --bs - cyan: #93c;
    --bs - black: #000;
    --bs - white: #fff;
    --bs - gray: #555;
    --bs - gray - dark: #222;
    --bs - gray - 100: #f8f9fa;
    --bs - gray - 200: #e9ecef;
    --bs - gray - 300: #dee2e6;
    --bs - gray - 400: #adafae;
    --bs - gray - 500: #888;
    --bs - gray - 600: #555;
    --bs - gray - 700: #282828;
    --bs - gray - 800: #222;
    --bs - gray - 900: #212529;
    --bs - primary: #2a9fd6;
    --bs - secondary: #555;
    --bs - success: #77b300;
    --bs - info: #93c;
    --bs - warning: #f80;
    --bs - danger: #c00;
    --bs - light: #222;
    --bs - dark: #adafae;
    --bs - primary - rgb: 42, 159, 214;
    --bs - secondary - rgb: 85, 85, 85;
    --bs - success - rgb: 119, 179, 0;
    --bs - info - rgb: 153, 51, 204;
    --bs - warning - rgb: 255, 136, 0;
    --bs - danger - rgb: 204, 0, 0;
    --bs - light - rgb: 34, 34, 34;
    --bs - dark - rgb: 173, 175, 174;
    --bs - primary - text - emphasis: #114056;
    --bs - secondary - text - emphasis: #222222;
    --bs - success - text - emphasis: #304800;
    --bs - info - text - emphasis: #3d1452;
    --bs - warning - text - emphasis: #663600;
    --bs - danger - text - emphasis: #520000;
    --bs - light - text - emphasis: #282828;
    --bs - dark - text - emphasis: #282828;
    --bs - primary - bg - subtle: #d4ecf7;
    --bs - secondary - bg - subtle: #dddddd;
    --bs - success - bg - subtle: #e4f0cc;
    --bs - info - bg - subtle: #ebd6f5;
    --bs - warning - bg - subtle: #ffe7cc;
    --bs - danger - bg - subtle: #f5cccc;
    --bs - light - bg - subtle: #fcfcfd;
    --bs - dark - bg - subtle: #adafae;
    --bs - primary - border - subtle: #aad9ef;
    --bs - secondary - border - subtle: #bbbbbb;
    --bs - success - border - subtle: #c9e199;
    --bs - info - border - subtle: #d6adeb;
    --bs - warning - border - subtle: #ffcf99;
    --bs - danger - border - subtle: #eb9999;
    --bs - light - border - subtle: #e9ecef;
    --bs - dark - border - subtle: #888;
    --bs - white - rgb: 255, 255, 255;
    --bs - black - rgb: 0, 0, 0;
    --bs - font - sans - serif: Roboto, -apple - system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans - serif;
    --bs - font - monospace: SFMono - Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --bs - gradient: linear - gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
    --bs - body - font - family: var(--bs - font - sans - serif);
    --bs - body - font - size: 1rem;
    --bs - body - font - weight: 400;
    --bs - body - line - height: 1.5;
    --bs - body - color: #adafae;
    --bs - body - color - rgb: 173, 175, 174;
    --bs - body - bg: #060606;
    --bs - body - bg - rgb: 6, 6, 6;
    --bs - emphasis - color: #000;
    --bs - emphasis - color - rgb: 0, 0, 0;
    --bs - secondary - color: rgba(173, 175, 174, 0.75);
    --bs - secondary - color - rgb: 173, 175, 174;
    --bs - secondary - bg: #e9ecef;
    --bs - secondary - bg - rgb: 233, 236, 239;
    --bs - tertiary - color: rgba(173, 175, 174, 0.5);
    --bs - tertiary - color - rgb: 173, 175, 174;
    --bs - tertiary - bg: #f8f9fa;
    --bs - tertiary - bg - rgb: 248, 249, 250;
    --bs - heading - color: #fff;
    --bs - link - color: #2a9fd6;
    --bs - link - color - rgb: 42, 159, 214;
    --bs - link - decoration: underline;
    --bs - link - hover - color: #227fab;
    --bs - link - hover - color - rgb: 34, 127, 171;
    --bs - code - color: #e83e8c;
    --bs - highlight - color: #adafae;
    --bs - highlight - bg: #ffe7cc;
    --bs - border - width: 1px;
    --bs - border - style: solid;
    --bs - border - color: #dee2e6;
    --bs - border - color - translucent: rgba(0, 0, 0, 0.175);
    --bs - border - radius: 0.375rem;
    --bs - border - radius - sm: 0.25rem;
    --bs - border - radius - lg: 0.5rem;
    --bs - border - radius - xl: 1rem;
    --bs - border - radius - xxl: 2rem;
    --bs - border - radius - 2xl: var(--bs - border - radius - xxl);
    --bs - border - radius - pill: 50rem;
    --bs - box - shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --bs - box - shadow - sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --bs - box - shadow - lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    --bs - box - shadow - inset: inset 0 1px 2px rgba(0, 0, 0, 0.075);
    --bs - focus - ring - width: 0.25rem;
    --bs - focus - ring - opacity: 0.25;
    --bs - focus - ring - color: rgba(42, 159, 214, 0.25);
    --bs - form - valid - color: #77b300;
    --bs - form - valid - border - color: #77b300;
    --bs - form - invalid - color: #c00;
    --bs - form - invalid - border - color: #c00;
}

[data - bs - theme=dark] {
    color - scheme: dark;
    --bs - body - color: #dee2e6;
    --bs - body - color - rgb: 222, 226, 230;
    --bs - body - bg: #212529;
    --bs - body - bg - rgb: 33, 37, 41;
    --bs - emphasis - color: #fff;
    --bs - emphasis - color - rgb: 255, 255, 255;
    --bs - secondary - color: rgba(222, 226, 230, 0.75);
    --bs - secondary - color - rgb: 222, 226, 230;
    --bs - secondary - bg: #222;
    --bs - secondary - bg - rgb: 34, 34, 34;
    --bs - tertiary - color: rgba(222, 226, 230, 0.5);
    --bs - tertiary - color - rgb: 222, 226, 230;
    --bs - tertiary - bg: #222426;
    --bs - tertiary - bg - rgb: 34, 36, 38;
    --bs - primary - text - emphasis: #7fc5e6;
    --bs - secondary - text - emphasis: #999999;
    --bs - success - text - emphasis: #add166;
    --bs - info - text - emphasis: #c285e0;
    --bs - warning - text - emphasis: #ffb866;
    --bs - danger - text - emphasis: #e06666;
    --bs - light - text - emphasis: #f8f9fa;
    --bs - dark - text - emphasis: #dee2e6;
    --bs - primary - bg - subtle: #08202b;
    --bs - secondary - bg - subtle: #111111;
    --bs - success - bg - subtle: #182400;
    --bs - info - bg - subtle: #1f0a29;
    --bs - warning - bg - subtle: #331b00;
    --bs - danger - bg - subtle: #290000;
    --bs - light - bg - subtle: #222;
    --bs - dark - bg - subtle: #111111;
    --bs - primary - border - subtle: #195f80;
    --bs - secondary - border - subtle: #333333;
    --bs - success - border - subtle: #476b00;
    --bs - info - border - subtle: #5c1f7a;
    --bs - warning - border - subtle: #995200;
    --bs - danger - border - subtle: #7a0000;
    --bs - light - border - subtle: #282828;
    --bs - dark - border - subtle: #222;
    --bs - heading - color: inherit;
    --bs - link - color: #7fc5e6;
    --bs - link - hover - color: #99d1eb;
    --bs - link - color - rgb: 127, 197, 230;
    --bs - link - hover - color - rgb: 153, 209, 235;
    --bs - code - color: #f18bba;
    --bs - highlight - color: #dee2e6;
    --bs - highlight - bg: #663600;
    --bs - border - color: #282828;
    --bs - border - color - translucent: rgba(255, 255, 255, 0.15);
    --bs - form - valid - color: #add166;
    --bs - form - valid - border - color: #add166;
    --bs - form - invalid - color: #e06666;
    --bs - form - invalid - border - color: #e06666;
}

*,
*:: before,
*:: after {
    box - sizing: border - box;
}

@media(prefers - reduced - motion: no - preference) {
  : root {
        scroll - behavior: smooth;
    }
}

body {
    margin: 0;
    font - family: var(--bs - body - font - family);
    font - size: var(--bs - body - font - size);
    font - weight: var(--bs - body - font - weight);
    line - height: var(--bs - body - line - height);
    color: var(--bs - body - color);
    text - align: var(--bs - body - text - align);
    background - color: var(--bs - body - bg);
    -webkit - text - size - adjust: 100 %;
    -webkit - tap - highlight - color: rgba(0, 0, 0, 0);
}

hr {
    margin: 1rem 0;
    color: inherit;
    border: 0;
    border - top: var(--bs - border - width) solid;
    opacity: 0.25;
}

h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
    margin - top: 0;
    margin - bottom: 0.5rem;
    font - weight: 500;
    line - height: 1.2;
    color: var(--bs - heading - color);
}

h1, .h1 {
    font - size: calc(1.525rem + 3.3vw);
}
@media(min - width: 1200px) {
    h1, .h1 {
        font - size: 4rem;
    }
}

h2, .h2 {
    font - size: calc(1.425rem + 2.1vw);
}
@media(min - width: 1200px) {
    h2, .h2 {
        font - size: 3rem;
    }
}

h3, .h3 {
    font - size: calc(1.375rem + 1.5vw);
}
@media(min - width: 1200px) {
    h3, .h3 {
        font - size: 2.5rem;
    }
}

h4, .h4 {
    font - size: calc(1.325rem + 0.9vw);
}
@media(min - width: 1200px) {
    h4, .h4 {
        font - size: 2rem;
    }
}

h5, .h5 {
    font - size: calc(1.275rem + 0.3vw);
}
@media(min - width: 1200px) {
    h5, .h5 {
        font - size: 1.5rem;
    }
}

h6, .h6 {
    font - size: 1rem;
}

p {
    margin - top: 0;
    margin - bottom: 1rem;
}

abbr[title] {
    -webkit - text - decoration: underline dotted;
    text - decoration: underline dotted;
    cursor: help;
    -webkit - text - decoration - skip - ink: none;
    text - decoration - skip - ink: none;
}

address {
    margin - bottom: 1rem;
    font - style: normal;
    line - height: inherit;
}

ol,
    ul {
    padding - right: 2rem;
}

ol,
    ul,
    dl {
    margin - top: 0;
    margin - bottom: 1rem;
}

ol ol,
    ul ul,
        ol ul,
            ul ol {
    margin - bottom: 0;
}

dt {
    font - weight: 700;
}

dd {
    margin - bottom: 0.5rem;
    margin - right: 0;
}

blockquote {
    margin: 0 0 1rem;
}

b,
    strong {
    font - weight: bolder;
}

small, .small {
    font - size: 0.875em;
}

mark, .mark {
    padding: 0.1875em;
    color: var(--bs - highlight - color);
    background - color: var(--bs - highlight - bg);
}

sub,
    sup {
    position: relative;
    font - size: 0.75em;
    line - height: 0;
    vertical - align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

a {
    color: rgba(var(--bs - link - color - rgb), var(--bs - link - opacity, 1));
    text - decoration: underline;
}
a: hover {
    --bs - link - color - rgb: var(--bs - link - hover - color - rgb);
}

a: not([href]): not([class]), a: not([href]): not([class]): hover {
    color: inherit;
    text - decoration: none;
}

pre,
    code,
    kbd,
    samp {
    font - family: var(--bs - font - monospace);
    font - size: 1em;
}

pre {
    display: block;
    margin - top: 0;
    margin - bottom: 1rem;
    overflow: auto;
    font - size: 0.875em;
    color: inherit;
}
pre code {
    font - size: inherit;
    color: inherit;
    word -break: normal;
}

code {
    font - size: 0.875em;
    color: var(--bs - code - color);
    word - wrap: break-word;
}
a > code {
    color: inherit;
}

kbd {
    padding: 0.1875rem 0.375rem;
    font - size: 0.875em;
    color: var(--bs - body - bg);
    background - color: var(--bs - body - color);
    border - radius: 0.25rem;
}
kbd kbd {
    padding: 0;
    font - size: 1em;
}

figure {
    margin: 0 0 1rem;
}

img,
    svg {
    vertical - align: middle;
}

table {
    caption - side: bottom;
    border - collapse: collapse;
}

caption {
    padding - top: 0.5rem;
    padding - bottom: 0.5rem;
    color: var(--bs - secondary - color);
    text - align: right;
}

th {
    text - align: inherit;
    text - align: -webkit - match - parent;
}

thead,
    tbody,
    tfoot,
    tr,
    td,
    th {
    border - color: inherit;
    border - style: solid;
    border - width: 0;
}

label {
    display: inline - block;
}

button {
    border - radius: 0;
}

button: focus: not(: focus - visible) {
    outline: 0;
}

input,
    button,
    select,
    optgroup,
    textarea {
    margin: 0;
    font - family: inherit;
    font - size: inherit;
    line - height: inherit;
}

button,
    select {
    text - transform: none;
}

[role = button] {
    cursor: pointer;
}

select {
    word - wrap: normal;
}
select: disabled {
    opacity: 1;
}

[list]: not([type = date]): not([type = datetime - local]): not([type = month]): not([type = week]): not([type = time]):: -webkit - calendar - picker - indicator {
    display: none!important;
}

button,
    [type = button],
    [type = reset],
    [type = submit] {
    -webkit - appearance: button;
}
button: not(: disabled),
    [type = button]: not(: disabled),
        [type = reset]: not(: disabled),
            [type = submit]: not(: disabled) {
    cursor: pointer;
}

:: -moz - focus - inner {
    padding: 0;
    border - style: none;
}

textarea {
    resize: vertical;
}

fieldset {
    min - width: 0;
    padding: 0;
    margin: 0;
    border: 0;
}

legend {
    float: right;
    width: 100 %;
    padding: 0;
    margin - bottom: 0.5rem;
    line - height: inherit;
    font - size: calc(1.275rem + 0.3vw);
}
@media(min - width: 1200px) {
    legend {
        font - size: 1.5rem;
    }
}
legend + * {
    clear: right;
}

:: -webkit - datetime - edit - fields - wrapper,
:: -webkit - datetime - edit - text,
:: -webkit - datetime - edit - minute,
:: -webkit - datetime - edit - hour - field,
:: -webkit - datetime - edit - day - field,
:: -webkit - datetime - edit - month - field,
:: -webkit - datetime - edit - year - field {
    padding: 0;
}

:: -webkit - inner - spin - button {
    height: auto;
}

[type = search] {
    -webkit - appearance: textfield;
    outline - offset: -2px;
}

[type = "tel"],
    [type = "url"],
    [type = "email"],
    [type = "number"] {
    direction: ltr;
}
:: -webkit - search - decoration {
    -webkit - appearance: none;
}

:: -webkit - color - swatch - wrapper {
    padding: 0;
}

:: -webkit - file - upload - button {
    font: inherit;
    -webkit - appearance: button;
}

:: file - selector - button {
    font: inherit;
    -webkit - appearance: button;
}

output {
    display: inline - block;
}

iframe {
    border: 0;
}

summary {
    display: list - item;
    cursor: pointer;
}

progress {
    vertical - align: baseline;
}

[hidden] {
    display: none!important;
}

.lead {
    font - size: 1.25rem;
    font - weight: 300;
}

.display - 1 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.625rem + 4.5vw);
}
@media(min - width: 1200px) {
  .display - 1 {
        font - size: 5rem;
    }
}

.display - 2 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.575rem + 3.9vw);
}
@media(min - width: 1200px) {
  .display - 2 {
        font - size: 4.5rem;
    }
}

.display - 3 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.525rem + 3.3vw);
}
@media(min - width: 1200px) {
  .display - 3 {
        font - size: 4rem;
    }
}

.display - 4 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.475rem + 2.7vw);
}
@media(min - width: 1200px) {
  .display - 4 {
        font - size: 3.5rem;
    }
}

.display - 5 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.425rem + 2.1vw);
}
@media(min - width: 1200px) {
  .display - 5 {
        font - size: 3rem;
    }
}

.display - 6 {
    font - weight: 300;
    line - height: 1.2;
    font - size: calc(1.375rem + 1.5vw);
}
@media(min - width: 1200px) {
  .display - 6 {
        font - size: 2.5rem;
    }
}

.list - unstyled {
    padding - right: 0;
    list - style: none;
}

.list - inline {
    padding - right: 0;
    list - style: none;
}

.list - inline - item {
    display: inline - block;
}
.list - inline - item: not(: last - child) {
    margin - left: 0.5rem;
}

.initialism {
    font - size: 0.875em;
    text - transform: uppercase;
}

.blockquote {
    margin - bottom: 1rem;
    font - size: 1.25rem;
}
.blockquote > : last - child {
    margin - bottom: 0;
}

.blockquote - footer {
    margin - top: -1rem;
    margin - bottom: 1rem;
    font - size: 0.875em;
    color: #555;
}
.blockquote - footer:: before {
    content: "— ";
}

.img - fluid {
    max - width: 100 %;
    height: auto;
}

.img - thumbnail {
    padding: 0.25rem;
    background - color: var(--bs - body - bg);
    border: var(--bs - border - width) solid var(--bs - border - color);
    border - radius: var(--bs - border - radius);
    max - width: 100 %;
    height: auto;
}

.figure {
    display: inline - block;
}

.figure - img {
    margin - bottom: 0.5rem;
    line - height: 1;
}

.figure - caption {
    font - size: 0.875em;
    color: var(--bs - secondary - color);
}

.container,
.container - fluid,
.container - xxl,
.container - xl,
.container - lg,
.container - md,
.container - sm {
    --bs - gutter - x: 1.5rem;
    --bs - gutter - y: 0;
    width: 100 %;
    padding - left: calc(var(--bs - gutter - x) * 0.5);
    padding - right: calc(var(--bs - gutter - x) * 0.5);
    margin - left: auto;
    margin - right: auto;
}

@media(min - width: 576px) {
  .container - sm, .container {
        max - width: 540px;
    }
}
@media(min - width: 768px) {
  .container - md, .container - sm, .container {
        max - width: 720px;
    }
}
@media(min - width: 992px) {
  .container - lg, .container - md, .container - sm, .container {
        max - width: 960px;
    }
}
@media(min - width: 1200px) {
  .container - xl, .container - lg, .container - md, .container - sm, .container {
        max - width: 1140px;
    }
}
@media(min - width: 1400px) {
  .container - xxl, .container - xl, .container - lg, .container - md, .container - sm, .container {
        max - width: 1320px;
    }
}
: root {
    --bs - breakpoint - xs: 0;
    --bs - breakpoint - sm: 576px;
    --bs - breakpoint - md: 768px;
    --bs - breakpoint - lg: 992px;
    --bs - breakpoint - xl: 1200px;
    --bs - breakpoint - xxl: 1400px;
}

.row {
    --bs - gutter - x: 1.5rem;
    --bs - gutter - y: 0;
    display: flex;
    flex - wrap: wrap;
    margin - top: calc(-1 * var(--bs - gutter - y));
    margin - left: calc(-0.5 * var(--bs - gutter - x));
    margin - right: calc(-0.5 * var(--bs - gutter - x));
}
.row > * {
    flex- shrink: 0;
width: 100 %;
max - width: 100 %;
padding - left: calc(var(--bs - gutter - x) * 0.5);
padding - right: calc(var(--bs - gutter - x) * 0.5);
margin - top: var(--bs - gutter - y);
}

.col {
    flex: 1 0 0;
}

.row - cols - auto > * {
    flex: 0 0 auto;
    width: auto;
}

    .row - cols - 1 > * {
        flex: 0 0 auto;
        width: 100 %;
    }

        .row - cols - 2 > * {
            flex: 0 0 auto;
            width: 50 %;
        }

            .row - cols - 3 > * {
                flex: 0 0 auto;
                width: 33.33333333 %;
            }

                .row - cols - 4 > * {
                    flex: 0 0 auto;
                    width: 25 %;
                }

                    .row - cols - 5 > * {
                        flex: 0 0 auto;
                        width: 20 %;
                    }

                        .row - cols - 6 > * {
                            flex: 0 0 auto;
                            width: 16.66666667 %;
                        }

                            .col - auto {
    flex: 0 0 auto;
    width: auto;
}

.col - 1 {
    flex: 0 0 auto;
    width: 8.33333333 %;
}

.col - 2 {
    flex: 0 0 auto;
    width: 16.66666667 %;
}

.col - 3 {
    flex: 0 0 auto;
    width: 25 %;
}

.col - 4 {
    flex: 0 0 auto;
    width: 33.33333333 %;
}

.col - 5 {
    flex: 0 0 auto;
    width: 41.66666667 %;
}

.col - 6 {
    flex: 0 0 auto;
    width: 50 %;
}

.col - 7 {
    flex: 0 0 auto;
    width: 58.33333333 %;
}

.col - 8 {
    flex: 0 0 auto;
    width: 66.66666667 %;
}

.col - 9 {
    flex: 0 0 auto;
    width: 75 %;
}

.col - 10 {
    flex: 0 0 auto;
    width: 83.33333333 %;
}

.col - 11 {
    flex: 0 0 auto;
    width: 91.66666667 %;
}

.col - 12 {
    flex: 0 0 auto;
    width: 100 %;
}

.offset - 1 {
    margin - right: 8.33333333 %;
}

.offset - 2 {
    margin - right: 16.66666667 %;
}

.offset - 3 {
    margin - right: 25 %;
}

.offset - 4 {
    margin - right: 33.33333333 %;
}

.offset - 5 {
    margin - right: 41.66666667 %;
}

.offset - 6 {
    margin - right: 50 %;
}

.offset - 7 {
    margin - right: 58.33333333 %;
}

.offset - 8 {
    margin - right: 66.66666667 %;
}

.offset - 9 {
    margin - right: 75 %;
}

.offset - 10 {
    margin - right: 83.33333333 %;
}

.offset - 11 {
    margin - right: 91.66666667 %;
}

.g - 0,
.gx - 0 {
    --bs - gutter - x: 0;
}

.g - 0,
.gy - 0 {
    --bs - gutter - y: 0;
}

.g - 1,
.gx - 1 {
    --bs - gutter - x: 0.25rem;
}

.g - 1,
.gy - 1 {
    --bs - gutter - y: 0.25rem;
}

.g - 2,
.gx - 2 {
    --bs - gutter - x: 0.5rem;
}

.g - 2,
.gy - 2 {
    --bs - gutter - y: 0.5rem;
}

.g - 3,
.gx - 3 {
    --bs - gutter - x: 1rem;
}

.g - 3,
.gy - 3 {
    --bs - gutter - y: 1rem;
}

.g - 4,
.gx - 4 {
    --bs - gutter - x: 1.5rem;
}

.g - 4,
.gy - 4 {
    --bs - gutter - y: 1.5rem;
}

.g - 5,
.gx - 5 {
    --bs - gutter - x: 3rem;
}

.g - 5,
.gy - 5 {
    --bs - gutter - y: 3rem;
}

@media(min - width: 576px) {
  .col - sm {
        flex: 1 0 0;
    }
  .row - cols - sm - auto > * {
        flex: 0 0 auto;
        width: auto;
    }
        .row - cols - sm - 1 > * {
            flex: 0 0 auto;
            width: 100 %;
        }
            .row - cols - sm - 2 > * {
                flex: 0 0 auto;
                width: 50 %;
            }
                .row - cols - sm - 3 > * {
                    flex: 0 0 auto;
                    width: 33.33333333 %;
                }
                    .row - cols - sm - 4 > * {
                        flex: 0 0 auto;
                        width: 25 %;
                    }
                        .row - cols - sm - 5 > * {
                            flex: 0 0 auto;
                            width: 20 %;
                        }
                            .row - cols - sm - 6 > * {
                                flex: 0 0 auto;
                                width: 16.66666667 %;
                            }
                                .col - sm - auto {
        flex: 0 0 auto;
        width: auto;
    }
  .col - sm - 1 {
        flex: 0 0 auto;
        width: 8.33333333 %;
    }
  .col - sm - 2 {
        flex: 0 0 auto;
        width: 16.66666667 %;
    }
  .col - sm - 3 {
        flex: 0 0 auto;
        width: 25 %;
    }
  .col - sm - 4 {
        flex: 0 0 auto;
        width: 33.33333333 %;
    }
  .col - sm - 5 {
        flex: 0 0 auto;
        width: 41.66666667 %;
    }
  .col - sm - 6 {
        flex: 0 0 auto;
        width: 50 %;
    }
  .col - sm - 7 {
        flex: 0 0 auto;
        width: 58.33333333 %;
    }
  .col - sm - 8 {
        flex: 0 0 auto;
        width: 66.66666667 %;
    }
  .col - sm - 9 {
        flex: 0 0 auto;
        width: 75 %;
    }
  .col - sm - 10 {
        flex: 0 0 auto;
        width: 83.33333333 %;
    }
  .col - sm - 11 {
        flex: 0 0 auto;
        width: 91.66666667 %;
    }
  .col - sm - 12 {
        flex: 0 0 auto;
        width: 100 %;
    }
  .offset - sm - 0 {
        margin - right: 0;
    }
  .offset - sm - 1 {
        margin - right: 8.33333333 %;
    }
  .offset - sm - 2 {
        margin - right: 16.66666667 %;
    }
  .offset - sm - 3 {
        margin - right: 25 %;
    }
  .offset - sm - 4 {
        margin - right: 33.33333333 %;
    }
  .offset - sm - 5 {
        margin - right: 41.66666667 %;
    }
  .offset - sm - 6 {
        margin - right: 50 %;
    }
  .offset - sm - 7 {
        margin - right: 58.33333333 %;
    }
  .offset - sm - 8 {
        margin - right: 66.66666667 %;
    }
  .offset - sm - 9 {
        margin - right: 75 %;
    }
  .offset - sm - 10 {
        margin - right: 83.33333333 %;
    }
  .offset - sm - 11 {
        margin - right: 91.66666667 %;
    }
  .g - sm - 0,
  .gx - sm - 0 {
        --bs - gutter - x: 0;
    }
  .g - sm - 0,
  .gy - sm - 0 {
        --bs - gutter - y: 0;
    }
  .g - sm - 1,
  .gx - sm - 1 {
        --bs - gutter - x: 0.25rem;
    }
  .g - sm - 1,
  .gy - sm - 1 {
        --bs - gutter - y: 0.25rem;
    }
  .g - sm - 2,
  .gx - sm - 2 {
        --bs - gutter - x: 0.5rem;
    }
  .g - sm - 2,
  .gy - sm - 2 {
        --bs - gutter - y: 0.5rem;
    }
  .g - sm - 3,
  .gx - sm - 3 {
        --bs - gutter - x: 1rem;
    }
  .g - sm - 3,
  .gy - sm - 3 {
        --bs - gutter - y: 1rem;
    }
  .g - sm - 4,
  .gx - sm - 4 {
        --bs - gutter - x: 1.5rem;
    }
  .g - sm - 4,
  .gy - sm - 4 {
        --bs - gutter - y: 1.5rem;
    }
  .g - sm - 5,
  .gx - sm - 5 {
        --bs - gutter - x: 3rem;
    }
  .g - sm - 5,
  .gy - sm - 5 {
        --bs - gutter - y: 3rem;
    }
}
@media(min - width: 768px) {
  .col - md {
        flex: 1 0 0;
    }
  .row - cols - md - auto > * {
        flex: 0 0 auto;
        width: auto;
    }
        .row - cols - md - 1 > * {
            flex: 0 0 auto;
            width: 100 %;
        }
            .row - cols - md - 2 > * {
                flex: 0 0 auto;
                width: 50 %;
            }
                .row - cols - md - 3 > * {
                    flex: 0 0 auto;
                    width: 33.33333333 %;
                }
                    .row - cols - md - 4 > * {
                        flex: 0 0 auto;
                        width: 25 %;
                    }
                        .row - cols - md - 5 > * {
                            flex: 0 0 auto;
                            width: 20 %;
                        }
                            .row - cols - md - 6 > * {
                                flex: 0 0 auto;
                                width: 16.66666667 %;
                            }
                                .col - md - auto {
        flex: 0 0 auto;
        width: auto;
    }
  .col - md - 1 {
        flex: 0 0 auto;
        width: 8.33333333 %;
    }
  .col - md - 2 {
        flex: 0 0 auto;
        width: 16.66666667 %;
    }
  .col - md - 3 {
        flex: 0 0 auto;
        width: 25 %;
    }
  .col - md - 4 {
        flex: 0 0 auto;
        width: 33.33333333 %;
    }
  .col - md - 5 {
        flex: 0 0 auto;
        width: 41.66666667 %;
    }
  .col - md - 6 {
        flex: 0 0 auto;
        width: 50 %;
    }
  .col - md - 7 {
        flex: 0 0 auto;
        width: 58.33333333 %;
    }
  .col - md - 8 {
        flex: 0 0 auto;
        width: 66.66666667 %;
    }
  .col - md - 9 {
        flex: 0 0 auto;
        width: 75 %;
    }
  .col - md - 10 {
        flex: 0 0 auto;
        width: 83.33333333 %;
    }
  .col - md - 11 {
        flex: 0 0 auto;
        width: 91.66666667 %;
    }
  .col - md - 12 {
        flex: 0 0 auto;
        width: 100 %;
    }
  .offset - md - 0 {
        margin - right: 0;
    }
  .offset - md - 1 {
        margin - right: 8.33333333 %;
    }
  .offset - md - 2 {
        margin - right: 16.66666667 %;
    }
  .offset - md - 3 {
        margin - right: 25 %;
    }
  .offset - md - 4 {
        margin - right: 33.33333333 %;
    }
  .offset - md - 5 {
        margin - right: 41.66666667 %;
    }
  .offset - md - 6 {
        margin - right: 50 %;
    }
  .offset - md - 7 {
        margin - right: 58.33333333 %;
    }
  .offset - md - 8 {
        margin - right: 66.66666667 %;
    }
  .offset - md - 9 {
        margin - right: 75 %;
    }
  .offset - md - 10 {
        margin - right: 83.33333333 %;
    }
  .offset - md - 11 {
        margin - right: 91.66666667 %;
    }
  .g - md - 0,
  .gx - md - 0 {
        --bs - gutter - x: 0;
    }
  .g - md - 0,
  .gy - md - 0 {
        --bs - gutter - y: 0;
    }
  .g - md - 1,
  .gx - md - 1 {
        --bs - gutter - x: 0.25rem;
    }
  .g - md - 1,
  .gy - md - 1 {
        --bs - gutter - y: 0.25rem;
    }
  .g - md - 2,
  .gx - md - 2 {
        --bs - gutter - x: 0.5rem;
    }
  .g - md - 2,
  .gy - md - 2 {
        --bs - gutter - y: 0.5rem;
    }
  .g - md - 3,
  .gx - md - 3 {
        --bs - gutter - x: 1rem;
    }
  .g - md - 3,
  .gy - md - 3 {
        --bs - gutter - y: 1rem;
    }
  .g - md - 4,
  .gx - md - 4 {
        --bs - gutter - x: 1.5rem;
    }
  .g - md - 4,
  .gy - md - 4 {
        --bs - gutter - y: 1.5rem;
    }
  .g - md - 5,
  .gx - md - 5 {
        --bs - gutter - x: 3rem;
    }
  .g - md - 5,
  .gy - md - 5 {
        --bs - gutter - y: 3rem;
    }
}
@media(min - width: 992px) {
  .col - lg {
        flex: 1 0 0;
    }
  .row - cols - lg - auto > * {
        flex: 0 0 auto;
        width: auto;
    }
        .row - cols - lg - 1 > * {
            flex: 0 0 auto;
            width: 100 %;
        }
            .row - cols - lg - 2 > * {
                flex: 0 0 auto;
                width: 50 %;
            }
                .row - cols - lg - 3 > * {
                    flex: 0 0 auto;
                    width: 33.33333333 %;
                }
                    .row - cols - lg - 4 > * {
                        flex: 0 0 auto;
                        width: 25 %;
                    }
                        .row - cols - lg - 5 > * {
                            flex: 0 0 auto;
                            width: 20 %;
                        }
                            .row - cols - lg - 6 > * {
                                flex: 0 0 auto;
                                width: 16.66666667 %;
                            }
                                .col - lg - auto {
        flex: 0 0 auto;
        width: auto;
    }
  .col - lg - 1 {
        flex: 0 0 auto;
        width: 8.33333333 %;
    }
  .col - lg - 2 {
        flex: 0 0 auto;
        width: 16.66666667 %;
    }
  .col - lg - 3 {
        flex: 0 0 auto;
        width: 25 %;
    }
  .col - lg - 4 {
        flex: 0 0 auto;
        width: 33.33333333 %;
    }
  .col - lg - 5 {
        flex: 0 0 auto;
        width: 41.66666667 %;
    }
  .col - lg - 6 {
        flex: 0 0 auto;
        width: 50 %;
    }
  .col - lg - 7 {
        flex: 0 0 auto;
        width: 58.33333333 %;
    }
  .col - lg - 8 {
        flex: 0 0 auto;
        width: 66.66666667 %;
    }
  .col - lg - 9 {
        flex: 0 0 auto;
        width: 75 %;
    }
  .col - lg - 10 {
        flex: 0 0 auto;
        width: 83.33333333 %;
    }
  .col - lg - 11 {
        flex: 0 0 auto;
        width: 91.66666667 %;
    }
  .col - lg - 12 {
        flex: 0 0 auto;
        width: 100 %;
    }
  .offset - lg - 0 {
        margin - right: 0;
    }
  .offset - lg - 1 {
        margin - right: 8.33333333 %;
    }
  .offset - lg - 2 {
        margin - right: 16.66666667 %;
    }
  .offset - lg - 3 {
        margin - right: 25 %;
    }
  .offset - lg - 4 {
        margin - right: 33.33333333 %;
    }
  .offset - lg - 5 {
        margin - right: 41.66666667 %;
    }
  .offset - lg - 6 {
        margin - right: 50 %;
    }
  .offset - lg - 7 {
        margin - right: 58.33333333 %;
    }
  .offset - lg - 8 {
        margin - right: 66.66666667 %;
    }
  .offset - lg - 9 {
        margin - right: 75 %;
    }
  .offset - lg - 10 {
        margin - right: 83.33333333 %;
    }
  .offset - lg - 11 {
        margin - right: 91.66666667 %;
    }
  .g - lg - 0,
  .gx - lg - 0 {
        --bs - gutter - x: 0;
    }
  .g - lg - 0,
  .gy - lg - 0 {
        --bs - gutter - y: 0;
    }
  .g - lg - 1,
  .gx - lg - 1 {
        --bs - gutter - x: 0.25rem;
    }
  .g - lg - 1,
  .gy - lg - 1 {
        --bs - gutter - y: 0.25rem;
    }
  .g - lg - 2,
  .gx - lg - 2 {
        --bs - gutter - x: 0.5rem;
    }
  .g - lg - 2,
  .gy - lg - 2 {
        --bs - gutter - y: 0.5rem;
    }
  .g - lg - 3,
  .gx - lg - 3 {
        --bs - gutter - x: 1rem;
    }
  .g - lg - 3,
  .gy - lg - 3 {
        --bs - gutter - y: 1rem;
    }
  .g - lg - 4,
  .gx - lg - 4 {
        --bs - gutter - x: 1.5rem;
    }
  .g - lg - 4,
  .gy - lg - 4 {
        --bs - gutter - y: 1.5rem;
    }
  .g - lg - 5,
  .gx - lg - 5 {
        --bs - gutter - x: 3rem;
    }
  .g - lg - 5,
  .gy - lg - 5 {
        --bs - gutter - y: 3rem;
    }
}
@media(min - width: 1200px) {
  .col - xl {
        flex: 1 0 0;
    }
  .row - cols - xl - auto > * {
        flex: 0 0 auto;
        width: auto;
    }
        .row - cols - xl - 1 > * {
            flex: 0 0 auto;
            width: 100 %;
        }
            .row - cols - xl - 2 > * {
                flex: 0 0 auto;
                width: 50 %;
            }
                .row - cols - xl - 3 > * {
                    flex: 0 0 auto;
                    width: 33.33333333 %;
                }
                    .row - cols - xl - 4 > * {
                        flex: 0 0 auto;
                        width: 25 %;
                    }
                        .row - cols - xl - 5 > * {
                            flex: 0 0 auto;
                            width: 20 %;
                        }
                            .row - cols - xl - 6 > * {
                                flex: 0 0 auto;
                                width: 16.66666667 %;
                            }
                                .col - xl - auto {
        flex: 0 0 auto;
        width: auto;
    }
  .col - xl - 1 {
        flex: 0 0 auto;
        width: 8.33333333 %;
    }
  .col - xl - 2 {
        flex: 0 0 auto;
        width: 16.66666667 %;
    }
  .col - xl - 3 {
        flex: 0 0 auto;
        width: 25 %;
    }
  .col - xl - 4 {
        flex: 0 0 auto;
        width: 33.33333333 %;
    }
  .col - xl - 5 {
        flex: 0 0 auto;
        width: 41.66666667 %;
    }
  .col - xl - 6 {
        flex: 0 0 auto;
        width: 50 %;
    }
  .col - xl - 7 {
        flex: 0 0 auto;
        width: 58.33333333 %;
    }
  .col - xl - 8 {
        flex: 0 0 auto;
        width: 66.66666667 %;
    }
  .col - xl - 9 {
        flex: 0 0 auto;
        width: 75 %;
    }
  .col - xl - 10 {
        flex: 0 0 auto;
        width: 83.33333333 %;
    }
  .col - xl - 11 {
        flex: 0 0 auto;
        width: 91.66666667 %;
    }
  .col - xl - 12 {
        flex: 0 0 auto;
        width: 100 %;
    }
  .offset - xl - 0 {
        margin - right: 0;
    }
  .offset - xl - 1 {
        margin - right: 8.33333333 %;
    }
  .offset - xl - 2 {
        margin - right: 16.66666667 %;
    }
  .offset - xl - 3 {
        margin - right: 25 %;
    }
  .offset - xl - 4 {
        margin - right: 33.33333333 %;
    }
  .offset - xl - 5 {
        margin - right: 41.66666667 %;
    }
  .offset - xl - 6 {
        margin - right: 50 %;
    }
  .offset - xl - 7 {
        margin - right: 58.33333333 %;
    }
  .offset - xl - 8 {
        margin - right: 66.66666667 %;
    }
  .offset - xl - 9 {
        margin - right: 75 %;
    }
  .offset - xl - 10 {
        margin - right: 83.33333333 %;
    }
  .offset - xl - 11 {
        margin - right: 91.66666667 %;
    }
  .g - xl - 0,
  .gx - xl - 0 {
        --bs - gutter - x: 0;
    }
  .g - xl - 0,
  .gy - xl - 0 {
        --bs - gutter - y: 0;
    }
  .g - xl - 1,
  .gx - xl - 1 {
        --bs - gutter - x: 0.25rem;
    }
  .g - xl - 1,
  .gy - xl - 1 {
        --bs - gutter - y: 0.25rem;
    }
  .g - xl - 2,
  .gx - xl - 2 {
        --bs - gutter - x: 0.5rem;
    }
  .g - xl - 2,
  .gy - xl - 2 {
        --bs - gutter - y: 0.5rem;
    }
  .g - xl - 3,
  .gx - xl - 3 {
        --bs - gutter - x: 1rem;
    }
  .g - xl - 3,
  .gy - xl - 3 {
        --bs - gutter - y: 1rem;
    }
  .g - xl - 4,
  .gx - xl - 4 {
        --bs - gutter - x: 1.5rem;
    }
  .g - xl - 4,
  .gy - xl - 4 {
        --bs - gutter - y: 1.5rem;
    }
  .g - xl - 5,
  .gx - xl - 5 {
        --bs - gutter - x: 3rem;
    }
  .g - xl - 5,
  .gy - xl - 5 {
        --bs - gutter - y: 3rem;
    }
}
@media(min - width: 1400px) {
  .col - xxl {
        flex: 1 0 0;
    }
  .row - cols - xxl - auto > * {
        flex: 0 0 auto;
        width: auto;
    }
        .row - cols - xxl - 1 > * {
            flex: 0 0 auto;
            width: 100 %;
        }
            .row - cols - xxl - 2 > * {
                flex: 0 0 auto;
                width: 50 %;
            }
                .row - cols - xxl - 3 > * {
                    flex: 0 0 auto;
                    width: 33.33333333 %;
                }
                    .row - cols - xxl - 4 > * {
                        flex: 0 0 auto;
                        width: 25 %;
                    }
                        .row - cols - xxl - 5 > * {
                            flex: 0 0 auto;
                            width: 20 %;
                        }
                            .row - cols - xxl - 6 > * {
                                flex: 0 0 auto;
                                width: 16.66666667 %;
                            }
                                .col - xxl - auto {
        flex: 0 0 auto;
        width: auto;
    }
  .col - xxl - 1 {
        flex: 0 0 auto;
        width: 8.33333333 %;
    }
  .col - xxl - 2 {
        flex: 0 0 auto;
        width: 16.66666667 %;
    }
  .col - xxl - 3 {
        flex: 0 0 auto;
        width: 25 %;
    }
  .col - xxl - 4 {
        flex: 0 0 auto;
        width: 33.33333333 %;
    }
  .col - xxl - 5 {
        flex: 0 0 auto;
        width: 41.66666667 %;
    }
  .col - xxl - 6 {
        flex: 0 0 auto;
        width: 50 %;
    }
  .col - xxl - 7 {
        flex: 0 0 auto;
        width: 58.33333333 %;
    }
  .col - xxl - 8 {
        flex: 0 0 auto;
        width: 66.66666667 %;
    }
  .col - xxl - 9 {
        flex: 0 0 auto;
        width: 75 %;
    }
  .col - xxl - 10 {
        flex: 0 0 auto;
        width: 83.33333333 %;
    }
  .col - xxl - 11 {
        flex: 0 0 auto;
        width: 91.66666667 %;
    }
  .col - xxl - 12 {
        flex: 0 0 auto;
        width: 100 %;
    }
  .offset - xxl - 0 {
        margin - right: 0;
    }
  .offset - xxl - 1 {
        margin - right: 8.33333333 %;
    }
  .offset - xxl - 2 {
        margin - right: 16.66666667 %;
    }
  .offset - xxl - 3 {
        margin - right: 25 %;
    }
  .offset - xxl - 4 {
        margin - right: 33.33333333 %;
    }
  .offset - xxl - 5 {
        margin - right: 41.66666667 %;
    }
  .offset - xxl - 6 {
        margin - right: 50 %;
    }
  .offset - xxl - 7 {
        margin - right: 58.33333333 %;
    }
  .offset - xxl - 8 {
        margin - right: 66.66666667 %;
    }
  .offset - xxl - 9 {
        margin - right: 75 %;
    }
  .offset - xxl - 10 {
        margin - right: 83.33333333 %;
    }
  .offset - xxl - 11 {
        margin - right: 91.66666667 %;
    }
  .g - xxl - 0,
  .gx - xxl - 0 {
        --bs - gutter - x: 0;
    }
  .g - xxl - 0,
  .gy - xxl - 0 {
        --bs - gutter - y: 0;
    }
  .g - xxl - 1,
  .gx - xxl - 1 {
        --bs - gutter - x: 0.25rem;
    }
  .g - xxl - 1,
  .gy - xxl - 1 {
        --bs - gutter - y: 0.25rem;
    }
  .g - xxl - 2,
  .gx - xxl - 2 {
        --bs - gutter - x: 0.5rem;
    }
  .g - xxl - 2,
  .gy - xxl - 2 {
        --bs - gutter - y: 0.5rem;
    }
  .g - xxl - 3,
  .gx - xxl - 3 {
        --bs - gutter - x: 1rem;
    }
  .g - xxl - 3,
  .gy - xxl - 3 {
        --bs - gutter - y: 1rem;
    }
  .g - xxl - 4,
  .gx - xxl - 4 {
        --bs - gutter - x: 1.5rem;
    }
  .g - xxl - 4,
  .gy - xxl - 4 {
        --bs - gutter - y: 1.5rem;
    }
  .g - xxl - 5,
  .gx - xxl - 5 {
        --bs - gutter - x: 3rem;
    }
  .g - xxl - 5,
  .gy - xxl - 5 {
        --bs - gutter - y: 3rem;
    }
}
.table {
    --bs - table - color - type: initial;
    --bs - table - bg - type: initial;
    --bs - table - color - state: initial;
    --bs - table - bg - state: initial;
    --bs - table - color: initial;
    --bs - table - bg: var(--bs - body - bg);
    --bs - table - border - color: #282828;
    --bs - table - accent - bg: rgba(255, 255, 255, 0.05);
    --bs - table - striped - color: initial;
    --bs - table - striped - bg: rgba(var(--bs - emphasis - color - rgb), 0.05);
    --bs - table - active - color: initial;
    --bs - table - active - bg: rgba(var(--bs - emphasis - color - rgb), 0.1);
    --bs - table - hover - color: initial;
    --bs - table - hover - bg: rgba(255, 255, 255, 0.075);
    width: 100 %;
    margin - bottom: 1rem;
    vertical - align: top;
    border - color: var(--bs - table - border - color);
}
.table > : not(caption) > * > * {
    padding: 0.5rem 0.5rem;
    color: var(--bs - table - color - state, var(--bs - table - color - type, var(--bs - table - color)));
background - color: var(--bs - table - bg);
border - bottom - width: var(--bs - border - width);
box - shadow: inset 0 0 0 9999px var(--bs - table - bg - state, var(--bs - table - bg - type, var(--bs - table - accent - bg)));
}
.table > tbody {
    vertical - align: inherit;
}
.table > thead {
    vertical - align: bottom;
}

.table - group - divider {
    border - top: calc(var(--bs - border - width) * 2) solid currentcolor;
}

.caption - top {
    caption - side: top;
}

.table - sm > : not(caption) > * > * {
    padding: 0.25rem 0.25rem;
}

    .table - bordered > : not(caption) > * {
        border- width: var(--bs - border - width) 0;
}
.table - bordered > : not(caption) > * > * {
    border- width: 0 var(--bs - border - width);
}

.table - borderless > : not(caption) > * > * {
    border- bottom - width: 0;
}
.table - borderless > : not(: first - child) {
    border - top - width: 0;
}

.table - striped > tbody > tr: nth - of - type(odd) > * {
  --bs - table - color - type: var(--bs - table - striped - color);
--bs - table - bg - type: var(--bs - table - striped - bg);
}

.table - striped - columns > : not(caption) > tr > : nth - child(even) {
    --bs - table - color - type: var(--bs - table - striped - color);
    --bs - table - bg - type: var(--bs - table - striped - bg);
}

.table - active {
    --bs - table - color - state: var(--bs - table - active - color);
    --bs - table - bg - state: var(--bs - table - active - bg);
}

.table - hover > tbody > tr: hover > * {
  --bs - table - color - state: var(--bs - table - hover - color);
--bs - table - bg - state: var(--bs - table - hover - bg);
}

.table - primary {
    --bs - table - color: #fff;
    --bs - table - bg: #2a9fd6;
    --bs - table - border - color: #55b2de;
    --bs - table - striped - bg: #35a4d8;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #3fa9da;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #3aa6d9;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - secondary {
    --bs - table - color: #fff;
    --bs - table - bg: #555555;
    --bs - table - border - color: #777777;
    --bs - table - striped - bg: #5e5e5e;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #666666;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #626262;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - success {
    --bs - table - color: #fff;
    --bs - table - bg: #77b300;
    --bs - table - border - color: #92c233;
    --bs - table - striped - bg: #7eb70d;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #85bb1a;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #81b913;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - info {
    --bs - table - color: #fff;
    --bs - table - bg: #9933cc;
    --bs - table - border - color: #ad5cd6;
    --bs - table - striped - bg: #9e3dcf;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #a347d1;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #a142d0;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - warning {
    --bs - table - color: #fff;
    --bs - table - bg: #ff8800;
    --bs - table - border - color: #ffa033;
    --bs - table - striped - bg: #ff8e0d;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #ff941a;
    --bs - table - active - color: #000;
    --bs - table - hover - bg: #ff9113;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - danger {
    --bs - table - color: #fff;
    --bs - table - bg: #cc0000;
    --bs - table - border - color: #d63333;
    --bs - table - striped - bg: #cf0d0d;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #d11a1a;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #d01313;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - light {
    --bs - table - color: #fff;
    --bs - table - bg: #222;
    --bs - table - border - color: #4e4e4e;
    --bs - table - striped - bg: #2d2d2d;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #383838;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #333333;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - dark {
    --bs - table - color: #000;
    --bs - table - bg: #adafae;
    --bs - table - border - color: #8a8c8b;
    --bs - table - striped - bg: #a4a6a5;
    --bs - table - striped - color: #fff;
    --bs - table - active - bg: #9c9e9d;
    --bs - table - active - color: #fff;
    --bs - table - hover - bg: #a0a2a1;
    --bs - table - hover - color: #fff;
    color: var(--bs - table - color);
    border - color: var(--bs - table - border - color);
}

.table - responsive {
    overflow - x: auto;
    -webkit - overflow - scrolling: touch;
}

@media(max - width: 575.98px) {
  .table - responsive - sm {
        overflow - x: auto;
        -webkit - overflow - scrolling: touch;
    }
}
@media(max - width: 767.98px) {
  .table - responsive - md {
        overflow - x: auto;
        -webkit - overflow - scrolling: touch;
    }
}
@media(max - width: 991.98px) {
  .table - responsive - lg {
        overflow - x: auto;
        -webkit - overflow - scrolling: touch;
    }
}
@media(max - width: 1199.98px) {
  .table - responsive - xl {
        overflow - x: auto;
        -webkit - overflow - scrolling: touch;
    }
}
@media(max - width: 1399.98px) {
  .table - responsive - xxl {
        overflow - x: auto;
        -webkit - overflow - scrolling: touch;
    }
}
.form - label {
    margin - bottom: 0.5rem;
}

.col - form - label {
    padding - top: calc(0.375rem + 0px);
    padding - bottom: calc(0.375rem + 0px);
    margin - bottom: 0;
    font - size: inherit;
    line - height: 1.5;
}

.col - form - label - lg {
    padding - top: calc(0.5rem + 0px);
    padding - bottom: calc(0.5rem + 0px);
    font - size: 1.25rem;
}

.col - form - label - sm {
    padding - top: calc(0.25rem + 0px);
    padding - bottom: calc(0.25rem + 0px);
    font - size: 0.875rem;
}

.form - text {
    margin - top: 0.25rem;
    font - size: 0.875em;
    color: var(--bs - secondary - color);
}

.form - control {
    display: block;
    width: 100 %;
    padding: 0.375rem 1rem;
    font - size: 1rem;
    font - weight: 400;
    line - height: 1.5;
    color: #212529;
    -webkit - appearance: none;
    -moz - appearance: none;
    appearance: none;
    background - color: #fff;
    background - clip: padding - box;
    border: 0px solid #fff;
    border - radius: var(--bs - border - radius);
    transition: border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - control {
        transition: none;
    }
}
.form - control[type = file] {
    overflow: hidden;
}
.form - control[type = file]: not(: disabled): not([readonly]) {
    cursor: pointer;
}
.form - control: focus {
    color: #212529;
    background - color: #fff;
    border - color: #95cfeb;
    outline: 0;
    box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.form - control:: -webkit - date - and - time - value {
    min - width: 85px;
    height: 1.5em;
    margin: 0;
}
.form - control:: -webkit - datetime - edit {
    display: block;
    padding: 0;
}
.form - control:: -moz - placeholder {
    color: var(--bs - secondary - color);
    opacity: 1;
}
.form - control:: placeholder {
    color: var(--bs - secondary - color);
    opacity: 1;
}
.form - control: disabled {
    background - color: #adafae;
    opacity: 1;
}
.form - control:: -webkit - file - upload - button {
    padding: 0.375rem 1rem;
    margin: -0.375rem - 1rem;
    -webkit - margin - end: 1rem;
    margin - inline - end: 1rem;
    color: #fff;
    background - color: #282828;
    pointer - events: none;
    border - color: inherit;
    border - style: solid;
    border - width: 0;
    border - inline - end - width: 0px;
    border - radius: 0;
    -webkit - transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
    transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
.form - control:: file - selector - button {
    padding: 0.375rem 1rem;
    margin: -0.375rem - 1rem;
    -webkit - margin - end: 1rem;
    margin - inline - end: 1rem;
    color: #fff;
    background - color: #282828;
    pointer - events: none;
    border - color: inherit;
    border - style: solid;
    border - width: 0;
    border - inline - end - width: 0px;
    border - radius: 0;
    transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - control:: -webkit - file - upload - button {
        -webkit - transition: none;
        transition: none;
    }
  .form - control:: file - selector - button {
        transition: none;
    }
}
.form - control: hover: not(: disabled): not([readonly]):: -webkit - file - upload - button {
    background - color: #232323;
}
.form - control: hover: not(: disabled): not([readonly]):: file - selector - button {
    background - color: #232323;
}

.form - control - plaintext {
    display: block;
    width: 100 %;
    padding: 0.375rem 0;
    margin - bottom: 0;
    line - height: 1.5;
    color: var(--bs - body - color);
    background - color: transparent;
    border: solid transparent;
    border - width: 0px 0;
}
.form - control - plaintext: focus {
    outline: 0;
}
.form - control - plaintext.form - control - sm, .form - control - plaintext.form - control - lg {
    padding - left: 0;
    padding - right: 0;
}

.form - control - sm {
    min - height: calc(1.5em + 0.5rem + calc(0px * 2));
    padding: 0.25rem 0.5rem;
    font - size: 0.875rem;
    border - radius: var(--bs - border - radius - sm);
}
.form - control - sm:: -webkit - file - upload - button {
    padding: 0.25rem 0.5rem;
    margin: -0.25rem - 0.5rem;
    -webkit - margin - end: 0.5rem;
    margin - inline - end: 0.5rem;
}
.form - control - sm:: file - selector - button {
    padding: 0.25rem 0.5rem;
    margin: -0.25rem - 0.5rem;
    -webkit - margin - end: 0.5rem;
    margin - inline - end: 0.5rem;
}

.form - control - lg {
    min - height: calc(1.5em + 1rem + calc(0px * 2));
    padding: 0.5rem 1rem;
    font - size: 1.25rem;
    border - radius: var(--bs - border - radius - lg);
}
.form - control - lg:: -webkit - file - upload - button {
    padding: 0.5rem 1rem;
    margin: -0.5rem - 1rem;
    -webkit - margin - end: 1rem;
    margin - inline - end: 1rem;
}
.form - control - lg:: file - selector - button {
    padding: 0.5rem 1rem;
    margin: -0.5rem - 1rem;
    -webkit - margin - end: 1rem;
    margin - inline - end: 1rem;
}

textarea.form - control {
    min - height: calc(1.5em + 0.75rem + calc(0px * 2));
}
textarea.form - control - sm {
    min - height: calc(1.5em + 0.5rem + calc(0px * 2));
}
textarea.form - control - lg {
    min - height: calc(1.5em + 1rem + calc(0px * 2));
}

.form - control - color {
    width: 3rem;
    height: calc(1.5em + 0.75rem + calc(0px * 2));
    padding: 0.375rem;
}
.form - control - color: not(: disabled): not([readonly]) {
    cursor: pointer;
}
.form - control - color:: -moz - color - swatch {
    border: 0!important;
    border - radius: var(--bs - border - radius);
}
.form - control - color:: -webkit - color - swatch {
    border: 0!important;
    border - radius: var(--bs - border - radius);
}
.form - control - color.form - control - sm {
    height: calc(1.5em + 0.5rem + calc(0px * 2));
}
.form - control - color.form - control - lg {
    height: calc(1.5em + 1rem + calc(0px * 2));
}

.form - select {
    --bs - form - select - bg - img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23222' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    display: block;
    width: 100 %;
    padding: 0.375rem 1rem 0.375rem 3rem;
    font - size: 1rem;
    font - weight: 400;
    line - height: 1.5;
    color: #212529;
    -webkit - appearance: none;
    -moz - appearance: none;
    appearance: none;
    background - color: #fff;
    background - image: var(--bs - form - select - bg - img), var(--bs - form - select - bg - icon, none);
    background - repeat: no - repeat;
    background - position: left 1rem center;
    background - size: 16px 12px;
    border: 0px solid #fff;
    border - radius: var(--bs - border - radius);
    transition: border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - select {
        transition: none;
    }
}
.form - select: focus {
    border - color: #95cfeb;
    outline: 0;
    box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.form - select[multiple], .form - select[size]: not([size = "1"]) {
    padding - left: 1rem;
    background - image: none;
}
.form - select: disabled {
    background - color: #adafae;
}
.form - select: -moz - focusring {
    color: transparent;
    text - shadow: 0 0 0 #212529;
}

.form - select - sm {
    padding - top: 0.25rem;
    padding - bottom: 0.25rem;
    padding - right: 0.5rem;
    font - size: 0.875rem;
    border - radius: var(--bs - border - radius - sm);
}

.form - select - lg {
    padding - top: 0.5rem;
    padding - bottom: 0.5rem;
    padding - right: 1rem;
    font - size: 1.25rem;
    border - radius: var(--bs - border - radius - lg);
}

[data - bs - theme=dark].form - select {
    --bs - form - select - bg - img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23dee2e6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}

.form - check {
    display: block;
    min - height: 1.5rem;
    padding - right: 1.5em;
    margin - bottom: 0.125rem;
}
.form - check.form - check - input {
    float: right;
    margin - right: -1.5em;
}

.form - check - reverse {
    padding - left: 1.5em;
    padding - right: 0;
    text - align: left;
}
.form - check - reverse.form - check - input {
    float: left;
    margin - left: -1.5em;
    margin - right: 0;
}

.form - check - input {
    --bs - form - check - bg: #fff;
    flex - shrink: 0;
    width: 1em;
    height: 1em;
    margin - top: 0.25em;
    vertical - align: top;
    -webkit - appearance: none;
    -moz - appearance: none;
    appearance: none;
    background - color: var(--bs - form - check - bg);
    background - image: var(--bs - form - check - bg - image);
    background - repeat: no - repeat;
    background - position: center;
    background - size: contain;
    border: none;
    -webkit - print - color - adjust: exact;
    color - adjust: exact;
    print - color - adjust: exact;
}
.form - check - input[type = checkbox] {
    border - radius: 0.25em;
}
.form - check - input[type = radio] {
    border - radius: 50 %;
}
.form - check - input: active {
    filter: brightness(90 %);
}
.form - check - input: focus {
    border - color: #95cfeb;
    outline: 0;
    box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.form - check - input: checked {
    background - color: #2a9fd6;
    border - color: #2a9fd6;
}
.form - check - input: checked[type = checkbox] {
    --bs - form - check - bg - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
}
.form - check - input: checked[type = radio] {
    --bs - form - check - bg - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.form - check - input[type = checkbox]: indeterminate {
    background - color: #2a9fd6;
    border - color: #2a9fd6;
    --bs - form - check - bg - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
.form - check - input: disabled {
    pointer - events: none;
    filter: none;
    opacity: 0.5;
}
.form - check - input[disabled] ~ .form - check - label, .form - check - input: disabled ~ .form - check - label {
    cursor: default ;
    opacity: 0.5;
}

.form -switch {
    padding- right: 2.5em;
}
.form -switch .form - check - input {
  --bs - form -switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
width: 2em;
margin - right: -2.5em;
background - image: var(--bs - form -switch-bg);
  background - position: right center;
border - radius: 2em;
transition: background - position 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form -switch .form - check - input {
    transition: none;
}
}
.form -switch .form - check - input:focus {
    --bs - form -switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2395cfeb'/%3e%3c/svg%3e");
}
.form -switch .form - check - input:checked {
    background - position: left center;
    --bs - form -switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form -switch.form - check - reverse {
  padding - left: 2.5em;
padding - right: 0;
}
.form -switch.form - check - reverse.form - check - input {
  margin - left: -2.5em;
margin - right: 0;
}

.form - check - inline {
    display: inline - block;
    margin - left: 1rem;
}

.btn - check {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer - events: none;
}
.btn - check[disabled] + .btn, .btn - check: disabled + .btn {
    pointer - events: none;
    filter: none;
    opacity: 0.65;
}

[data - bs - theme=dark].form -switch .form - check - input:not(: checked): not(: focus) {
    --bs - form -switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e");
}

.form - range {
    width: 100 %;
    height: 1.5rem;
    padding: 0;
    -webkit - appearance: none;
    -moz - appearance: none;
    appearance: none;
    background - color: transparent;
}
.form - range: focus {
    outline: 0;
}
.form - range: focus:: -webkit - slider - thumb {
    box - shadow: 0 0 0 1px #060606, 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.form - range: focus:: -moz - range - thumb {
    box - shadow: 0 0 0 1px #060606, 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.form - range:: -moz - focus - outer {
    border: 0;
}
.form - range:: -webkit - slider - thumb {
    width: 1rem;
    height: 1rem;
    margin - top: -0.25rem;
    -webkit - appearance: none;
    appearance: none;
    background - color: #2a9fd6;
    border: 0;
    border - radius: 1rem;
    -webkit - transition: background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
    transition: background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - range:: -webkit - slider - thumb {
        -webkit - transition: none;
        transition: none;
    }
}
.form - range:: -webkit - slider - thumb: active {
    background - color: #bfe2f3;
}
.form - range:: -webkit - slider - runnable - track {
    width: 100 %;
    height: 0.5rem;
    color: transparent;
    cursor: pointer;
    background - color: var(--bs - secondary - bg);
    border - color: transparent;
    border - radius: 1rem;
}
.form - range:: -moz - range - thumb {
    width: 1rem;
    height: 1rem;
    -moz - appearance: none;
    appearance: none;
    background - color: #2a9fd6;
    border: 0;
    border - radius: 1rem;
    -moz - transition: background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
    transition: background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - range:: -moz - range - thumb {
        -moz - transition: none;
        transition: none;
    }
}
.form - range:: -moz - range - thumb: active {
    background - color: #bfe2f3;
}
.form - range:: -moz - range - track {
    width: 100 %;
    height: 0.5rem;
    color: transparent;
    cursor: pointer;
    background - color: var(--bs - secondary - bg);
    border - color: transparent;
    border - radius: 1rem;
}
.form - range: disabled {
    pointer - events: none;
}
.form - range: disabled:: -webkit - slider - thumb {
    background - color: var(--bs - secondary - color);
}
.form - range: disabled:: -moz - range - thumb {
    background - color: var(--bs - secondary - color);
}

.form - floating {
    position: relative;
}
.form - floating > .form - control,
.form - floating > .form - control - plaintext,
.form - floating > .form - select {
    height: calc(3.5rem + calc(0px * 2));
    min - height: calc(3.5rem + calc(0px * 2));
    line - height: 1.25;
}
.form - floating > label {
    position: absolute;
    top: 0;
    right: 0;
    z - index: 2;
    max - width: 100 %;
    height: 100 %;
    padding: 1rem 1rem;
    overflow: hidden;
    color: rgba(var(--bs - body - color - rgb), 0.65);
    text - align: start;
    text - overflow: ellipsis;
    white - space: nowrap;
    pointer - events: none;
    border: 0px solid transparent;
    transform - origin: 100 % 0;
    transition: opacity 0.1s ease -in -out, transform 0.1s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .form - floating > label {
        transition: none;
    }
}
.form - floating > .form - control,
.form - floating > .form - control - plaintext {
    padding: 1rem 1rem;
}
.form - floating > .form - control:: -moz - placeholder, .form - floating > .form - control - plaintext:: -moz - placeholder {
    color: transparent;
}
.form - floating > .form - control:: placeholder,
.form - floating > .form - control - plaintext:: placeholder {
    color: transparent;
}
.form - floating > .form - control: not(: -moz - placeholder - shown), .form - floating > .form - control - plaintext: not(: -moz - placeholder - shown) {
    padding - top: 1.625rem;
    padding - bottom: 0.625rem;
}
.form - floating > .form - control: focus, .form - floating > .form - control: not(: placeholder - shown),
.form - floating > .form - control - plaintext: focus,
.form - floating > .form - control - plaintext: not(: placeholder - shown) {
    padding - top: 1.625rem;
    padding - bottom: 0.625rem;
}
.form - floating > .form - control: -webkit - autofill,
.form - floating > .form - control - plaintext: -webkit - autofill {
    padding - top: 1.625rem;
    padding - bottom: 0.625rem;
}
.form - floating > .form - select {
    padding - top: 1.625rem;
    padding - bottom: 0.625rem;
    padding - right: 1rem;
}
.form - floating > .form - control: not(: -moz - placeholder - shown) ~label {
    transform: scale(0.85) translateY(-0.5rem) translateX(-0.15rem);
}
.form - floating > .form - control: focus ~label,
.form - floating > .form - control: not(: placeholder - shown) ~label,
.form - floating > .form - control - plaintext ~label,
.form - floating > .form - select ~label {
    transform: scale(0.85) translateY(-0.5rem) translateX(-0.15rem);
}
.form - floating > .form - control: -webkit - autofill ~label {
    transform: scale(0.85) translateY(-0.5rem) translateX(-0.15rem);
}
.form - floating > textarea: not(: -moz - placeholder - shown) ~label:: after {
    position: absolute;
    inset: 1rem 0.5rem;
    z - index: -1;
    height: 1.5em;
    content: "";
    background - color: #fff;
    border - radius: var(--bs - border - radius);
}
.form - floating > textarea: focus ~label:: after,
.form - floating > textarea: not(: placeholder - shown) ~label:: after {
    position: absolute;
    inset: 1rem 0.5rem;
    z - index: -1;
    height: 1.5em;
    content: "";
    background - color: #fff;
    border - radius: var(--bs - border - radius);
}
.form - floating > textarea: disabled ~label:: after {
    background - color: #adafae;
}
.form - floating > .form - control - plaintext ~label {
    border - width: 0px 0;
}
.form - floating > : disabled ~label,
.form - floating > .form - control: disabled ~label {
    color: #555;
}

.input - group {
    position: relative;
    display: flex;
    flex - wrap: wrap;
    align - items: stretch;
    width: 100 %;
}
.input - group > .form - control,
.input - group > .form - select,
.input - group > .form - floating {
    position: relative;
    flex: 1 1 auto;
    width: 1 %;
    min - width: 0;
}
.input - group > .form - control: focus,
.input - group > .form - select: focus,
.input - group > .form - floating: focus - within {
    z - index: 5;
}
.input - group.btn {
    position: relative;
    z - index: 2;
}
.input - group.btn: focus {
    z - index: 5;
}

.input - group - text {
    display: flex;
    align - items: center;
    padding: 0.375rem 1rem;
    font - size: 1rem;
    font - weight: 400;
    line - height: 1.5;
    color: #fff;
    text - align: center;
    white - space: nowrap;
    background - color: #282828;
    border: 0px solid transparent;
    border - radius: var(--bs - border - radius);
}

.input - group - lg > .form - control,
.input - group - lg > .form - select,
.input - group - lg > .input - group - text,
.input - group - lg > .btn {
    padding: 0.5rem 1rem;
    font - size: 1.25rem;
    border - radius: var(--bs - border - radius - lg);
}

.input - group - sm > .form - control,
.input - group - sm > .form - select,
.input - group - sm > .input - group - text,
.input - group - sm > .btn {
    padding: 0.25rem 0.5rem;
    font - size: 0.875rem;
    border - radius: var(--bs - border - radius - sm);
}

.input - group - lg > .form - select,
.input - group - sm > .form - select {
    padding - left: 4rem;
}

.input - group: not(.has - validation) > : not(: last - child): not(.dropdown - toggle): not(.dropdown - menu): not(.form - floating),
.input - group: not(.has - validation) > .dropdown - toggle: nth - last - child(n + 3),
.input - group: not(.has - validation) > .form - floating: not(: last - child) > .form - control,
.input - group: not(.has - validation) > .form - floating: not(: last - child) > .form - select {
    border - top - left - radius: 0;
    border - bottom - left - radius: 0;
}
.input - group.has - validation > : nth - last - child(n + 3): not(.dropdown - toggle): not(.dropdown - menu): not(.form - floating),
.input - group.has - validation > .dropdown - toggle: nth - last - child(n + 4),
.input - group.has - validation > .form - floating: nth - last - child(n + 3) > .form - control,
.input - group.has - validation > .form - floating: nth - last - child(n + 3) > .form - select {
    border - top - left - radius: 0;
    border - bottom - left - radius: 0;
}
.input - group > : not(: first - child): not(.dropdown - menu): not(.valid - tooltip): not(.valid - feedback): not(.invalid - tooltip): not(.invalid - feedback) {
    margin - right: calc(-1 * 0px);
    border - top - right - radius: 0;
    border - bottom - right - radius: 0;
}
.input - group > .form - floating: not(: first - child) > .form - control,
.input - group > .form - floating: not(: first - child) > .form - select {
    border - top - right - radius: 0;
    border - bottom - right - radius: 0;
}

.valid - feedback {
    display: none;
    width: 100 %;
    margin - top: 0.25rem;
    font - size: 0.875em;
    color: var(--bs - form - valid - color);
}

.valid - tooltip {
    position: absolute;
    top: 100 %;
    z - index: 5;
    display: none;
    max - width: 100 %;
    padding: 0.25rem 0.5rem;
    margin - top: 0.1rem;
    font - size: 0.875rem;
    color: #fff;
    background - color: var(--bs - success);
    border - radius: var(--bs - border - radius);
}

.was - validated : valid ~ .valid - feedback,
.was - validated : valid ~ .valid - tooltip,
.is - valid ~ .valid - feedback,
.is - valid ~ .valid - tooltip {
    display: block;
}

.was - validated.form - control: valid, .form - control.is - valid {
    border - color: var(--bs - form - valid - border - color);
    padding - left: calc(1.5em + 0.75rem);
    background - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2377b300' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e");
    background - repeat: no - repeat;
    background - position: left calc(0.375em + 0.1875rem) center;
    background - size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was - validated.form - control: valid: focus, .form - control.is - valid: focus {
    border - color: var(--bs - form - valid - border - color);
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - success - rgb), 0.25);
}

.was - validated textarea.form - control: valid, textarea.form - control.is - valid {
    padding - left: calc(1.5em + 0.75rem);
    background - position: top calc(0.375em + 0.1875rem) left calc(0.375em + 0.1875rem);
}

.was - validated.form - select: valid, .form - select.is - valid {
    border - color: var(--bs - form - valid - border - color);
}
.was - validated.form - select: valid: not([multiple]): not([size]), .was - validated.form - select: valid: not([multiple])[size = "1"], .form - select.is - valid: not([multiple]): not([size]), .form - select.is - valid: not([multiple])[size = "1"] {
    --bs - form - select - bg - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2377b300' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1'/%3e%3c/svg%3e");
    padding - left: 5.5rem;
    background - position: left 1rem center, center left 3rem;
    background - size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was - validated.form - select: valid: focus, .form - select.is - valid: focus {
    border - color: var(--bs - form - valid - border - color);
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - success - rgb), 0.25);
}

.was - validated.form - control - color: valid, .form - control - color.is - valid {
    width: calc(3rem + calc(1.5em + 0.75rem));
}

.was - validated.form - check - input: valid, .form - check - input.is - valid {
    border - color: var(--bs - form - valid - border - color);
}
.was - validated.form - check - input: valid: checked, .form - check - input.is - valid: checked {
    background - color: var(--bs - form - valid - color);
}
.was - validated.form - check - input: valid: focus, .form - check - input.is - valid: focus {
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - success - rgb), 0.25);
}
.was - validated.form - check - input: valid ~ .form - check - label, .form - check - input.is - valid ~ .form - check - label {
    color: var(--bs - form - valid - color);
}

.form - check - inline.form - check - input ~ .valid - feedback {
    margin - right: 0.5em;
}

.was - validated.input - group > .form - control: not(: focus): valid, .input - group > .form - control: not(: focus).is - valid,
.was - validated.input - group > .form - select: not(: focus): valid,
.input - group > .form - select: not(: focus).is - valid,
.was - validated.input - group > .form - floating: not(: focus - within): valid,
.input - group > .form - floating: not(: focus - within).is - valid {
    z - index: 3;
}

.invalid - feedback {
    display: none;
    width: 100 %;
    margin - top: 0.25rem;
    font - size: 0.875em;
    color: var(--bs - form - invalid - color);
}

.invalid - tooltip {
    position: absolute;
    top: 100 %;
    z - index: 5;
    display: none;
    max - width: 100 %;
    padding: 0.25rem 0.5rem;
    margin - top: 0.1rem;
    font - size: 0.875rem;
    color: #fff;
    background - color: var(--bs - danger);
    border - radius: var(--bs - border - radius);
}

.was - validated : invalid ~ .invalid - feedback,
.was - validated : invalid ~ .invalid - tooltip,
.is - invalid ~ .invalid - feedback,
.is - invalid ~ .invalid - tooltip {
    display: block;
}

.was - validated.form - control: invalid, .form - control.is - invalid {
    border - color: var(--bs - form - invalid - border - color);
    padding - left: calc(1.5em + 0.75rem);
    background - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23c00'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23c00' stroke='none'/%3e%3c/svg%3e");
    background - repeat: no - repeat;
    background - position: left calc(0.375em + 0.1875rem) center;
    background - size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was - validated.form - control: invalid: focus, .form - control.is - invalid: focus {
    border - color: var(--bs - form - invalid - border - color);
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - danger - rgb), 0.25);
}

.was - validated textarea.form - control: invalid, textarea.form - control.is - invalid {
    padding - left: calc(1.5em + 0.75rem);
    background - position: top calc(0.375em + 0.1875rem) left calc(0.375em + 0.1875rem);
}

.was - validated.form - select: invalid, .form - select.is - invalid {
    border - color: var(--bs - form - invalid - border - color);
}
.was - validated.form - select: invalid: not([multiple]): not([size]), .was - validated.form - select: invalid: not([multiple])[size = "1"], .form - select.is - invalid: not([multiple]): not([size]), .form - select.is - invalid: not([multiple])[size = "1"] {
    --bs - form - select - bg - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23c00'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23c00' stroke='none'/%3e%3c/svg%3e");
    padding - left: 5.5rem;
    background - position: left 1rem center, center left 3rem;
    background - size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.was - validated.form - select: invalid: focus, .form - select.is - invalid: focus {
    border - color: var(--bs - form - invalid - border - color);
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - danger - rgb), 0.25);
}

.was - validated.form - control - color: invalid, .form - control - color.is - invalid {
    width: calc(3rem + calc(1.5em + 0.75rem));
}

.was - validated.form - check - input: invalid, .form - check - input.is - invalid {
    border - color: var(--bs - form - invalid - border - color);
}
.was - validated.form - check - input: invalid: checked, .form - check - input.is - invalid: checked {
    background - color: var(--bs - form - invalid - color);
}
.was - validated.form - check - input: invalid: focus, .form - check - input.is - invalid: focus {
    box - shadow: 0 0 0 0.25rem rgba(var(--bs - danger - rgb), 0.25);
}
.was - validated.form - check - input: invalid ~ .form - check - label, .form - check - input.is - invalid ~ .form - check - label {
    color: var(--bs - form - invalid - color);
}

.form - check - inline.form - check - input ~ .invalid - feedback {
    margin - right: 0.5em;
}

.was - validated.input - group > .form - control: not(: focus): invalid, .input - group > .form - control: not(: focus).is - invalid,
.was - validated.input - group > .form - select: not(: focus): invalid,
.input - group > .form - select: not(: focus).is - invalid,
.was - validated.input - group > .form - floating: not(: focus - within): invalid,
.input - group > .form - floating: not(: focus - within).is - invalid {
    z - index: 4;
}

.btn {
    --bs - btn - padding - x: 1rem;
    --bs - btn - padding - y: 0.375rem;
    --bs - btn - font - family: ;
    --bs - btn - font - size: 1rem;
    --bs - btn - font - weight: 400;
    --bs - btn - line - height: 1.5;
    --bs - btn - color: var(--bs - body - color);
    --bs - btn - bg: transparent;
    --bs - btn - border - width: var(--bs - border - width);
    --bs - btn - border - color: transparent;
    --bs - btn - border - radius: var(--bs - border - radius);
    --bs - btn - hover - border - color: transparent;
    --bs - btn - box - shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
    --bs - btn - disabled - opacity: 0.65;
    --bs - btn - focus - box - shadow: 0 0 0 0.25rem rgba(var(--bs - btn - focus - shadow - rgb), .5);
    display: inline - block;
    padding: var(--bs - btn - padding - y) var(--bs - btn - padding - x);
    font - family: var(--bs - btn - font - family);
    font - size: var(--bs - btn - font - size);
    font - weight: var(--bs - btn - font - weight);
    line - height: var(--bs - btn - line - height);
    color: var(--bs - btn - color);
    text - align: center;
    text - decoration: none;
    vertical - align: middle;
    cursor: pointer;
    -webkit - user - select: none;
    -moz - user - select: none;
    user - select: none;
    border: var(--bs - btn - border - width) solid var(--bs - btn - border - color);
    border - radius: var(--bs - btn - border - radius);
    background - color: var(--bs - btn - bg);
    transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .btn {
        transition: none;
    }
}
.btn: hover {
    color: var(--bs - btn - hover - color);
    background - color: var(--bs - btn - hover - bg);
    border - color: var(--bs - btn - hover - border - color);
}
.btn - check + .btn: hover {
    color: var(--bs - btn - color);
    background - color: var(--bs - btn - bg);
    border - color: var(--bs - btn - border - color);
}
.btn: focus - visible {
    color: var(--bs - btn - hover - color);
    background - color: var(--bs - btn - hover - bg);
    border - color: var(--bs - btn - hover - border - color);
    outline: 0;
    box - shadow: var(--bs - btn - focus - box - shadow);
}
.btn - check: focus - visible + .btn {
    border - color: var(--bs - btn - hover - border - color);
    outline: 0;
    box - shadow: var(--bs - btn - focus - box - shadow);
}
.btn - check: checked + .btn, : not(.btn - check) + .btn: active, .btn: first - child: active, .btn.active, .btn.show {
    color: var(--bs - btn - active - color);
    background - color: var(--bs - btn - active - bg);
    border - color: var(--bs - btn - active - border - color);
}
.btn - check: checked + .btn: focus - visible, : not(.btn - check) + .btn: active: focus - visible, .btn: first - child: active: focus - visible, .btn.active: focus - visible, .btn.show: focus - visible {
    box - shadow: var(--bs - btn - focus - box - shadow);
}
.btn - check: checked: focus - visible + .btn {
    box - shadow: var(--bs - btn - focus - box - shadow);
}
.btn: disabled, .btn.disabled, fieldset: disabled.btn {
    color: var(--bs - btn - disabled - color);
    pointer - events: none;
    background - color: var(--bs - btn - disabled - bg);
    border - color: var(--bs - btn - disabled - border - color);
    opacity: var(--bs - btn - disabled - opacity);
}

.btn - primary {
    --bs - btn - color: #fff;
    --bs - btn - bg: #2a9fd6;
    --bs - btn - border - color: #2a9fd6;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #2487b6;
    --bs - btn - hover - border - color: #227fab;
    --bs - btn - focus - shadow - rgb: 74, 173, 220;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #227fab;
    --bs - btn - active - border - color: #2077a1;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #2a9fd6;
    --bs - btn - disabled - border - color: #2a9fd6;
}

.btn - secondary {
    --bs - btn - color: #fff;
    --bs - btn - bg: #555;
    --bs - btn - border - color: #555;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #484848;
    --bs - btn - hover - border - color: #444444;
    --bs - btn - focus - shadow - rgb: 111, 111, 111;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #444444;
    --bs - btn - active - border - color: #404040;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #555;
    --bs - btn - disabled - border - color: #555;
}

.btn - success {
    --bs - btn - color: #fff;
    --bs - btn - bg: #77b300;
    --bs - btn - border - color: #77b300;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #659800;
    --bs - btn - hover - border - color: #5f8f00;
    --bs - btn - focus - shadow - rgb: 139, 190, 38;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #5f8f00;
    --bs - btn - active - border - color: #598600;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #77b300;
    --bs - btn - disabled - border - color: #77b300;
}

.btn - info {
    --bs - btn - color: #fff;
    --bs - btn - bg: #93c;
    --bs - btn - border - color: #93c;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #822bad;
    --bs - btn - hover - border - color: #7a29a3;
    --bs - btn - focus - shadow - rgb: 168, 82, 212;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #7a29a3;
    --bs - btn - active - border - color: #732699;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #93c;
    --bs - btn - disabled - border - color: #93c;
}

.btn - warning {
    --bs - btn - color: #fff;
    --bs - btn - bg: #f80;
    --bs - btn - border - color: #f80;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #d97400;
    --bs - btn - hover - border - color: #cc6d00;
    --bs - btn - focus - shadow - rgb: 255, 154, 38;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #cc6d00;
    --bs - btn - active - border - color: #bf6600;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #f80;
    --bs - btn - disabled - border - color: #f80;
}

.btn - danger {
    --bs - btn - color: #fff;
    --bs - btn - bg: #c00;
    --bs - btn - border - color: #c00;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #ad0000;
    --bs - btn - hover - border - color: #a30000;
    --bs - btn - focus - shadow - rgb: 212, 38, 38;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #a30000;
    --bs - btn - active - border - color: #990000;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #c00;
    --bs - btn - disabled - border - color: #c00;
}

.btn - light {
    --bs - btn - color: #fff;
    --bs - btn - bg: #222;
    --bs - btn - border - color: #222;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #1d1d1d;
    --bs - btn - hover - border - color: #1b1b1b;
    --bs - btn - focus - shadow - rgb: 67, 67, 67;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #1b1b1b;
    --bs - btn - active - border - color: #1a1a1a;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #fff;
    --bs - btn - disabled - bg: #222;
    --bs - btn - disabled - border - color: #222;
}

.btn - dark {
    --bs - btn - color: #000;
    --bs - btn - bg: #adafae;
    --bs - btn - border - color: #adafae;
    --bs - btn - hover - color: #000;
    --bs - btn - hover - bg: #b9bbba;
    --bs - btn - hover - border - color: #b5b7b6;
    --bs - btn - focus - shadow - rgb: 147, 149, 148;
    --bs - btn - active - color: #000;
    --bs - btn - active - bg: #bdbfbe;
    --bs - btn - active - border - color: #b5b7b6;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #000;
    --bs - btn - disabled - bg: #adafae;
    --bs - btn - disabled - border - color: #adafae;
}

.btn - outline - primary {
    --bs - btn - color: #2a9fd6;
    --bs - btn - border - color: #2a9fd6;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #2a9fd6;
    --bs - btn - hover - border - color: #2a9fd6;
    --bs - btn - focus - shadow - rgb: 42, 159, 214;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #2a9fd6;
    --bs - btn - active - border - color: #2a9fd6;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #2a9fd6;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #2a9fd6;
    --bs - gradient: none;
}

.btn - outline - secondary {
    --bs - btn - color: #555;
    --bs - btn - border - color: #555;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #555;
    --bs - btn - hover - border - color: #555;
    --bs - btn - focus - shadow - rgb: 85, 85, 85;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #555;
    --bs - btn - active - border - color: #555;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #555;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #555;
    --bs - gradient: none;
}

.btn - outline - success {
    --bs - btn - color: #77b300;
    --bs - btn - border - color: #77b300;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #77b300;
    --bs - btn - hover - border - color: #77b300;
    --bs - btn - focus - shadow - rgb: 119, 179, 0;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #77b300;
    --bs - btn - active - border - color: #77b300;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #77b300;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #77b300;
    --bs - gradient: none;
}

.btn - outline - info {
    --bs - btn - color: #93c;
    --bs - btn - border - color: #93c;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #93c;
    --bs - btn - hover - border - color: #93c;
    --bs - btn - focus - shadow - rgb: 153, 51, 204;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #93c;
    --bs - btn - active - border - color: #93c;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #93c;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #93c;
    --bs - gradient: none;
}

.btn - outline - warning {
    --bs - btn - color: #f80;
    --bs - btn - border - color: #f80;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #f80;
    --bs - btn - hover - border - color: #f80;
    --bs - btn - focus - shadow - rgb: 255, 136, 0;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #f80;
    --bs - btn - active - border - color: #f80;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #f80;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #f80;
    --bs - gradient: none;
}

.btn - outline - danger {
    --bs - btn - color: #c00;
    --bs - btn - border - color: #c00;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #c00;
    --bs - btn - hover - border - color: #c00;
    --bs - btn - focus - shadow - rgb: 204, 0, 0;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #c00;
    --bs - btn - active - border - color: #c00;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #c00;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #c00;
    --bs - gradient: none;
}

.btn - outline - light {
    --bs - btn - color: #222;
    --bs - btn - border - color: #222;
    --bs - btn - hover - color: #fff;
    --bs - btn - hover - bg: #222;
    --bs - btn - hover - border - color: #222;
    --bs - btn - focus - shadow - rgb: 34, 34, 34;
    --bs - btn - active - color: #fff;
    --bs - btn - active - bg: #222;
    --bs - btn - active - border - color: #222;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #222;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #222;
    --bs - gradient: none;
}

.btn - outline - dark {
    --bs - btn - color: #adafae;
    --bs - btn - border - color: #adafae;
    --bs - btn - hover - color: #000;
    --bs - btn - hover - bg: #adafae;
    --bs - btn - hover - border - color: #adafae;
    --bs - btn - focus - shadow - rgb: 173, 175, 174;
    --bs - btn - active - color: #000;
    --bs - btn - active - bg: #adafae;
    --bs - btn - active - border - color: #adafae;
    --bs - btn - active - shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs - btn - disabled - color: #adafae;
    --bs - btn - disabled - bg: transparent;
    --bs - btn - disabled - border - color: #adafae;
    --bs - gradient: none;
}

.btn - link {
    --bs - btn - font - weight: 400;
    --bs - btn - color: var(--bs - link - color);
    --bs - btn - bg: transparent;
    --bs - btn - border - color: transparent;
    --bs - btn - hover - color: var(--bs - link - hover - color);
    --bs - btn - hover - border - color: transparent;
    --bs - btn - active - color: var(--bs - link - hover - color);
    --bs - btn - active - border - color: transparent;
    --bs - btn - disabled - color: #555;
    --bs - btn - disabled - border - color: transparent;
    --bs - btn - box - shadow: 0 0 0 #000;
    --bs - btn - focus - shadow - rgb: 74, 173, 220;
    text - decoration: underline;
}
.btn - link: focus - visible {
    color: var(--bs - btn - color);
}
.btn - link: hover {
    color: var(--bs - btn - hover - color);
}

.btn - lg, .btn - group - lg > .btn {
    --bs - btn - padding - y: 0.5rem;
    --bs - btn - padding - x: 1rem;
    --bs - btn - font - size: 1.25rem;
    --bs - btn - border - radius: var(--bs - border - radius - lg);
}

.btn - sm, .btn - group - sm > .btn {
    --bs - btn - padding - y: 0.25rem;
    --bs - btn - padding - x: 0.5rem;
    --bs - btn - font - size: 0.875rem;
    --bs - btn - border - radius: var(--bs - border - radius - sm);
}

.fade {
    transition: opacity 0.15s linear;
}
@media(prefers - reduced - motion: reduce) {
  .fade {
        transition: none;
    }
}
.fade: not(.show) {
    opacity: 0;
}

.collapse: not(.show) {
    display: none;
}

.collapsing {
    height: 0;
    overflow: hidden;
    transition: height 0.35s ease;
}
@media(prefers - reduced - motion: reduce) {
  .collapsing {
        transition: none;
    }
}
.collapsing.collapse - horizontal {
    width: 0;
    height: auto;
    transition: width 0.35s ease;
}
@media(prefers - reduced - motion: reduce) {
  .collapsing.collapse - horizontal {
        transition: none;
    }
}

.dropup,
.dropend,
.dropdown,
.dropstart,
.dropup - center,
.dropdown - center {
    position: relative;
}

.dropdown - toggle {
    white - space: nowrap;
}
.dropdown - toggle:: after {
    display: inline - block;
    margin - right: 0.255em;
    vertical - align: 0.255em;
    content: "";
    border - top: 0.3em solid;
    border - left: 0.3em solid transparent;
    border - bottom: 0;
    border - right: 0.3em solid transparent;
}
.dropdown - toggle: empty:: after {
    margin - right: 0;
}

.dropdown - menu {
    --bs - dropdown - zindex: 1000;
    --bs - dropdown - min - width: 10rem;
    --bs - dropdown - padding - x: 0;
    --bs - dropdown - padding - y: 0.5rem;
    --bs - dropdown - spacer: 0.125rem;
    --bs - dropdown - font - size: 1rem;
    --bs - dropdown - color: var(--bs - body - color);
    --bs - dropdown - bg: #282828;
    --bs - dropdown - border - color: var(--bs - border - color - translucent);
    --bs - dropdown - border - radius: var(--bs - border - radius);
    --bs - dropdown - border - width: var(--bs - border - width);
    --bs - dropdown - inner - border - radius: calc(var(--bs - border - radius) - var(--bs - border - width));
    --bs - dropdown - divider - bg: #222;
    --bs - dropdown - divider - margin - y: 0.5rem;
    --bs - dropdown - box - shadow: var(--bs - box - shadow);
    --bs - dropdown - link - color: #fff;
    --bs - dropdown - link - hover - color: #fff;
    --bs - dropdown - link - hover - bg: #2a9fd6;
    --bs - dropdown - link - active - color: #fff;
    --bs - dropdown - link - active - bg: #2a9fd6;
    --bs - dropdown - link - disabled - color: var(--bs - tertiary - color);
    --bs - dropdown - item - padding - x: 1rem;
    --bs - dropdown - item - padding - y: 0.25rem;
    --bs - dropdown - header - color: #555;
    --bs - dropdown - header - padding - x: 1rem;
    --bs - dropdown - header - padding - y: 0.5rem;
    position: absolute;
    z - index: var(--bs - dropdown - zindex);
    display: none;
    min - width: var(--bs - dropdown - min - width);
    padding: var(--bs - dropdown - padding - y) var(--bs - dropdown - padding - x);
    margin: 0;
    font - size: var(--bs - dropdown - font - size);
    color: var(--bs - dropdown - color);
    text - align: right;
    list - style: none;
    background - color: var(--bs - dropdown - bg);
    background - clip: padding - box;
    border: var(--bs - dropdown - border - width) solid var(--bs - dropdown - border - color);
    border - radius: var(--bs - dropdown - border - radius);
}
.dropdown - menu[data - bs - popper] {
    top: 100 %;
    right: 0;
    margin - top: var(--bs - dropdown - spacer);
}

.dropdown - menu - start {
    --bs - position: start;
}
.dropdown - menu - start[data - bs - popper] {
    left: auto;
    right: 0;
}

.dropdown - menu - end {
    --bs - position: end;
}
.dropdown - menu - end[data - bs - popper] {
    left: 0;
    right: auto;
}

@media(min - width: 576px) {
  .dropdown - menu - sm - start {
        --bs - position: start;
    }
  .dropdown - menu - sm - start[data - bs - popper] {
        left: auto;
        right: 0;
    }
  .dropdown - menu - sm - end {
        --bs - position: end;
    }
  .dropdown - menu - sm - end[data - bs - popper] {
        left: 0;
        right: auto;
    }
}
@media(min - width: 768px) {
  .dropdown - menu - md - start {
        --bs - position: start;
    }
  .dropdown - menu - md - start[data - bs - popper] {
        left: auto;
        right: 0;
    }
  .dropdown - menu - md - end {
        --bs - position: end;
    }
  .dropdown - menu - md - end[data - bs - popper] {
        left: 0;
        right: auto;
    }
}
@media(min - width: 992px) {
  .dropdown - menu - lg - start {
        --bs - position: start;
    }
  .dropdown - menu - lg - start[data - bs - popper] {
        left: auto;
        right: 0;
    }
  .dropdown - menu - lg - end {
        --bs - position: end;
    }
  .dropdown - menu - lg - end[data - bs - popper] {
        left: 0;
        right: auto;
    }
}
@media(min - width: 1200px) {
  .dropdown - menu - xl - start {
        --bs - position: start;
    }
  .dropdown - menu - xl - start[data - bs - popper] {
        left: auto;
        right: 0;
    }
  .dropdown - menu - xl - end {
        --bs - position: end;
    }
  .dropdown - menu - xl - end[data - bs - popper] {
        left: 0;
        right: auto;
    }
}
@media(min - width: 1400px) {
  .dropdown - menu - xxl - start {
        --bs - position: start;
    }
  .dropdown - menu - xxl - start[data - bs - popper] {
        left: auto;
        right: 0;
    }
  .dropdown - menu - xxl - end {
        --bs - position: end;
    }
  .dropdown - menu - xxl - end[data - bs - popper] {
        left: 0;
        right: auto;
    }
}
.dropup.dropdown - menu[data - bs - popper] {
    top: auto;
    bottom: 100 %;
    margin - top: 0;
    margin - bottom: var(--bs - dropdown - spacer);
}
.dropup.dropdown - toggle:: after {
    display: inline - block;
    margin - right: 0.255em;
    vertical - align: 0.255em;
    content: "";
    border - top: 0;
    border - left: 0.3em solid transparent;
    border - bottom: 0.3em solid;
    border - right: 0.3em solid transparent;
}
.dropup.dropdown - toggle: empty:: after {
    margin - right: 0;
}

.dropend.dropdown - menu[data - bs - popper] {
    top: 0;
    left: auto;
    right: 100 %;
    margin - top: 0;
    margin - right: var(--bs - dropdown - spacer);
}
.dropend.dropdown - toggle:: after {
    display: inline - block;
    margin - right: 0.255em;
    vertical - align: 0.255em;
    content: "";
    border - top: 0.3em solid transparent;
    border - left: 0;
    border - bottom: 0.3em solid transparent;
    border - right: 0.3em solid;
}
.dropend.dropdown - toggle: empty:: after {
    margin - right: 0;
}
.dropend.dropdown - toggle:: after {
    vertical - align: 0;
}

.dropstart.dropdown - menu[data - bs - popper] {
    top: 0;
    left: 100 %;
    right: auto;
    margin - top: 0;
    margin - left: var(--bs - dropdown - spacer);
}
.dropstart.dropdown - toggle:: after {
    display: inline - block;
    margin - right: 0.255em;
    vertical - align: 0.255em;
    content: "";
}
.dropstart.dropdown - toggle:: after {
    display: none;
}
.dropstart.dropdown - toggle:: before {
    display: inline - block;
    margin - left: 0.255em;
    vertical - align: 0.255em;
    content: "";
    border - top: 0.3em solid transparent;
    border - left: 0.3em solid;
    border - bottom: 0.3em solid transparent;
}
.dropstart.dropdown - toggle: empty:: after {
    margin - right: 0;
}
.dropstart.dropdown - toggle:: before {
    vertical - align: 0;
}

.dropdown - divider {
    height: 0;
    margin: var(--bs - dropdown - divider - margin - y) 0;
    overflow: hidden;
    border - top: 1px solid var(--bs - dropdown - divider - bg);
    opacity: 1;
}

.dropdown - item {
    display: block;
    width: 100 %;
    padding: var(--bs - dropdown - item - padding - y) var(--bs - dropdown - item - padding - x);
    clear: both;
    font - weight: 400;
    color: var(--bs - dropdown - link - color);
    text - align: inherit;
    text - decoration: none;
    white - space: nowrap;
    background - color: transparent;
    border: 0;
    border - radius: var(--bs - dropdown - item - border - radius, 0);
}
.dropdown - item: hover, .dropdown - item: focus {
    color: var(--bs - dropdown - link - hover - color);
    background - color: var(--bs - dropdown - link - hover - bg);
}
.dropdown - item.active, .dropdown - item: active {
    color: var(--bs - dropdown - link - active - color);
    text - decoration: none;
    background - color: var(--bs - dropdown - link - active - bg);
}
.dropdown - item.disabled, .dropdown - item: disabled {
    color: var(--bs - dropdown - link - disabled - color);
    pointer - events: none;
    background - color: transparent;
}

.dropdown - menu.show {
    display: block;
}

.dropdown - header {
    display: block;
    padding: var(--bs - dropdown - header - padding - y) var(--bs - dropdown - header - padding - x);
    margin - bottom: 0;
    font - size: 0.875rem;
    color: var(--bs - dropdown - header - color);
    white - space: nowrap;
}

.dropdown - item - text {
    display: block;
    padding: var(--bs - dropdown - item - padding - y) var(--bs - dropdown - item - padding - x);
    color: var(--bs - dropdown - link - color);
}

.dropdown - menu - dark {
    --bs - dropdown - color: #dee2e6;
    --bs - dropdown - bg: #222;
    --bs - dropdown - border - color: var(--bs - border - color - translucent);
    --bs - dropdown - box - shadow: ;
    --bs - dropdown - link - color: #dee2e6;
    --bs - dropdown - link - hover - color: #fff;
    --bs - dropdown - divider - bg: #222;
    --bs - dropdown - link - hover - bg: rgba(255, 255, 255, 0.15);
    --bs - dropdown - link - active - color: #fff;
    --bs - dropdown - link - active - bg: #2a9fd6;
    --bs - dropdown - link - disabled - color: #888;
    --bs - dropdown - header - color: #888;
}

.btn - group,
.btn - group - vertical {
    position: relative;
    display: inline - flex;
    vertical - align: middle;
}
.btn - group > .btn,
.btn - group - vertical > .btn {
    position: relative;
    flex: 1 1 auto;
}
.btn - group > .btn - check: checked + .btn,
.btn - group > .btn - check: focus + .btn,
.btn - group > .btn: hover,
.btn - group > .btn: focus,
.btn - group > .btn: active,
.btn - group > .btn.active,
.btn - group - vertical > .btn - check: checked + .btn,
.btn - group - vertical > .btn - check: focus + .btn,
.btn - group - vertical > .btn: hover,
.btn - group - vertical > .btn: focus,
.btn - group - vertical > .btn: active,
.btn - group - vertical > .btn.active {
    z - index: 1;
}

.btn - toolbar {
    display: flex;
    flex - wrap: wrap;
    justify - content: flex - start;
}
.btn - toolbar.input - group {
    width: auto;
}

.btn - group {
    border - radius: var(--bs - border - radius);
}
.btn - group > : not(.btn - check: first - child) + .btn,
.btn - group > .btn - group: not(: first - child) {
    margin - right: calc(-1 * var(--bs - border - width));
}
.btn - group > .btn: not(: last - child): not(.dropdown - toggle),
.btn - group > .btn.dropdown - toggle - split: first - child,
.btn - group > .btn - group: not(: last - child) > .btn {
    border - top - left - radius: 0;
    border - bottom - left - radius: 0;
}
.btn - group > .btn: nth - child(n + 3),
.btn - group > : not(.btn - check) + .btn,
.btn - group > .btn - group: not(: first - child) > .btn {
    border - top - right - radius: 0;
    border - bottom - right - radius: 0;
}

.dropdown - toggle - split {
    padding - left: 0.75rem;
    padding - right: 0.75rem;
}
.dropdown - toggle - split:: after, .dropup.dropdown - toggle - split:: after, .dropend.dropdown - toggle - split:: after {
    margin - right: 0;
}
.dropstart.dropdown - toggle - split:: before {
    margin - left: 0;
}

.btn - sm + .dropdown - toggle - split, .btn - group - sm > .btn + .dropdown - toggle - split {
    padding - left: 0.375rem;
    padding - right: 0.375rem;
}

.btn - lg + .dropdown - toggle - split, .btn - group - lg > .btn + .dropdown - toggle - split {
    padding - left: 0.75rem;
    padding - right: 0.75rem;
}

.btn - group - vertical {
    flex - direction: column;
    align - items: flex - start;
    justify - content: center;
}
.btn - group - vertical > .btn,
.btn - group - vertical > .btn - group {
    width: 100 %;
}
.btn - group - vertical > .btn: not(: first - child),
.btn - group - vertical > .btn - group: not(: first - child) {
    margin - top: calc(-1 * var(--bs - border - width));
}
.btn - group - vertical > .btn: not(: last - child): not(.dropdown - toggle),
.btn - group - vertical > .btn - group: not(: last - child) > .btn {
    border - bottom - left - radius: 0;
    border - bottom - right - radius: 0;
}
.btn - group - vertical > .btn: nth - child(n + 3),
.btn - group - vertical > : not(.btn - check) + .btn,
.btn - group - vertical > .btn - group: not(: first - child) > .btn {
    border - top - right - radius: 0;
    border - top - left - radius: 0;
}

.nav {
    --bs - nav - link - padding - x: 1rem;
    --bs - nav - link - padding - y: 0.5rem;
    --bs - nav - link - font - weight: ;
    --bs - nav - link - color: var(--bs - link - color);
    --bs - nav - link - hover - color: var(--bs - link - hover - color);
    --bs - nav - link - disabled - color: var(--bs - secondary - color);
    display: flex;
    flex - wrap: wrap;
    padding - right: 0;
    margin - bottom: 0;
    list - style: none;
}

.nav - link {
    display: block;
    padding: var(--bs - nav - link - padding - y) var(--bs - nav - link - padding - x);
    font - size: var(--bs - nav - link - font - size);
    font - weight: var(--bs - nav - link - font - weight);
    color: var(--bs - nav - link - color);
    text - decoration: none;
    background: none;
    border: 0;
    transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .nav - link {
        transition: none;
    }
}
.nav - link: hover, .nav - link: focus {
    color: var(--bs - nav - link - hover - color);
}
.nav - link: focus - visible {
    outline: 0;
    box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
}
.nav - link.disabled, .nav - link: disabled {
    color: var(--bs - nav - link - disabled - color);
    pointer - events: none;
    cursor: default ;
}

.nav - tabs {
    --bs - nav - tabs - border - width: var(--bs - border - width);
    --bs - nav - tabs - border - color: #282828;
    --bs - nav - tabs - border - radius: var(--bs - border - radius);
    --bs - nav - tabs - link - hover - border - color: #282828;
    --bs - nav - tabs - link - active - color: #fff;
    --bs - nav - tabs - link - active - bg: #282828;
    --bs - nav - tabs - link - active - border - color: #282828;
    border - bottom: var(--bs - nav - tabs - border - width) solid var(--bs - nav - tabs - border - color);
}
.nav - tabs.nav - link {
    margin - bottom: calc(-1 * var(--bs - nav - tabs - border - width));
    border: var(--bs - nav - tabs - border - width) solid transparent;
    border - top - right - radius: var(--bs - nav - tabs - border - radius);
    border - top - left - radius: var(--bs - nav - tabs - border - radius);
}
.nav - tabs.nav - link: hover, .nav - tabs.nav - link: focus {
    isolation: isolate;
    border - color: var(--bs - nav - tabs - link - hover - border - color);
}
.nav - tabs.nav - link.active,
.nav - tabs.nav - item.show.nav - link {
    color: var(--bs - nav - tabs - link - active - color);
    background - color: var(--bs - nav - tabs - link - active - bg);
    border - color: var(--bs - nav - tabs - link - active - border - color);
}
.nav - tabs.dropdown - menu {
    margin - top: calc(-1 * var(--bs - nav - tabs - border - width));
    border - top - right - radius: 0;
    border - top - left - radius: 0;
}

.nav - pills {
    --bs - nav - pills - border - radius: var(--bs - border - radius);
    --bs - nav - pills - link - active - color: #fff;
    --bs - nav - pills - link - active - bg: #2a9fd6;
}
.nav - pills.nav - link {
    border - radius: var(--bs - nav - pills - border - radius);
}
.nav - pills.nav - link.active,
.nav - pills.show > .nav - link {
    color: var(--bs - nav - pills - link - active - color);
    background - color: var(--bs - nav - pills - link - active - bg);
}

.nav - underline {
    --bs - nav - underline - gap: 1rem;
    --bs - nav - underline - border - width: 0.125rem;
    --bs - nav - underline - link - active - color: #fff;
    gap: var(--bs - nav - underline - gap);
}
.nav - underline.nav - link {
    padding - left: 0;
    padding - right: 0;
    border - bottom: var(--bs - nav - underline - border - width) solid transparent;
}
.nav - underline.nav - link: hover, .nav - underline.nav - link: focus {
    border - bottom - color: currentcolor;
}
.nav - underline.nav - link.active,
.nav - underline.show > .nav - link {
    font - weight: 700;
    color: var(--bs - nav - underline - link - active - color);
    border - bottom - color: currentcolor;
}

.nav - fill > .nav - link,
.nav - fill.nav - item {
    flex: 1 1 auto;
    text - align: center;
}

.nav - justified > .nav - link,
.nav - justified.nav - item {
    flex - grow: 1;
    flex - basis: 0;
    text - align: center;
}

.nav - fill.nav - item.nav - link,
.nav - justified.nav - item.nav - link {
    width: 100 %;
}

.tab - content > .tab - pane {
    display: none;
}
.tab - content > .active {
    display: block;
}

.navbar {
    --bs - navbar - padding - x: 0;
    --bs - navbar - padding - y: 0.5rem;
    --bs - navbar - color: rgba(var(--bs - emphasis - color - rgb), 0.65);
    --bs - navbar - hover - color: rgba(var(--bs - emphasis - color - rgb), 0.8);
    --bs - navbar - disabled - color: rgba(var(--bs - emphasis - color - rgb), 0.3);
    --bs - navbar - active - color: rgba(var(--bs - emphasis - color - rgb), 1);
    --bs - navbar - brand - padding - y: 0.3125rem;
    --bs - navbar - brand - margin - end: 1rem;
    --bs - navbar - brand - font - size: 1.25rem;
    --bs - navbar - brand - color: rgba(var(--bs - emphasis - color - rgb), 1);
    --bs - navbar - brand - hover - color: rgba(var(--bs - emphasis - color - rgb), 1);
    --bs - navbar - nav - link - padding - x: 0.5rem;
    --bs - navbar - toggler - padding - y: 0.25rem;
    --bs - navbar - toggler - padding - x: 0.75rem;
    --bs - navbar - toggler - font - size: 1.25rem;
    --bs - navbar - toggler - icon - bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28173, 175, 174, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    --bs - navbar - toggler - border - color: rgba(var(--bs - emphasis - color - rgb), 0.15);
    --bs - navbar - toggler - border - radius: var(--bs - border - radius);
    --bs - navbar - toggler - focus - width: 0.25rem;
    --bs - navbar - toggler - transition: box - shadow 0.15s ease -in -out;
    position: relative;
    display: flex;
    flex - wrap: wrap;
    align - items: center;
    justify - content: space - between;
    padding: var(--bs - navbar - padding - y) var(--bs - navbar - padding - x);
}
.navbar > .container,
.navbar > .container - fluid,
.navbar > .container - sm,
.navbar > .container - md,
.navbar > .container - lg,
.navbar > .container - xl,
.navbar > .container - xxl {
    display: flex;
    flex - wrap: inherit;
    align - items: center;
    justify - content: space - between;
}
.navbar - brand {
    padding - top: var(--bs - navbar - brand - padding - y);
    padding - bottom: var(--bs - navbar - brand - padding - y);
    margin - left: var(--bs - navbar - brand - margin - end);
    font - size: var(--bs - navbar - brand - font - size);
    color: var(--bs - navbar - brand - color);
    text - decoration: none;
    white - space: nowrap;
}
.navbar - brand: hover, .navbar - brand: focus {
    color: var(--bs - navbar - brand - hover - color);
}

.navbar - nav {
    --bs - nav - link - padding - x: 0;
    --bs - nav - link - padding - y: 0.5rem;
    --bs - nav - link - font - weight: ;
    --bs - nav - link - color: var(--bs - navbar - color);
    --bs - nav - link - hover - color: var(--bs - navbar - hover - color);
    --bs - nav - link - disabled - color: var(--bs - navbar - disabled - color);
    display: flex;
    flex - direction: column;
    padding - right: 0;
    margin - bottom: 0;
    list - style: none;
}
.navbar - nav.nav - link.active, .navbar - nav.nav - link.show {
    color: var(--bs - navbar - active - color);
}
.navbar - nav.dropdown - menu {
    position: static;
}

.navbar - text {
    padding - top: 0.5rem;
    padding - bottom: 0.5rem;
    color: var(--bs - navbar - color);
}
.navbar - text a,
.navbar - text a: hover,
.navbar - text a: focus {
    color: var(--bs - navbar - active - color);
}

.navbar - collapse {
    flex - grow: 1;
    flex - basis: 100 %;
    align - items: center;
}

.navbar - toggler {
    padding: var(--bs - navbar - toggler - padding - y) var(--bs - navbar - toggler - padding - x);
    font - size: var(--bs - navbar - toggler - font - size);
    line - height: 1;
    color: var(--bs - navbar - color);
    background - color: transparent;
    border: var(--bs - border - width) solid var(--bs - navbar - toggler - border - color);
    border - radius: var(--bs - navbar - toggler - border - radius);
    transition: var(--bs - navbar - toggler - transition);
}
@media(prefers - reduced - motion: reduce) {
  .navbar - toggler {
        transition: none;
    }
}
.navbar - toggler: hover {
    text - decoration: none;
}
.navbar - toggler: focus {
    text - decoration: none;
    outline: 0;
    box - shadow: 0 0 0 var(--bs - navbar - toggler - focus - width);
}

.navbar - toggler - icon {
    display: inline - block;
    width: 1.5em;
    height: 1.5em;
    vertical - align: middle;
    background - image: var(--bs - navbar - toggler - icon - bg);
    background - repeat: no - repeat;
    background - position: center;
    background - size: 100 %;
}

.navbar - nav - scroll {
    max - height: var(--bs - scroll - height, 75vh);
    overflow - y: auto;
}

@media(min - width: 576px) {
  .navbar - expand - sm {
        flex - wrap: nowrap;
        justify - content: flex - start;
    }
  .navbar - expand - sm.navbar - nav {
        flex - direction: row;
    }
  .navbar - expand - sm.navbar - nav.dropdown - menu {
        position: absolute;
    }
  .navbar - expand - sm.navbar - nav.nav - link {
        padding - left: var(--bs - navbar - nav - link - padding - x);
        padding - right: var(--bs - navbar - nav - link - padding - x);
    }
  .navbar - expand - sm.navbar - nav - scroll {
        overflow: visible;
    }
  .navbar - expand - sm.navbar - collapse {
        display: flex!important;
        flex - basis: auto;
    }
  .navbar - expand - sm.navbar - toggler {
        display: none;
    }
  .navbar - expand - sm.offcanvas {
        position: static;
        z - index: auto;
        flex - grow: 1;
        width: auto!important;
        height: auto!important;
        visibility: visible!important;
        background - color: transparent!important;
        border: 0!important;
        transform: none!important;
        transition: none;
    }
  .navbar - expand - sm.offcanvas.offcanvas - header {
        display: none;
    }
  .navbar - expand - sm.offcanvas.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
    }
}
@media(min - width: 768px) {
  .navbar - expand - md {
        flex - wrap: nowrap;
        justify - content: flex - start;
    }
  .navbar - expand - md.navbar - nav {
        flex - direction: row;
    }
  .navbar - expand - md.navbar - nav.dropdown - menu {
        position: absolute;
    }
  .navbar - expand - md.navbar - nav.nav - link {
        padding - left: var(--bs - navbar - nav - link - padding - x);
        padding - right: var(--bs - navbar - nav - link - padding - x);
    }
  .navbar - expand - md.navbar - nav - scroll {
        overflow: visible;
    }
  .navbar - expand - md.navbar - collapse {
        display: flex!important;
        flex - basis: auto;
    }
  .navbar - expand - md.navbar - toggler {
        display: none;
    }
  .navbar - expand - md.offcanvas {
        position: static;
        z - index: auto;
        flex - grow: 1;
        width: auto!important;
        height: auto!important;
        visibility: visible!important;
        background - color: transparent!important;
        border: 0!important;
        transform: none!important;
        transition: none;
    }
  .navbar - expand - md.offcanvas.offcanvas - header {
        display: none;
    }
  .navbar - expand - md.offcanvas.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
    }
}
@media(min - width: 992px) {
  .navbar - expand - lg {
        flex - wrap: nowrap;
        justify - content: flex - start;
    }
  .navbar - expand - lg.navbar - nav {
        flex - direction: row;
    }
  .navbar - expand - lg.navbar - nav.dropdown - menu {
        position: absolute;
    }
  .navbar - expand - lg.navbar - nav.nav - link {
        padding - left: var(--bs - navbar - nav - link - padding - x);
        padding - right: var(--bs - navbar - nav - link - padding - x);
    }
  .navbar - expand - lg.navbar - nav - scroll {
        overflow: visible;
    }
  .navbar - expand - lg.navbar - collapse {
        display: flex!important;
        flex - basis: auto;
    }
  .navbar - expand - lg.navbar - toggler {
        display: none;
    }
  .navbar - expand - lg.offcanvas {
        position: static;
        z - index: auto;
        flex - grow: 1;
        width: auto!important;
        height: auto!important;
        visibility: visible!important;
        background - color: transparent!important;
        border: 0!important;
        transform: none!important;
        transition: none;
    }
  .navbar - expand - lg.offcanvas.offcanvas - header {
        display: none;
    }
  .navbar - expand - lg.offcanvas.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
    }
}
@media(min - width: 1200px) {
  .navbar - expand - xl {
        flex - wrap: nowrap;
        justify - content: flex - start;
    }
  .navbar - expand - xl.navbar - nav {
        flex - direction: row;
    }
  .navbar - expand - xl.navbar - nav.dropdown - menu {
        position: absolute;
    }
  .navbar - expand - xl.navbar - nav.nav - link {
        padding - left: var(--bs - navbar - nav - link - padding - x);
        padding - right: var(--bs - navbar - nav - link - padding - x);
    }
  .navbar - expand - xl.navbar - nav - scroll {
        overflow: visible;
    }
  .navbar - expand - xl.navbar - collapse {
        display: flex!important;
        flex - basis: auto;
    }
  .navbar - expand - xl.navbar - toggler {
        display: none;
    }
  .navbar - expand - xl.offcanvas {
        position: static;
        z - index: auto;
        flex - grow: 1;
        width: auto!important;
        height: auto!important;
        visibility: visible!important;
        background - color: transparent!important;
        border: 0!important;
        transform: none!important;
        transition: none;
    }
  .navbar - expand - xl.offcanvas.offcanvas - header {
        display: none;
    }
  .navbar - expand - xl.offcanvas.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
    }
}
@media(min - width: 1400px) {
  .navbar - expand - xxl {
        flex - wrap: nowrap;
        justify - content: flex - start;
    }
  .navbar - expand - xxl.navbar - nav {
        flex - direction: row;
    }
  .navbar - expand - xxl.navbar - nav.dropdown - menu {
        position: absolute;
    }
  .navbar - expand - xxl.navbar - nav.nav - link {
        padding - left: var(--bs - navbar - nav - link - padding - x);
        padding - right: var(--bs - navbar - nav - link - padding - x);
    }
  .navbar - expand - xxl.navbar - nav - scroll {
        overflow: visible;
    }
  .navbar - expand - xxl.navbar - collapse {
        display: flex!important;
        flex - basis: auto;
    }
  .navbar - expand - xxl.navbar - toggler {
        display: none;
    }
  .navbar - expand - xxl.offcanvas {
        position: static;
        z - index: auto;
        flex - grow: 1;
        width: auto!important;
        height: auto!important;
        visibility: visible!important;
        background - color: transparent!important;
        border: 0!important;
        transform: none!important;
        transition: none;
    }
  .navbar - expand - xxl.offcanvas.offcanvas - header {
        display: none;
    }
  .navbar - expand - xxl.offcanvas.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
    }
}
.navbar - expand {
    flex - wrap: nowrap;
    justify - content: flex - start;
}
.navbar - expand.navbar - nav {
    flex - direction: row;
}
.navbar - expand.navbar - nav.dropdown - menu {
    position: absolute;
}
.navbar - expand.navbar - nav.nav - link {
    padding - left: var(--bs - navbar - nav - link - padding - x);
    padding - right: var(--bs - navbar - nav - link - padding - x);
}
.navbar - expand.navbar - nav - scroll {
    overflow: visible;
}
.navbar - expand.navbar - collapse {
    display: flex!important;
    flex - basis: auto;
}
.navbar - expand.navbar - toggler {
    display: none;
}
.navbar - expand.offcanvas {
    position: static;
    z - index: auto;
    flex - grow: 1;
    width: auto!important;
    height: auto!important;
    visibility: visible!important;
    background - color: transparent!important;
    border: 0!important;
    transform: none!important;
    transition: none;
}
.navbar - expand.offcanvas.offcanvas - header {
    display: none;
}
.navbar - expand.offcanvas.offcanvas - body {
    display: flex;
    flex - grow: 0;
    padding: 0;
    overflow - y: visible;
}

.navbar - dark,
.navbar[data - bs - theme= dark] {
    --bs - navbar - color: rgba(255, 255, 255, 0.55);
    --bs - navbar - hover - color: #fff;
    --bs - navbar - disabled - color: rgba(255, 255, 255, 0.25);
    --bs - navbar - active - color: #fff;
    --bs - navbar - brand - color: #fff;
    --bs - navbar - brand - hover - color: #fff;
    --bs - navbar - toggler - border - color: rgba(255, 255, 255, 0.1);
    --bs - navbar - toggler - icon - bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

[data - bs - theme=dark].navbar - toggler - icon {
    --bs - navbar - toggler - icon - bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.card {
    --bs - card - spacer - y: 1rem;
    --bs - card - spacer - x: 1rem;
    --bs - card - title - spacer - y: 0.5rem;
    --bs - card - title - color: ;
    --bs - card - subtitle - color: ;
    --bs - card - border - width: var(--bs - border - width);
    --bs - card - border - color: var(--bs - border - color - translucent);
    --bs - card - border - radius: var(--bs - border - radius);
    --bs - card - box - shadow: ;
    --bs - card - inner - border - radius: calc(var(--bs - border - radius) - (var(--bs - border - width)));
    --bs - card - cap - padding - y: 0.5rem;
    --bs - card - cap - padding - x: 1rem;
    --bs - card - cap - bg: rgba(var(--bs - body - color - rgb), 0.03);
    --bs - card - cap - color: ;
    --bs - card - height: ;
    --bs - card - color: ;
    --bs - card - bg: #282828;
    --bs - card - img - overlay - padding: 1rem;
    --bs - card - group - margin: 0.75rem;
    position: relative;
    display: flex;
    flex - direction: column;
    min - width: 0;
    height: var(--bs - card - height);
    color: var(--bs - body - color);
    word - wrap: break-word;
    background - color: var(--bs - card - bg);
    background - clip: border - box;
    border: var(--bs - card - border - width) solid var(--bs - card - border - color);
    border - radius: var(--bs - card - border - radius);
}
.card > hr {
    margin - left: 0;
    margin - right: 0;
}
.card > .list - group {
    border - top: inherit;
    border - bottom: inherit;
}
.card > .list - group: first - child {
    border - top - width: 0;
    border - top - right - radius: var(--bs - card - inner - border - radius);
    border - top - left - radius: var(--bs - card - inner - border - radius);
}
.card > .list - group: last - child {
    border - bottom - width: 0;
    border - bottom - left - radius: var(--bs - card - inner - border - radius);
    border - bottom - right - radius: var(--bs - card - inner - border - radius);
}
.card > .card - header + .list - group,
.card > .list - group + .card - footer {
    border - top: 0;
}

.card - body {
    flex: 1 1 auto;
    padding: var(--bs - card - spacer - y) var(--bs - card - spacer - x);
    color: var(--bs - card - color);
}

.card - title {
    margin - bottom: var(--bs - card - title - spacer - y);
    color: var(--bs - card - title - color);
}

.card - subtitle {
    margin - top: calc(-0.5 * var(--bs - card - title - spacer - y));
    margin - bottom: 0;
    color: var(--bs - card - subtitle - color);
}

.card - text: last - child {
    margin - bottom: 0;
}

.card - link + .card - link {
    margin - right: var(--bs - card - spacer - x);
}

.card - header {
    padding: var(--bs - card - cap - padding - y) var(--bs - card - cap - padding - x);
    margin - bottom: 0;
    color: var(--bs - card - cap - color);
    background - color: var(--bs - card - cap - bg);
    border - bottom: var(--bs - card - border - width) solid var(--bs - card - border - color);
}
.card - header: first - child {
    border - radius: var(--bs - card - inner - border - radius) var(--bs - card - inner - border - radius) 0 0;
}

.card - footer {
    padding: var(--bs - card - cap - padding - y) var(--bs - card - cap - padding - x);
    color: var(--bs - card - cap - color);
    background - color: var(--bs - card - cap - bg);
    border - top: var(--bs - card - border - width) solid var(--bs - card - border - color);
}
.card - footer: last - child {
    border - radius: 0 0 var(--bs - card - inner - border - radius) var(--bs - card - inner - border - radius);
}

.card - header - tabs {
    margin - left: calc(-0.5 * var(--bs - card - cap - padding - x));
    margin - bottom: calc(-1 * var(--bs - card - cap - padding - y));
    margin - right: calc(-0.5 * var(--bs - card - cap - padding - x));
    border - bottom: 0;
}
.card - header - tabs.nav - link.active {
    background - color: var(--bs - card - bg);
    border - bottom - color: var(--bs - card - bg);
}

.card - header - pills {
    margin - left: calc(-0.5 * var(--bs - card - cap - padding - x));
    margin - right: calc(-0.5 * var(--bs - card - cap - padding - x));
}

.card - img - overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: var(--bs - card - img - overlay - padding);
    border - radius: var(--bs - card - inner - border - radius);
}

.card - img,
.card - img - top,
.card - img - bottom {
    width: 100 %;
}

.card - img,
.card - img - top {
    border - top - right - radius: var(--bs - card - inner - border - radius);
    border - top - left - radius: var(--bs - card - inner - border - radius);
}

.card - img,
.card - img - bottom {
    border - bottom - left - radius: var(--bs - card - inner - border - radius);
    border - bottom - right - radius: var(--bs - card - inner - border - radius);
}

.card - group > .card {
    margin - bottom: var(--bs - card - group - margin);
}
@media(min - width: 576px) {
  .card - group {
        display: flex;
        flex - flow: row wrap;
    }
  .card - group > .card {
        flex: 1 0 0;
        margin - bottom: 0;
    }
  .card - group > .card + .card {
        margin - right: 0;
        border - right: 0;
    }
  .card - group > .card: not(: last - child) {
        border - top - left - radius: 0;
        border - bottom - left - radius: 0;
    }
  .card - group > .card: not(: last - child) > .card - img - top,
  .card - group > .card: not(: last - child) > .card - header {
        border - top - left - radius: 0;
    }
  .card - group > .card: not(: last - child) > .card - img - bottom,
  .card - group > .card: not(: last - child) > .card - footer {
        border - bottom - left - radius: 0;
    }
  .card - group > .card: not(: first - child) {
        border - top - right - radius: 0;
        border - bottom - right - radius: 0;
    }
  .card - group > .card: not(: first - child) > .card - img - top,
  .card - group > .card: not(: first - child) > .card - header {
        border - top - right - radius: 0;
    }
  .card - group > .card: not(: first - child) > .card - img - bottom,
  .card - group > .card: not(: first - child) > .card - footer {
        border - bottom - right - radius: 0;
    }
}

.accordion {
    --bs - accordion - color: var(--bs - body - color);
    --bs - accordion - bg: var(--bs - body - bg);
    --bs - accordion - transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out, border - radius 0.15s ease;
    --bs - accordion - border - color: var(--bs - border - color);
    --bs - accordion - border - width: var(--bs - border - width);
    --bs - accordion - border - radius: var(--bs - border - radius);
    --bs - accordion - inner - border - radius: calc(var(--bs - border - radius) - (var(--bs - border - width)));
    --bs - accordion - btn - padding - x: 1.25rem;
    --bs - accordion - btn - padding - y: 1rem;
    --bs - accordion - btn - color: var(--bs - body - color);
    --bs - accordion - btn - bg: var(--bs - accordion - bg);
    --bs - accordion - btn - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23adafae' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    --bs - accordion - btn - icon - width: 1.25rem;
    --bs - accordion - btn - icon - transform: rotate(-180deg);
    --bs - accordion - btn - icon - transition: transform 0.2s ease -in -out;
    --bs - accordion - btn - active - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23114056' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    --bs - accordion - btn - focus - box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
    --bs - accordion - body - padding - x: 1.25rem;
    --bs - accordion - body - padding - y: 1rem;
    --bs - accordion - active - color: var(--bs - primary - text - emphasis);
    --bs - accordion - active - bg: var(--bs - primary - bg - subtle);
}

.accordion - button {
    position: relative;
    display: flex;
    align - items: center;
    width: 100 %;
    padding: var(--bs - accordion - btn - padding - y) var(--bs - accordion - btn - padding - x);
    font - size: 1rem;
    color: var(--bs - accordion - btn - color);
    text - align: right;
    background - color: var(--bs - accordion - btn - bg);
    border: 0;
    border - radius: 0;
    overflow - anchor: none;
    transition: var(--bs - accordion - transition);
}
@media(prefers - reduced - motion: reduce) {
  .accordion - button {
        transition: none;
    }
}
.accordion - button: not(.collapsed) {
    color: var(--bs - accordion - active - color);
    background - color: var(--bs - accordion - active - bg);
    box - shadow: inset 0 calc(-1 * var(--bs - accordion - border - width)) 0 var(--bs - accordion - border - color);
}
.accordion - button: not(.collapsed):: after {
    background - image: var(--bs - accordion - btn - active - icon);
    transform: var(--bs - accordion - btn - icon - transform);
}
.accordion - button:: after {
    flex - shrink: 0;
    width: var(--bs - accordion - btn - icon - width);
    height: var(--bs - accordion - btn - icon - width);
    margin - right: auto;
    content: "";
    background - image: var(--bs - accordion - btn - icon);
    background - repeat: no - repeat;
    background - size: var(--bs - accordion - btn - icon - width);
    transition: var(--bs - accordion - btn - icon - transition);
}
@media(prefers - reduced - motion: reduce) {
  .accordion - button:: after {
        transition: none;
    }
}
.accordion - button: hover {
    z - index: 2;
}
.accordion - button: focus {
    z - index: 3;
    outline: 0;
    box - shadow: var(--bs - accordion - btn - focus - box - shadow);
}

.accordion - header {
    margin - bottom: 0;
}

.accordion - item {
    color: var(--bs - accordion - color);
    background - color: var(--bs - accordion - bg);
    border: var(--bs - accordion - border - width) solid var(--bs - accordion - border - color);
}
.accordion - item: first - of - type {
    border - top - right - radius: var(--bs - accordion - border - radius);
    border - top - left - radius: var(--bs - accordion - border - radius);
}
.accordion - item: first - of - type > .accordion - header.accordion - button {
    border - top - right - radius: var(--bs - accordion - inner - border - radius);
    border - top - left - radius: var(--bs - accordion - inner - border - radius);
}
.accordion - item: not(: first - of - type) {
    border - top: 0;
}
.accordion - item: last - of - type {
    border - bottom - left - radius: var(--bs - accordion - border - radius);
    border - bottom - right - radius: var(--bs - accordion - border - radius);
}
.accordion - item: last - of - type > .accordion - header.accordion - button.collapsed {
    border - bottom - left - radius: var(--bs - accordion - inner - border - radius);
    border - bottom - right - radius: var(--bs - accordion - inner - border - radius);
}
.accordion - item: last - of - type > .accordion - collapse {
    border - bottom - left - radius: var(--bs - accordion - border - radius);
    border - bottom - right - radius: var(--bs - accordion - border - radius);
}

.accordion - body {
    padding: var(--bs - accordion - body - padding - y) var(--bs - accordion - body - padding - x);
}

.accordion - flush > .accordion - item {
    border - left: 0;
    border - right: 0;
    border - radius: 0;
}
.accordion - flush > .accordion - item: first - child {
    border - top: 0;
}
.accordion - flush > .accordion - item: last - child {
    border - bottom: 0;
}
.accordion - flush > .accordion - item > .accordion - collapse,
.accordion - flush > .accordion - item > .accordion - header.accordion - button,
.accordion - flush > .accordion - item > .accordion - header.accordion - button.collapsed {
    border - radius: 0;
}

[data - bs - theme=dark].accordion - button:: after {
    --bs - accordion - btn - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%237fc5e6'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e");
    --bs - accordion - btn - active - icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%237fc5e6'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e");
}

.breadcrumb {
    --bs - breadcrumb - padding - x: 0.75rem;
    --bs - breadcrumb - padding - y: 0.375rem;
    --bs - breadcrumb - margin - bottom: 1rem;
    --bs - breadcrumb - bg: #282828;
    --bs - breadcrumb - border - radius: 0.25rem;
    --bs - breadcrumb - divider - color: var(--bs - secondary - color);
    --bs - breadcrumb - item - padding - x: 0.5rem;
    --bs - breadcrumb - item - active - color: var(--bs - secondary - color);
    display: flex;
    flex - wrap: wrap;
    padding: var(--bs - breadcrumb - padding - y) var(--bs - breadcrumb - padding - x);
    margin - bottom: var(--bs - breadcrumb - margin - bottom);
    font - size: var(--bs - breadcrumb - font - size);
    list - style: none;
    background - color: var(--bs - breadcrumb - bg);
    border - radius: var(--bs - breadcrumb - border - radius);
}

.breadcrumb - item + .breadcrumb - item {
    padding - right: var(--bs - breadcrumb - item - padding - x);
}
.breadcrumb - item + .breadcrumb - item:: before {
    float: right;
    padding - left: var(--bs - breadcrumb - item - padding - x);
    color: var(--bs - breadcrumb - divider - color);
    content: var(--bs - breadcrumb - divider, "/");
}
.breadcrumb - item.active {
    color: var(--bs - breadcrumb - item - active - color);
}

.pagination {
    --bs - pagination - padding - x: 0.75rem;
    --bs - pagination - padding - y: 0.375rem;
    --bs - pagination - font - size: 1rem;
    --bs - pagination - color: #fff;
    --bs - pagination - bg: #282828;
    --bs - pagination - border - width: var(--bs - border - width);
    --bs - pagination - border - color: transparent;
    --bs - pagination - border - radius: var(--bs - border - radius);
    --bs - pagination - hover - color: #fff;
    --bs - pagination - hover - bg: #2a9fd6;
    --bs - pagination - hover - border - color: transparent;
    --bs - pagination - focus - color: var(--bs - link - hover - color);
    --bs - pagination - focus - bg: var(--bs - secondary - bg);
    --bs - pagination - focus - box - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
    --bs - pagination - active - color: #fff;
    --bs - pagination - active - bg: #2a9fd6;
    --bs - pagination - active - border - color: #2a9fd6;
    --bs - pagination - disabled - color: var(--bs - secondary - color);
    --bs - pagination - disabled - bg: #282828;
    --bs - pagination - disabled - border - color: transparent;
    display: flex;
    padding - right: 0;
    list - style: none;
}

.page - link {
    position: relative;
    display: block;
    padding: var(--bs - pagination - padding - y) var(--bs - pagination - padding - x);
    font - size: var(--bs - pagination - font - size);
    color: var(--bs - pagination - color);
    text - decoration: none;
    background - color: var(--bs - pagination - bg);
    border: var(--bs - pagination - border - width) solid var(--bs - pagination - border - color);
    transition: color 0.15s ease -in -out, background - color 0.15s ease -in -out, border - color 0.15s ease -in -out, box - shadow 0.15s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .page - link {
        transition: none;
    }
}
.page - link: hover {
    z - index: 2;
    color: var(--bs - pagination - hover - color);
    background - color: var(--bs - pagination - hover - bg);
    border - color: var(--bs - pagination - hover - border - color);
}
.page - link: focus {
    z - index: 3;
    color: var(--bs - pagination - focus - color);
    background - color: var(--bs - pagination - focus - bg);
    outline: 0;
    box - shadow: var(--bs - pagination - focus - box - shadow);
}
.page - link.active, .active > .page - link {
    z - index: 3;
    color: var(--bs - pagination - active - color);
    background - color: var(--bs - pagination - active - bg);
    border - color: var(--bs - pagination - active - border - color);
}
.page - link.disabled, .disabled > .page - link {
    color: var(--bs - pagination - disabled - color);
    pointer - events: none;
    background - color: var(--bs - pagination - disabled - bg);
    border - color: var(--bs - pagination - disabled - border - color);
}

.page - item: not(: first - child).page - link {
    margin - right: calc(-1 * var(--bs - border - width));
}
.page - item: first - child.page - link {
    border - top - right - radius: var(--bs - pagination - border - radius);
    border - bottom - right - radius: var(--bs - pagination - border - radius);
}
.page - item: last - child.page - link {
    border - top - left - radius: var(--bs - pagination - border - radius);
    border - bottom - left - radius: var(--bs - pagination - border - radius);
}

.pagination - lg {
    --bs - pagination - padding - x: 1.5rem;
    --bs - pagination - padding - y: 0.75rem;
    --bs - pagination - font - size: 1.25rem;
    --bs - pagination - border - radius: var(--bs - border - radius - lg);
}

.pagination - sm {
    --bs - pagination - padding - x: 0.5rem;
    --bs - pagination - padding - y: 0.25rem;
    --bs - pagination - font - size: 0.875rem;
    --bs - pagination - border - radius: var(--bs - border - radius - sm);
}

.badge {
    --bs - badge - padding - x: 0.65em;
    --bs - badge - padding - y: 0.35em;
    --bs - badge - font - size: 0.75em;
    --bs - badge - font - weight: 700;
    --bs - badge - color: #fff;
    --bs - badge - border - radius: var(--bs - border - radius);
    display: inline - block;
    padding: var(--bs - badge - padding - y) var(--bs - badge - padding - x);
    font - size: var(--bs - badge - font - size);
    font - weight: var(--bs - badge - font - weight);
    line - height: 1;
    color: var(--bs - badge - color);
    text - align: center;
    white - space: nowrap;
    vertical - align: baseline;
    border - radius: var(--bs - badge - border - radius);
}
.badge: empty {
    display: none;
}

.btn.badge {
    position: relative;
    top: -1px;
}

.alert {
    --bs - alert - bg: transparent;
    --bs - alert - padding - x: 1rem;
    --bs - alert - padding - y: 1rem;
    --bs - alert - margin - bottom: 1rem;
    --bs - alert - color: inherit;
    --bs - alert - border - color: transparent;
    --bs - alert - border: var(--bs - border - width) solid var(--bs - alert - border - color);
    --bs - alert - border - radius: var(--bs - border - radius);
    --bs - alert - link - color: inherit;
    position: relative;
    padding: var(--bs - alert - padding - y) var(--bs - alert - padding - x);
    margin - bottom: var(--bs - alert - margin - bottom);
    color: var(--bs - alert - color);
    background - color: var(--bs - alert - bg);
    border: var(--bs - alert - border);
    border - radius: var(--bs - alert - border - radius);
}

.alert - heading {
    color: inherit;
}

.alert - link {
    font - weight: 700;
    color: var(--bs - alert - link - color);
}

.alert - dismissible {
    padding - left: 3rem;
}
.alert - dismissible.btn - close {
    position: absolute;
    top: 0;
    left: 0;
    z - index: 2;
    padding: 1.25rem 1rem;
}

.alert - primary {
    --bs - alert - color: var(--bs - primary - text - emphasis);
    --bs - alert - bg: var(--bs - primary - bg - subtle);
    --bs - alert - border - color: var(--bs - primary - border - subtle);
    --bs - alert - link - color: var(--bs - primary - text - emphasis);
}

.alert - secondary {
    --bs - alert - color: var(--bs - secondary - text - emphasis);
    --bs - alert - bg: var(--bs - secondary - bg - subtle);
    --bs - alert - border - color: var(--bs - secondary - border - subtle);
    --bs - alert - link - color: var(--bs - secondary - text - emphasis);
}

.alert - success {
    --bs - alert - color: var(--bs - success - text - emphasis);
    --bs - alert - bg: var(--bs - success - bg - subtle);
    --bs - alert - border - color: var(--bs - success - border - subtle);
    --bs - alert - link - color: var(--bs - success - text - emphasis);
}

.alert - info {
    --bs - alert - color: var(--bs - info - text - emphasis);
    --bs - alert - bg: var(--bs - info - bg - subtle);
    --bs - alert - border - color: var(--bs - info - border - subtle);
    --bs - alert - link - color: var(--bs - info - text - emphasis);
}

.alert - warning {
    --bs - alert - color: var(--bs - warning - text - emphasis);
    --bs - alert - bg: var(--bs - warning - bg - subtle);
    --bs - alert - border - color: var(--bs - warning - border - subtle);
    --bs - alert - link - color: var(--bs - warning - text - emphasis);
}

.alert - danger {
    --bs - alert - color: var(--bs - danger - text - emphasis);
    --bs - alert - bg: var(--bs - danger - bg - subtle);
    --bs - alert - border - color: var(--bs - danger - border - subtle);
    --bs - alert - link - color: var(--bs - danger - text - emphasis);
}

.alert - light {
    --bs - alert - color: var(--bs - light - text - emphasis);
    --bs - alert - bg: var(--bs - light - bg - subtle);
    --bs - alert - border - color: var(--bs - light - border - subtle);
    --bs - alert - link - color: var(--bs - light - text - emphasis);
}

.alert - dark {
    --bs - alert - color: var(--bs - dark - text - emphasis);
    --bs - alert - bg: var(--bs - dark - bg - subtle);
    --bs - alert - border - color: var(--bs - dark - border - subtle);
    --bs - alert - link - color: var(--bs - dark - text - emphasis);
}

@keyframes progress - bar - stripes {
    0 % {
        background- position - x: var(--bs - progress - height);
}
}
.progress,
.progress - stacked {
    --bs - progress - height: 1rem;
    --bs - progress - font - size: 0.75rem;
    --bs - progress - bg: #282828;
    --bs - progress - border - radius: var(--bs - border - radius);
    --bs - progress - box - shadow: var(--bs - box - shadow - inset);
    --bs - progress - bar - color: #fff;
    --bs - progress - bar - bg: #2a9fd6;
    --bs - progress - bar - transition: width 0.6s ease;
    display: flex;
    height: var(--bs - progress - height);
    overflow: hidden;
    font - size: var(--bs - progress - font - size);
    background - color: var(--bs - progress - bg);
    border - radius: var(--bs - progress - border - radius);
}

.progress - bar {
    display: flex;
    flex - direction: column;
    justify - content: center;
    overflow: hidden;
    color: var(--bs - progress - bar - color);
    text - align: center;
    white - space: nowrap;
    background - color: var(--bs - progress - bar - bg);
    transition: var(--bs - progress - bar - transition);
}
@media(prefers - reduced - motion: reduce) {
  .progress - bar {
        transition: none;
    }
}

.progress - bar - striped {
    background - image: linear - gradient(-45deg, rgba(255, 255, 255, 0.15) 25 %, transparent 25 %, transparent 50 %, rgba(255, 255, 255, 0.15) 50 %, rgba(255, 255, 255, 0.15) 75 %, transparent 75 %, transparent);
    background - size: var(--bs - progress - height) var(--bs - progress - height);
}

.progress - stacked > .progress {
    overflow: visible;
}

.progress - stacked > .progress > .progress - bar {
    width: 100 %;
}

.progress - bar - animated {
    animation: 1s linear infinite progress - bar - stripes;
}
@media(prefers - reduced - motion: reduce) {
  .progress - bar - animated {
        animation: none;
    }
}

.list - group {
    --bs - list - group - color: #fff;
    --bs - list - group - bg: #222;
    --bs - list - group - border - color: #282828;
    --bs - list - group - border - width: var(--bs - border - width);
    --bs - list - group - border - radius: var(--bs - border - radius);
    --bs - list - group - item - padding - x: 1rem;
    --bs - list - group - item - padding - y: 0.5rem;
    --bs - list - group - action - color: #fff;
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: #2a9fd6;
    --bs - list - group - action - active - color: var(--bs - body - color);
    --bs - list - group - action - active - bg: #2a9fd6;
    --bs - list - group - disabled - color: var(--bs - secondary - color);
    --bs - list - group - disabled - bg: #282828;
    --bs - list - group - active - color: #fff;
    --bs - list - group - active - bg: #2a9fd6;
    --bs - list - group - active - border - color: #2a9fd6;
    display: flex;
    flex - direction: column;
    padding - right: 0;
    margin - bottom: 0;
    border - radius: var(--bs - list - group - border - radius);
}

.list - group - numbered {
    list - style - type: none;
    counter - reset: section;
}
.list - group - numbered > .list - group - item:: before {
    content: counters(section, ".") ". ";
    counter - increment: section;
}

.list - group - item {
    position: relative;
    display: block;
    padding: var(--bs - list - group - item - padding - y) var(--bs - list - group - item - padding - x);
    color: var(--bs - list - group - color);
    text - decoration: none;
    background - color: var(--bs - list - group - bg);
    border: var(--bs - list - group - border - width) solid var(--bs - list - group - border - color);
}
.list - group - item: first - child {
    border - top - right - radius: inherit;
    border - top - left - radius: inherit;
}
.list - group - item: last - child {
    border - bottom - left - radius: inherit;
    border - bottom - right - radius: inherit;
}
.list - group - item.disabled, .list - group - item: disabled {
    color: var(--bs - list - group - disabled - color);
    pointer - events: none;
    background - color: var(--bs - list - group - disabled - bg);
}
.list - group - item.active {
    z - index: 2;
    color: var(--bs - list - group - active - color);
    background - color: var(--bs - list - group - active - bg);
    border - color: var(--bs - list - group - active - border - color);
}
.list - group - item + .list - group - item {
    border - top - width: 0;
}
.list - group - item + .list - group - item.active {
    margin - top: calc(-1 * var(--bs - list - group - border - width));
    border - top - width: var(--bs - list - group - border - width);
}

.list - group - item - action {
    width: 100 %;
    color: var(--bs - list - group - action - color);
    text - align: inherit;
}
.list - group - item - action: not(.active): hover, .list - group - item - action: not(.active): focus {
    z - index: 1;
    color: var(--bs - list - group - action - hover - color);
    text - decoration: none;
    background - color: var(--bs - list - group - action - hover - bg);
}
.list - group - item - action: not(.active): active {
    color: var(--bs - list - group - action - active - color);
    background - color: var(--bs - list - group - action - active - bg);
}

.list - group - horizontal {
    flex - direction: row;
}
.list - group - horizontal > .list - group - item: first - child: not(: last - child) {
    border - bottom - right - radius: var(--bs - list - group - border - radius);
    border - top - left - radius: 0;
}
.list - group - horizontal > .list - group - item: last - child: not(: first - child) {
    border - top - left - radius: var(--bs - list - group - border - radius);
    border - bottom - right - radius: 0;
}
.list - group - horizontal > .list - group - item.active {
    margin - top: 0;
}
.list - group - horizontal > .list - group - item + .list - group - item {
    border - top - width: var(--bs - list - group - border - width);
    border - right - width: 0;
}
.list - group - horizontal > .list - group - item + .list - group - item.active {
    margin - right: calc(-1 * var(--bs - list - group - border - width));
    border - right - width: var(--bs - list - group - border - width);
}

@media(min - width: 576px) {
  .list - group - horizontal - sm {
        flex - direction: row;
    }
  .list - group - horizontal - sm > .list - group - item: first - child: not(: last - child) {
        border - bottom - right - radius: var(--bs - list - group - border - radius);
        border - top - left - radius: 0;
    }
  .list - group - horizontal - sm > .list - group - item: last - child: not(: first - child) {
        border - top - left - radius: var(--bs - list - group - border - radius);
        border - bottom - right - radius: 0;
    }
  .list - group - horizontal - sm > .list - group - item.active {
        margin - top: 0;
    }
  .list - group - horizontal - sm > .list - group - item + .list - group - item {
        border - top - width: var(--bs - list - group - border - width);
        border - right - width: 0;
    }
  .list - group - horizontal - sm > .list - group - item + .list - group - item.active {
        margin - right: calc(-1 * var(--bs - list - group - border - width));
        border - right - width: var(--bs - list - group - border - width);
    }
}
@media(min - width: 768px) {
  .list - group - horizontal - md {
        flex - direction: row;
    }
  .list - group - horizontal - md > .list - group - item: first - child: not(: last - child) {
        border - bottom - right - radius: var(--bs - list - group - border - radius);
        border - top - left - radius: 0;
    }
  .list - group - horizontal - md > .list - group - item: last - child: not(: first - child) {
        border - top - left - radius: var(--bs - list - group - border - radius);
        border - bottom - right - radius: 0;
    }
  .list - group - horizontal - md > .list - group - item.active {
        margin - top: 0;
    }
  .list - group - horizontal - md > .list - group - item + .list - group - item {
        border - top - width: var(--bs - list - group - border - width);
        border - right - width: 0;
    }
  .list - group - horizontal - md > .list - group - item + .list - group - item.active {
        margin - right: calc(-1 * var(--bs - list - group - border - width));
        border - right - width: var(--bs - list - group - border - width);
    }
}
@media(min - width: 992px) {
  .list - group - horizontal - lg {
        flex - direction: row;
    }
  .list - group - horizontal - lg > .list - group - item: first - child: not(: last - child) {
        border - bottom - right - radius: var(--bs - list - group - border - radius);
        border - top - left - radius: 0;
    }
  .list - group - horizontal - lg > .list - group - item: last - child: not(: first - child) {
        border - top - left - radius: var(--bs - list - group - border - radius);
        border - bottom - right - radius: 0;
    }
  .list - group - horizontal - lg > .list - group - item.active {
        margin - top: 0;
    }
  .list - group - horizontal - lg > .list - group - item + .list - group - item {
        border - top - width: var(--bs - list - group - border - width);
        border - right - width: 0;
    }
  .list - group - horizontal - lg > .list - group - item + .list - group - item.active {
        margin - right: calc(-1 * var(--bs - list - group - border - width));
        border - right - width: var(--bs - list - group - border - width);
    }
}
@media(min - width: 1200px) {
  .list - group - horizontal - xl {
        flex - direction: row;
    }
  .list - group - horizontal - xl > .list - group - item: first - child: not(: last - child) {
        border - bottom - right - radius: var(--bs - list - group - border - radius);
        border - top - left - radius: 0;
    }
  .list - group - horizontal - xl > .list - group - item: last - child: not(: first - child) {
        border - top - left - radius: var(--bs - list - group - border - radius);
        border - bottom - right - radius: 0;
    }
  .list - group - horizontal - xl > .list - group - item.active {
        margin - top: 0;
    }
  .list - group - horizontal - xl > .list - group - item + .list - group - item {
        border - top - width: var(--bs - list - group - border - width);
        border - right - width: 0;
    }
  .list - group - horizontal - xl > .list - group - item + .list - group - item.active {
        margin - right: calc(-1 * var(--bs - list - group - border - width));
        border - right - width: var(--bs - list - group - border - width);
    }
}
@media(min - width: 1400px) {
  .list - group - horizontal - xxl {
        flex - direction: row;
    }
  .list - group - horizontal - xxl > .list - group - item: first - child: not(: last - child) {
        border - bottom - right - radius: var(--bs - list - group - border - radius);
        border - top - left - radius: 0;
    }
  .list - group - horizontal - xxl > .list - group - item: last - child: not(: first - child) {
        border - top - left - radius: var(--bs - list - group - border - radius);
        border - bottom - right - radius: 0;
    }
  .list - group - horizontal - xxl > .list - group - item.active {
        margin - top: 0;
    }
  .list - group - horizontal - xxl > .list - group - item + .list - group - item {
        border - top - width: var(--bs - list - group - border - width);
        border - right - width: 0;
    }
  .list - group - horizontal - xxl > .list - group - item + .list - group - item.active {
        margin - right: calc(-1 * var(--bs - list - group - border - width));
        border - right - width: var(--bs - list - group - border - width);
    }
}
.list - group - flush {
    border - radius: 0;
}
.list - group - flush > .list - group - item {
    border - width: 0 0 var(--bs - list - group - border - width);
}
.list - group - flush > .list - group - item: last - child {
    border - bottom - width: 0;
}

.list - group - item - primary {
    --bs - list - group - color: var(--bs - primary - text - emphasis);
    --bs - list - group - bg: var(--bs - primary - bg - subtle);
    --bs - list - group - border - color: var(--bs - primary - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - primary - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - primary - border - subtle);
    --bs - list - group - active - color: var(--bs - primary - bg - subtle);
    --bs - list - group - active - bg: var(--bs - primary - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - primary - text - emphasis);
}

.list - group - item - secondary {
    --bs - list - group - color: var(--bs - secondary - text - emphasis);
    --bs - list - group - bg: var(--bs - secondary - bg - subtle);
    --bs - list - group - border - color: var(--bs - secondary - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - secondary - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - secondary - border - subtle);
    --bs - list - group - active - color: var(--bs - secondary - bg - subtle);
    --bs - list - group - active - bg: var(--bs - secondary - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - secondary - text - emphasis);
}

.list - group - item - success {
    --bs - list - group - color: var(--bs - success - text - emphasis);
    --bs - list - group - bg: var(--bs - success - bg - subtle);
    --bs - list - group - border - color: var(--bs - success - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - success - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - success - border - subtle);
    --bs - list - group - active - color: var(--bs - success - bg - subtle);
    --bs - list - group - active - bg: var(--bs - success - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - success - text - emphasis);
}

.list - group - item - info {
    --bs - list - group - color: var(--bs - info - text - emphasis);
    --bs - list - group - bg: var(--bs - info - bg - subtle);
    --bs - list - group - border - color: var(--bs - info - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - info - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - info - border - subtle);
    --bs - list - group - active - color: var(--bs - info - bg - subtle);
    --bs - list - group - active - bg: var(--bs - info - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - info - text - emphasis);
}

.list - group - item - warning {
    --bs - list - group - color: var(--bs - warning - text - emphasis);
    --bs - list - group - bg: var(--bs - warning - bg - subtle);
    --bs - list - group - border - color: var(--bs - warning - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - warning - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - warning - border - subtle);
    --bs - list - group - active - color: var(--bs - warning - bg - subtle);
    --bs - list - group - active - bg: var(--bs - warning - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - warning - text - emphasis);
}

.list - group - item - danger {
    --bs - list - group - color: var(--bs - danger - text - emphasis);
    --bs - list - group - bg: var(--bs - danger - bg - subtle);
    --bs - list - group - border - color: var(--bs - danger - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - danger - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - danger - border - subtle);
    --bs - list - group - active - color: var(--bs - danger - bg - subtle);
    --bs - list - group - active - bg: var(--bs - danger - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - danger - text - emphasis);
}

.list - group - item - light {
    --bs - list - group - color: var(--bs - light - text - emphasis);
    --bs - list - group - bg: var(--bs - light - bg - subtle);
    --bs - list - group - border - color: var(--bs - light - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - light - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - light - border - subtle);
    --bs - list - group - active - color: var(--bs - light - bg - subtle);
    --bs - list - group - active - bg: var(--bs - light - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - light - text - emphasis);
}

.list - group - item - dark {
    --bs - list - group - color: var(--bs - dark - text - emphasis);
    --bs - list - group - bg: var(--bs - dark - bg - subtle);
    --bs - list - group - border - color: var(--bs - dark - border - subtle);
    --bs - list - group - action - hover - color: var(--bs - emphasis - color);
    --bs - list - group - action - hover - bg: var(--bs - dark - border - subtle);
    --bs - list - group - action - active - color: var(--bs - emphasis - color);
    --bs - list - group - action - active - bg: var(--bs - dark - border - subtle);
    --bs - list - group - active - color: var(--bs - dark - bg - subtle);
    --bs - list - group - active - bg: var(--bs - dark - text - emphasis);
    --bs - list - group - active - border - color: var(--bs - dark - text - emphasis);
}

.btn - close {
    --bs - btn - close - color: #fff;
    --bs - btn - close - bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414'/%3e%3c/svg%3e");
    --bs - btn - close - opacity: 0.6;
    --bs - btn - close - hover - opacity: 1;
    --bs - btn - close - focus - shadow: 0 0 0 0.25rem rgba(42, 159, 214, 0.25);
    --bs - btn - close - focus - opacity: 1;
    --bs - btn - close - disabled - opacity: 0.25;
    box - sizing: content - box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: var(--bs - btn - close - color);
    background: transparent var(--bs - btn - close - bg) center / 1em auto no - repeat;
    filter: var(--bs - btn - close - filter);
    border: 0;
    border - radius: 0.375rem;
    opacity: var(--bs - btn - close - opacity);
}
.btn - close: hover {
    color: var(--bs - btn - close - color);
    text - decoration: none;
    opacity: var(--bs - btn - close - hover - opacity);
}
.btn - close: focus {
    outline: 0;
    box - shadow: var(--bs - btn - close - focus - shadow);
    opacity: var(--bs - btn - close - focus - opacity);
}
.btn - close: disabled, .btn - close.disabled {
    pointer - events: none;
    -webkit - user - select: none;
    -moz - user - select: none;
    user - select: none;
    opacity: var(--bs - btn - close - disabled - opacity);
}

.btn - close - white {
    --bs - btn - close - filter: invert(1) grayscale(100 %) brightness(200 %);
}

: root,
    [data - bs - theme=light] {
    --bs - btn - close - filter: ;
}

[data - bs - theme=dark] {
    --bs - btn - close - filter: invert(1) grayscale(100 %) brightness(200 %);
}

.toast {
    --bs - toast - zindex: 1090;
    --bs - toast - padding - x: 0.75rem;
    --bs - toast - padding - y: 0.5rem;
    --bs - toast - spacing: 1.5rem;
    --bs - toast - max - width: 350px;
    --bs - toast - font - size: 0.875rem;
    --bs - toast - color: #fff;
    --bs - toast - bg: #222;
    --bs - toast - border - width: var(--bs - border - width);
    --bs - toast - border - color: #282828;
    --bs - toast - border - radius: var(--bs - border - radius);
    --bs - toast - box - shadow: var(--bs - box - shadow);
    --bs - toast - header - color: #adafae;
    --bs - toast - header - bg: #222;
    --bs - toast - header - border - color: #282828;
    width: var(--bs - toast - max - width);
    max - width: 100 %;
    font - size: var(--bs - toast - font - size);
    color: var(--bs - toast - color);
    pointer - events: auto;
    background - color: var(--bs - toast - bg);
    background - clip: padding - box;
    border: var(--bs - toast - border - width) solid var(--bs - toast - border - color);
    box - shadow: var(--bs - toast - box - shadow);
    border - radius: var(--bs - toast - border - radius);
}
.toast.showing {
    opacity: 0;
}
.toast: not(.show) {
    display: none;
}

.toast - container {
    --bs - toast - zindex: 1090;
    position: absolute;
    z - index: var(--bs - toast - zindex);
    width: -webkit - max - content;
    width: -moz - max - content;
    width: max - content;
    max - width: 100 %;
    pointer - events: none;
}
.toast - container > : not(: last - child) {
    margin - bottom: var(--bs - toast - spacing);
}

.toast - header {
    display: flex;
    align - items: center;
    padding: var(--bs - toast - padding - y) var(--bs - toast - padding - x);
    color: var(--bs - toast - header - color);
    background - color: var(--bs - toast - header - bg);
    background - clip: padding - box;
    border - bottom: var(--bs - toast - border - width) solid var(--bs - toast - header - border - color);
    border - top - right - radius: calc(var(--bs - toast - border - radius) - var(--bs - toast - border - width));
    border - top - left - radius: calc(var(--bs - toast - border - radius) - var(--bs - toast - border - width));
}
.toast - header.btn - close {
    margin - left: calc(-0.5 * var(--bs - toast - padding - x));
    margin - right: var(--bs - toast - padding - x);
}

.toast - body {
    padding: var(--bs - toast - padding - x);
    word - wrap: break-word;
}

.modal {
    --bs - modal - zindex: 1055;
    --bs - modal - width: 500px;
    --bs - modal - padding: 1rem;
    --bs - modal - margin: 0.5rem;
    --bs - modal - color: var(--bs - body - color);
    --bs - modal - bg: #222;
    --bs - modal - border - color: var(--bs - border - color - translucent);
    --bs - modal - border - width: var(--bs - border - width);
    --bs - modal - border - radius: var(--bs - border - radius - lg);
    --bs - modal - box - shadow: var(--bs - box - shadow - sm);
    --bs - modal - inner - border - radius: calc(var(--bs - border - radius - lg) - (var(--bs - border - width)));
    --bs - modal - header - padding - x: 1rem;
    --bs - modal - header - padding - y: 1rem;
    --bs - modal - header - padding: 1rem 1rem;
    --bs - modal - header - border - color: #282828;
    --bs - modal - header - border - width: var(--bs - border - width);
    --bs - modal - title - line - height: 1.5;
    --bs - modal - footer - gap: 0.5rem;
    --bs - modal - footer - bg: ;
    --bs - modal - footer - border - color: #282828;
    --bs - modal - footer - border - width: var(--bs - border - width);
    position: fixed;
    top: 0;
    right: 0;
    z - index: var(--bs - modal - zindex);
    display: none;
    width: 100 %;
    height: 100 %;
    overflow - x: hidden;
    overflow - y: auto;
    outline: 0;
}

.modal - dialog {
    position: relative;
    width: auto;
    margin: var(--bs - modal - margin);
    pointer - events: none;
}
.modal.fade.modal - dialog {
    transform: translate(0, -50px);
    transition: transform 0.3s ease - out;
}
@media(prefers - reduced - motion: reduce) {
  .modal.fade.modal - dialog {
        transition: none;
    }
}
.modal.show.modal - dialog {
    transform: none;
}
.modal.modal - static.modal - dialog {
    transform: scale(1.02);
}

.modal - dialog - scrollable {
    height: calc(100 % - var(--bs - modal - margin) * 2);
}
.modal - dialog - scrollable.modal - content {
    max - height: 100 %;
    overflow: hidden;
}
.modal - dialog - scrollable.modal - body {
    overflow - y: auto;
}

.modal - dialog - centered {
    display: flex;
    align - items: center;
    min - height: calc(100 % - var(--bs - modal - margin) * 2);
}

.modal - content {
    position: relative;
    display: flex;
    flex - direction: column;
    width: 100 %;
    color: var(--bs - modal - color);
    pointer - events: auto;
    background - color: var(--bs - modal - bg);
    background - clip: padding - box;
    border: var(--bs - modal - border - width) solid var(--bs - modal - border - color);
    border - radius: var(--bs - modal - border - radius);
    outline: 0;
}

.modal - backdrop {
    --bs - backdrop - zindex: 1050;
    --bs - backdrop - bg: #000;
    --bs - backdrop - opacity: 0.5;
    position: fixed;
    top: 0;
    right: 0;
    z - index: var(--bs - backdrop - zindex);
    width: 100vw;
    height: 100vh;
    background - color: var(--bs - backdrop - bg);
}
.modal - backdrop.fade {
    opacity: 0;
}
.modal - backdrop.show {
    opacity: var(--bs - backdrop - opacity);
}

.modal - header {
    display: flex;
    flex - shrink: 0;
    align - items: center;
    padding: var(--bs - modal - header - padding);
    border - bottom: var(--bs - modal - header - border - width) solid var(--bs - modal - header - border - color);
    border - top - right - radius: var(--bs - modal - inner - border - radius);
    border - top - left - radius: var(--bs - modal - inner - border - radius);
}
.modal - header.btn - close {
    padding: calc(var(--bs - modal - header - padding - y) * 0.5) calc(var(--bs - modal - header - padding - x) * 0.5);
    margin - top: calc(-0.5 * var(--bs - modal - header - padding - y));
    margin - left: calc(-0.5 * var(--bs - modal - header - padding - x));
    margin - bottom: calc(-0.5 * var(--bs - modal - header - padding - y));
    margin - right: auto;
}

.modal - title {
    margin - bottom: 0;
    line - height: var(--bs - modal - title - line - height);
}

.modal - body {
    position: relative;
    flex: 1 1 auto;
    padding: var(--bs - modal - padding);
}

.modal - footer {
    display: flex;
    flex - shrink: 0;
    flex - wrap: wrap;
    align - items: center;
    justify - content: flex - end;
    padding: calc(var(--bs - modal - padding) - var(--bs - modal - footer - gap) * 0.5);
    background - color: var(--bs - modal - footer - bg);
    border - top: var(--bs - modal - footer - border - width) solid var(--bs - modal - footer - border - color);
    border - bottom - left - radius: var(--bs - modal - inner - border - radius);
    border - bottom - right - radius: var(--bs - modal - inner - border - radius);
}
.modal - footer > * {
    margin: calc(var(--bs - modal - footer - gap) * 0.5);
}

@media(min - width: 576px) {
  .modal {
        --bs - modal - margin: 1.75rem;
        --bs - modal - box - shadow: var(--bs - box - shadow);
    }
  .modal - dialog {
        max - width: var(--bs - modal - width);
        margin - left: auto;
        margin - right: auto;
    }
  .modal - sm {
        --bs - modal - width: 300px;
    }
}
@media(min - width: 992px) {
  .modal - lg,
  .modal - xl {
        --bs - modal - width: 800px;
    }
}
@media(min - width: 1200px) {
  .modal - xl {
        --bs - modal - width: 1140px;
    }
}
.modal - fullscreen {
    width: 100vw;
    max - width: none;
    height: 100 %;
    margin: 0;
}
.modal - fullscreen.modal - content {
    height: 100 %;
    border: 0;
    border - radius: 0;
}
.modal - fullscreen.modal - header,
.modal - fullscreen.modal - footer {
    border - radius: 0;
}
.modal - fullscreen.modal - body {
    overflow - y: auto;
}

@media(max - width: 575.98px) {
  .modal - fullscreen - sm - down {
        width: 100vw;
        max - width: none;
        height: 100 %;
        margin: 0;
    }
  .modal - fullscreen - sm - down.modal - content {
        height: 100 %;
        border: 0;
        border - radius: 0;
    }
  .modal - fullscreen - sm - down.modal - header,
  .modal - fullscreen - sm - down.modal - footer {
        border - radius: 0;
    }
  .modal - fullscreen - sm - down.modal - body {
        overflow - y: auto;
    }
}
@media(max - width: 767.98px) {
  .modal - fullscreen - md - down {
        width: 100vw;
        max - width: none;
        height: 100 %;
        margin: 0;
    }
  .modal - fullscreen - md - down.modal - content {
        height: 100 %;
        border: 0;
        border - radius: 0;
    }
  .modal - fullscreen - md - down.modal - header,
  .modal - fullscreen - md - down.modal - footer {
        border - radius: 0;
    }
  .modal - fullscreen - md - down.modal - body {
        overflow - y: auto;
    }
}
@media(max - width: 991.98px) {
  .modal - fullscreen - lg - down {
        width: 100vw;
        max - width: none;
        height: 100 %;
        margin: 0;
    }
  .modal - fullscreen - lg - down.modal - content {
        height: 100 %;
        border: 0;
        border - radius: 0;
    }
  .modal - fullscreen - lg - down.modal - header,
  .modal - fullscreen - lg - down.modal - footer {
        border - radius: 0;
    }
  .modal - fullscreen - lg - down.modal - body {
        overflow - y: auto;
    }
}
@media(max - width: 1199.98px) {
  .modal - fullscreen - xl - down {
        width: 100vw;
        max - width: none;
        height: 100 %;
        margin: 0;
    }
  .modal - fullscreen - xl - down.modal - content {
        height: 100 %;
        border: 0;
        border - radius: 0;
    }
  .modal - fullscreen - xl - down.modal - header,
  .modal - fullscreen - xl - down.modal - footer {
        border - radius: 0;
    }
  .modal - fullscreen - xl - down.modal - body {
        overflow - y: auto;
    }
}
@media(max - width: 1399.98px) {
  .modal - fullscreen - xxl - down {
        width: 100vw;
        max - width: none;
        height: 100 %;
        margin: 0;
    }
  .modal - fullscreen - xxl - down.modal - content {
        height: 100 %;
        border: 0;
        border - radius: 0;
    }
  .modal - fullscreen - xxl - down.modal - header,
  .modal - fullscreen - xxl - down.modal - footer {
        border - radius: 0;
    }
  .modal - fullscreen - xxl - down.modal - body {
        overflow - y: auto;
    }
}
.tooltip {
    --bs - tooltip - zindex: 1080;
    --bs - tooltip - max - width: 200px;
    --bs - tooltip - padding - x: 0.5rem;
    --bs - tooltip - padding - y: 0.25rem;
    --bs - tooltip - margin: ;
    --bs - tooltip - font - size: 0.875rem;
    --bs - tooltip - color: var(--bs - body - bg);
    --bs - tooltip - bg: var(--bs - emphasis - color);
    --bs - tooltip - border - radius: var(--bs - border - radius);
    --bs - tooltip - opacity: 1;
    --bs - tooltip - arrow - width: 0.8rem;
    --bs - tooltip - arrow - height: 0.4rem;
    z - index: var(--bs - tooltip - zindex);
    display: block;
    margin: var(--bs - tooltip - margin);
    font - family: var(--bs - font - sans - serif);
    font - style: normal;
    font - weight: 400;
    line - height: 1.5;
    text - align: right;
    text - align: start;
    text - decoration: none;
    text - shadow: none;
    text - transform: none;
    letter - spacing: normal;
    word -break: normal;
    white - space: normal;
    word - spacing: normal;
    line -break: auto;
    font - size: var(--bs - tooltip - font - size);
    word - wrap: break-word;
    opacity: 0;
}
.tooltip.show {
    opacity: var(--bs - tooltip - opacity);
}
.tooltip.tooltip - arrow {
    display: block;
    width: var(--bs - tooltip - arrow - width);
    height: var(--bs - tooltip - arrow - height);
}
.tooltip.tooltip - arrow:: before {
    position: absolute;
    content: "";
    border - color: transparent;
    border - style: solid;
}

.bs - tooltip - top.tooltip - arrow, .bs - tooltip - auto[data - popper - placement^=top] .tooltip - arrow {
    bottom: calc(-1 * var(--bs - tooltip - arrow - height));
}
.bs - tooltip - top.tooltip - arrow:: before, .bs - tooltip - auto[data - popper - placement^=top] .tooltip - arrow:: before {
    top: -1px;
    border - width: var(--bs - tooltip - arrow - height) calc(var(--bs - tooltip - arrow - width) * 0.5) 0;
    border - top - color: var(--bs - tooltip - bg);
}
.bs - tooltip - end.tooltip - arrow, .bs - tooltip - auto[data - popper - placement^=right] .tooltip - arrow {
    left: calc(-1 * var(--bs - tooltip - arrow - height));
    width: var(--bs - tooltip - arrow - height);
    height: var(--bs - tooltip - arrow - width);
}
.bs - tooltip - end.tooltip - arrow:: before, .bs - tooltip - auto[data - popper - placement^=right] .tooltip - arrow:: before {
    right: -1px;
    border - width: calc(var(--bs - tooltip - arrow - width) * 0.5) var(--bs - tooltip - arrow - height) calc(var(--bs - tooltip - arrow - width) * 0.5) 0;
    border - right - color: var(--bs - tooltip - bg);
}
.bs - tooltip - bottom.tooltip - arrow, .bs - tooltip - auto[data - popper - placement^=bottom] .tooltip - arrow {
    top: calc(-1 * var(--bs - tooltip - arrow - height));
}
.bs - tooltip - bottom.tooltip - arrow:: before, .bs - tooltip - auto[data - popper - placement^=bottom] .tooltip - arrow:: before {
    bottom: -1px;
    border - width: 0 calc(var(--bs - tooltip - arrow - width) * 0.5) var(--bs - tooltip - arrow - height);
    border - bottom - color: var(--bs - tooltip - bg);
}
.bs - tooltip - start.tooltip - arrow, .bs - tooltip - auto[data - popper - placement^=left] .tooltip - arrow {
    right: calc(-1 * var(--bs - tooltip - arrow - height));
    width: var(--bs - tooltip - arrow - height);
    height: var(--bs - tooltip - arrow - width);
}
.bs - tooltip - start.tooltip - arrow:: before, .bs - tooltip - auto[data - popper - placement^=left] .tooltip - arrow:: before {
    left: -1px;
    border - width: calc(var(--bs - tooltip - arrow - width) * 0.5) 0 calc(var(--bs - tooltip - arrow - width) * 0.5) var(--bs - tooltip - arrow - height);
    border - left - color: var(--bs - tooltip - bg);
}
.tooltip - inner {
    max - width: var(--bs - tooltip - max - width);
    padding: var(--bs - tooltip - padding - y) var(--bs - tooltip - padding - x);
    color: var(--bs - tooltip - color);
    text - align: center;
    background - color: var(--bs - tooltip - bg);
    border - radius: var(--bs - tooltip - border - radius);
}

.popover {
    --bs - popover - zindex: 1070;
    --bs - popover - max - width: 276px;
    --bs - popover - font - size: 0.875rem;
    --bs - popover - bg: #282828;
    --bs - popover - border - width: var(--bs - border - width);
    --bs - popover - border - color: var(--bs - border - color - translucent);
    --bs - popover - border - radius: var(--bs - border - radius - lg);
    --bs - popover - inner - border - radius: calc(var(--bs - border - radius - lg) - var(--bs - border - width));
    --bs - popover - box - shadow: var(--bs - box - shadow);
    --bs - popover - header - padding - x: 1rem;
    --bs - popover - header - padding - y: 0.5rem;
    --bs - popover - header - font - size: 1rem;
    --bs - popover - header - color: #fff;
    --bs - popover - header - bg: var(--bs - secondary - bg);
    --bs - popover - body - padding - x: 1rem;
    --bs - popover - body - padding - y: 1rem;
    --bs - popover - body - color: var(--bs - body - color);
    --bs - popover - arrow - width: 1rem;
    --bs - popover - arrow - height: 0.5rem;
    --bs - popover - arrow - border: var(--bs - popover - border - color);
    z - index: var(--bs - popover - zindex);
    display: block;
    max - width: var(--bs - popover - max - width);
    font - family: var(--bs - font - sans - serif);
    font - style: normal;
    font - weight: 400;
    line - height: 1.5;
    text - align: right;
    text - align: start;
    text - decoration: none;
    text - shadow: none;
    text - transform: none;
    letter - spacing: normal;
    word -break: normal;
    white - space: normal;
    word - spacing: normal;
    line -break: auto;
    font - size: var(--bs - popover - font - size);
    word - wrap: break-word;
    background - color: var(--bs - popover - bg);
    background - clip: padding - box;
    border: var(--bs - popover - border - width) solid var(--bs - popover - border - color);
    border - radius: var(--bs - popover - border - radius);
}
.popover.popover - arrow {
    display: block;
    width: var(--bs - popover - arrow - width);
    height: var(--bs - popover - arrow - height);
}
.popover.popover - arrow:: before, .popover.popover - arrow:: after {
    position: absolute;
    display: block;
    content: "";
    border - color: transparent;
    border - style: solid;
    border - width: 0;
}

.bs - popover - top > .popover - arrow, .bs - popover - auto[data - popper - placement^=top] > .popover - arrow {
    bottom: calc(-1 * (var(--bs - popover - arrow - height)) - var(--bs - popover - border - width));
}
.bs - popover - top > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=top] > .popover - arrow:: before, .bs - popover - top > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=top] > .popover - arrow:: after {
    border - width: var(--bs - popover - arrow - height) calc(var(--bs - popover - arrow - width) * 0.5) 0;
}
.bs - popover - top > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=top] > .popover - arrow:: before {
    bottom: 0;
    border - top - color: var(--bs - popover - arrow - border);
}
.bs - popover - top > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=top] > .popover - arrow:: after {
    bottom: var(--bs - popover - border - width);
    border - top - color: var(--bs - popover - bg);
}
.bs - popover - end > .popover - arrow, .bs - popover - auto[data - popper - placement^=right] > .popover - arrow {
    left: calc(-1 * (var(--bs - popover - arrow - height)) - var(--bs - popover - border - width));
    width: var(--bs - popover - arrow - height);
    height: var(--bs - popover - arrow - width);
}
.bs - popover - end > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=right] > .popover - arrow:: before, .bs - popover - end > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=right] > .popover - arrow:: after {
    border - width: calc(var(--bs - popover - arrow - width) * 0.5) var(--bs - popover - arrow - height) calc(var(--bs - popover - arrow - width) * 0.5) 0;
}
.bs - popover - end > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=right] > .popover - arrow:: before {
    left: 0;
    border - right - color: var(--bs - popover - arrow - border);
}
.bs - popover - end > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=right] > .popover - arrow:: after {
    left: var(--bs - popover - border - width);
    border - right - color: var(--bs - popover - bg);
}
.bs - popover - bottom > .popover - arrow, .bs - popover - auto[data - popper - placement^=bottom] > .popover - arrow {
    top: calc(-1 * (var(--bs - popover - arrow - height)) - var(--bs - popover - border - width));
}
.bs - popover - bottom > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=bottom] > .popover - arrow:: before, .bs - popover - bottom > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=bottom] > .popover - arrow:: after {
    border - width: 0 calc(var(--bs - popover - arrow - width) * 0.5) var(--bs - popover - arrow - height);
}
.bs - popover - bottom > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=bottom] > .popover - arrow:: before {
    top: 0;
    border - bottom - color: var(--bs - popover - arrow - border);
}
.bs - popover - bottom > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=bottom] > .popover - arrow:: after {
    top: var(--bs - popover - border - width);
    border - bottom - color: var(--bs - popover - bg);
}
.bs - popover - bottom.popover - header:: before, .bs - popover - auto[data - popper - placement^=bottom] .popover - header:: before {
    position: absolute;
    top: 0;
    right: 50 %;
    display: block;
    width: var(--bs - popover - arrow - width);
    margin - right: calc(-0.5 * var(--bs - popover - arrow - width));
    content: "";
    border - bottom: var(--bs - popover - border - width) solid var(--bs - popover - header - bg);
}
.bs - popover - start > .popover - arrow, .bs - popover - auto[data - popper - placement^=left] > .popover - arrow {
    right: calc(-1 * (var(--bs - popover - arrow - height)) - var(--bs - popover - border - width));
    width: var(--bs - popover - arrow - height);
    height: var(--bs - popover - arrow - width);
}
.bs - popover - start > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=left] > .popover - arrow:: before, .bs - popover - start > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=left] > .popover - arrow:: after {
    border - width: calc(var(--bs - popover - arrow - width) * 0.5) 0 calc(var(--bs - popover - arrow - width) * 0.5) var(--bs - popover - arrow - height);
}
.bs - popover - start > .popover - arrow:: before, .bs - popover - auto[data - popper - placement^=left] > .popover - arrow:: before {
    right: 0;
    border - left - color: var(--bs - popover - arrow - border);
}
.bs - popover - start > .popover - arrow:: after, .bs - popover - auto[data - popper - placement^=left] > .popover - arrow:: after {
    right: var(--bs - popover - border - width);
    border - left - color: var(--bs - popover - bg);
}
.popover - header {
    padding: var(--bs - popover - header - padding - y) var(--bs - popover - header - padding - x);
    margin - bottom: 0;
    font - size: var(--bs - popover - header - font - size);
    color: var(--bs - popover - header - color);
    background - color: var(--bs - popover - header - bg);
    border - bottom: var(--bs - popover - border - width) solid var(--bs - popover - border - color);
    border - top - right - radius: var(--bs - popover - inner - border - radius);
    border - top - left - radius: var(--bs - popover - inner - border - radius);
}
.popover - header: empty {
    display: none;
}

.popover - body {
    padding: var(--bs - popover - body - padding - y) var(--bs - popover - body - padding - x);
    color: var(--bs - popover - body - color);
}

.carousel {
    position: relative;
}

.carousel.pointer - event {
    touch - action: pan - y;
}

.carousel - inner {
    position: relative;
    width: 100 %;
    overflow: hidden;
}
.carousel - inner:: after {
    display: block;
    clear: both;
    content: "";
}

.carousel - item {
    position: relative;
    display: none;
    float: right;
    width: 100 %;
    margin - left: -100 %;
    -webkit - backface - visibility: hidden;
    backface - visibility: hidden;
    transition: transform 0.6s ease -in -out;
}
@media(prefers - reduced - motion: reduce) {
  .carousel - item {
        transition: none;
    }
}

.carousel - item.active,
.carousel - item - next,
.carousel - item - prev {
    display: block;
}

.carousel - item - next: not(.carousel - item - start),
.active.carousel - item - end {
    transform: translateX(-100 %);
}

.carousel - item - prev: not(.carousel - item - end),
.active.carousel - item - start {
    transform: translateX(100 %);
}

.carousel - fade.carousel - item {
    opacity: 0;
    transition - property: opacity;
    transform: none;
}
.carousel - fade.carousel - item.active,
.carousel - fade.carousel - item - next.carousel - item - start,
.carousel - fade.carousel - item - prev.carousel - item - end {
    z - index: 1;
    opacity: 1;
}
.carousel - fade.active.carousel - item - start,
.carousel - fade.active.carousel - item - end {
    z - index: 0;
    opacity: 0;
    transition: opacity 0s 0.6s;
}
@media(prefers - reduced - motion: reduce) {
  .carousel - fade.active.carousel - item - start,
  .carousel - fade.active.carousel - item - end {
        transition: none;
    }
}

.carousel - control - prev,
.carousel - control - next {
    position: absolute;
    top: 0;
    bottom: 0;
    z - index: 1;
    display: flex;
    align - items: center;
    justify - content: center;
    width: 15 %;
    padding: 0;
    color: #fff;
    text - align: center;
    background: none;
    filter: var(--bs - carousel - control - icon - filter);
    border: 0;
    opacity: 0.5;
    transition: opacity 0.15s ease;
}
@media(prefers - reduced - motion: reduce) {
  .carousel - control - prev,
  .carousel - control - next {
        transition: none;
    }
}
.carousel - control - prev: hover, .carousel - control - prev: focus,
.carousel - control - next: hover,
.carousel - control - next: focus {
    color: #fff;
    text - decoration: none;
    outline: 0;
    opacity: 0.9;
}

.carousel - control - prev {
    right: 0;
}

.carousel - control - next {
    left: 0;
}

.carousel - control - prev - icon,
.carousel - control - next - icon {
    display: inline - block;
    width: 2rem;
    height: 2rem;
    background - repeat: no - repeat;
    background - position: 50 %;
    background - size: 100 % 100 %;
}

.carousel - control - prev - icon {
    background - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e");
}

.carousel - control - next - icon {
    background - image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'/%3e%3c/svg%3e");
}

.carousel - indicators {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z - index: 2;
    display: flex;
    justify - content: center;
    padding: 0;
    margin - left: 15 %;
    margin - bottom: 1rem;
    margin - right: 15 %;
}
.carousel - indicators[data - bs - target] {
    box - sizing: content - box;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    padding: 0;
    margin - left: 3px;
    margin - right: 3px;
    text - indent: -999px;
    cursor: pointer;
    background - color: var(--bs - carousel - indicator - active - bg);
    background - clip: padding - box;
    border: 0;
    border - top: 10px solid transparent;
    border - bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.6s ease;
}
@media(prefers - reduced - motion: reduce) {
  .carousel - indicators[data - bs - target] {
        transition: none;
    }
}
.carousel - indicators.active {
    opacity: 1;
}

.carousel - caption {
    position: absolute;
    left: 15 %;
    bottom: 1.25rem;
    right: 15 %;
    padding - top: 1.25rem;
    padding - bottom: 1.25rem;
    color: var(--bs - carousel - caption - color);
    text - align: center;
}

.carousel - dark {
    --bs - carousel - indicator - active - bg: #000;
    --bs - carousel - caption - color: #000;
    --bs - carousel - control - icon - filter: invert(1) grayscale(100);
}

: root,
    [data - bs - theme=light] {
    --bs - carousel - indicator - active - bg: #fff;
    --bs - carousel - caption - color: #fff;
    --bs - carousel - control - icon - filter: ;
}

[data - bs - theme=dark] {
    --bs - carousel - indicator - active - bg: #000;
    --bs - carousel - caption - color: #000;
    --bs - carousel - control - icon - filter: invert(1) grayscale(100);
}

.spinner - grow,
.spinner - border {
    display: inline - block;
    width: var(--bs - spinner - width);
    height: var(--bs - spinner - height);
    vertical - align: var(--bs - spinner - vertical - align);
    border - radius: 50 %;
    animation: var(--bs - spinner - animation - speed) linear infinite var(--bs - spinner - animation - name);
}

@keyframes spinner - border {
    to {
        transform: rotate(360deg);
    }
}
.spinner - border {
    --bs - spinner - width: 2rem;
    --bs - spinner - height: 2rem;
    --bs - spinner - vertical - align: -0.125em;
    --bs - spinner - border - width: 0.25em;
    --bs - spinner - animation - speed: 0.75s;
    --bs - spinner - animation - name: spinner - border;
    border: var(--bs - spinner - border - width) solid currentcolor;
    border - left - color: transparent;
}

.spinner - border - sm {
    --bs - spinner - width: 1rem;
    --bs - spinner - height: 1rem;
    --bs - spinner - border - width: 0.2em;
}

@keyframes spinner - grow {
    0 % {
        transform: scale(0);
    }
    50 % {
        opacity: 1;
        transform: none;
    }
}
.spinner - grow {
    --bs - spinner - width: 2rem;
    --bs - spinner - height: 2rem;
    --bs - spinner - vertical - align: -0.125em;
    --bs - spinner - animation - speed: 0.75s;
    --bs - spinner - animation - name: spinner - grow;
    background - color: currentcolor;
    opacity: 0;
}

.spinner - grow - sm {
    --bs - spinner - width: 1rem;
    --bs - spinner - height: 1rem;
}

@media(prefers - reduced - motion: reduce) {
  .spinner - border,
  .spinner - grow {
        --bs - spinner - animation - speed: 1.5s;
    }
}
.offcanvas, .offcanvas - xxl, .offcanvas - xl, .offcanvas - lg, .offcanvas - md, .offcanvas - sm {
    --bs - offcanvas - zindex: 1045;
    --bs - offcanvas - width: 400px;
    --bs - offcanvas - height: 30vh;
    --bs - offcanvas - padding - x: 1rem;
    --bs - offcanvas - padding - y: 1rem;
    --bs - offcanvas - color: var(--bs - body - color);
    --bs - offcanvas - bg: var(--bs - body - bg);
    --bs - offcanvas - border - width: var(--bs - border - width);
    --bs - offcanvas - border - color: var(--bs - border - color - translucent);
    --bs - offcanvas - box - shadow: var(--bs - box - shadow - sm);
    --bs - offcanvas - transition: transform 0.3s ease -in -out;
    --bs - offcanvas - title - line - height: 1.5;
}

@media(max - width: 575.98px) {
  .offcanvas - sm {
        position: fixed;
        bottom: 0;
        z - index: var(--bs - offcanvas - zindex);
        display: flex;
        flex - direction: column;
        max - width: 100 %;
        color: var(--bs - offcanvas - color);
        visibility: hidden;
        background - color: var(--bs - offcanvas - bg);
        background - clip: padding - box;
        outline: 0;
        transition: var(--bs - offcanvas - transition);
    }
}
@media(max - width: 575.98px) and(prefers - reduced - motion: reduce) {
  .offcanvas - sm {
        transition: none;
    }
}
@media(max - width: 575.98px) {
  .offcanvas - sm.offcanvas - start {
        top: 0;
        right: 0;
        width: var(--bs - offcanvas - width);
        border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(100 %);
    }
  .offcanvas - sm.offcanvas - end {
        top: 0;
        left: 0;
        width: var(--bs - offcanvas - width);
        border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(-100 %);
    }
  .offcanvas - sm.offcanvas - top {
        top: 0;
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(-100 %);
    }
  .offcanvas - sm.offcanvas - bottom {
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(100 %);
    }
  .offcanvas - sm.showing, .offcanvas - sm.show: not(.hiding) {
        transform: none;
    }
  .offcanvas - sm.showing, .offcanvas - sm.hiding, .offcanvas - sm.show {
        visibility: visible;
    }
}
@media(min - width: 576px) {
  .offcanvas - sm {
        --bs - offcanvas - height: auto;
        --bs - offcanvas - border - width: 0;
        background - color: transparent!important;
    }
  .offcanvas - sm.offcanvas - header {
        display: none;
    }
  .offcanvas - sm.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
        background - color: transparent!important;
    }
}

@media(max - width: 767.98px) {
  .offcanvas - md {
        position: fixed;
        bottom: 0;
        z - index: var(--bs - offcanvas - zindex);
        display: flex;
        flex - direction: column;
        max - width: 100 %;
        color: var(--bs - offcanvas - color);
        visibility: hidden;
        background - color: var(--bs - offcanvas - bg);
        background - clip: padding - box;
        outline: 0;
        transition: var(--bs - offcanvas - transition);
    }
}
@media(max - width: 767.98px) and(prefers - reduced - motion: reduce) {
  .offcanvas - md {
        transition: none;
    }
}
@media(max - width: 767.98px) {
  .offcanvas - md.offcanvas - start {
        top: 0;
        right: 0;
        width: var(--bs - offcanvas - width);
        border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(100 %);
    }
  .offcanvas - md.offcanvas - end {
        top: 0;
        left: 0;
        width: var(--bs - offcanvas - width);
        border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(-100 %);
    }
  .offcanvas - md.offcanvas - top {
        top: 0;
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(-100 %);
    }
  .offcanvas - md.offcanvas - bottom {
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(100 %);
    }
  .offcanvas - md.showing, .offcanvas - md.show: not(.hiding) {
        transform: none;
    }
  .offcanvas - md.showing, .offcanvas - md.hiding, .offcanvas - md.show {
        visibility: visible;
    }
}
@media(min - width: 768px) {
  .offcanvas - md {
        --bs - offcanvas - height: auto;
        --bs - offcanvas - border - width: 0;
        background - color: transparent!important;
    }
  .offcanvas - md.offcanvas - header {
        display: none;
    }
  .offcanvas - md.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
        background - color: transparent!important;
    }
}

@media(max - width: 991.98px) {
  .offcanvas - lg {
        position: fixed;
        bottom: 0;
        z - index: var(--bs - offcanvas - zindex);
        display: flex;
        flex - direction: column;
        max - width: 100 %;
        color: var(--bs - offcanvas - color);
        visibility: hidden;
        background - color: var(--bs - offcanvas - bg);
        background - clip: padding - box;
        outline: 0;
        transition: var(--bs - offcanvas - transition);
    }
}
@media(max - width: 991.98px) and(prefers - reduced - motion: reduce) {
  .offcanvas - lg {
        transition: none;
    }
}
@media(max - width: 991.98px) {
  .offcanvas - lg.offcanvas - start {
        top: 0;
        right: 0;
        width: var(--bs - offcanvas - width);
        border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(100 %);
    }
  .offcanvas - lg.offcanvas - end {
        top: 0;
        left: 0;
        width: var(--bs - offcanvas - width);
        border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(-100 %);
    }
  .offcanvas - lg.offcanvas - top {
        top: 0;
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(-100 %);
    }
  .offcanvas - lg.offcanvas - bottom {
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(100 %);
    }
  .offcanvas - lg.showing, .offcanvas - lg.show: not(.hiding) {
        transform: none;
    }
  .offcanvas - lg.showing, .offcanvas - lg.hiding, .offcanvas - lg.show {
        visibility: visible;
    }
}
@media(min - width: 992px) {
  .offcanvas - lg {
        --bs - offcanvas - height: auto;
        --bs - offcanvas - border - width: 0;
        background - color: transparent!important;
    }
  .offcanvas - lg.offcanvas - header {
        display: none;
    }
  .offcanvas - lg.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
        background - color: transparent!important;
    }
}

@media(max - width: 1199.98px) {
  .offcanvas - xl {
        position: fixed;
        bottom: 0;
        z - index: var(--bs - offcanvas - zindex);
        display: flex;
        flex - direction: column;
        max - width: 100 %;
        color: var(--bs - offcanvas - color);
        visibility: hidden;
        background - color: var(--bs - offcanvas - bg);
        background - clip: padding - box;
        outline: 0;
        transition: var(--bs - offcanvas - transition);
    }
}
@media(max - width: 1199.98px) and(prefers - reduced - motion: reduce) {
  .offcanvas - xl {
        transition: none;
    }
}
@media(max - width: 1199.98px) {
  .offcanvas - xl.offcanvas - start {
        top: 0;
        right: 0;
        width: var(--bs - offcanvas - width);
        border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(100 %);
    }
  .offcanvas - xl.offcanvas - end {
        top: 0;
        left: 0;
        width: var(--bs - offcanvas - width);
        border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(-100 %);
    }
  .offcanvas - xl.offcanvas - top {
        top: 0;
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(-100 %);
    }
  .offcanvas - xl.offcanvas - bottom {
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(100 %);
    }
  .offcanvas - xl.showing, .offcanvas - xl.show: not(.hiding) {
        transform: none;
    }
  .offcanvas - xl.showing, .offcanvas - xl.hiding, .offcanvas - xl.show {
        visibility: visible;
    }
}
@media(min - width: 1200px) {
  .offcanvas - xl {
        --bs - offcanvas - height: auto;
        --bs - offcanvas - border - width: 0;
        background - color: transparent!important;
    }
  .offcanvas - xl.offcanvas - header {
        display: none;
    }
  .offcanvas - xl.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
        background - color: transparent!important;
    }
}

@media(max - width: 1399.98px) {
  .offcanvas - xxl {
        position: fixed;
        bottom: 0;
        z - index: var(--bs - offcanvas - zindex);
        display: flex;
        flex - direction: column;
        max - width: 100 %;
        color: var(--bs - offcanvas - color);
        visibility: hidden;
        background - color: var(--bs - offcanvas - bg);
        background - clip: padding - box;
        outline: 0;
        transition: var(--bs - offcanvas - transition);
    }
}
@media(max - width: 1399.98px) and(prefers - reduced - motion: reduce) {
  .offcanvas - xxl {
        transition: none;
    }
}
@media(max - width: 1399.98px) {
  .offcanvas - xxl.offcanvas - start {
        top: 0;
        right: 0;
        width: var(--bs - offcanvas - width);
        border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(100 %);
    }
  .offcanvas - xxl.offcanvas - end {
        top: 0;
        left: 0;
        width: var(--bs - offcanvas - width);
        border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateX(-100 %);
    }
  .offcanvas - xxl.offcanvas - top {
        top: 0;
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(-100 %);
    }
  .offcanvas - xxl.offcanvas - bottom {
        left: 0;
        right: 0;
        height: var(--bs - offcanvas - height);
        max - height: 100 %;
        border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
        transform: translateY(100 %);
    }
  .offcanvas - xxl.showing, .offcanvas - xxl.show: not(.hiding) {
        transform: none;
    }
  .offcanvas - xxl.showing, .offcanvas - xxl.hiding, .offcanvas - xxl.show {
        visibility: visible;
    }
}
@media(min - width: 1400px) {
  .offcanvas - xxl {
        --bs - offcanvas - height: auto;
        --bs - offcanvas - border - width: 0;
        background - color: transparent!important;
    }
  .offcanvas - xxl.offcanvas - header {
        display: none;
    }
  .offcanvas - xxl.offcanvas - body {
        display: flex;
        flex - grow: 0;
        padding: 0;
        overflow - y: visible;
        background - color: transparent!important;
    }
}

.offcanvas {
    position: fixed;
    bottom: 0;
    z - index: var(--bs - offcanvas - zindex);
    display: flex;
    flex - direction: column;
    max - width: 100 %;
    color: var(--bs - offcanvas - color);
    visibility: hidden;
    background - color: var(--bs - offcanvas - bg);
    background - clip: padding - box;
    outline: 0;
    transition: var(--bs - offcanvas - transition);
}
@media(prefers - reduced - motion: reduce) {
  .offcanvas {
        transition: none;
    }
}
.offcanvas.offcanvas - start {
    top: 0;
    right: 0;
    width: var(--bs - offcanvas - width);
    border - left: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
    transform: translateX(100 %);
}
.offcanvas.offcanvas - end {
    top: 0;
    left: 0;
    width: var(--bs - offcanvas - width);
    border - right: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
    transform: translateX(-100 %);
}
.offcanvas.offcanvas - top {
    top: 0;
    left: 0;
    right: 0;
    height: var(--bs - offcanvas - height);
    max - height: 100 %;
    border - bottom: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
    transform: translateY(-100 %);
}
.offcanvas.offcanvas - bottom {
    left: 0;
    right: 0;
    height: var(--bs - offcanvas - height);
    max - height: 100 %;
    border - top: var(--bs - offcanvas - border - width) solid var(--bs - offcanvas - border - color);
    transform: translateY(100 %);
}
.offcanvas.showing, .offcanvas.show: not(.hiding) {
    transform: none;
}
.offcanvas.showing, .offcanvas.hiding, .offcanvas.show {
    visibility: visible;
}

.offcanvas - backdrop {
    position: fixed;
    top: 0;
    right: 0;
    z - index: 1040;
    width: 100vw;
    height: 100vh;
    background - color: #000;
}
.offcanvas - backdrop.fade {
    opacity: 0;
}
.offcanvas - backdrop.show {
    opacity: 0.5;
}

.offcanvas - header {
    display: flex;
    align - items: center;
    padding: var(--bs - offcanvas - padding - y) var(--bs - offcanvas - padding - x);
}
.offcanvas - header.btn - close {
    padding: calc(var(--bs - offcanvas - padding - y) * 0.5) calc(var(--bs - offcanvas - padding - x) * 0.5);
    margin - top: calc(-0.5 * var(--bs - offcanvas - padding - y));
    margin - left: calc(-0.5 * var(--bs - offcanvas - padding - x));
    margin - bottom: calc(-0.5 * var(--bs - offcanvas - padding - y));
    margin - right: auto;
}

.offcanvas - title {
    margin - bottom: 0;
    line - height: var(--bs - offcanvas - title - line - height);
}

.offcanvas - body {
    flex - grow: 1;
    padding: var(--bs - offcanvas - padding - y) var(--bs - offcanvas - padding - x);
    overflow - y: auto;
}

.placeholder {
    display: inline - block;
    min - height: 1em;
    vertical - align: middle;
    cursor: wait;
    background - color: currentcolor;
    opacity: 0.5;
}
.placeholder.btn:: before {
    display: inline - block;
    content: "";
}

.placeholder - xs {
    min - height: 0.6em;
}

.placeholder - sm {
    min - height: 0.8em;
}

.placeholder - lg {
    min - height: 1.2em;
}

.placeholder - glow.placeholder {
    animation: placeholder - glow 2s ease -in -out infinite;
}

@keyframes placeholder - glow {
    50 % {
        opacity: 0.2;
    }
}
.placeholder - wave {
    -webkit - mask - image: linear - gradient(130deg, #000 55 %, rgba(0, 0, 0, 0.8) 75 %, #000 95 %);
    mask - image: linear - gradient(130deg, #000 55 %, rgba(0, 0, 0, 0.8) 75 %, #000 95 %);
    -webkit - mask - size: 200 % 100 %;
    mask - size: 200 % 100 %;
    animation: placeholder - wave 2s linear infinite;
}

@keyframes placeholder - wave {
    100 % {
    - webkit - mask - position: -200 % 0 %;
    mask - position: -200 % 0 %;
}
}
.clearfix:: after {
    display: block;
    clear: both;
    content: "";
}

.text - bg - primary {
    color: #fff!important;
    background - color: RGBA(var(--bs - primary - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - secondary {
    color: #fff!important;
    background - color: RGBA(var(--bs - secondary - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - success {
    color: #fff!important;
    background - color: RGBA(var(--bs - success - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - info {
    color: #fff!important;
    background - color: RGBA(var(--bs - info - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - warning {
    color: #fff!important;
    background - color: RGBA(var(--bs - warning - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - danger {
    color: #fff!important;
    background - color: RGBA(var(--bs - danger - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - light {
    color: #fff!important;
    background - color: RGBA(var(--bs - light - rgb), var(--bs - bg - opacity, 1)) !important;
}

.text - bg - dark {
    color: #000!important;
    background - color: RGBA(var(--bs - dark - rgb), var(--bs - bg - opacity, 1)) !important;
}

.link - primary {
    color: RGBA(var(--bs - primary - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - primary - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - primary - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - primary: hover, .link - primary: focus {
    color: RGBA(34, 127, 171, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(34, 127, 171, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(34, 127, 171, var(--bs - link - underline - opacity, 1)) !important;
}

.link - secondary {
    color: RGBA(var(--bs - secondary - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - secondary - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - secondary - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - secondary: hover, .link - secondary: focus {
    color: RGBA(68, 68, 68, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(68, 68, 68, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(68, 68, 68, var(--bs - link - underline - opacity, 1)) !important;
}

.link - success {
    color: RGBA(var(--bs - success - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - success - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - success - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - success: hover, .link - success: focus {
    color: RGBA(95, 143, 0, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(95, 143, 0, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(95, 143, 0, var(--bs - link - underline - opacity, 1)) !important;
}

.link - info {
    color: RGBA(var(--bs - info - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - info - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - info - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - info: hover, .link - info: focus {
    color: RGBA(122, 41, 163, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(122, 41, 163, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(122, 41, 163, var(--bs - link - underline - opacity, 1)) !important;
}

.link - warning {
    color: RGBA(var(--bs - warning - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - warning - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - warning - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - warning: hover, .link - warning: focus {
    color: RGBA(204, 109, 0, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(204, 109, 0, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(204, 109, 0, var(--bs - link - underline - opacity, 1)) !important;
}

.link - danger {
    color: RGBA(var(--bs - danger - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - danger - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - danger - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - danger: hover, .link - danger: focus {
    color: RGBA(163, 0, 0, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(163, 0, 0, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(163, 0, 0, var(--bs - link - underline - opacity, 1)) !important;
}

.link - light {
    color: RGBA(var(--bs - light - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - light - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - light - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - light: hover, .link - light: focus {
    color: RGBA(27, 27, 27, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(27, 27, 27, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(27, 27, 27, var(--bs - link - underline - opacity, 1)) !important;
}

.link - dark {
    color: RGBA(var(--bs - dark - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - dark - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - dark - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - dark: hover, .link - dark: focus {
    color: RGBA(189, 191, 190, var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(189, 191, 190, var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(189, 191, 190, var(--bs - link - underline - opacity, 1)) !important;
}

.link - body - emphasis {
    color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - opacity, 1)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - underline - opacity, 1)) !important;
}
.link - body - emphasis: hover, .link - body - emphasis: focus {
    color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - opacity, 0.75)) !important;
    -webkit - text - decoration - color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - underline - opacity, 0.75)) !important;
    text - decoration - color: RGBA(var(--bs - emphasis - color - rgb), var(--bs - link - underline - opacity, 0.75)) !important;
}

.focus - ring: focus {
    outline: 0;
    box - shadow: var(--bs - focus - ring - x, 0) var(--bs - focus - ring - y, 0) var(--bs - focus - ring - blur, 0) var(--bs - focus - ring - width) var(--bs - focus - ring - color);
}

.icon - link {
    display: inline - flex;
    gap: 0.375rem;
    align - items: center;
    -webkit - text - decoration - color: rgba(var(--bs - link - color - rgb), var(--bs - link - opacity, 0.5));
    text - decoration - color: rgba(var(--bs - link - color - rgb), var(--bs - link - opacity, 0.5));
    text - underline - offset: 0.25em;
    -webkit - backface - visibility: hidden;
    backface - visibility: hidden;
}
.icon - link > .bi {
    flex - shrink: 0;
    width: 1em;
    height: 1em;
    fill: currentcolor;
    transition: 0.2s ease -in -out transform;
}
@media(prefers - reduced - motion: reduce) {
  .icon - link > .bi {
        transition: none;
    }
}

.icon - link - hover: hover > .bi, .icon - link - hover: focus - visible > .bi {
    transform: var(--bs - icon - link - transform, translate3d(-0.25em, 0, 0));
}

.ratio {
    position: relative;
    width: 100 %;
}
.ratio:: before {
    display: block;
    padding - top: var(--bs - aspect - ratio);
    content: "";
}
.ratio > * {
    position: absolute;
    top: 0;
    right: 0;
    width: 100 %;
    height: 100 %;
}

    .ratio - 1x1 {
    --bs - aspect - ratio: 100 %;
}

.ratio - 4x3 {
    --bs - aspect - ratio: 75 %;
}

.ratio - 16x9 {
    --bs - aspect - ratio: 56.25 %;
}

.ratio - 21x9 {
    --bs - aspect - ratio: 42.8571428571 %;
}

.fixed - top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z - index: 1030;
}

.fixed - bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z - index: 1030;
}

.sticky - top {
    position: -webkit - sticky;
    position: sticky;
    top: 0;
    z - index: 1020;
}

.sticky - bottom {
    position: -webkit - sticky;
    position: sticky;
    bottom: 0;
    z - index: 1020;
}

@media(min - width: 576px) {
  .sticky - sm - top {
        position: -webkit - sticky;
        position: sticky;
        top: 0;
        z - index: 1020;
    }
  .sticky - sm - bottom {
        position: -webkit - sticky;
        position: sticky;
        bottom: 0;
        z - index: 1020;
    }
}
@media(min - width: 768px) {
  .sticky - md - top {
        position: -webkit - sticky;
        position: sticky;
        top: 0;
        z - index: 1020;
    }
  .sticky - md - bottom {
        position: -webkit - sticky;
        position: sticky;
        bottom: 0;
        z - index: 1020;
    }
}
@media(min - width: 992px) {
  .sticky - lg - top {
        position: -webkit - sticky;
        position: sticky;
        top: 0;
        z - index: 1020;
    }
  .sticky - lg - bottom {
        position: -webkit - sticky;
        position: sticky;
        bottom: 0;
        z - index: 1020;
    }
}
@media(min - width: 1200px) {
  .sticky - xl - top {
        position: -webkit - sticky;
        position: sticky;
        top: 0;
        z - index: 1020;
    }
  .sticky - xl - bottom {
        position: -webkit - sticky;
        position: sticky;
        bottom: 0;
        z - index: 1020;
    }
}
@media(min - width: 1400px) {
  .sticky - xxl - top {
        position: -webkit - sticky;
        position: sticky;
        top: 0;
        z - index: 1020;
    }
  .sticky - xxl - bottom {
        position: -webkit - sticky;
        position: sticky;
        bottom: 0;
        z - index: 1020;
    }
}
.hstack {
    display: flex;
    flex - direction: row;
    align - items: center;
    align - self: stretch;
}

.vstack {
    display: flex;
    flex: 1 1 auto;
    flex - direction: column;
    align - self: stretch;
}

.visually - hidden,
.visually - hidden - focusable: not(: focus): not(: focus - within) {
    width: 1px!important;
    height: 1px!important;
    padding: 0!important;
    margin: -1px!important;
    overflow: hidden!important;
    clip: rect(0, 0, 0, 0)!important;
    white - space: nowrap!important;
    border: 0!important;
}
.visually - hidden: not(caption),
.visually - hidden - focusable: not(: focus): not(: focus - within): not(caption) {
    position: absolute!important;
}
.visually - hidden *,
.visually - hidden - focusable: not(: focus): not(: focus - within) * {
    overflow: hidden!important;
}

    .stretched - link:: after {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z - index: 1;
    content: "";
}

.text - truncate {
    overflow: hidden;
    text - overflow: ellipsis;
    white - space: nowrap;
}

.vr {
    display: inline - block;
    align - self: stretch;
    width: var(--bs - border - width);
    min - height: 1em;
    background - color: currentcolor;
    opacity: 0.25;
}

.align - baseline {
    vertical - align: baseline!important;
}

.align - top {
    vertical - align: top!important;
}

.align - middle {
    vertical - align: middle!important;
}

.align - bottom {
    vertical - align: bottom!important;
}

.align - text - bottom {
    vertical - align: text - bottom!important;
}

.align - text - top {
    vertical - align: text - top!important;
}

.float - start {
    float: right!important;
}

.float - end {
    float: left!important;
}

.float - none {
    float: none!important;
}

.object - fit - contain {
    -o - object - fit: contain!important;
    object - fit: contain!important;
}

.object - fit - cover {
    -o - object - fit: cover!important;
    object - fit: cover!important;
}

.object - fit - fill {
    -o - object - fit: fill!important;
    object - fit: fill!important;
}

.object - fit - scale {
    -o - object - fit: scale - down!important;
    object - fit: scale - down!important;
}

.object - fit - none {
    -o - object - fit: none!important;
    object - fit: none!important;
}

.opacity - 0 {
    opacity: 0!important;
}

.opacity - 25 {
    opacity: 0.25!important;
}

.opacity - 50 {
    opacity: 0.5!important;
}

.opacity - 75 {
    opacity: 0.75!important;
}

.opacity - 100 {
    opacity: 1!important;
}

.overflow - auto {
    overflow: auto!important;
}

.overflow - hidden {
    overflow: hidden!important;
}

.overflow - visible {
    overflow: visible!important;
}

.overflow - scroll {
    overflow: scroll!important;
}

.overflow - x - auto {
    overflow - x: auto!important;
}

.overflow - x - hidden {
    overflow - x: hidden!important;
}

.overflow - x - visible {
    overflow - x: visible!important;
}

.overflow - x - scroll {
    overflow - x: scroll!important;
}

.overflow - y - auto {
    overflow - y: auto!important;
}

.overflow - y - hidden {
    overflow - y: hidden!important;
}

.overflow - y - visible {
    overflow - y: visible!important;
}

.overflow - y - scroll {
    overflow - y: scroll!important;
}

.d - inline {
    display: inline!important;
}

.d - inline - block {
    display: inline - block!important;
}

.d - block {
    display: block!important;
}

.d - grid {
    display: grid!important;
}

.d - inline - grid {
    display: inline - grid!important;
}

.d - table {
    display: table!important;
}

.d - table - row {
    display: table - row!important;
}

.d - table - cell {
    display: table - cell!important;
}

.d - flex {
    display: flex!important;
}

.d - inline - flex {
    display: inline - flex!important;
}

.d - none {
    display: none!important;
}

.shadow {
    box - shadow: var(--bs - box - shadow)!important;
}

.shadow - sm {
    box - shadow: var(--bs - box - shadow - sm)!important;
}

.shadow - lg {
    box - shadow: var(--bs - box - shadow - lg)!important;
}

.shadow - none {
    box - shadow: none!important;
}

.focus - ring - primary {
    --bs - focus - ring - color: rgba(var(--bs - primary - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - secondary {
    --bs - focus - ring - color: rgba(var(--bs - secondary - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - success {
    --bs - focus - ring - color: rgba(var(--bs - success - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - info {
    --bs - focus - ring - color: rgba(var(--bs - info - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - warning {
    --bs - focus - ring - color: rgba(var(--bs - warning - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - danger {
    --bs - focus - ring - color: rgba(var(--bs - danger - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - light {
    --bs - focus - ring - color: rgba(var(--bs - light - rgb), var(--bs - focus - ring - opacity));
}

.focus - ring - dark {
    --bs - focus - ring - color: rgba(var(--bs - dark - rgb), var(--bs - focus - ring - opacity));
}

.position - static {
    position: static!important;
}

.position - relative {
    position: relative!important;
}

.position - absolute {
    position: absolute!important;
}

.position - fixed {
    position: fixed!important;
}

.position - sticky {
    position: -webkit - sticky!important;
    position: sticky!important;
}

.top - 0 {
    top: 0!important;
}

.top - 50 {
    top: 50 % !important;
}

.top - 100 {
    top: 100 % !important;
}

.bottom - 0 {
    bottom: 0!important;
}

.bottom - 50 {
    bottom: 50 % !important;
}

.bottom - 100 {
    bottom: 100 % !important;
}

.start - 0 {
    right: 0!important;
}

.start - 50 {
    right: 50 % !important;
}

.start - 100 {
    right: 100 % !important;
}

.end - 0 {
    left: 0!important;
}

.end - 50 {
    left: 50 % !important;
}

.end - 100 {
    left: 100 % !important;
}

.translate - middle {
    transform: translate(50 %, -50 %)!important;
}

.translate - middle - x {
    transform: translateX(50 %)!important;
}

.translate - middle - y {
    transform: translateY(-50 %)!important;
}

.border {
    border: var(--bs - border - width) var(--bs - border - style) var(--bs - border - color)!important;
}

.border - 0 {
    border: 0!important;
}

.border - top {
    border - top: var(--bs - border - width) var(--bs - border - style) var(--bs - border - color)!important;
}

.border - top - 0 {
    border - top: 0!important;
}

.border - end {
    border - left: var(--bs - border - width) var(--bs - border - style) var(--bs - border - color)!important;
}

.border - end - 0 {
    border - left: 0!important;
}

.border - bottom {
    border - bottom: var(--bs - border - width) var(--bs - border - style) var(--bs - border - color)!important;
}

.border - bottom - 0 {
    border - bottom: 0!important;
}

.border - start {
    border - right: var(--bs - border - width) var(--bs - border - style) var(--bs - border - color)!important;
}

.border - start - 0 {
    border - right: 0!important;
}

.border - primary {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - primary - rgb), var(--bs - border - opacity)) !important;
}

.border - secondary {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - secondary - rgb), var(--bs - border - opacity)) !important;
}

.border - success {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - success - rgb), var(--bs - border - opacity)) !important;
}

.border - info {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - info - rgb), var(--bs - border - opacity)) !important;
}

.border - warning {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - warning - rgb), var(--bs - border - opacity)) !important;
}

.border - danger {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - danger - rgb), var(--bs - border - opacity)) !important;
}

.border - light {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - light - rgb), var(--bs - border - opacity)) !important;
}

.border - dark {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - dark - rgb), var(--bs - border - opacity)) !important;
}

.border - black {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - black - rgb), var(--bs - border - opacity)) !important;
}

.border - white {
    --bs - border - opacity: 1;
    border - color: rgba(var(--bs - white - rgb), var(--bs - border - opacity)) !important;
}

.border - primary - subtle {
    border - color: var(--bs - primary - border - subtle)!important;
}

.border - secondary - subtle {
    border - color: var(--bs - secondary - border - subtle)!important;
}

.border - success - subtle {
    border - color: var(--bs - success - border - subtle)!important;
}

.border - info - subtle {
    border - color: var(--bs - info - border - subtle)!important;
}

.border - warning - subtle {
    border - color: var(--bs - warning - border - subtle)!important;
}

.border - danger - subtle {
    border - color: var(--bs - danger - border - subtle)!important;
}

.border - light - subtle {
    border - color: var(--bs - light - border - subtle)!important;
}

.border - dark - subtle {
    border - color: var(--bs - dark - border - subtle)!important;
}

.border - 1 {
    border - width: 1px!important;
}

.border - 2 {
    border - width: 2px!important;
}

.border - 3 {
    border - width: 3px!important;
}

.border - 4 {
    border - width: 4px!important;
}

.border - 5 {
    border - width: 5px!important;
}

.border - opacity - 10 {
    --bs - border - opacity: 0.1;
}

.border - opacity - 25 {
    --bs - border - opacity: 0.25;
}

.border - opacity - 50 {
    --bs - border - opacity: 0.5;
}

.border - opacity - 75 {
    --bs - border - opacity: 0.75;
}

.border - opacity - 100 {
    --bs - border - opacity: 1;
}

.w - 25 {
    width: 25 % !important;
}

.w - 50 {
    width: 50 % !important;
}

.w - 75 {
    width: 75 % !important;
}

.w - 100 {
    width: 100 % !important;
}

.w - auto {
    width: auto!important;
}

.mw - 100 {
    max - width: 100 % !important;
}

.vw - 100 {
    width: 100vw!important;
}

.min - vw - 100 {
    min - width: 100vw!important;
}

.h - 25 {
    height: 25 % !important;
}

.h - 50 {
    height: 50 % !important;
}

.h - 75 {
    height: 75 % !important;
}

.h - 100 {
    height: 100 % !important;
}

.h - auto {
    height: auto!important;
}

.mh - 100 {
    max - height: 100 % !important;
}

.vh - 100 {
    height: 100vh!important;
}

.min - vh - 100 {
    min - height: 100vh!important;
}

.flex - fill {
    flex: 1 1 auto!important;
}

.flex - row {
    flex - direction: row!important;
}

.flex - column {
    flex - direction: column!important;
}

.flex - row - reverse {
    flex - direction: row - reverse!important;
}

.flex - column - reverse {
    flex - direction: column - reverse!important;
}

.flex - grow - 0 {
    flex - grow: 0!important;
}

.flex - grow - 1 {
    flex - grow: 1!important;
}

.flex - shrink - 0 {
    flex - shrink: 0!important;
}

.flex - shrink - 1 {
    flex - shrink: 1!important;
}

.flex - wrap {
    flex - wrap: wrap!important;
}

.flex - nowrap {
    flex - wrap: nowrap!important;
}

.flex - wrap - reverse {
    flex - wrap: wrap - reverse!important;
}

.justify - content - start {
    justify - content: flex - start!important;
}

.justify - content - end {
    justify - content: flex - end!important;
}

.justify - content - center {
    justify - content: center!important;
}

.justify - content - between {
    justify - content: space - between!important;
}

.justify - content - around {
    justify - content: space - around!important;
}

.justify - content - evenly {
    justify - content: space - evenly!important;
}

.align - items - start {
    align - items: flex - start!important;
}

.align - items - end {
    align - items: flex - end!important;
}

.align - items - center {
    align - items: center!important;
}

.align - items - baseline {
    align - items: baseline!important;
}

.align - items - stretch {
    align - items: stretch!important;
}

.align - content - start {
    align - content: flex - start!important;
}

.align - content - end {
    align - content: flex - end!important;
}

.align - content - center {
    align - content: center!important;
}

.align - content - between {
    align - content: space - between!important;
}

.align - content - around {
    align - content: space - around!important;
}

.align - content - stretch {
    align - content: stretch!important;
}

.align - self - auto {
    align - self: auto!important;
}

.align - self - start {
    align - self: flex - start!important;
}

.align - self - end {
    align - self: flex - end!important;
}

.align - self - center {
    align - self: center!important;
}

.align - self - baseline {
    align - self: baseline!important;
}

.align - self - stretch {
    align - self: stretch!important;
}

.order - first {
    order: -1!important;
}

.order - 0 {
    order: 0!important;
}

.order - 1 {
    order: 1!important;
}

.order - 2 {
    order: 2!important;
}

.order - 3 {
    order: 3!important;
}

.order - 4 {
    order: 4!important;
}

.order - 5 {
    order: 5!important;
}

.order - last {
    order: 6!important;
}

.m - 0 {
    margin: 0!important;
}

.m - 1 {
    margin: 0.25rem!important;
}

.m - 2 {
    margin: 0.5rem!important;
}

.m - 3 {
    margin: 1rem!important;
}

.m - 4 {
    margin: 1.5rem!important;
}

.m - 5 {
    margin: 3rem!important;
}

.m - auto {
    margin: auto!important;
}

.mx - 0 {
    margin - left: 0!important;
    margin - right: 0!important;
}

.mx - 1 {
    margin - left: 0.25rem!important;
    margin - right: 0.25rem!important;
}

.mx - 2 {
    margin - left: 0.5rem!important;
    margin - right: 0.5rem!important;
}

.mx - 3 {
    margin - left: 1rem!important;
    margin - right: 1rem!important;
}

.mx - 4 {
    margin - left: 1.5rem!important;
    margin - right: 1.5rem!important;
}

.mx - 5 {
    margin - left: 3rem!important;
    margin - right: 3rem!important;
}

.mx - auto {
    margin - left: auto!important;
    margin - right: auto!important;
}

.my - 0 {
    margin - top: 0!important;
    margin - bottom: 0!important;
}

.my - 1 {
    margin - top: 0.25rem!important;
    margin - bottom: 0.25rem!important;
}

.my - 2 {
    margin - top: 0.5rem!important;
    margin - bottom: 0.5rem!important;
}

.my - 3 {
    margin - top: 1rem!important;
    margin - bottom: 1rem!important;
}

.my - 4 {
    margin - top: 1.5rem!important;
    margin - bottom: 1.5rem!important;
}

.my - 5 {
    margin - top: 3rem!important;
    margin - bottom: 3rem!important;
}

.my - auto {
    margin - top: auto!important;
    margin - bottom: auto!important;
}

.mt - 0 {
    margin - top: 0!important;
}

.mt - 1 {
    margin - top: 0.25rem!important;
}

.mt - 2 {
    margin - top: 0.5rem!important;
}

.mt - 3 {
    margin - top: 1rem!important;
}

.mt - 4 {
    margin - top: 1.5rem!important;
}

.mt - 5 {
    margin - top: 3rem!important;
}

.mt - auto {
    margin - top: auto!important;
}

.me - 0 {
    margin - left: 0!important;
}

.me - 1 {
    margin - left: 0.25rem!important;
}

.me - 2 {
    margin - left: 0.5rem!important;
}

.me - 3 {
    margin - left: 1rem!important;
}

.me - 4 {
    margin - left: 1.5rem!important;
}

.me - 5 {
    margin - left: 3rem!important;
}

.me - auto {
    margin - left: auto!important;
}

.mb - 0 {
    margin - bottom: 0!important;
}

.mb - 1 {
    margin - bottom: 0.25rem!important;
}

.mb - 2 {
    margin - bottom: 0.5rem!important;
}

.mb - 3 {
    margin - bottom: 1rem!important;
}

.mb - 4 {
    margin - bottom: 1.5rem!important;
}

.mb - 5 {
    margin - bottom: 3rem!important;
}

.mb - auto {
    margin - bottom: auto!important;
}

.ms - 0 {
    margin - right: 0!important;
}

.ms - 1 {
    margin - right: 0.25rem!important;
}

.ms - 2 {
    margin - right: 0.5rem!important;
}

.ms - 3 {
    margin - right: 1rem!important;
}

.ms - 4 {
    margin - right: 1.5rem!important;
}

.ms - 5 {
    margin - right: 3rem!important;
}

.ms - auto {
    margin - right: auto!important;
}

.p - 0 {
    padding: 0!important;
}

.p - 1 {
    padding: 0.25rem!important;
}

.p - 2 {
    padding: 0.5rem!important;
}

.p - 3 {
    padding: 1rem!important;
}

.p - 4 {
    padding: 1.5rem!important;
}

.p - 5 {
    padding: 3rem!important;
}

.px - 0 {
    padding - left: 0!important;
    padding - right: 0!important;
}

.px - 1 {
    padding - left: 0.25rem!important;
    padding - right: 0.25rem!important;
}

.px - 2 {
    padding - left: 0.5rem!important;
    padding - right: 0.5rem!important;
}

.px - 3 {
    padding - left: 1rem!important;
    padding - right: 1rem!important;
}

.px - 4 {
    padding - left: 1.5rem!important;
    padding - right: 1.5rem!important;
}

.px - 5 {
    padding - left: 3rem!important;
    padding - right: 3rem!important;
}

.py - 0 {
    padding - top: 0!important;
    padding - bottom: 0!important;
}

.py - 1 {
    padding - top: 0.25rem!important;
    padding - bottom: 0.25rem!important;
}

.py - 2 {
    padding - top: 0.5rem!important;
    padding - bottom: 0.5rem!important;
}

.py - 3 {
    padding - top: 1rem!important;
    padding - bottom: 1rem!important;
}

.py - 4 {
    padding - top: 1.5rem!important;
    padding - bottom: 1.5rem!important;
}

.py - 5 {
    padding - top: 3rem!important;
    padding - bottom: 3rem!important;
}

.pt - 0 {
    padding - top: 0!important;
}

.pt - 1 {
    padding - top: 0.25rem!important;
}

.pt - 2 {
    padding - top: 0.5rem!important;
}

.pt - 3 {
    padding - top: 1rem!important;
}

.pt - 4 {
    padding - top: 1.5rem!important;
}

.pt - 5 {
    padding - top: 3rem!important;
}

.pe - 0 {
    padding - left: 0!important;
}

.pe - 1 {
    padding - left: 0.25rem!important;
}

.pe - 2 {
    padding - left: 0.5rem!important;
}

.pe - 3 {
    padding - left: 1rem!important;
}

.pe - 4 {
    padding - left: 1.5rem!important;
}

.pe - 5 {
    padding - left: 3rem!important;
}

.pb - 0 {
    padding - bottom: 0!important;
}

.pb - 1 {
    padding - bottom: 0.25rem!important;
}

.pb - 2 {
    padding - bottom: 0.5rem!important;
}

.pb - 3 {
    padding - bottom: 1rem!important;
}

.pb - 4 {
    padding - bottom: 1.5rem!important;
}

.pb - 5 {
    padding - bottom: 3rem!important;
}

.ps - 0 {
    padding - right: 0!important;
}

.ps - 1 {
    padding - right: 0.25rem!important;
}

.ps - 2 {
    padding - right: 0.5rem!important;
}

.ps - 3 {
    padding - right: 1rem!important;
}

.ps - 4 {
    padding - right: 1.5rem!important;
}

.ps - 5 {
    padding - right: 3rem!important;
}

.gap - 0 {
    gap: 0!important;
}

.gap - 1 {
    gap: 0.25rem!important;
}

.gap - 2 {
    gap: 0.5rem!important;
}

.gap - 3 {
    gap: 1rem!important;
}

.gap - 4 {
    gap: 1.5rem!important;
}

.gap - 5 {
    gap: 3rem!important;
}

.row - gap - 0 {
    row - gap: 0!important;
}

.row - gap - 1 {
    row - gap: 0.25rem!important;
}

.row - gap - 2 {
    row - gap: 0.5rem!important;
}

.row - gap - 3 {
    row - gap: 1rem!important;
}

.row - gap - 4 {
    row - gap: 1.5rem!important;
}

.row - gap - 5 {
    row - gap: 3rem!important;
}

.column - gap - 0 {
    -moz - column - gap: 0!important;
    column - gap: 0!important;
}

.column - gap - 1 {
    -moz - column - gap: 0.25rem!important;
    column - gap: 0.25rem!important;
}

.column - gap - 2 {
    -moz - column - gap: 0.5rem!important;
    column - gap: 0.5rem!important;
}

.column - gap - 3 {
    -moz - column - gap: 1rem!important;
    column - gap: 1rem!important;
}

.column - gap - 4 {
    -moz - column - gap: 1.5rem!important;
    column - gap: 1.5rem!important;
}

.column - gap - 5 {
    -moz - column - gap: 3rem!important;
    column - gap: 3rem!important;
}

.font - monospace {
    font - family: var(--bs - font - monospace)!important;
}

.fs - 1 {
    font - size: calc(1.525rem + 3.3vw)!important;
}

.fs - 2 {
    font - size: calc(1.425rem + 2.1vw)!important;
}

.fs - 3 {
    font - size: calc(1.375rem + 1.5vw)!important;
}

.fs - 4 {
    font - size: calc(1.325rem + 0.9vw)!important;
}

.fs - 5 {
    font - size: calc(1.275rem + 0.3vw)!important;
}

.fs - 6 {
    font - size: 1rem!important;
}

.fst - italic {
    font - style: italic!important;
}

.fst - normal {
    font - style: normal!important;
}

.fw - lighter {
    font - weight: lighter!important;
}

.fw - light {
    font - weight: 300!important;
}

.fw - normal {
    font - weight: 400!important;
}

.fw - medium {
    font - weight: 500!important;
}

.fw - semibold {
    font - weight: 600!important;
}

.fw - bold {
    font - weight: 700!important;
}

.fw - bolder {
    font - weight: bolder!important;
}

.lh - 1 {
    line - height: 1!important;
}

.lh - sm {
    line - height: 1.25!important;
}

.lh - base {
    line - height: 1.5!important;
}

.lh - lg {
    line - height: 2!important;
}

.text - start {
    text - align: right!important;
}

.text - end {
    text - align: left!important;
}

.text - center {
    text - align: center!important;
}

.text - decoration - none {
    text - decoration: none!important;
}

.text - decoration - underline {
    text - decoration: underline!important;
}

.text - decoration - line - through {
    text - decoration: line - through!important;
}

.text - lowercase {
    text - transform: lowercase!important;
}

.text - uppercase {
    text - transform: uppercase!important;
}

.text - capitalize {
    text - transform: capitalize!important;
}

.text - wrap {
    white - space: normal!important;
}

.text - nowrap {
    white - space: nowrap!important;
}
.text - primary {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - primary - rgb), var(--bs - text - opacity)) !important;
}

.text - secondary {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - secondary - rgb), var(--bs - text - opacity)) !important;
}

.text - success {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - success - rgb), var(--bs - text - opacity)) !important;
}

.text - info {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - info - rgb), var(--bs - text - opacity)) !important;
}

.text - warning {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - warning - rgb), var(--bs - text - opacity)) !important;
}

.text - danger {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - danger - rgb), var(--bs - text - opacity)) !important;
}

.text - light {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - light - rgb), var(--bs - text - opacity)) !important;
}

.text - dark {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - dark - rgb), var(--bs - text - opacity)) !important;
}

.text - black {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - black - rgb), var(--bs - text - opacity)) !important;
}

.text - white {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - white - rgb), var(--bs - text - opacity)) !important;
}

.text - body {
    --bs - text - opacity: 1;
    color: rgba(var(--bs - body - color - rgb), var(--bs - text - opacity)) !important;
}

.text - muted {
    --bs - text - opacity: 1;
    color: var(--bs - secondary - color)!important;
}

.text - black - 50 {
    --bs - text - opacity: 1;
    color: rgba(0, 0, 0, 0.5)!important;
}

.text - white - 50 {
    --bs - text - opacity: 1;
    color: rgba(255, 255, 255, 0.5)!important;
}

.text - body - secondary {
    --bs - text - opacity: 1;
    color: var(--bs - secondary - color)!important;
}

.text - body - tertiary {
    --bs - text - opacity: 1;
    color: var(--bs - tertiary - color)!important;
}

.text - body - emphasis {
    --bs - text - opacity: 1;
    color: var(--bs - emphasis - color)!important;
}

.text - reset {
    --bs - text - opacity: 1;
    color: inherit!important;
}

.text - opacity - 25 {
    --bs - text - opacity: 0.25;
}

.text - opacity - 50 {
    --bs - text - opacity: 0.5;
}

.text - opacity - 75 {
    --bs - text - opacity: 0.75;
}

.text - opacity - 100 {
    --bs - text - opacity: 1;
}

.text - primary - emphasis {
    color: var(--bs - primary - text - emphasis)!important;
}

.text - secondary - emphasis {
    color: var(--bs - secondary - text - emphasis)!important;
}

.text - success - emphasis {
    color: var(--bs - success - text - emphasis)!important;
}

.text - info - emphasis {
    color: var(--bs - info - text - emphasis)!important;
}

.text - warning - emphasis {
    color: var(--bs - warning - text - emphasis)!important;
}

.text - danger - emphasis {
    color: var(--bs - danger - text - emphasis)!important;
}

.text - light - emphasis {
    color: var(--bs - light - text - emphasis)!important;
}

.text - dark - emphasis {
    color: var(--bs - dark - text - emphasis)!important;
}

.link - opacity - 10 {
    --bs - link - opacity: 0.1;
}

.link - opacity - 10 - hover: hover {
    --bs - link - opacity: 0.1;
}

.link - opacity - 25 {
    --bs - link - opacity: 0.25;
}

.link - opacity - 25 - hover: hover {
    --bs - link - opacity: 0.25;
}

.link - opacity - 50 {
    --bs - link - opacity: 0.5;
}

.link - opacity - 50 - hover: hover {
    --bs - link - opacity: 0.5;
}

.link - opacity - 75 {
    --bs - link - opacity: 0.75;
}

.link - opacity - 75 - hover: hover {
    --bs - link - opacity: 0.75;
}

.link - opacity - 100 {
    --bs - link - opacity: 1;
}

.link - opacity - 100 - hover: hover {
    --bs - link - opacity: 1;
}

.link - offset - 1 {
    text - underline - offset: 0.125em!important;
}

.link - offset - 1 - hover: hover {
    text - underline - offset: 0.125em!important;
}

.link - offset - 2 {
    text - underline - offset: 0.25em!important;
}

.link - offset - 2 - hover: hover {
    text - underline - offset: 0.25em!important;
}

.link - offset - 3 {
    text - underline - offset: 0.375em!important;
}

.link - offset - 3 - hover: hover {
    text - underline - offset: 0.375em!important;
}

.link - underline - primary {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - primary - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - primary - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - secondary {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - secondary - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - secondary - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - success {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - success - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - success - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - info {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - info - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - info - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - warning {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - warning - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - warning - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - danger {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - danger - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - danger - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - light {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - light - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - light - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline - dark {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - dark - rgb), var(--bs - link - underline - opacity)) !important;
    text - decoration - color: rgba(var(--bs - dark - rgb), var(--bs - link - underline - opacity)) !important;
}

.link - underline {
    --bs - link - underline - opacity: 1;
    -webkit - text - decoration - color: rgba(var(--bs - link - color - rgb), var(--bs - link - underline - opacity, 1)) !important;
    text - decoration - color: rgba(var(--bs - link - color - rgb), var(--bs - link - underline - opacity, 1)) !important;
}

.link - underline - opacity - 0 {
    --bs - link - underline - opacity: 0;
}

.link - underline - opacity - 0 - hover: hover {
    --bs - link - underline - opacity: 0;
}

.link - underline - opacity - 10 {
    --bs - link - underline - opacity: 0.1;
}

.link - underline - opacity - 10 - hover: hover {
    --bs - link - underline - opacity: 0.1;
}

.link - underline - opacity - 25 {
    --bs - link - underline - opacity: 0.25;
}

.link - underline - opacity - 25 - hover: hover {
    --bs - link - underline - opacity: 0.25;
}

.link - underline - opacity - 50 {
    --bs - link - underline - opacity: 0.5;
}

.link - underline - opacity - 50 - hover: hover {
    --bs - link - underline - opacity: 0.5;
}

.link - underline - opacity - 75 {
    --bs - link - underline - opacity: 0.75;
}

.link - underline - opacity - 75 - hover: hover {
    --bs - link - underline - opacity: 0.75;
}

.link - underline - opacity - 100 {
    --bs - link - underline - opacity: 1;
}

.link - underline - opacity - 100 - hover: hover {
    --bs - link - underline - opacity: 1;
}

.bg - primary {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - primary - rgb), var(--bs - bg - opacity)) !important;
}

.bg - secondary {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - secondary - rgb), var(--bs - bg - opacity)) !important;
}

.bg - success {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - success - rgb), var(--bs - bg - opacity)) !important;
}

.bg - info {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - info - rgb), var(--bs - bg - opacity)) !important;
}

.bg - warning {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - warning - rgb), var(--bs - bg - opacity)) !important;
}

.bg - danger {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - danger - rgb), var(--bs - bg - opacity)) !important;
}

.bg - light {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - light - rgb), var(--bs - bg - opacity)) !important;
}

.bg - dark {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - dark - rgb), var(--bs - bg - opacity)) !important;
}

.bg - black {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - black - rgb), var(--bs - bg - opacity)) !important;
}

.bg - white {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - white - rgb), var(--bs - bg - opacity)) !important;
}

.bg - body {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - body - bg - rgb), var(--bs - bg - opacity)) !important;
}

.bg - transparent {
    --bs - bg - opacity: 1;
    background - color: transparent!important;
}

.bg - body - secondary {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - secondary - bg - rgb), var(--bs - bg - opacity)) !important;
}

.bg - body - tertiary {
    --bs - bg - opacity: 1;
    background - color: rgba(var(--bs - tertiary - bg - rgb), var(--bs - bg - opacity)) !important;
}

.bg - opacity - 10 {
    --bs - bg - opacity: 0.1;
}

.bg - opacity - 25 {
    --bs - bg - opacity: 0.25;
}

.bg - opacity - 50 {
    --bs - bg - opacity: 0.5;
}

.bg - opacity - 75 {
    --bs - bg - opacity: 0.75;
}

.bg - opacity - 100 {
    --bs - bg - opacity: 1;
}

.bg - primary - subtle {
    background - color: var(--bs - primary - bg - subtle)!important;
}

.bg - secondary - subtle {
    background - color: var(--bs - secondary - bg - subtle)!important;
}

.bg - success - subtle {
    background - color: var(--bs - success - bg - subtle)!important;
}

.bg - info - subtle {
    background - color: var(--bs - info - bg - subtle)!important;
}

.bg - warning - subtle {
    background - color: var(--bs - warning - bg - subtle)!important;
}

.bg - danger - subtle {
    background - color: var(--bs - danger - bg - subtle)!important;
}

.bg - light - subtle {
    background - color: var(--bs - light - bg - subtle)!important;
}

.bg - dark - subtle {
    background - color: var(--bs - dark - bg - subtle)!important;
}

.bg - gradient {
    background - image: var(--bs - gradient)!important;
}

.user - select - all {
    -webkit - user - select: all!important;
    -moz - user - select: all!important;
    user - select: all!important;
}

.user - select - auto {
    -webkit - user - select: auto!important;
    -moz - user - select: auto!important;
    user - select: auto!important;
}

.user - select - none {
    -webkit - user - select: none!important;
    -moz - user - select: none!important;
    user - select: none!important;
}

.pe - none {
    pointer - events: none!important;
}

.pe - auto {
    pointer - events: auto!important;
}

.rounded {
    border - radius: var(--bs - border - radius)!important;
}

.rounded - 0 {
    border - radius: 0!important;
}

.rounded - 1 {
    border - radius: var(--bs - border - radius - sm)!important;
}

.rounded - 2 {
    border - radius: var(--bs - border - radius)!important;
}

.rounded - 3 {
    border - radius: var(--bs - border - radius - lg)!important;
}

.rounded - 4 {
    border - radius: var(--bs - border - radius - xl)!important;
}

.rounded - 5 {
    border - radius: var(--bs - border - radius - xxl)!important;
}

.rounded - circle {
    border - radius: 50 % !important;
}

.rounded - pill {
    border - radius: var(--bs - border - radius - pill)!important;
}

.rounded - top {
    border - top - right - radius: var(--bs - border - radius)!important;
    border - top - left - radius: var(--bs - border - radius)!important;
}

.rounded - top - 0 {
    border - top - right - radius: 0!important;
    border - top - left - radius: 0!important;
}

.rounded - top - 1 {
    border - top - right - radius: var(--bs - border - radius - sm)!important;
    border - top - left - radius: var(--bs - border - radius - sm)!important;
}

.rounded - top - 2 {
    border - top - right - radius: var(--bs - border - radius)!important;
    border - top - left - radius: var(--bs - border - radius)!important;
}

.rounded - top - 3 {
    border - top - right - radius: var(--bs - border - radius - lg)!important;
    border - top - left - radius: var(--bs - border - radius - lg)!important;
}

.rounded - top - 4 {
    border - top - right - radius: var(--bs - border - radius - xl)!important;
    border - top - left - radius: var(--bs - border - radius - xl)!important;
}

.rounded - top - 5 {
    border - top - right - radius: var(--bs - border - radius - xxl)!important;
    border - top - left - radius: var(--bs - border - radius - xxl)!important;
}

.rounded - top - circle {
    border - top - right - radius: 50 % !important;
    border - top - left - radius: 50 % !important;
}

.rounded - top - pill {
    border - top - right - radius: var(--bs - border - radius - pill)!important;
    border - top - left - radius: var(--bs - border - radius - pill)!important;
}

.rounded - end {
    border - top - left - radius: var(--bs - border - radius)!important;
    border - bottom - left - radius: var(--bs - border - radius)!important;
}

.rounded - end - 0 {
    border - top - left - radius: 0!important;
    border - bottom - left - radius: 0!important;
}

.rounded - end - 1 {
    border - top - left - radius: var(--bs - border - radius - sm)!important;
    border - bottom - left - radius: var(--bs - border - radius - sm)!important;
}

.rounded - end - 2 {
    border - top - left - radius: var(--bs - border - radius)!important;
    border - bottom - left - radius: var(--bs - border - radius)!important;
}

.rounded - end - 3 {
    border - top - left - radius: var(--bs - border - radius - lg)!important;
    border - bottom - left - radius: var(--bs - border - radius - lg)!important;
}

.rounded - end - 4 {
    border - top - left - radius: var(--bs - border - radius - xl)!important;
    border - bottom - left - radius: var(--bs - border - radius - xl)!important;
}

.rounded - end - 5 {
    border - top - left - radius: var(--bs - border - radius - xxl)!important;
    border - bottom - left - radius: var(--bs - border - radius - xxl)!important;
}

.rounded - end - circle {
    border - top - left - radius: 50 % !important;
    border - bottom - left - radius: 50 % !important;
}

.rounded - end - pill {
    border - top - left - radius: var(--bs - border - radius - pill)!important;
    border - bottom - left - radius: var(--bs - border - radius - pill)!important;
}

.rounded - bottom {
    border - bottom - left - radius: var(--bs - border - radius)!important;
    border - bottom - right - radius: var(--bs - border - radius)!important;
}

.rounded - bottom - 0 {
    border - bottom - left - radius: 0!important;
    border - bottom - right - radius: 0!important;
}

.rounded - bottom - 1 {
    border - bottom - left - radius: var(--bs - border - radius - sm)!important;
    border - bottom - right - radius: var(--bs - border - radius - sm)!important;
}

.rounded - bottom - 2 {
    border - bottom - left - radius: var(--bs - border - radius)!important;
    border - bottom - right - radius: var(--bs - border - radius)!important;
}

.rounded - bottom - 3 {
    border - bottom - left - radius: var(--bs - border - radius - lg)!important;
    border - bottom - right - radius: var(--bs - border - radius - lg)!important;
}

.rounded - bottom - 4 {
    border - bottom - left - radius: var(--bs - border - radius - xl)!important;
    border - bottom - right - radius: var(--bs - border - radius - xl)!important;
}

.rounded - bottom - 5 {
    border - bottom - left - radius: var(--bs - border - radius - xxl)!important;
    border - bottom - right - radius: var(--bs - border - radius - xxl)!important;
}

.rounded - bottom - circle {
    border - bottom - left - radius: 50 % !important;
    border - bottom - right - radius: 50 % !important;
}

.rounded - bottom - pill {
    border - bottom - left - radius: var(--bs - border - radius - pill)!important;
    border - bottom - right - radius: var(--bs - border - radius - pill)!important;
}

.rounded - start {
    border - bottom - right - radius: var(--bs - border - radius)!important;
    border - top - right - radius: var(--bs - border - radius)!important;
}

.rounded - start - 0 {
    border - bottom - right - radius: 0!important;
    border - top - right - radius: 0!important;
}

.rounded - start - 1 {
    border - bottom - right - radius: var(--bs - border - radius - sm)!important;
    border - top - right - radius: var(--bs - border - radius - sm)!important;
}

.rounded - start - 2 {
    border - bottom - right - radius: var(--bs - border - radius)!important;
    border - top - right - radius: var(--bs - border - radius)!important;
}

.rounded - start - 3 {
    border - bottom - right - radius: var(--bs - border - radius - lg)!important;
    border - top - right - radius: var(--bs - border - radius - lg)!important;
}

.rounded - start - 4 {
    border - bottom - right - radius: var(--bs - border - radius - xl)!important;
    border - top - right - radius: var(--bs - border - radius - xl)!important;
}

.rounded - start - 5 {
    border - bottom - right - radius: var(--bs - border - radius - xxl)!important;
    border - top - right - radius: var(--bs - border - radius - xxl)!important;
}

.rounded - start - circle {
    border - bottom - right - radius: 50 % !important;
    border - top - right - radius: 50 % !important;
}

.rounded - start - pill {
    border - bottom - right - radius: var(--bs - border - radius - pill)!important;
    border - top - right - radius: var(--bs - border - radius - pill)!important;
}

.visible {
    visibility: visible!important;
}

.invisible {
    visibility: hidden!important;
}

.z - n1 {
    z - index: -1!important;
}

.z - 0 {
    z - index: 0!important;
}

.z - 1 {
    z - index: 1!important;
}

.z - 2 {
    z - index: 2!important;
}

.z - 3 {
    z - index: 3!important;
}

@media(min - width: 576px) {
  .float - sm - start {
        float: right!important;
    }
  .float - sm - end {
        float: left!important;
    }
  .float - sm - none {
        float: none!important;
    }
  .object - fit - sm - contain {
        -o - object - fit: contain!important;
        object - fit: contain!important;
    }
  .object - fit - sm - cover {
        -o - object - fit: cover!important;
        object - fit: cover!important;
    }
  .object - fit - sm - fill {
        -o - object - fit: fill!important;
        object - fit: fill!important;
    }
  .object - fit - sm - scale {
        -o - object - fit: scale - down!important;
        object - fit: scale - down!important;
    }
  .object - fit - sm - none {
        -o - object - fit: none!important;
        object - fit: none!important;
    }
  .d - sm - inline {
        display: inline!important;
    }
  .d - sm - inline - block {
        display: inline - block!important;
    }
  .d - sm - block {
        display: block!important;
    }
  .d - sm - grid {
        display: grid!important;
    }
  .d - sm - inline - grid {
        display: inline - grid!important;
    }
  .d - sm - table {
        display: table!important;
    }
  .d - sm - table - row {
        display: table - row!important;
    }
  .d - sm - table - cell {
        display: table - cell!important;
    }
  .d - sm - flex {
        display: flex!important;
    }
  .d - sm - inline - flex {
        display: inline - flex!important;
    }
  .d - sm - none {
        display: none!important;
    }
  .flex - sm - fill {
        flex: 1 1 auto!important;
    }
  .flex - sm - row {
        flex - direction: row!important;
    }
  .flex - sm - column {
        flex - direction: column!important;
    }
  .flex - sm - row - reverse {
        flex - direction: row - reverse!important;
    }
  .flex - sm - column - reverse {
        flex - direction: column - reverse!important;
    }
  .flex - sm - grow - 0 {
        flex - grow: 0!important;
    }
  .flex - sm - grow - 1 {
        flex - grow: 1!important;
    }
  .flex - sm - shrink - 0 {
        flex - shrink: 0!important;
    }
  .flex - sm - shrink - 1 {
        flex - shrink: 1!important;
    }
  .flex - sm - wrap {
        flex - wrap: wrap!important;
    }
  .flex - sm - nowrap {
        flex - wrap: nowrap!important;
    }
  .flex - sm - wrap - reverse {
        flex - wrap: wrap - reverse!important;
    }
  .justify - content - sm - start {
        justify - content: flex - start!important;
    }
  .justify - content - sm - end {
        justify - content: flex - end!important;
    }
  .justify - content - sm - center {
        justify - content: center!important;
    }
  .justify - content - sm - between {
        justify - content: space - between!important;
    }
  .justify - content - sm - around {
        justify - content: space - around!important;
    }
  .justify - content - sm - evenly {
        justify - content: space - evenly!important;
    }
  .align - items - sm - start {
        align - items: flex - start!important;
    }
  .align - items - sm - end {
        align - items: flex - end!important;
    }
  .align - items - sm - center {
        align - items: center!important;
    }
  .align - items - sm - baseline {
        align - items: baseline!important;
    }
  .align - items - sm - stretch {
        align - items: stretch!important;
    }
  .align - content - sm - start {
        align - content: flex - start!important;
    }
  .align - content - sm - end {
        align - content: flex - end!important;
    }
  .align - content - sm - center {
        align - content: center!important;
    }
  .align - content - sm - between {
        align - content: space - between!important;
    }
  .align - content - sm - around {
        align - content: space - around!important;
    }
  .align - content - sm - stretch {
        align - content: stretch!important;
    }
  .align - self - sm - auto {
        align - self: auto!important;
    }
  .align - self - sm - start {
        align - self: flex - start!important;
    }
  .align - self - sm - end {
        align - self: flex - end!important;
    }
  .align - self - sm - center {
        align - self: center!important;
    }
  .align - self - sm - baseline {
        align - self: baseline!important;
    }
  .align - self - sm - stretch {
        align - self: stretch!important;
    }
  .order - sm - first {
        order: -1!important;
    }
  .order - sm - 0 {
        order: 0!important;
    }
  .order - sm - 1 {
        order: 1!important;
    }
  .order - sm - 2 {
        order: 2!important;
    }
  .order - sm - 3 {
        order: 3!important;
    }
  .order - sm - 4 {
        order: 4!important;
    }
  .order - sm - 5 {
        order: 5!important;
    }
  .order - sm - last {
        order: 6!important;
    }
  .m - sm - 0 {
        margin: 0!important;
    }
  .m - sm - 1 {
        margin: 0.25rem!important;
    }
  .m - sm - 2 {
        margin: 0.5rem!important;
    }
  .m - sm - 3 {
        margin: 1rem!important;
    }
  .m - sm - 4 {
        margin: 1.5rem!important;
    }
  .m - sm - 5 {
        margin: 3rem!important;
    }
  .m - sm - auto {
        margin: auto!important;
    }
  .mx - sm - 0 {
        margin - left: 0!important;
        margin - right: 0!important;
    }
  .mx - sm - 1 {
        margin - left: 0.25rem!important;
        margin - right: 0.25rem!important;
    }
  .mx - sm - 2 {
        margin - left: 0.5rem!important;
        margin - right: 0.5rem!important;
    }
  .mx - sm - 3 {
        margin - left: 1rem!important;
        margin - right: 1rem!important;
    }
  .mx - sm - 4 {
        margin - left: 1.5rem!important;
        margin - right: 1.5rem!important;
    }
  .mx - sm - 5 {
        margin - left: 3rem!important;
        margin - right: 3rem!important;
    }
  .mx - sm - auto {
        margin - left: auto!important;
        margin - right: auto!important;
    }
  .my - sm - 0 {
        margin - top: 0!important;
        margin - bottom: 0!important;
    }
  .my - sm - 1 {
        margin - top: 0.25rem!important;
        margin - bottom: 0.25rem!important;
    }
  .my - sm - 2 {
        margin - top: 0.5rem!important;
        margin - bottom: 0.5rem!important;
    }
  .my - sm - 3 {
        margin - top: 1rem!important;
        margin - bottom: 1rem!important;
    }
  .my - sm - 4 {
        margin - top: 1.5rem!important;
        margin - bottom: 1.5rem!important;
    }
  .my - sm - 5 {
        margin - top: 3rem!important;
        margin - bottom: 3rem!important;
    }
  .my - sm - auto {
        margin - top: auto!important;
        margin - bottom: auto!important;
    }
  .mt - sm - 0 {
        margin - top: 0!important;
    }
  .mt - sm - 1 {
        margin - top: 0.25rem!important;
    }
  .mt - sm - 2 {
        margin - top: 0.5rem!important;
    }
  .mt - sm - 3 {
        margin - top: 1rem!important;
    }
  .mt - sm - 4 {
        margin - top: 1.5rem!important;
    }
  .mt - sm - 5 {
        margin - top: 3rem!important;
    }
  .mt - sm - auto {
        margin - top: auto!important;
    }
  .me - sm - 0 {
        margin - left: 0!important;
    }
  .me - sm - 1 {
        margin - left: 0.25rem!important;
    }
  .me - sm - 2 {
        margin - left: 0.5rem!important;
    }
  .me - sm - 3 {
        margin - left: 1rem!important;
    }
  .me - sm - 4 {
        margin - left: 1.5rem!important;
    }
  .me - sm - 5 {
        margin - left: 3rem!important;
    }
  .me - sm - auto {
        margin - left: auto!important;
    }
  .mb - sm - 0 {
        margin - bottom: 0!important;
    }
  .mb - sm - 1 {
        margin - bottom: 0.25rem!important;
    }
  .mb - sm - 2 {
        margin - bottom: 0.5rem!important;
    }
  .mb - sm - 3 {
        margin - bottom: 1rem!important;
    }
  .mb - sm - 4 {
        margin - bottom: 1.5rem!important;
    }
  .mb - sm - 5 {
        margin - bottom: 3rem!important;
    }
  .mb - sm - auto {
        margin - bottom: auto!important;
    }
  .ms - sm - 0 {
        margin - right: 0!important;
    }
  .ms - sm - 1 {
        margin - right: 0.25rem!important;
    }
  .ms - sm - 2 {
        margin - right: 0.5rem!important;
    }
  .ms - sm - 3 {
        margin - right: 1rem!important;
    }
  .ms - sm - 4 {
        margin - right: 1.5rem!important;
    }
  .ms - sm - 5 {
        margin - right: 3rem!important;
    }
  .ms - sm - auto {
        margin - right: auto!important;
    }
  .p - sm - 0 {
        padding: 0!important;
    }
  .p - sm - 1 {
        padding: 0.25rem!important;
    }
  .p - sm - 2 {
        padding: 0.5rem!important;
    }
  .p - sm - 3 {
        padding: 1rem!important;
    }
  .p - sm - 4 {
        padding: 1.5rem!important;
    }
  .p - sm - 5 {
        padding: 3rem!important;
    }
  .px - sm - 0 {
        padding - left: 0!important;
        padding - right: 0!important;
    }
  .px - sm - 1 {
        padding - left: 0.25rem!important;
        padding - right: 0.25rem!important;
    }
  .px - sm - 2 {
        padding - left: 0.5rem!important;
        padding - right: 0.5rem!important;
    }
  .px - sm - 3 {
        padding - left: 1rem!important;
        padding - right: 1rem!important;
    }
  .px - sm - 4 {
        padding - left: 1.5rem!important;
        padding - right: 1.5rem!important;
    }
  .px - sm - 5 {
        padding - left: 3rem!important;
        padding - right: 3rem!important;
    }
  .py - sm - 0 {
        padding - top: 0!important;
        padding - bottom: 0!important;
    }
  .py - sm - 1 {
        padding - top: 0.25rem!important;
        padding - bottom: 0.25rem!important;
    }
  .py - sm - 2 {
        padding - top: 0.5rem!important;
        padding - bottom: 0.5rem!important;
    }
  .py - sm - 3 {
        padding - top: 1rem!important;
        padding - bottom: 1rem!important;
    }
  .py - sm - 4 {
        padding - top: 1.5rem!important;
        padding - bottom: 1.5rem!important;
    }
  .py - sm - 5 {
        padding - top: 3rem!important;
        padding - bottom: 3rem!important;
    }
  .pt - sm - 0 {
        padding - top: 0!important;
    }
  .pt - sm - 1 {
        padding - top: 0.25rem!important;
    }
  .pt - sm - 2 {
        padding - top: 0.5rem!important;
    }
  .pt - sm - 3 {
        padding - top: 1rem!important;
    }
  .pt - sm - 4 {
        padding - top: 1.5rem!important;
    }
  .pt - sm - 5 {
        padding - top: 3rem!important;
    }
  .pe - sm - 0 {
        padding - left: 0!important;
    }
  .pe - sm - 1 {
        padding - left: 0.25rem!important;
    }
  .pe - sm - 2 {
        padding - left: 0.5rem!important;
    }
  .pe - sm - 3 {
        padding - left: 1rem!important;
    }
  .pe - sm - 4 {
        padding - left: 1.5rem!important;
    }
  .pe - sm - 5 {
        padding - left: 3rem!important;
    }
  .pb - sm - 0 {
        padding - bottom: 0!important;
    }
  .pb - sm - 1 {
        padding - bottom: 0.25rem!important;
    }
  .pb - sm - 2 {
        padding - bottom: 0.5rem!important;
    }
  .pb - sm - 3 {
        padding - bottom: 1rem!important;
    }
  .pb - sm - 4 {
        padding - bottom: 1.5rem!important;
    }
  .pb - sm - 5 {
        padding - bottom: 3rem!important;
    }
  .ps - sm - 0 {
        padding - right: 0!important;
    }
  .ps - sm - 1 {
        padding - right: 0.25rem!important;
    }
  .ps - sm - 2 {
        padding - right: 0.5rem!important;
    }
  .ps - sm - 3 {
        padding - right: 1rem!important;
    }
  .ps - sm - 4 {
        padding - right: 1.5rem!important;
    }
  .ps - sm - 5 {
        padding - right: 3rem!important;
    }
  .gap - sm - 0 {
        gap: 0!important;
    }
  .gap - sm - 1 {
        gap: 0.25rem!important;
    }
  .gap - sm - 2 {
        gap: 0.5rem!important;
    }
  .gap - sm - 3 {
        gap: 1rem!important;
    }
  .gap - sm - 4 {
        gap: 1.5rem!important;
    }
  .gap - sm - 5 {
        gap: 3rem!important;
    }
  .row - gap - sm - 0 {
        row - gap: 0!important;
    }
  .row - gap - sm - 1 {
        row - gap: 0.25rem!important;
    }
  .row - gap - sm - 2 {
        row - gap: 0.5rem!important;
    }
  .row - gap - sm - 3 {
        row - gap: 1rem!important;
    }
  .row - gap - sm - 4 {
        row - gap: 1.5rem!important;
    }
  .row - gap - sm - 5 {
        row - gap: 3rem!important;
    }
  .column - gap - sm - 0 {
        -moz - column - gap: 0!important;
        column - gap: 0!important;
    }
  .column - gap - sm - 1 {
        -moz - column - gap: 0.25rem!important;
        column - gap: 0.25rem!important;
    }
  .column - gap - sm - 2 {
        -moz - column - gap: 0.5rem!important;
        column - gap: 0.5rem!important;
    }
  .column - gap - sm - 3 {
        -moz - column - gap: 1rem!important;
        column - gap: 1rem!important;
    }
  .column - gap - sm - 4 {
        -moz - column - gap: 1.5rem!important;
        column - gap: 1.5rem!important;
    }
  .column - gap - sm - 5 {
        -moz - column - gap: 3rem!important;
        column - gap: 3rem!important;
    }
  .text - sm - start {
        text - align: right!important;
    }
  .text - sm - end {
        text - align: left!important;
    }
  .text - sm - center {
        text - align: center!important;
    }
}
@media(min - width: 768px) {
  .float - md - start {
        float: right!important;
    }
  .float - md - end {
        float: left!important;
    }
  .float - md - none {
        float: none!important;
    }
  .object - fit - md - contain {
        -o - object - fit: contain!important;
        object - fit: contain!important;
    }
  .object - fit - md - cover {
        -o - object - fit: cover!important;
        object - fit: cover!important;
    }
  .object - fit - md - fill {
        -o - object - fit: fill!important;
        object - fit: fill!important;
    }
  .object - fit - md - scale {
        -o - object - fit: scale - down!important;
        object - fit: scale - down!important;
    }
  .object - fit - md - none {
        -o - object - fit: none!important;
        object - fit: none!important;
    }
  .d - md - inline {
        display: inline!important;
    }
  .d - md - inline - block {
        display: inline - block!important;
    }
  .d - md - block {
        display: block!important;
    }
  .d - md - grid {
        display: grid!important;
    }
  .d - md - inline - grid {
        display: inline - grid!important;
    }
  .d - md - table {
        display: table!important;
    }
  .d - md - table - row {
        display: table - row!important;
    }
  .d - md - table - cell {
        display: table - cell!important;
    }
  .d - md - flex {
        display: flex!important;
    }
  .d - md - inline - flex {
        display: inline - flex!important;
    }
  .d - md - none {
        display: none!important;
    }
  .flex - md - fill {
        flex: 1 1 auto!important;
    }
  .flex - md - row {
        flex - direction: row!important;
    }
  .flex - md - column {
        flex - direction: column!important;
    }
  .flex - md - row - reverse {
        flex - direction: row - reverse!important;
    }
  .flex - md - column - reverse {
        flex - direction: column - reverse!important;
    }
  .flex - md - grow - 0 {
        flex - grow: 0!important;
    }
  .flex - md - grow - 1 {
        flex - grow: 1!important;
    }
  .flex - md - shrink - 0 {
        flex - shrink: 0!important;
    }
  .flex - md - shrink - 1 {
        flex - shrink: 1!important;
    }
  .flex - md - wrap {
        flex - wrap: wrap!important;
    }
  .flex - md - nowrap {
        flex - wrap: nowrap!important;
    }
  .flex - md - wrap - reverse {
        flex - wrap: wrap - reverse!important;
    }
  .justify - content - md - start {
        justify - content: flex - start!important;
    }
  .justify - content - md - end {
        justify - content: flex - end!important;
    }
  .justify - content - md - center {
        justify - content: center!important;
    }
  .justify - content - md - between {
        justify - content: space - between!important;
    }
  .justify - content - md - around {
        justify - content: space - around!important;
    }
  .justify - content - md - evenly {
        justify - content: space - evenly!important;
    }
  .align - items - md - start {
        align - items: flex - start!important;
    }
  .align - items - md - end {
        align - items: flex - end!important;
    }
  .align - items - md - center {
        align - items: center!important;
    }
  .align - items - md - baseline {
        align - items: baseline!important;
    }
  .align - items - md - stretch {
        align - items: stretch!important;
    }
  .align - content - md - start {
        align - content: flex - start!important;
    }
  .align - content - md - end {
        align - content: flex - end!important;
    }
  .align - content - md - center {
        align - content: center!important;
    }
  .align - content - md - between {
        align - content: space - between!important;
    }
  .align - content - md - around {
        align - content: space - around!important;
    }
  .align - content - md - stretch {
        align - content: stretch!important;
    }
  .align - self - md - auto {
        align - self: auto!important;
    }
  .align - self - md - start {
        align - self: flex - start!important;
    }
  .align - self - md - end {
        align - self: flex - end!important;
    }
  .align - self - md - center {
        align - self: center!important;
    }
  .align - self - md - baseline {
        align - self: baseline!important;
    }
  .align - self - md - stretch {
        align - self: stretch!important;
    }
  .order - md - first {
        order: -1!important;
    }
  .order - md - 0 {
        order: 0!important;
    }
  .order - md - 1 {
        order: 1!important;
    }
  .order - md - 2 {
        order: 2!important;
    }
  .order - md - 3 {
        order: 3!important;
    }
  .order - md - 4 {
        order: 4!important;
    }
  .order - md - 5 {
        order: 5!important;
    }
  .order - md - last {
        order: 6!important;
    }
  .m - md - 0 {
        margin: 0!important;
    }
  .m - md - 1 {
        margin: 0.25rem!important;
    }
  .m - md - 2 {
        margin: 0.5rem!important;
    }
  .m - md - 3 {
        margin: 1rem!important;
    }
  .m - md - 4 {
        margin: 1.5rem!important;
    }
  .m - md - 5 {
        margin: 3rem!important;
    }
  .m - md - auto {
        margin: auto!important;
    }
  .mx - md - 0 {
        margin - left: 0!important;
        margin - right: 0!important;
    }
  .mx - md - 1 {
        margin - left: 0.25rem!important;
        margin - right: 0.25rem!important;
    }
  .mx - md - 2 {
        margin - left: 0.5rem!important;
        margin - right: 0.5rem!important;
    }
  .mx - md - 3 {
        margin - left: 1rem!important;
        margin - right: 1rem!important;
    }
  .mx - md - 4 {
        margin - left: 1.5rem!important;
        margin - right: 1.5rem!important;
    }
  .mx - md - 5 {
        margin - left: 3rem!important;
        margin - right: 3rem!important;
    }
  .mx - md - auto {
        margin - left: auto!important;
        margin - right: auto!important;
    }
  .my - md - 0 {
        margin - top: 0!important;
        margin - bottom: 0!important;
    }
  .my - md - 1 {
        margin - top: 0.25rem!important;
        margin - bottom: 0.25rem!important;
    }
  .my - md - 2 {
        margin - top: 0.5rem!important;
        margin - bottom: 0.5rem!important;
    }
  .my - md - 3 {
        margin - top: 1rem!important;
        margin - bottom: 1rem!important;
    }
  .my - md - 4 {
        margin - top: 1.5rem!important;
        margin - bottom: 1.5rem!important;
    }
  .my - md - 5 {
        margin - top: 3rem!important;
        margin - bottom: 3rem!important;
    }
  .my - md - auto {
        margin - top: auto!important;
        margin - bottom: auto!important;
    }
  .mt - md - 0 {
        margin - top: 0!important;
    }
  .mt - md - 1 {
        margin - top: 0.25rem!important;
    }
  .mt - md - 2 {
        margin - top: 0.5rem!important;
    }
  .mt - md - 3 {
        margin - top: 1rem!important;
    }
  .mt - md - 4 {
        margin - top: 1.5rem!important;
    }
  .mt - md - 5 {
        margin - top: 3rem!important;
    }
  .mt - md - auto {
        margin - top: auto!important;
    }
  .me - md - 0 {
        margin - left: 0!important;
    }
  .me - md - 1 {
        margin - left: 0.25rem!important;
    }
  .me - md - 2 {
        margin - left: 0.5rem!important;
    }
  .me - md - 3 {
        margin - left: 1rem!important;
    }
  .me - md - 4 {
        margin - left: 1.5rem!important;
    }
  .me - md - 5 {
        margin - left: 3rem!important;
    }
  .me - md - auto {
        margin - left: auto!important;
    }
  .mb - md - 0 {
        margin - bottom: 0!important;
    }
  .mb - md - 1 {
        margin - bottom: 0.25rem!important;
    }
  .mb - md - 2 {
        margin - bottom: 0.5rem!important;
    }
  .mb - md - 3 {
        margin - bottom: 1rem!important;
    }
  .mb - md - 4 {
        margin - bottom: 1.5rem!important;
    }
  .mb - md - 5 {
        margin - bottom: 3rem!important;
    }
  .mb - md - auto {
        margin - bottom: auto!important;
    }
  .ms - md - 0 {
        margin - right: 0!important;
    }
  .ms - md - 1 {
        margin - right: 0.25rem!important;
    }
  .ms - md - 2 {
        margin - right: 0.5rem!important;
    }
  .ms - md - 3 {
        margin - right: 1rem!important;
    }
  .ms - md - 4 {
        margin - right: 1.5rem!important;
    }
  .ms - md - 5 {
        margin - right: 3rem!important;
    }
  .ms - md - auto {
        margin - right: auto!important;
    }
  .p - md - 0 {
        padding: 0!important;
    }
  .p - md - 1 {
        padding: 0.25rem!important;
    }
  .p - md - 2 {
        padding: 0.5rem!important;
    }
  .p - md - 3 {
        padding: 1rem!important;
    }
  .p - md - 4 {
        padding: 1.5rem!important;
    }
  .p - md - 5 {
        padding: 3rem!important;
    }
  .px - md - 0 {
        padding - left: 0!important;
        padding - right: 0!important;
    }
  .px - md - 1 {
        padding - left: 0.25rem!important;
        padding - right: 0.25rem!important;
    }
  .px - md - 2 {
        padding - left: 0.5rem!important;
        padding - right: 0.5rem!important;
    }
  .px - md - 3 {
        padding - left: 1rem!important;
        padding - right: 1rem!important;
    }
  .px - md - 4 {
        padding - left: 1.5rem!important;
        padding - right: 1.5rem!important;
    }
  .px - md - 5 {
        padding - left: 3rem!important;
        padding - right: 3rem!important;
    }
  .py - md - 0 {
        padding - top: 0!important;
        padding - bottom: 0!important;
    }
  .py - md - 1 {
        padding - top: 0.25rem!important;
        padding - bottom: 0.25rem!important;
    }
  .py - md - 2 {
        padding - top: 0.5rem!important;
        padding - bottom: 0.5rem!important;
    }
  .py - md - 3 {
        padding - top: 1rem!important;
        padding - bottom: 1rem!important;
    }
  .py - md - 4 {
        padding - top: 1.5rem!important;
        padding - bottom: 1.5rem!important;
    }
  .py - md - 5 {
        padding - top: 3rem!important;
        padding - bottom: 3rem!important;
    }
  .pt - md - 0 {
        padding - top: 0!important;
    }
  .pt - md - 1 {
        padding - top: 0.25rem!important;
    }
  .pt - md - 2 {
        padding - top: 0.5rem!important;
    }
  .pt - md - 3 {
        padding - top: 1rem!important;
    }
  .pt - md - 4 {
        padding - top: 1.5rem!important;
    }
  .pt - md - 5 {
        padding - top: 3rem!important;
    }
  .pe - md - 0 {
        padding - left: 0!important;
    }
  .pe - md - 1 {
        padding - left: 0.25rem!important;
    }
  .pe - md - 2 {
        padding - left: 0.5rem!important;
    }
  .pe - md - 3 {
        padding - left: 1rem!important;
    }
  .pe - md - 4 {
        padding - left: 1.5rem!important;
    }
  .pe - md - 5 {
        padding - left: 3rem!important;
    }
  .pb - md - 0 {
        padding - bottom: 0!important;
    }
  .pb - md - 1 {
        padding - bottom: 0.25rem!important;
    }
  .pb - md - 2 {
        padding - bottom: 0.5rem!important;
    }
  .pb - md - 3 {
        padding - bottom: 1rem!important;
    }
  .pb - md - 4 {
        padding - bottom: 1.5rem!important;
    }
  .pb - md - 5 {
        padding - bottom: 3rem!important;
    }
  .ps - md - 0 {
        padding - right: 0!important;
    }
  .ps - md - 1 {
        padding - right: 0.25rem!important;
    }
  .ps - md - 2 {
        padding - right: 0.5rem!important;
    }
  .ps - md - 3 {
        padding - right: 1rem!important;
    }
  .ps - md - 4 {
        padding - right: 1.5rem!important;
    }
  .ps - md - 5 {
        padding - right: 3rem!important;
    }
  .gap - md - 0 {
        gap: 0!important;
    }
  .gap - md - 1 {
        gap: 0.25rem!important;
    }
  .gap - md - 2 {
        gap: 0.5rem!important;
    }
  .gap - md - 3 {
        gap: 1rem!important;
    }
  .gap - md - 4 {
        gap: 1.5rem!important;
    }
  .gap - md - 5 {
        gap: 3rem!important;
    }
  .row - gap - md - 0 {
        row - gap: 0!important;
    }
  .row - gap - md - 1 {
        row - gap: 0.25rem!important;
    }
  .row - gap - md - 2 {
        row - gap: 0.5rem!important;
    }
  .row - gap - md - 3 {
        row - gap: 1rem!important;
    }
  .row - gap - md - 4 {
        row - gap: 1.5rem!important;
    }
  .row - gap - md - 5 {
        row - gap: 3rem!important;
    }
  .column - gap - md - 0 {
        -moz - column - gap: 0!important;
        column - gap: 0!important;
    }
  .column - gap - md - 1 {
        -moz - column - gap: 0.25rem!important;
        column - gap: 0.25rem!important;
    }
  .column - gap - md - 2 {
        -moz - column - gap: 0.5rem!important;
        column - gap: 0.5rem!important;
    }
  .column - gap - md - 3 {
        -moz - column - gap: 1rem!important;
        column - gap: 1rem!important;
    }
  .column - gap - md - 4 {
        -moz - column - gap: 1.5rem!important;
        column - gap: 1.5rem!important;
    }
  .column - gap - md - 5 {
        -moz - column - gap: 3rem!important;
        column - gap: 3rem!important;
    }
  .text - md - start {
        text - align: right!important;
    }
  .text - md - end {
        text - align: left!important;
    }
  .text - md - center {
        text - align: center!important;
    }
}
@media(min - width: 992px) {
  .float - lg - start {
        float: right!important;
    }
  .float - lg - end {
        float: left!important;
    }
  .float - lg - none {
        float: none!important;
    }
  .object - fit - lg - contain {
        -o - object - fit: contain!important;
        object - fit: contain!important;
    }
  .object - fit - lg - cover {
        -o - object - fit: cover!important;
        object - fit: cover!important;
    }
  .object - fit - lg - fill {
        -o - object - fit: fill!important;
        object - fit: fill!important;
    }
  .object - fit - lg - scale {
        -o - object - fit: scale - down!important;
        object - fit: scale - down!important;
    }
  .object - fit - lg - none {
        -o - object - fit: none!important;
        object - fit: none!important;
    }
  .d - lg - inline {
        display: inline!important;
    }
  .d - lg - inline - block {
        display: inline - block!important;
    }
  .d - lg - block {
        display: block!important;
    }
  .d - lg - grid {
        display: grid!important;
    }
  .d - lg - inline - grid {
        display: inline - grid!important;
    }
  .d - lg - table {
        display: table!important;
    }
  .d - lg - table - row {
        display: table - row!important;
    }
  .d - lg - table - cell {
        display: table - cell!important;
    }
  .d - lg - flex {
        display: flex!important;
    }
  .d - lg - inline - flex {
        display: inline - flex!important;
    }
  .d - lg - none {
        display: none!important;
    }
  .flex - lg - fill {
        flex: 1 1 auto!important;
    }
  .flex - lg - row {
        flex - direction: row!important;
    }
  .flex - lg - column {
        flex - direction: column!important;
    }
  .flex - lg - row - reverse {
        flex - direction: row - reverse!important;
    }
  .flex - lg - column - reverse {
        flex - direction: column - reverse!important;
    }
  .flex - lg - grow - 0 {
        flex - grow: 0!important;
    }
  .flex - lg - grow - 1 {
        flex - grow: 1!important;
    }
  .flex - lg - shrink - 0 {
        flex - shrink: 0!important;
    }
  .flex - lg - shrink - 1 {
        flex - shrink: 1!important;
    }
  .flex - lg - wrap {
        flex - wrap: wrap!important;
    }
  .flex - lg - nowrap {
        flex - wrap: nowrap!important;
    }
  .flex - lg - wrap - reverse {
        flex - wrap: wrap - reverse!important;
    }
  .justify - content - lg - start {
        justify - content: flex - start!important;
    }
  .justify - content - lg - end {
        justify - content: flex - end!important;
    }
  .justify - content - lg - center {
        justify - content: center!important;
    }
  .justify - content - lg - between {
        justify - content: space - between!important;
    }
  .justify - content - lg - around {
        justify - content: space - around!important;
    }
  .justify - content - lg - evenly {
        justify - content: space - evenly!important;
    }
  .align - items - lg - start {
        align - items: flex - start!important;
    }
  .align - items - lg - end {
        align - items: flex - end!important;
    }
  .align - items - lg - center {
        align - items: center!important;
    }
  .align - items - lg - baseline {
        align - items: baseline!important;
    }
  .align - items - lg - stretch {
        align - items: stretch!important;
    }
  .align - content - lg - start {
        align - content: flex - start!important;
    }
  .align - content - lg - end {
        align - content: flex - end!important;
    }
  .align - content - lg - center {
        align - content: center!important;
    }
  .align - content - lg - between {
        align - content: space - between!important;
    }
  .align - content - lg - around {
        align - content: space - around!important;
    }
  .align - content - lg - stretch {
        align - content: stretch!important;
    }
  .align - self - lg - auto {
        align - self: auto!important;
    }
  .align - self - lg - start {
        align - self: flex - start!important;
    }
  .align - self - lg - end {
        align - self: flex - end!important;
    }
  .align - self - lg - center {
        align - self: center!important;
    }
  .align - self - lg - baseline {
        align - self: baseline!important;
    }
  .align - self - lg - stretch {
        align - self: stretch!important;
    }
  .order - lg - first {
        order: -1!important;
    }
  .order - lg - 0 {
        order: 0!important;
    }
  .order - lg - 1 {
        order: 1!important;
    }
  .order - lg - 2 {
        order: 2!important;
    }
  .order - lg - 3 {
        order: 3!important;
    }
  .order - lg - 4 {
        order: 4!important;
    }
  .order - lg - 5 {
        order: 5!important;
    }
  .order - lg - last {
        order: 6!important;
    }
  .m - lg - 0 {
        margin: 0!important;
    }
  .m - lg - 1 {
        margin: 0.25rem!important;
    }
  .m - lg - 2 {
        margin: 0.5rem!important;
    }
  .m - lg - 3 {
        margin: 1rem!important;
    }
  .m - lg - 4 {
        margin: 1.5rem!important;
    }
  .m - lg - 5 {
        margin: 3rem!important;
    }
  .m - lg - auto {
        margin: auto!important;
    }
  .mx - lg - 0 {
        margin - left: 0!important;
        margin - right: 0!important;
    }
  .mx - lg - 1 {
        margin - left: 0.25rem!important;
        margin - right: 0.25rem!important;
    }
  .mx - lg - 2 {
        margin - left: 0.5rem!important;
        margin - right: 0.5rem!important;
    }
  .mx - lg - 3 {
        margin - left: 1rem!important;
        margin - right: 1rem!important;
    }
  .mx - lg - 4 {
        margin - left: 1.5rem!important;
        margin - right: 1.5rem!important;
    }
  .mx - lg - 5 {
        margin - left: 3rem!important;
        margin - right: 3rem!important;
    }
  .mx - lg - auto {
        margin - left: auto!important;
        margin - right: auto!important;
    }
  .my - lg - 0 {
        margin - top: 0!important;
        margin - bottom: 0!important;
    }
  .my - lg - 1 {
        margin - top: 0.25rem!important;
        margin - bottom: 0.25rem!important;
    }
  .my - lg - 2 {
        margin - top: 0.5rem!important;
        margin - bottom: 0.5rem!important;
    }
  .my - lg - 3 {
        margin - top: 1rem!important;
        margin - bottom: 1rem!important;
    }
  .my - lg - 4 {
        margin - top: 1.5rem!important;
        margin - bottom: 1.5rem!important;
    }
  .my - lg - 5 {
        margin - top: 3rem!important;
        margin - bottom: 3rem!important;
    }
  .my - lg - auto {
        margin - top: auto!important;
        margin - bottom: auto!important;
    }
  .mt - lg - 0 {
        margin - top: 0!important;
    }
  .mt - lg - 1 {
        margin - top: 0.25rem!important;
    }
  .mt - lg - 2 {
        margin - top: 0.5rem!important;
    }
  .mt - lg - 3 {
        margin - top: 1rem!important;
    }
  .mt - lg - 4 {
        margin - top: 1.5rem!important;
    }
  .mt - lg - 5 {
        margin - top: 3rem!important;
    }
  .mt - lg - auto {
        margin - top: auto!important;
    }
  .me - lg - 0 {
        margin - left: 0!important;
    }
  .me - lg - 1 {
        margin - left: 0.25rem!important;
    }
  .me - lg - 2 {
        margin - left: 0.5rem!important;
    }
  .me - lg - 3 {
        margin - left: 1rem!important;
    }
  .me - lg - 4 {
        margin - left: 1.5rem!important;
    }
  .me - lg - 5 {
        margin - left: 3rem!important;
    }
  .me - lg - auto {
        margin - left: auto!important;
    }
  .mb - lg - 0 {
        margin - bottom: 0!important;
    }
  .mb - lg - 1 {
        margin - bottom: 0.25rem!important;
    }
  .mb - lg - 2 {
        margin - bottom: 0.5rem!important;
    }
  .mb - lg - 3 {
        margin - bottom: 1rem!important;
    }
  .mb - lg - 4 {
        margin - bottom: 1.5rem!important;
    }
  .mb - lg - 5 {
        margin - bottom: 3rem!important;
    }
  .mb - lg - auto {
        margin - bottom: auto!important;
    }
  .ms - lg - 0 {
        margin - right: 0!important;
    }
  .ms - lg - 1 {
        margin - right: 0.25rem!important;
    }
  .ms - lg - 2 {
        margin - right: 0.5rem!important;
    }
  .ms - lg - 3 {
        margin - right: 1rem!important;
    }
  .ms - lg - 4 {
        margin - right: 1.5rem!important;
    }
  .ms - lg - 5 {
        margin - right: 3rem!important;
    }
  .ms - lg - auto {
        margin - right: auto!important;
    }
  .p - lg - 0 {
        padding: 0!important;
    }
  .p - lg - 1 {
        padding: 0.25rem!important;
    }
  .p - lg - 2 {
        padding: 0.5rem!important;
    }
  .p - lg - 3 {
        padding: 1rem!important;
    }
  .p - lg - 4 {
        padding: 1.5rem!important;
    }
  .p - lg - 5 {
        padding: 3rem!important;
    }
  .px - lg - 0 {
        padding - left: 0!important;
        padding - right: 0!important;
    }
  .px - lg - 1 {
        padding - left: 0.25rem!important;
        padding - right: 0.25rem!important;
    }
  .px - lg - 2 {
        padding - left: 0.5rem!important;
        padding - right: 0.5rem!important;
    }
  .px - lg - 3 {
        padding - left: 1rem!important;
        padding - right: 1rem!important;
    }
  .px - lg - 4 {
        padding - left: 1.5rem!important;
        padding - right: 1.5rem!important;
    }
  .px - lg - 5 {
        padding - left: 3rem!important;
        padding - right: 3rem!important;
    }
  .py - lg - 0 {
        padding - top: 0!important;
        padding - bottom: 0!important;
    }
  .py - lg - 1 {
        padding - top: 0.25rem!important;
        padding - bottom: 0.25rem!important;
    }
  .py - lg - 2 {
        padding - top: 0.5rem!important;
        padding - bottom: 0.5rem!important;
    }
  .py - lg - 3 {
        padding - top: 1rem!important;
        padding - bottom: 1rem!important;
    }
  .py - lg - 4 {
        padding - top: 1.5rem!important;
        padding - bottom: 1.5rem!important;
    }
  .py - lg - 5 {
        padding - top: 3rem!important;
        padding - bottom: 3rem!important;
    }
  .pt - lg - 0 {
        padding - top: 0!important;
    }
  .pt - lg - 1 {
        padding - top: 0.25rem!important;
    }
  .pt - lg - 2 {
        padding - top: 0.5rem!important;
    }
  .pt - lg - 3 {
        padding - top: 1rem!important;
    }
  .pt - lg - 4 {
        padding - top: 1.5rem!important;
    }
  .pt - lg - 5 {
        padding - top: 3rem!important;
    }
  .pe - lg - 0 {
        padding - left: 0!important;
    }
  .pe - lg - 1 {
        padding - left: 0.25rem!important;
    }
  .pe - lg - 2 {
        padding - left: 0.5rem!important;
    }
  .pe - lg - 3 {
        padding - left: 1rem!important;
    }
  .pe - lg - 4 {
        padding - left: 1.5rem!important;
    }
  .pe - lg - 5 {
        padding - left: 3rem!important;
    }
  .pb - lg - 0 {
        padding - bottom: 0!important;
    }
  .pb - lg - 1 {
        padding - bottom: 0.25rem!important;
    }
  .pb - lg - 2 {
        padding - bottom: 0.5rem!important;
    }
  .pb - lg - 3 {
        padding - bottom: 1rem!important;
    }
  .pb - lg - 4 {
        padding - bottom: 1.5rem!important;
    }
  .pb - lg - 5 {
        padding - bottom: 3rem!important;
    }
  .ps - lg - 0 {
        padding - right: 0!important;
    }
  .ps - lg - 1 {
        padding - right: 0.25rem!important;
    }
  .ps - lg - 2 {
        padding - right: 0.5rem!important;
    }
  .ps - lg - 3 {
        padding - right: 1rem!important;
    }
  .ps - lg - 4 {
        padding - right: 1.5rem!important;
    }
  .ps - lg - 5 {
        padding - right: 3rem!important;
    }
  .gap - lg - 0 {
        gap: 0!important;
    }
  .gap - lg - 1 {
        gap: 0.25rem!important;
    }
  .gap - lg - 2 {
        gap: 0.5rem!important;
    }
  .gap - lg - 3 {
        gap: 1rem!important;
    }
  .gap - lg - 4 {
        gap: 1.5rem!important;
    }
  .gap - lg - 5 {
        gap: 3rem!important;
    }
  .row - gap - lg - 0 {
        row - gap: 0!important;
    }
  .row - gap - lg - 1 {
        row - gap: 0.25rem!important;
    }
  .row - gap - lg - 2 {
        row - gap: 0.5rem!important;
    }
  .row - gap - lg - 3 {
        row - gap: 1rem!important;
    }
  .row - gap - lg - 4 {
        row - gap: 1.5rem!important;
    }
  .row - gap - lg - 5 {
        row - gap: 3rem!important;
    }
  .column - gap - lg - 0 {
        -moz - column - gap: 0!important;
        column - gap: 0!important;
    }
  .column - gap - lg - 1 {
        -moz - column - gap: 0.25rem!important;
        column - gap: 0.25rem!important;
    }
  .column - gap - lg - 2 {
        -moz - column - gap: 0.5rem!important;
        column - gap: 0.5rem!important;
    }
  .column - gap - lg - 3 {
        -moz - column - gap: 1rem!important;
        column - gap: 1rem!important;
    }
  .column - gap - lg - 4 {
        -moz - column - gap: 1.5rem!important;
        column - gap: 1.5rem!important;
    }
  .column - gap - lg - 5 {
        -moz - column - gap: 3rem!important;
        column - gap: 3rem!important;
    }
  .text - lg - start {
        text - align: right!important;
    }
  .text - lg - end {
        text - align: left!important;
    }
  .text - lg - center {
        text - align: center!important;
    }
}
@media(min - width: 1200px) {
  .float - xl - start {
        float: right!important;
    }
  .float - xl - end {
        float: left!important;
    }
  .float - xl - none {
        float: none!important;
    }
  .object - fit - xl - contain {
        -o - object - fit: contain!important;
        object - fit: contain!important;
    }
  .object - fit - xl - cover {
        -o - object - fit: cover!important;
        object - fit: cover!important;
    }
  .object - fit - xl - fill {
        -o - object - fit: fill!important;
        object - fit: fill!important;
    }
  .object - fit - xl - scale {
        -o - object - fit: scale - down!important;
        object - fit: scale - down!important;
    }
  .object - fit - xl - none {
        -o - object - fit: none!important;
        object - fit: none!important;
    }
  .d - xl - inline {
        display: inline!important;
    }
  .d - xl - inline - block {
        display: inline - block!important;
    }
  .d - xl - block {
        display: block!important;
    }
  .d - xl - grid {
        display: grid!important;
    }
  .d - xl - inline - grid {
        display: inline - grid!important;
    }
  .d - xl - table {
        display: table!important;
    }
  .d - xl - table - row {
        display: table - row!important;
    }
  .d - xl - table - cell {
        display: table - cell!important;
    }
  .d - xl - flex {
        display: flex!important;
    }
  .d - xl - inline - flex {
        display: inline - flex!important;
    }
  .d - xl - none {
        display: none!important;
    }
  .flex - xl - fill {
        flex: 1 1 auto!important;
    }
  .flex - xl - row {
        flex - direction: row!important;
    }
  .flex - xl - column {
        flex - direction: column!important;
    }
  .flex - xl - row - reverse {
        flex - direction: row - reverse!important;
    }
  .flex - xl - column - reverse {
        flex - direction: column - reverse!important;
    }
  .flex - xl - grow - 0 {
        flex - grow: 0!important;
    }
  .flex - xl - grow - 1 {
        flex - grow: 1!important;
    }
  .flex - xl - shrink - 0 {
        flex - shrink: 0!important;
    }
  .flex - xl - shrink - 1 {
        flex - shrink: 1!important;
    }
  .flex - xl - wrap {
        flex - wrap: wrap!important;
    }
  .flex - xl - nowrap {
        flex - wrap: nowrap!important;
    }
  .flex - xl - wrap - reverse {
        flex - wrap: wrap - reverse!important;
    }
  .justify - content - xl - start {
        justify - content: flex - start!important;
    }
  .justify - content - xl - end {
        justify - content: flex - end!important;
    }
  .justify - content - xl - center {
        justify - content: center!important;
    }
  .justify - content - xl - between {
        justify - content: space - between!important;
    }
  .justify - content - xl - around {
        justify - content: space - around!important;
    }
  .justify - content - xl - evenly {
        justify - content: space - evenly!important;
    }
  .align - items - xl - start {
        align - items: flex - start!important;
    }
  .align - items - xl - end {
        align - items: flex - end!important;
    }
  .align - items - xl - center {
        align - items: center!important;
    }
  .align - items - xl - baseline {
        align - items: baseline!important;
    }
  .align - items - xl - stretch {
        align - items: stretch!important;
    }
  .align - content - xl - start {
        align - content: flex - start!important;
    }
  .align - content - xl - end {
        align - content: flex - end!important;
    }
  .align - content - xl - center {
        align - content: center!important;
    }
  .align - content - xl - between {
        align - content: space - between!important;
    }
  .align - content - xl - around {
        align - content: space - around!important;
    }
  .align - content - xl - stretch {
        align - content: stretch!important;
    }
  .align - self - xl - auto {
        align - self: auto!important;
    }
  .align - self - xl - start {
        align - self: flex - start!important;
    }
  .align - self - xl - end {
        align - self: flex - end!important;
    }
  .align - self - xl - center {
        align - self: center!important;
    }
  .align - self - xl - baseline {
        align - self: baseline!important;
    }
  .align - self - xl - stretch {
        align - self: stretch!important;
    }
  .order - xl - first {
        order: -1!important;
    }
  .order - xl - 0 {
        order: 0!important;
    }
  .order - xl - 1 {
        order: 1!important;
    }
  .order - xl - 2 {
        order: 2!important;
    }
  .order - xl - 3 {
        order: 3!important;
    }
  .order - xl - 4 {
        order: 4!important;
    }
  .order - xl - 5 {
        order: 5!important;
    }
  .order - xl - last {
        order: 6!important;
    }
  .m - xl - 0 {
        margin: 0!important;
    }
  .m - xl - 1 {
        margin: 0.25rem!important;
    }
  .m - xl - 2 {
        margin: 0.5rem!important;
    }
  .m - xl - 3 {
        margin: 1rem!important;
    }
  .m - xl - 4 {
        margin: 1.5rem!important;
    }
  .m - xl - 5 {
        margin: 3rem!important;
    }
  .m - xl - auto {
        margin: auto!important;
    }
  .mx - xl - 0 {
        margin - left: 0!important;
        margin - right: 0!important;
    }
  .mx - xl - 1 {
        margin - left: 0.25rem!important;
        margin - right: 0.25rem!important;
    }
  .mx - xl - 2 {
        margin - left: 0.5rem!important;
        margin - right: 0.5rem!important;
    }
  .mx - xl - 3 {
        margin - left: 1rem!important;
        margin - right: 1rem!important;
    }
  .mx - xl - 4 {
        margin - left: 1.5rem!important;
        margin - right: 1.5rem!important;
    }
  .mx - xl - 5 {
        margin - left: 3rem!important;
        margin - right: 3rem!important;
    }
  .mx - xl - auto {
        margin - left: auto!important;
        margin - right: auto!important;
    }
  .my - xl - 0 {
        margin - top: 0!important;
        margin - bottom: 0!important;
    }
  .my - xl - 1 {
        margin - top: 0.25rem!important;
        margin - bottom: 0.25rem!important;
    }
  .my - xl - 2 {
        margin - top: 0.5rem!important;
        margin - bottom: 0.5rem!important;
    }
  .my - xl - 3 {
        margin - top: 1rem!important;
        margin - bottom: 1rem!important;
    }
  .my - xl - 4 {
        margin - top: 1.5rem!important;
        margin - bottom: 1.5rem!important;
    }
  .my - xl - 5 {
        margin - top: 3rem!important;
        margin - bottom: 3rem!important;
    }
  .my - xl - auto {
        margin - top: auto!important;
        margin - bottom: auto!important;
    }
  .mt - xl - 0 {
        margin - top: 0!important;
    }
  .mt - xl - 1 {
        margin - top: 0.25rem!important;
    }
  .mt - xl - 2 {
        margin - top: 0.5rem!important;
    }
  .mt - xl - 3 {
        margin - top: 1rem!important;
    }
  .mt - xl - 4 {
        margin - top: 1.5rem!important;
    }
  .mt - xl - 5 {
        margin - top: 3rem!important;
    }
  .mt - xl - auto {
        margin - top: auto!important;
    }
  .me - xl - 0 {
        margin - left: 0!important;
    }
  .me - xl - 1 {
        margin - left: 0.25rem!important;
    }
  .me - xl - 2 {
        margin - left: 0.5rem!important;
    }
  .me - xl - 3 {
        margin - left: 1rem!important;
    }
  .me - xl - 4 {
        margin - left: 1.5rem!important;
    }
  .me - xl - 5 {
        margin - left: 3rem!important;
    }
  .me - xl - auto {
        margin - left: auto!important;
    }
  .mb - xl - 0 {
        margin - bottom: 0!important;
    }
  .mb - xl - 1 {
        margin - bottom: 0.25rem!important;
    }
  .mb - xl - 2 {
        margin - bottom: 0.5rem!important;
    }
  .mb - xl - 3 {
        margin - bottom: 1rem!important;
    }
  .mb - xl - 4 {
        margin - bottom: 1.5rem!important;
    }
  .mb - xl - 5 {
        margin - bottom: 3rem!important;
    }
  .mb - xl - auto {
        margin - bottom: auto!important;
    }
  .ms - xl - 0 {
        margin - right: 0!important;
    }
  .ms - xl - 1 {
        margin - right: 0.25rem!important;
    }
  .ms - xl - 2 {
        margin - right: 0.5rem!important;
    }
  .ms - xl - 3 {
        margin - right: 1rem!important;
    }
  .ms - xl - 4 {
        margin - right: 1.5rem!important;
    }
  .ms - xl - 5 {
        margin - right: 3rem!important;
    }
  .ms - xl - auto {
        margin - right: auto!important;
    }
  .p - xl - 0 {
        padding: 0!important;
    }
  .p - xl - 1 {
        padding: 0.25rem!important;
    }
  .p - xl - 2 {
        padding: 0.5rem!important;
    }
  .p - xl - 3 {
        padding: 1rem!important;
    }
  .p - xl - 4 {
        padding: 1.5rem!important;
    }
  .p - xl - 5 {
        padding: 3rem!important;
    }
  .px - xl - 0 {
        padding - left: 0!important;
        padding - right: 0!important;
    }
  .px - xl - 1 {
        padding - left: 0.25rem!important;
        padding - right: 0.25rem!important;
    }
  .px - xl - 2 {
        padding - left: 0.5rem!important;
        padding - right: 0.5rem!important;
    }
  .px - xl - 3 {
        padding - left: 1rem!important;
        padding - right: 1rem!important;
    }
  .px - xl - 4 {
        padding - left: 1.5rem!important;
        padding - right: 1.5rem!important;
    }
  .px - xl - 5 {
        padding - left: 3rem!important;
        padding - right: 3rem!important;
    }
  .py - xl - 0 {
        padding - top: 0!important;
        padding - bottom: 0!important;
    }
  .py - xl - 1 {
        padding - top: 0.25rem!important;
        padding - bottom: 0.25rem!important;
    }
  .py - xl - 2 {
        padding - top: 0.5rem!important;
        padding - bottom: 0.5rem!important;
    }
  .py - xl - 3 {
        padding - top: 1rem!important;
        padding - bottom: 1rem!important;
    }
  .py - xl - 4 {
        padding - top: 1.5rem!important;
        padding - bottom: 1.5rem!important;
    }
  .py - xl - 5 {
        padding - top: 3rem!important;
        padding - bottom: 3rem!important;
    }
  .pt - xl - 0 {
        padding - top: 0!important;
    }
  .pt - xl - 1 {
        padding - top: 0.25rem!important;
    }
  .pt - xl - 2 {
        padding - top: 0.5rem!important;
    }
  .pt - xl - 3 {
        padding - top: 1rem!important;
    }
  .pt - xl - 4 {
        padding - top: 1.5rem!important;
    }
  .pt - xl - 5 {
        padding - top: 3rem!important;
    }
  .pe - xl - 0 {
        padding - left: 0!important;
    }
  .pe - xl - 1 {
        padding - left: 0.25rem!important;
    }
  .pe - xl - 2 {
        padding - left: 0.5rem!important;
    }
  .pe - xl - 3 {
        padding - left: 1rem!important;
    }
  .pe - xl - 4 {
        padding - left: 1.5rem!important;
    }
  .pe - xl - 5 {
        padding - left: 3rem!important;
    }
  .pb - xl - 0 {
        padding - bottom: 0!important;
    }
  .pb - xl - 1 {
        padding - bottom: 0.25rem!important;
    }
  .pb - xl - 2 {
        padding - bottom: 0.5rem!important;
    }
  .pb - xl - 3 {
        padding - bottom: 1rem!important;
    }
  .pb - xl - 4 {
        padding - bottom: 1.5rem!important;
    }
  .pb - xl - 5 {
        padding - bottom: 3rem!important;
    }
  .ps - xl - 0 {
        padding - right: 0!important;
    }
  .ps - xl - 1 {
        padding - right: 0.25rem!important;
    }
  .ps - xl - 2 {
        padding - right: 0.5rem!important;
    }
  .ps - xl - 3 {
        padding - right: 1rem!important;
    }
  .ps - xl - 4 {
        padding - right: 1.5rem!important;
    }
  .ps - xl - 5 {
        padding - right: 3rem!important;
    }
  .gap - xl - 0 {
        gap: 0!important;
    }
  .gap - xl - 1 {
        gap: 0.25rem!important;
    }
  .gap - xl - 2 {
        gap: 0.5rem!important;
    }
  .gap - xl - 3 {
        gap: 1rem!important;
    }
  .gap - xl - 4 {
        gap: 1.5rem!important;
    }
  .gap - xl - 5 {
        gap: 3rem!important;
    }
  .row - gap - xl - 0 {
        row - gap: 0!important;
    }
  .row - gap - xl - 1 {
        row - gap: 0.25rem!important;
    }
  .row - gap - xl - 2 {
        row - gap: 0.5rem!important;
    }
  .row - gap - xl - 3 {
        row - gap: 1rem!important;
    }
  .row - gap - xl - 4 {
        row - gap: 1.5rem!important;
    }
  .row - gap - xl - 5 {
        row - gap: 3rem!important;
    }
  .column - gap - xl - 0 {
        -moz - column - gap: 0!important;
        column - gap: 0!important;
    }
  .column - gap - xl - 1 {
        -moz - column - gap: 0.25rem!important;
        column - gap: 0.25rem!important;
    }
  .column - gap - xl - 2 {
        -moz - column - gap: 0.5rem!important;
        column - gap: 0.5rem!important;
    }
  .column - gap - xl - 3 {
        -moz - column - gap: 1rem!important;
        column - gap: 1rem!important;
    }
  .column - gap - xl - 4 {
        -moz - column - gap: 1.5rem!important;
        column - gap: 1.5rem!important;
    }
  .column - gap - xl - 5 {
        -moz - column - gap: 3rem!important;
        column - gap: 3rem!important;
    }
  .text - xl - start {
        text - align: right!important;
    }
  .text - xl - end {
        text - align: left!important;
    }
  .text - xl - center {
        text - align: center!important;
    }
}
@media(min - width: 1400px) {
  .float - xxl - start {
        float: right!important;
    }
  .float - xxl - end {
        float: left!important;
    }
  .float - xxl - none {
        float: none!important;
    }
  .object - fit - xxl - contain {
        -o - object - fit: contain!important;
        object - fit: contain!important;
    }
  .object - fit - xxl - cover {
        -o - object - fit: cover!important;
        object - fit: cover!important;
    }
  .object - fit - xxl - fill {
        -o - object - fit: fill!important;
        object - fit: fill!important;
    }
  .object - fit - xxl - scale {
        -o - object - fit: scale - down!important;
        object - fit: scale - down!important;
    }
  .object - fit - xxl - none {
        -o - object - fit: none!important;
        object - fit: none!important;
    }
  .d - xxl - inline {
        display: inline!important;
    }
  .d - xxl - inline - block {
        display: inline - block!important;
    }
  .d - xxl - block {
        display: block!important;
    }
  .d - xxl - grid {
        display: grid!important;
    }
  .d - xxl - inline - grid {
        display: inline - grid!important;
    }
  .d - xxl - table {
        display: table!important;
    }
  .d - xxl - table - row {
        display: table - row!important;
    }
  .d - xxl - table - cell {
        display: table - cell!important;
    }
  .d - xxl - flex {
        display: flex!important;
    }
  .d - xxl - inline - flex {
        display: inline - flex!important;
    }
  .d - xxl - none {
        display: none!important;
    }
  .flex - xxl - fill {
        flex: 1 1 auto!important;
    }
  .flex - xxl - row {
        flex - direction: row!important;
    }
  .flex - xxl - column {
        flex - direction: column!important;
    }
  .flex - xxl - row - reverse {
        flex - direction: row - reverse!important;
    }
  .flex - xxl - column - reverse {
        flex - direction: column - reverse!important;
    }
  .flex - xxl - grow - 0 {
        flex - grow: 0!important;
    }
  .flex - xxl - grow - 1 {
        flex - grow: 1!important;
    }
  .flex - xxl - shrink - 0 {
        flex - shrink: 0!important;
    }
  .flex - xxl - shrink - 1 {
        flex - shrink: 1!important;
    }
  .flex - xxl - wrap {
        flex - wrap: wrap!important;
    }
  .flex - xxl - nowrap {
        flex - wrap: nowrap!important;
    }
  .flex - xxl - wrap - reverse {
        flex - wrap: wrap - reverse!important;
    }
  .justify - content - xxl - start {
        justify - content: flex - start!important;
    }
  .justify - content - xxl - end {
        justify - content: flex - end!important;
    }
  .justify - content - xxl - center {
        justify - content: center!important;
    }
  .justify - content - xxl - between {
        justify - content: space - between!important;
    }
  .justify - content - xxl - around {
        justify - content: space - around!important;
    }
  .justify - content - xxl - evenly {
        justify - content: space - evenly!important;
    }
  .align - items - xxl - start {
        align - items: flex - start!important;
    }
  .align - items - xxl - end {
        align - items: flex - end!important;
    }
  .align - items - xxl - center {
        align - items: center!important;
    }
  .align - items - xxl - baseline {
        align - items: baseline!important;
    }
  .align - items - xxl - stretch {
        align - items: stretch!important;
    }
  .align - content - xxl - start {
        align - content: flex - start!important;
    }
  .align - content - xxl - end {
        align - content: flex - end!important;
    }
  .align - content - xxl - center {
        align - content: center!important;
    }
  .align - content - xxl - between {
        align - content: space - between!important;
    }
  .align - content - xxl - around {
        align - content: space - around!important;
    }
  .align - content - xxl - stretch {
        align - content: stretch!important;
    }
  .align - self - xxl - auto {
        align - self: auto!important;
    }
  .align - self - xxl - start {
        align - self: flex - start!important;
    }
  .align - self - xxl - end {
        align - self: flex - end!important;
    }
  .align - self - xxl - center {
        align - self: center!important;
    }
  .align - self - xxl - baseline {
        align - self: baseline!important;
    }
  .align - self - xxl - stretch {
        align - self: stretch!important;
    }
  .order - xxl - first {
        order: -1!important;
    }
  .order - xxl - 0 {
        order: 0!important;
    }
  .order - xxl - 1 {
        order: 1!important;
    }
  .order - xxl - 2 {
        order: 2!important;
    }
  .order - xxl - 3 {
        order: 3!important;
    }
  .order - xxl - 4 {
        order: 4!important;
    }
  .order - xxl - 5 {
        order: 5!important;
    }
  .order - xxl - last {
        order: 6!important;
    }
  .m - xxl - 0 {
        margin: 0!important;
    }
  .m - xxl - 1 {
        margin: 0.25rem!important;
    }
  .m - xxl - 2 {
        margin: 0.5rem!important;
    }
  .m - xxl - 3 {
        margin: 1rem!important;
    }
  .m - xxl - 4 {
        margin: 1.5rem!important;
    }
  .m - xxl - 5 {
        margin: 3rem!important;
    }
  .m - xxl - auto {
        margin: auto!important;
    }
  .mx - xxl - 0 {
        margin - left: 0!important;
        margin - right: 0!important;
    }
  .mx - xxl - 1 {
        margin - left: 0.25rem!important;
        margin - right: 0.25rem!important;
    }
  .mx - xxl - 2 {
        margin - left: 0.5rem!important;
        margin - right: 0.5rem!important;
    }
  .mx - xxl - 3 {
        margin - left: 1rem!important;
        margin - right: 1rem!important;
    }
  .mx - xxl - 4 {
        margin - left: 1.5rem!important;
        margin - right: 1.5rem!important;
    }
  .mx - xxl - 5 {
        margin - left: 3rem!important;
        margin - right: 3rem!important;
    }
  .mx - xxl - auto {
        margin - left: auto!important;
        margin - right: auto!important;
    }
  .my - xxl - 0 {
        margin - top: 0!important;
        margin - bottom: 0!important;
    }
  .my - xxl - 1 {
        margin - top: 0.25rem!important;
        margin - bottom: 0.25rem!important;
    }
  .my - xxl - 2 {
        margin - top: 0.5rem!important;
        margin - bottom: 0.5rem!important;
    }
  .my - xxl - 3 {
        margin - top: 1rem!important;
        margin - bottom: 1rem!important;
    }
  .my - xxl - 4 {
        margin - top: 1.5rem!important;
        margin - bottom: 1.5rem!important;
    }
  .my - xxl - 5 {
        margin - top: 3rem!important;
        margin - bottom: 3rem!important;
    }
  .my - xxl - auto {
        margin - top: auto!important;
        margin - bottom: auto!important;
    }
  .mt - xxl - 0 {
        margin - top: 0!important;
    }
  .mt - xxl - 1 {
        margin - top: 0.25rem!important;
    }
  .mt - xxl - 2 {
        margin - top: 0.5rem!important;
    }
  .mt - xxl - 3 {
        margin - top: 1rem!important;
    }
  .mt - xxl - 4 {
        margin - top: 1.5rem!important;
    }
  .mt - xxl - 5 {
        margin - top: 3rem!important;
    }
  .mt - xxl - auto {
        margin - top: auto!important;
    }
  .me - xxl - 0 {
        margin - left: 0!important;
    }
  .me - xxl - 1 {
        margin - left: 0.25rem!important;
    }
  .me - xxl - 2 {
        margin - left: 0.5rem!important;
    }
  .me - xxl - 3 {
        margin - left: 1rem!important;
    }
  .me - xxl - 4 {
        margin - left: 1.5rem!important;
    }
  .me - xxl - 5 {
        margin - left: 3rem!important;
    }
  .me - xxl - auto {
        margin - left: auto!important;
    }
  .mb - xxl - 0 {
        margin - bottom: 0!important;
    }
  .mb - xxl - 1 {
        margin - bottom: 0.25rem!important;
    }
  .mb - xxl - 2 {
        margin - bottom: 0.5rem!important;
    }
  .mb - xxl - 3 {
        margin - bottom: 1rem!important;
    }
  .mb - xxl - 4 {
        margin - bottom: 1.5rem!important;
    }
  .mb - xxl - 5 {
        margin - bottom: 3rem!important;
    }
  .mb - xxl - auto {
        margin - bottom: auto!important;
    }
  .ms - xxl - 0 {
        margin - right: 0!important;
    }
  .ms - xxl - 1 {
        margin - right: 0.25rem!important;
    }
  .ms - xxl - 2 {
        margin - right: 0.5rem!important;
    }
  .ms - xxl - 3 {
        margin - right: 1rem!important;
    }
  .ms - xxl - 4 {
        margin - right: 1.5rem!important;
    }
  .ms - xxl - 5 {
        margin - right: 3rem!important;
    }
  .ms - xxl - auto {
        margin - right: auto!important;
    }
  .p - xxl - 0 {
        padding: 0!important;
    }
  .p - xxl - 1 {
        padding: 0.25rem!important;
    }
  .p - xxl - 2 {
        padding: 0.5rem!important;
    }
  .p - xxl - 3 {
        padding: 1rem!important;
    }
  .p - xxl - 4 {
        padding: 1.5rem!important;
    }
  .p - xxl - 5 {
        padding: 3rem!important;
    }
  .px - xxl - 0 {
        padding - left: 0!important;
        padding - right: 0!important;
    }
  .px - xxl - 1 {
        padding - left: 0.25rem!important;
        padding - right: 0.25rem!important;
    }
  .px - xxl - 2 {
        padding - left: 0.5rem!important;
        padding - right: 0.5rem!important;
    }
  .px - xxl - 3 {
        padding - left: 1rem!important;
        padding - right: 1rem!important;
    }
  .px - xxl - 4 {
        padding - left: 1.5rem!important;
        padding - right: 1.5rem!important;
    }
  .px - xxl - 5 {
        padding - left: 3rem!important;
        padding - right: 3rem!important;
    }
  .py - xxl - 0 {
        padding - top: 0!important;
        padding - bottom: 0!important;
    }
  .py - xxl - 1 {
        padding - top: 0.25rem!important;
        padding - bottom: 0.25rem!important;
    }
  .py - xxl - 2 {
        padding - top: 0.5rem!important;
        padding - bottom: 0.5rem!important;
    }
  .py - xxl - 3 {
        padding - top: 1rem!important;
        padding - bottom: 1rem!important;
    }
  .py - xxl - 4 {
        padding - top: 1.5rem!important;
        padding - bottom: 1.5rem!important;
    }
  .py - xxl - 5 {
        padding - top: 3rem!important;
        padding - bottom: 3rem!important;
    }
  .pt - xxl - 0 {
        padding - top: 0!important;
    }
  .pt - xxl - 1 {
        padding - top: 0.25rem!important;
    }
  .pt - xxl - 2 {
        padding - top: 0.5rem!important;
    }
  .pt - xxl - 3 {
        padding - top: 1rem!important;
    }
  .pt - xxl - 4 {
        padding - top: 1.5rem!important;
    }
  .pt - xxl - 5 {
        padding - top: 3rem!important;
    }
  .pe - xxl - 0 {
        padding - left: 0!important;
    }
  .pe - xxl - 1 {
        padding - left: 0.25rem!important;
    }
  .pe - xxl - 2 {
        padding - left: 0.5rem!important;
    }
  .pe - xxl - 3 {
        padding - left: 1rem!important;
    }
  .pe - xxl - 4 {
        padding - left: 1.5rem!important;
    }
  .pe - xxl - 5 {
        padding - left: 3rem!important;
    }
  .pb - xxl - 0 {
        padding - bottom: 0!important;
    }
  .pb - xxl - 1 {
        padding - bottom: 0.25rem!important;
    }
  .pb - xxl - 2 {
        padding - bottom: 0.5rem!important;
    }
  .pb - xxl - 3 {
        padding - bottom: 1rem!important;
    }
  .pb - xxl - 4 {
        padding - bottom: 1.5rem!important;
    }
  .pb - xxl - 5 {
        padding - bottom: 3rem!important;
    }
  .ps - xxl - 0 {
        padding - right: 0!important;
    }
  .ps - xxl - 1 {
        padding - right: 0.25rem!important;
    }
  .ps - xxl - 2 {
        padding - right: 0.5rem!important;
    }
  .ps - xxl - 3 {
        padding - right: 1rem!important;
    }
  .ps - xxl - 4 {
        padding - right: 1.5rem!important;
    }
  .ps - xxl - 5 {
        padding - right: 3rem!important;
    }
  .gap - xxl - 0 {
        gap: 0!important;
    }
  .gap - xxl - 1 {
        gap: 0.25rem!important;
    }
  .gap - xxl - 2 {
        gap: 0.5rem!important;
    }
  .gap - xxl - 3 {
        gap: 1rem!important;
    }
  .gap - xxl - 4 {
        gap: 1.5rem!important;
    }
  .gap - xxl - 5 {
        gap: 3rem!important;
    }
  .row - gap - xxl - 0 {
        row - gap: 0!important;
    }
  .row - gap - xxl - 1 {
        row - gap: 0.25rem!important;
    }
  .row - gap - xxl - 2 {
        row - gap: 0.5rem!important;
    }
  .row - gap - xxl - 3 {
        row - gap: 1rem!important;
    }
  .row - gap - xxl - 4 {
        row - gap: 1.5rem!important;
    }
  .row - gap - xxl - 5 {
        row - gap: 3rem!important;
    }
  .column - gap - xxl - 0 {
        -moz - column - gap: 0!important;
        column - gap: 0!important;
    }
  .column - gap - xxl - 1 {
        -moz - column - gap: 0.25rem!important;
        column - gap: 0.25rem!important;
    }
  .column - gap - xxl - 2 {
        -moz - column - gap: 0.5rem!important;
        column - gap: 0.5rem!important;
    }
  .column - gap - xxl - 3 {
        -moz - column - gap: 1rem!important;
        column - gap: 1rem!important;
    }
  .column - gap - xxl - 4 {
        -moz - column - gap: 1.5rem!important;
        column - gap: 1.5rem!important;
    }
  .column - gap - xxl - 5 {
        -moz - column - gap: 3rem!important;
        column - gap: 3rem!important;
    }
  .text - xxl - start {
        text - align: right!important;
    }
  .text - xxl - end {
        text - align: left!important;
    }
  .text - xxl - center {
        text - align: center!important;
    }
}
@media(min - width: 1200px) {
  .fs - 1 {
        font - size: 4rem!important;
    }
  .fs - 2 {
        font - size: 3rem!important;
    }
  .fs - 3 {
        font - size: 2.5rem!important;
    }
  .fs - 4 {
        font - size: 2rem!important;
    }
  .fs - 5 {
        font - size: 1.5rem!important;
    }
}
@media print {
  .d - print - inline {
        display: inline!important;
    }
  .d - print - inline - block {
        display: inline - block!important;
    }
  .d - print - block {
        display: block!important;
    }
  .d - print - grid {
        display: grid!important;
    }
  .d - print - inline - grid {
        display: inline - grid!important;
    }
  .d - print - table {
        display: table!important;
    }
  .d - print - table - row {
        display: table - row!important;
    }
  .d - print - table - cell {
        display: table - cell!important;
    }
  .d - print - flex {
        display: flex!important;
    }
  .d - print - inline - flex {
        display: inline - flex!important;
    }
  .d - print - none {
        display: none!important;
    }
}
.navbar.bg - primary {
    border: 1px solid #282828;
}
.navbar.bg - dark {
    background - color: #060606!important;
    border: 1px solid #282828;
}
.navbar.bg - light {
    background - color: #888!important;
}
.navbar.fixed - top {
    border - width: 0 0 1px;
}
.navbar.fixed - bottom {
    border - width: 1px 0 0;
}

.btn - primary {
    background - color: #2a9fd6;
}
.btn - secondary {
    background - color: #555;
}
.btn - success {
    background - color: #77b300;
}
.btn - info {
    background - color: #93c;
}
.btn - warning {
    background - color: #f80;
}
.btn - danger {
    background - color: #c00;
}
.btn - light {
    background - color: #222;
}
.btn - dark {
    background - color: #adafae;
}

legend {
    color: #fff;
}

.form - control: disabled, .form - control[readonly] {
    border - color: transparent;
}

.nav - tabs.nav - link,
.nav - pills.nav - link {
    color: #fff;
}
.nav - tabs.nav - link: hover,
.nav - pills.nav - link: hover {
    background - color: #282828;
}
.nav - tabs.nav - link.disabled, .nav - tabs.nav - link.disabled: hover,
.nav - pills.nav - link.disabled,
.nav - pills.nav - link.disabled: hover {
    color: var(--bs - secondary - color);
    background - color: transparent;
}
.nav - tabs.nav - link.active,
.nav - pills.nav - link.active {
    background - color: #2a9fd6;
}

.breadcrumb a {
    color: #fff;
}

.pagination a: hover {
    text - decoration: none;
}

.alert {
    color: #fff;
    border: none;
}
.alert a,
.alert.alert - link {
    color: #fff;
    text - decoration: underline;
}
.alert - primary {
    background - color: #2a9fd6;
}
.alert - secondary {
    background - color: #555;
}
.alert - success {
    background - color: #77b300;
}
.alert - info {
    background - color: #93c;
}
.alert - warning {
    background - color: #f80;
}
.alert - danger {
    background - color: #c00;
}
.alert - light {
    background - color: #222;
}
.alert - dark {
    background - color: #adafae;
}

.badge.bg - dark {
    color: #212529;
}

.tooltip {
    --bs - tooltip - bg: var(--bs - tertiary - bg);
    --bs - tooltip - color: var(--bs - emphasis - color);
}

.list - group - item - action: hover {
    border - color: #2a9fd6;
}

.popover - title {
    border - bottom: none;
}