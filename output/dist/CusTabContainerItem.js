"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabContainerItem = _vue.default.extend({
  render: function render(h) {
    return h("div", {
      "class": "__cus-tab-container-item"
    }, [h("div", {
      "class": "__cus-tab-container-item-content-wrap"
    }, [this.$slots.default])]);
  }
});

var _default = CusTabContainerItem;
exports.default = _default;