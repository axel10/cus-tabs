"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("@/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabController =
/*#__PURE__*/
function () {
  _createClass(TabController, [{
    key: "tabContainer",
    get: function get() {
      return this.tabsDom.querySelector('.__cus-tab-container');
    }
  }, {
    key: "currentIndex",
    get: function get() {
      return this._currentIndex;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "transition",
    get: function get() {
      return "transform ".concat(this.duration / 1000, "s");
    }
  }, {
    key: "indicatorTransition",
    get: function get() {
      return "transform ".concat(this.duration / 1000, "s,width ").concat(this.duration / 1000, "s");
    }
  }, {
    key: "tabsDom",
    get: function get() {
      var res = document.querySelector(this.selector);

      if (!res) {
        throw new Error('tabs selector is invalid');
      }

      return res;
    }
  }, {
    key: "containersWrap",
    get: function get() {
      return this.tabsDom.querySelector(".__cus-tab-container-items-wrap");
    }
  }, {
    key: "tabBar",
    get: function get() {
      var tabs = this.tabsDom;
      var result = tabs.querySelector(".".concat(this.tabBarClass));

      if (!result) {
        throw new Error('tar bar id error');
      }

      return result;
    }
  }, {
    key: "tabDomItems",
    get: function get() {
      var tabBar = this.tabBar;

      if (!tabBar) {
        throw new Error('tab bar is undefined,tab bar id error');
      } // __cus-tabs-wrap


      return Array.from(tabBar.querySelector(".".concat(this.tabsWrapClass)).children);
    }
  }, {
    key: "tabContainers",
    get: function get() {
      return Array.from(this.containersWrap.children);
    }
  }, {
    key: "tabContainerWidth",
    get: function get() {
      return this.tabsDom.offsetWidth;
    }
  }, {
    key: "tabBarTotalWidth",
    get: function get() {
      return this.tabDomItems.reduce(function (total, item) {
        return total + item.offsetWidth;
      }, 0);
    }
  }]);

  function TabController(options) {
    var _this = this;

    _classCallCheck(this, TabController);

    _defineProperty(this, "onChange", void 0);

    _defineProperty(this, "indicatorColor", void 0);

    _defineProperty(this, "activeColor", void 0);

    _defineProperty(this, "inactiveColor", void 0);

    _defineProperty(this, "touchStartPoint", []);

    _defineProperty(this, "touchCurrentPoint", []);

    _defineProperty(this, "distanceThreshold", 5);

    _defineProperty(this, "slideThreshold", 40);

    _defineProperty(this, "sliding", false);

    _defineProperty(this, "_currentIndex", 0);

    _defineProperty(this, "distX", 0);

    _defineProperty(this, "distY", 0);

    _defineProperty(this, "distance", 0);

    _defineProperty(this, "touchBeginTime", 0);

    _defineProperty(this, "beginTransform", 0);

    _defineProperty(this, "indicator", void 0);

    _defineProperty(this, "duration", void 0);

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "rebound", void 0);

    _defineProperty(this, "tabCanScroll", void 0);

    _defineProperty(this, "tabBarClass", '__cus-tab-bar');

    _defineProperty(this, "tabContainerClass", '__cus-tab-container');

    _defineProperty(this, "lockSlide", false);

    _defineProperty(this, "scrollEndOffset", void 0);

    _defineProperty(this, "selector", void 0);

    _defineProperty(this, "tabsWrapClass", '__cus-tabs-wrap');

    _defineProperty(this, "onScrollEnd", void 0);

    _defineProperty(this, "tabInitKey", '__tabInit');

    _defineProperty(this, "push", function (tabItem) {
      var containersWrap = _this.containersWrap;
      containersWrap.style.width = "".concat(containersWrap.offsetWidth + _this.tabContainerWidth, "px");

      _this._data.push(tabItem);

      setTimeout(function () {
        _this.syncWidth();

        var tabDomItems = _this.tabDomItems;
        var uninitializedTabs = tabDomItems.filter(function (o) {
          return !o.dataset[_this.tabInitKey];
        });
        uninitializedTabs.forEach(function (newTab) {
          var containers = _this.tabContainers;
          newTab.addEventListener('click', _this.handleTabClick);

          _this.addContainerScrollListener(containers[containers.length - 1]);
        });
      });
    });

    _defineProperty(this, "remove", function (i) {
      _this._data.splice(i, 1);

      var currentIndex = _this.currentIndex;

      if (i === currentIndex) {
        _this.changeTab(currentIndex === 0 ? 0 : currentIndex - 1);
      }

      setTimeout(function () {
        _this.syncWidth();
      });
    });

    _defineProperty(this, "changeTab", function (targetIndex) {
      var isAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var indicator = _this.indicator,
          containersWrap = _this.containersWrap,
          _data = _this._data;

      if (targetIndex >= _data.length) {
        console.warn('target index out of range');
        return;
      }

      _this.onChange(targetIndex, _data[targetIndex]);

      if (targetIndex === _this._currentIndex) {
        return;
      }

      var tabContainer = _this.tabContainer;
      var tabContainerItemWidth = tabContainer.offsetWidth;
      var tabBarItems = _this.tabDomItems;
      var targetTab = tabBarItems[targetIndex];
      tabBarItems.forEach(function (o) {
        o.style.color = _this.inactiveColor;
        o.classList.remove('active');
      });
      _this._currentIndex = targetIndex;
      targetTab.classList.add('active');
      targetTab.style.color = _this.activeColor; // 移动到相应tab

      indicator.style.transform = "translateX(".concat(targetTab.offsetLeft, "px)");
      indicator.style.width = "".concat(targetTab.offsetWidth, "px");
      containersWrap.style.transition = isAnimate ? _this.transition : 'none';
      setTimeout(function () {
        containersWrap.style.transform = "translateX(".concat(-tabContainerItemWidth * targetIndex, "px)");
        setTimeout(function () {
          containersWrap.style.transition = _this.transition;
        });
      }); // 处理tab bar 滚动

      if (_this.tabCanScroll) {
        var tabBar = _this.tabBar;
        var tabBarSpace = 50;
        var targetTabOffsetLeft = targetTab.offsetLeft;
        var targetTabWidth = targetTab.offsetWidth;
        var tabBarScrollLeft = tabBar.scrollLeft;
        var containerWidth = _this.tabContainerWidth;
        var rightBoundary = targetTabOffsetLeft + targetTabWidth + tabBarSpace;
        var leftBoundary = targetTabOffsetLeft - tabBarSpace;
        var tabBarTotalWidth = _this.tabBarTotalWidth;
        var tabContainerWidth = _this.tabContainerWidth;

        if (rightBoundary > tabBarScrollLeft + containerWidth) {
          /*        if (targetTab.offsetWidth >= tabContainerWidth) {        }*/
          if (rightBoundary >= tabBarTotalWidth) {
            _utils.default.animateScrollTo(tabBar, {
              x: tabBarTotalWidth - containerWidth,
              y: 0
            }, _this.duration);
          } else {
            _utils.default.animateScrollTo(tabBar, {
              x: rightBoundary - containerWidth,
              y: 0
            }, _this.duration);
          }
        }

        if (leftBoundary < tabBarScrollLeft) {
          _utils.default.animateScrollTo(tabBar, {
            x: leftBoundary < 0 ? 0 : leftBoundary,
            y: 0
          }, _this.duration);
        }
      }
    });

    _defineProperty(this, "addContainerScrollListener", function (container) {
      container.addEventListener('scroll', function (e) {
        var target = e.target;
        _this.lockSlide = true;

        if (target.scrollTop + target.offsetHeight >= target.scrollHeight - _this.scrollEndOffset) {
          _this.onScrollEnd(_this.currentIndex);
        }
      });
    });

    _defineProperty(this, "syncWidth", function () {
      var containersWrap = _this.containersWrap;
      var tabContainerItems = Array.from(containersWrap.children);
      var tabDomItems = _this.tabDomItems;
      var containerItemWidth = _this.tabContainerWidth;
      containersWrap.style.width = tabContainerItems.length * containerItemWidth + 'px';
      tabContainerItems.forEach(function (container) {
        container.style.width = containerItemWidth + 'px';
        containersWrap.style.width = tabContainerItems.length * containerItemWidth + 'px';
      });
      setTimeout(function () {
        _this.indicator.style.width = tabDomItems[0].offsetWidth + 'px';
      });
      containersWrap.style.transition = 'none';
      containersWrap.style.transform = "translateX(".concat(-_this.currentIndex * containerItemWidth, "px)");
    });

    _defineProperty(this, "handleTabClick", function (e) {
      var clickedTab = e.currentTarget;
      var tabDomItems = _this.tabDomItems;
      var targetIndex = tabDomItems.findIndex(function (o) {
        return o === clickedTab;
      });

      _this.changeTab(targetIndex);
    });

    var _ref = options || {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '#__cus-tabs' : _ref$selector,
        _ref$tabScroll = _ref.tabScroll,
        tabScroll = _ref$tabScroll === void 0 ? false : _ref$tabScroll,
        _ref$rebound = _ref.rebound,
        rebound = _ref$rebound === void 0 ? false : _ref$rebound,
        _ref$initIndex = _ref.initIndex,
        initIndex = _ref$initIndex === void 0 ? 0 : _ref$initIndex,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? [] : _ref$data,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
        _ref$indicatorOptions = _ref.indicatorOptions,
        indicatorOptions = _ref$indicatorOptions === void 0 ? {
      backgroundColor: '#409eff',
      height: '2px'
    } : _ref$indicatorOptions,
        _ref$activeColor = _ref.activeColor,
        activeColor = _ref$activeColor === void 0 ? '#409eff' : _ref$activeColor,
        _ref$inactiveColor = _ref.inactiveColor,
        inactiveColor = _ref$inactiveColor === void 0 ? '#000' : _ref$inactiveColor,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 500 : _ref$duration,
        _ref$onScrollEnd = _ref.onScrollEnd,
        onScrollEnd = _ref$onScrollEnd === void 0 ? function () {} : _ref$onScrollEnd,
        _ref$scrollEndOffset = _ref.scrollEndOffset,
        scrollEndOffset = _ref$scrollEndOffset === void 0 ? 0 : _ref$scrollEndOffset;

    this.selector = selector;
    var tabs = document.querySelector(selector);

    if (!tabs) {
      throw new Error('tabs is not found');
    }

    var _tabBar = tabs.querySelector(".".concat(this.tabBarClass));

    var _tabContainer = tabs.querySelector(".".concat(this.tabContainerClass));

    if (!_tabBar) {
      throw new Error('tab bar id error');
    }

    if (!_tabContainer) {
      throw new Error('tab container id error');
    }

    var indicatorColor = indicatorOptions.backgroundColor,
        indicatorHeight = indicatorOptions.height;
    this.onScrollEnd = onScrollEnd;
    this.scrollEndOffset = scrollEndOffset;
    this.duration = duration;
    this.indicatorColor = indicatorColor;
    this.inactiveColor = inactiveColor;
    this.activeColor = activeColor;
    this._currentIndex = 0;
    this.rebound = rebound;
    this.onChange = onChange;
    this._data = data;
    this.tabCanScroll = tabScroll;
    var _containersWrap = this.containersWrap;

    var _indicator = _tabBar.querySelector('#__cus-indicator');

    this.indicator = _indicator;
    _indicator.style.backgroundColor = this.indicatorColor;
    _indicator.style.transition = this.indicatorTransition;
    _indicator.style.height = indicatorHeight;
    _tabBar.style.visibility = 'hidden';
    _tabContainer.style.visibility = 'hidden';
    setTimeout(function () {
      _tabBar.style.visibility = 'visible';
      _tabContainer.style.visibility = 'visible';
      var tabContainers = Array.from(_containersWrap.children);
      _containersWrap.style.width = tabContainers.length * _this.tabContainerWidth + 'px';
      window.addEventListener('resize', _this.syncWidth);
      var tabDomItems = _this.tabDomItems;
      tabDomItems.forEach(function (o) {
        o.style.color = _this.inactiveColor;
        o.dataset[_this.tabInitKey] = 'true';
      }); // 初始化已激活tab

      setTimeout(function () {
        _indicator.style.width = tabDomItems[0].offsetWidth + 'px';
        tabDomItems[initIndex].style.color = _this.activeColor;
      });
      _containersWrap.style.transform = "translateX(0px)";

      if (!_this.tabCanScroll) {
        var tabsWrap = _tabBar.querySelector('.__cus-tabs-wrap');

        tabsWrap.style.display = 'flex';
        tabsWrap.style.width = '100%';
        tabsWrap.style.whiteSpace = 'normal';
      }

      tabDomItems.forEach(function (item) {
        if (!_this.tabCanScroll) {
          item.style.flex = '1';
        }

        item.addEventListener('click', _this.handleTabClick);
      });

      var handleTransitionEnd = function handleTransitionEnd() {
        _this.sliding = false;
        _containersWrap.style.transition = _this.transition;
      };

      _containersWrap.addEventListener('webkitTransitionEnd', handleTransitionEnd);

      _containersWrap.addEventListener('transitionend', handleTransitionEnd);

      _containersWrap.addEventListener('touchstart', function (e) {
        _this.sliding = true;
        var touch = e.touches[0];
        _this.touchStartPoint = [touch.clientX, touch.clientY];
        _this.touchBeginTime = Date.now();
        _containersWrap.style.transform = getComputedStyle(_containersWrap).transform;
        _containersWrap.style.transition = 'none';
        _this.beginTransform = _this.getTransformX(_containersWrap.style.transform);
        _indicator.style.transition = 'none';
      });

      _containersWrap.addEventListener('touchmove', function (e) {
        var touch = e.touches[0];
        _this.touchCurrentPoint = [touch.clientX, touch.clientY];
        _this.distX = _this.touchCurrentPoint[0] - _this.touchStartPoint[0];
        _this.distY = _this.touchCurrentPoint[1] - _this.touchStartPoint[1];
        var distX = _this.distX,
            distY = _this.distY;
        _this.distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
        var distance = _this.distance;

        if (_this._currentIndex === 0 && !_this.rebound && distX > 0) {
          return;
        }

        if (_this._currentIndex === _this._data.length - 1 && !_this.rebound && distX < 0) {
          return;
        }

        if (distance > _this.distanceThreshold && Math.abs(distX) > Math.abs(distY) && !_this.lockSlide) {
          var tabContainerWidth = _this.tabContainerWidth;
          var rate = Math.abs(distX / tabContainerWidth);
          var currentTab = tabDomItems[_this._currentIndex];
          var currentTabWidth = currentTab.offsetWidth;
          var currentTabLeft = currentTab.offsetLeft;
          var targetTab = distX > 0 ? tabDomItems[_this._currentIndex - 1] : tabDomItems[_this._currentIndex + 1];
          var diffWidth = targetTab.offsetWidth - currentTab.offsetWidth;
          var distanceX = currentTab.offsetLeft - targetTab.offsetLeft;
          _indicator.style.width = currentTabWidth + diffWidth * rate + 'px';
          _indicator.style.transform = "translateX(".concat(currentTabLeft - distanceX * rate, "px");
          _containersWrap.style.transform = "translateX(".concat(_this.beginTransform + distX, "px)");
        }
      });

      _containersWrap.addEventListener('touchend', function () {
        _indicator.style.transition = _this.indicatorTransition;
        var currentTabContainerWidth = _this.tabContainerWidth;

        var reset = function reset() {
          _containersWrap.style.transition = _this.transition;
          _containersWrap.style.transform = "translateX(".concat(-_this._currentIndex * currentTabContainerWidth, "px)"); // 指示器归位

          var currentTab = tabDomItems[_this._currentIndex];
          _indicator.style.transition = _this.indicatorTransition;
          _indicator.style.transform = "translateX(".concat(currentTab.offsetLeft, "px)");
          _indicator.style.width = "".concat(currentTab.offsetWidth, "px");
        };

        if (_this._currentIndex === 0 && _this.distX > 0 || _this._currentIndex === data.length - 1 && _this.distX < 0) {
          // 归位
          reset();
          return;
        }

        var duration = Date.now() - _this.touchBeginTime;

        if (duration < 500 && !_this.lockSlide) {
          if (_this.distX > _this.slideThreshold) {
            _this.changeTab(_this._currentIndex - 1);

            return;
          }

          if (-_this.distX > _this.slideThreshold) {
            _this.changeTab(_this._currentIndex + 1);

            return;
          }
        } else {
          if (_this.distX > currentTabContainerWidth / 2) {
            _this.changeTab(_this._currentIndex - 1);

            return;
          }

          if (-_this.distX > currentTabContainerWidth / 2) {
            _this.changeTab(_this._currentIndex + 1);

            return;
          }
        }

        reset();
        _this.lockSlide = false;
      });

      tabContainers.forEach(function (container) {
        _this.addContainerScrollListener(container);
      });

      _this.changeTab(initIndex);
    });
  }

  _createClass(TabController, [{
    key: "getTransformX",
    value: function getTransformX(transform) {
      if (!transform || transform === 'none') {
        return 0;
      }

      if (transform.startsWith('translateX')) {
        return parseInt(transform.match(/translateX\(([\-0-9\.]+)px\)/)[1], 10);
      }

      if (transform.startsWith('matrix')) {
        return parseInt(transform.match(/matrix\(.*? ([\-0-9\.]+), [0-9\.]+\)/)[1], 10);
      }

      console.warn('unknown transform');
      return 0;
    }
  }]);

  return TabController;
}();

exports.default = TabController;