"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeText = function RangeText(_ref) {
	var color = _ref.color,
	    value = _ref.value;
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
		value
	);
};
exports.default = RangeText;