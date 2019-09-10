"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabItem = _vue.default.extend({
  render: function render(h) {
    return h("div", {
      "class": "__cus-tab-bar-item"
    }, [this.$slots.default]);
  }
});

var _default = CusTabItem;
exports.default = _default;