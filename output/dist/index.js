"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CusTabContainer = _interopRequireDefault(require("@/components/cus-tabs/CusTabContainer.tsx"));

var _CusTabWrap = _interopRequireDefault(require("@/components/cus-tabs/CusTabWrap"));

var _CusTabBar = _interopRequireDefault(require("@/components/cus-tabs/CusTabBar"));

var _CusTabContainerItem = _interopRequireDefault(require("@/components/cus-tabs/CusTabContainerItem"));

var _CusTabItem = _interopRequireDefault(require("@/components/cus-tabs/CusTabItem"));

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabs = function CusTabs(Vue) {
  Vue.component('CusTabWrap', _CusTabWrap.default);
  Vue.component('CusTabBar', _CusTabBar.default);
  Vue.component('CusTabItem', _CusTabItem.default);
  Vue.component('CusTabContainer', _CusTabContainer.default);
  Vue.component('CusTabContainerItem', _CusTabContainerItem.default);
};

var _default = CusTabs;
exports.default = _default;