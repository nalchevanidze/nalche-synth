"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ButtonWave = require("./ButtonWave");

var _ButtonWave2 = _interopRequireDefault(_ButtonWave);

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
	    size = _ref$size === undefined ? 1 : _ref$size,
	    _ref$list = _ref.list,
	    list = _ref$list === undefined ? [] : _ref$list,
	    _ref$color = _ref.color,
	    color = _ref$color === undefined ? "#2196f3" : _ref$color,
	    target = _ref.target,
	    _onChange = _ref.onChange;
	return _react2.default.createElement(
		"div",
		{ style: _extends({}, styles.panel, {
				width: size * 50 + (size - 1) * 20 + "px"
			})
		},
		_react2.default.createElement(
			"h1",
			{
				style: {
					color: color,
					fontSize: "12px",
					margin: "0px",
					width: "100%",
					textAlign: "center",
					textTransform: "uppercase"
				}
			},
			label
		),
		children,
		list.map(function (par, i) {
			return _react2.default.createElement(_ButtonWave2.default, {
				id: par.id,
				key: i,
				color: color,
				target: target,
				onChange: function onChange() {
					if (_onChange) {
						_onChange.apply(undefined, arguments);
					}
				}
			});
		})
	);
};

exports.default = DisplayPanel;