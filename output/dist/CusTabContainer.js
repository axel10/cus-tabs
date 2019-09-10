"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CusTabContainer = _vue.default.extend({
  render: function render(h) {
    return h("div", {
      "class": '__cus-tab-container',
      "attrs": {
        "id": '__cus-tab-container'
      }
    }, [h("div", {
      "class": '__cus-tab-container-items-wrap'
    }, [this.$slots.default])]);
  }
});

var _default = CusTabContainer;
exports.default = _default;