"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var keys = [{ id: "C" }, { semi: true, id: "C#", left: 9.2 }, { id: "D" }, { semi: true, id: "D#", left: 23.6 }, { id: "E" }, { id: "F" }, { semi: true, id: "F#", left: 52.1 }, { id: "G" }, { semi: true, id: "G#", left: 66.5 }, { id: "A" }, { semi: true, id: "A#", left: 81.5 }, { id: "B" }].map(function (key, i) {
	return _extends({}, key, { i: i });
});

var whiteKeys = keys.filter(function (e) {
	return !e.semi;
});
var blackKeys = keys.filter(function (e) {
	return e.semi;
});

var keyStyle = {
	default: {
		display: "block",
		border: "1px solid #c1c1c1",
		borderRadius: "2px",
		flexGrow: 0,
		boxShadow: "2px 10px 2px rgba(0, 0, 0, 0.1)",
		width: "14.2%",
		paddingTop: "180px",
		background: "white"

	}
};

keyStyle.black = _extends({}, keyStyle.default, {
	background: "black",
	width: "10%",
	position: "absolute",
	paddingTop: "140px"
});

var StyleBlack = {
	active: _extends({}, keyStyle.black, {
		background: "#333",
		paddingTop: "135px"
	}),
	default: keyStyle.black
};

var StyleWhite = {
	default: keyStyle.default,
	active: _extends({}, keyStyle.default, {
		background: "#EEE",
		paddingTop: "170px"
	})
};

var Key = function Key(_ref) {
	var index = _ref.index,
	    _ref$active = _ref.active,
	    active = _ref$active === undefined ? [] : _ref$active,
	    press = _ref.press,
	    up = _ref.up,
	    style = _ref.style,
	    left = _ref.left;
	return _react2.default.createElement("button", {
		style: _extends({}, active[index] ? style.active : style.default, {
			left: left

		}),
		onTouchStart: press.bind(undefined, index),
		onTouchEnd: press.bind(undefined, index),
		onMouseDown: press.bind(undefined, index),
		onMouseUp: up.bind(undefined, index)
	});
};

var styles = {
	listStyleType: "none",
	cursor: "pointer",
	display: "flex",
	position: "relative",
	width: "300px",
	userSelect: "none",
	justifyContent: "space-between",
	alignItems: "start"
};

var Octave = function Octave(_ref2) {
	var index = _ref2.index,
	    props = _objectWithoutProperties(_ref2, ["index"]);

	return _react2.default.createElement(
		"li",
		{ style: styles },
		whiteKeys.map(function (_ref3) {
			var i = _ref3.i;
			return _react2.default.createElement(Key, _extends({}, props, { index: index * 12 + i, key: i, style: StyleWhite }));
		}),
		blackKeys.map(function (_ref4) {
			var i = _ref4.i,
			    left = _ref4.left;
			return _react2.default.createElement(Key, _extends({}, props, { left: left + "%", index: index * 12 + i, key: i, style: StyleBlack }));
		})
	);
};

exports.default = Octave;