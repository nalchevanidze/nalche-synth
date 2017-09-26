"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	panel: {
		display: "flex",
		margin: "5px",
		justifyContent: "space-around",
		flexWrap: "wrap",
		flexShrink: 0
	},
	panelHeader: {
		color: "#03A9F4",
		fontSize: "12px",
		margin: "0px",
		width: "100%",
		textAlign: "center",
		textTransform: "uppercase"
	}
};

var DisplayPanel = function DisplayPanel(_ref) {
	var children = _ref.children,
	    label = _ref.label,
	    _ref$size = _ref.size,
	    size = _ref$size === undefined ? 1 : _ref$size;
	return _react2.default.createElement(
		"div",
		{ style: _extends({}, styles.panel, {
				width: size * 50 + (size - 1) * 20 + "px"
			})
		},
		_react2.default.createElement(
			"h1",
			{ style: styles.panelHeader },
			" ",
			label,
			" "
		),
		children
	);
};

exports.default = DisplayPanel;