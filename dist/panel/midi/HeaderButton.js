"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var icon = {
	play: "M20 0 L 90 50 20 100Z",
	pause: "M30,100V0 M70,0v100",
	stop: "M5 5 L 95 5 95 95 5 95z",
	draw: "M72 15.2L20 68 14 88l19.4-6.6L90 23.6 73.7 7.8",
	select: "M71 71L25.4 27M58.5 27.4l-33-.7.3 34"

};
var HeaderButton = function HeaderButton(_ref) {
	var id = _ref.id,
	    actions = _ref.actions,
	    color = _ref.color;
	return _react2.default.createElement(
		"svg",
		{
			viewBox: [0, 0, 100, 100],
			width: "20px",
			height: "20px",
			onClick: actions[id],
			style: {
				cursor: "pointer",
				padding: "5px"
			}
		},
		_react2.default.createElement("path", {
			stroke: color || "#ffa929",
			strokeWidth: 10,
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: icon[id],
			fill: "none"
		})
	);
};

exports.default = HeaderButton;