"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("./icons");

var _icons2 = _interopRequireDefault(_icons);

var _TextWrapper = require("./TextWrapper");

var _TextWrapper2 = _interopRequireDefault(_TextWrapper);

var _CirclerangeButton = require("./CirclerangeButton");

var _CirclerangeButton2 = _interopRequireDefault(_CirclerangeButton);

var _RangeText = require("./RangeText");

var _RangeText2 = _interopRequireDefault(_RangeText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Swithcer = function Swithcer(_ref) {
	var range = _ref.range,
	    props = _objectWithoutProperties(_ref, ["range"]);

	return range ? _react2.default.createElement(_RangeText2.default, _extends({}, props, {
		range: range,
		value: props.target[props.id]
	})) : _react2.default.createElement(
		"g",
		{ fill: "none" },
		_react2.default.createElement("path", {
			d: _icons2.default[props.id],
			strokeWidth: 2,
			stroke: props.color
		})
	);
};

var ButtonWave = function (_React$PureComponent) {
	_inherits(ButtonWave, _React$PureComponent);

	function ButtonWave() {
		_classCallCheck(this, ButtonWave);

		return _possibleConstructorReturn(this, (ButtonWave.__proto__ || Object.getPrototypeOf(ButtonWave)).apply(this, arguments));
	}

	_createClass(ButtonWave, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_TextWrapper2.default,
				this.props,
				_react2.default.createElement(
					_CirclerangeButton2.default,
					this.props,
					_react2.default.createElement(Swithcer, this.props)
				)
			);
		}
	}]);

	return ButtonWave;
}(_react2.default.PureComponent);

exports.default = ButtonWave;