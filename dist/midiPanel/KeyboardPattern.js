"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridSize = 40;
var KeyboardPattern = function KeyboardPattern() {
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement(
			"defs",
			null,
			_react2.default.createElement(
				"pattern",
				{
					width: "10",
					height: "120",
					patternUnits: "userSpaceOnUse",
					id: "quart"
				},
				_react2.default.createElement("rect", {
					y: 0,
					fill: "none",
					width: "10",
					height: "120",
					stroke: "#000",
					strokeWidth: 0.1
				})
			),
			_react2.default.createElement(
				"pattern",
				{
					width: gridSize,
					height: "120",
					patternUnits: "userSpaceOnUse",
					id: "key"
				},
				_react2.default.createElement(
					"g",
					{
						stroke: "black",
						fill: "none",
						strokeWidth: 0.2
					},
					_react2.default.createElement("line", { x1: 0, x2: 200, y1: 1, y2: 1 }),
					_react2.default.createElement("line", { x1: 0, x2: 200, y1: 70, y2: 70 }),
					_react2.default.createElement("line", { x1: gridSize, x2: gridSize, y1: 0, y2: 120 })
				),
				_react2.default.createElement(
					"g",
					{
						fill: "black",
						fillOpacity: "0.2"
					},
					_react2.default.createElement("rect", { y: 10, width: gridSize, height: "10" }),
					_react2.default.createElement("rect", { y: 30, width: gridSize, height: "10" }),
					_react2.default.createElement("rect", { y: 50, width: gridSize, height: "10" }),
					_react2.default.createElement("rect", { y: 80, width: gridSize, height: "10" }),
					_react2.default.createElement("rect", { y: 100, width: gridSize, height: "10" })
				),
				_react2.default.createElement("rect", {
					width: gridSize,
					height: "120",
					fill: "url(#quart)"
				})
			)
		),
		_react2.default.createElement("rect", { width: "100%", height: 120 * 3, fill: "url(#key)", className: "grids" })
	);
};
exports.default = KeyboardPattern;