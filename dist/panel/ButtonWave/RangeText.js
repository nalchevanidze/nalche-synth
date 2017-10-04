"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rangeFunc = function rangeFunc(_ref, x) {
	var min = _ref.min,
	    max = _ref.max;

	var size = max - min;
	return Math.floor(min + x * size);
};

var RangeText = function RangeText(_ref2) {
	var color = _ref2.color,
	    range = _ref2.range,
	    value = _ref2.value;
	return _react2.default.createElement(
		"text",
		{
			x: "50",
			y: "65",
			fontSize: "40px",
			textAnchor: "middle",
			fill: color,
			style: { userSelect: "none" }
		},
		rangeFunc(range, value)
	);
};
exports.default = RangeText;