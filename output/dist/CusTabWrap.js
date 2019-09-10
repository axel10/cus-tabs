"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabWrap = _vue.default.extend({
  render: function render(h) {
    return h("div", {
      "class": '__cus-tabs',
      "attrs": {
        "id": '__cus-tabs'
      }
    }, [this.$slots.tabBar, this.$slots.tabContainer]);
  }
});

var _default = CusTabWrap;
exports.default = _default;