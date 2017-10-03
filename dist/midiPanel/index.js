"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardSVG = require("./KeyboardSVG");

var _KeyboardSVG2 = _interopRequireDefault(_KeyboardSVG);

var _MidiHeader = require("./MidiHeader");

var _MidiHeader2 = _interopRequireDefault(_MidiHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MidiDesk = function (_React$PureComponent) {
	_inherits(MidiDesk, _React$PureComponent);

	function MidiDesk() {
		_classCallCheck(this, MidiDesk);

		return _possibleConstructorReturn(this, (MidiDesk.__proto__ || Object.getPrototypeOf(MidiDesk)).apply(this, arguments));
	}

	_createClass(MidiDesk, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					style: {
						width: "300px",
						overflow: "scroll"
					}
				},
				_react2.default.createElement(_KeyboardSVG2.default, this.props)
			);
		}
	}]);

	return MidiDesk;
}(_react2.default.PureComponent);

var melody = function (_React$PureComponent2) {
	_inherits(melody, _React$PureComponent2);

	function melody(props) {
		_classCallCheck(this, melody);

		var _this2 = _possibleConstructorReturn(this, (melody.__proto__ || Object.getPrototypeOf(melody)).call(this, props));

		_this2.state = {
			actionType: "select"
		};

		_this2.modes = {
			draw: function draw() {
				_this2.setState({ actionType: "draw" });
			},

			select: function select() {
				_this2.setState({ actionType: "select" });
			}
		};

		return _this2;
	}

	_createClass(melody, [{
		key: "render",
		value: function render() {
			var global = this.props.global;

			return _react2.default.createElement(
				"div",
				{
					style: {
						position: "relative"
					}
				},
				_react2.default.createElement(_MidiHeader2.default, {
					global: global,
					setMode: this.modes,
					actionType: this.state.actionType,
					isPlayng: this.props.isPlayng
				}),
				_react2.default.createElement(MidiDesk, {
					currentState: this.props.currentState,
					midi: this.props.midi,
					updateMidi: this.props.updateMidi,
					setTime: this.props.setTime,
					global: this.props.global,
					actionType: this.state.actionType
				})
			);
		}
	}]);

	return melody;
}(_react2.default.PureComponent);

exports.default = melody;