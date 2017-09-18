"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _oscillator = require("./oscillator");

var _oscillator2 = _interopRequireDefault(_oscillator);

var _envelope = require("./envelope");

var _envelope2 = _interopRequireDefault(_envelope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function Panel(_ref) {
    var onChange = _ref.onChange,
        range = _ref.range;
    return _react2.default.createElement(
        "div",
        { className: "panel" },
        _react2.default.createElement(_oscillator2.default, null),
        _react2.default.createElement(_envelope2.default, null)
    );
};

exports.default = Panel;