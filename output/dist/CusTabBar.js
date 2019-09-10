"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabBar = _vue.default.extend({
  render: function render(h) {
    return h("div", {
      "class": '__cus-tab-bar',
      "attrs": {
        "id": '__cus-tab-bar'
      }
    }, [h("div", {
      "class": '__cus-tabs-wrap'
    }, [this.$slots.default]), h("div", {
      "class": '__cus-tab-indicator',
      "attrs": {
        "id": '__cus-indicator'
      }
    })]);
  }
});

var _default = CusTabBar;
exports.default = _default;