"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardSVG = require("./KeyboardSVG");

var _KeyboardSVG2 = _interopRequireDefault(_KeyboardSVG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function Button(_ref) {
	var id = _ref.id,
	    onClick = _ref.onClick;
	return _react2.default.createElement(
		"button",
		{
			onClick: onClick,
			style: {
				outline: "none",
				border: "none",
				fontSize: "14px",
				textTransform: "uppercase",
				display: "block",
				color: "#ffa929",
				padding: "3px 18px",
				cursor: "pointer",
				background: "#444"
			}
		},
		id
	);
};

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: "render",
		value: function render() {
			var _props$global = this.props.global,
			    play = _props$global.play,
			    pause = _props$global.pause,
			    stop = _props$global.stop,
			    setBPM = _props$global.setBPM,
			    BPM = _props$global.BPM,
			    isPlayng = _props$global.isPlayng;

			var id = isPlayng ? "pause" : "play";
			var action = this.props.global[id];
			return _react2.default.createElement(
				"section",
				{
					style: {
						background: "#444",
						color: "#ffa929",
						padding: "5px",
						fontSize: "12px",
						border: "1px solid #333"
					}
				},
				_react2.default.createElement(
					"h3",
					{ style: {
							margin: "0px",
							padding: "0px",
							display: "flex"
						} },
					_react2.default.createElement(Button, { onClick: action, id: id }),
					_react2.default.createElement(Button, { onClick: stop, id: "stop" })
				),
				_react2.default.createElement(
					"label",
					null,
					"BPM"
				),
				_react2.default.createElement("input", {

					style: {
						background: "#444",
						margin: "10px 5px",
						border: "none",
						color: "#ffa929"
					},

					className: "bpm-value",
					onChange: setBPM,
					defaultValue: BPM()

				})
			);
		}
	}]);

	return Header;
}(_react2.default.Component);

var MidiDesk = function (_React$PureComponent) {
	_inherits(MidiDesk, _React$PureComponent);

	function MidiDesk() {
		_classCallCheck(this, MidiDesk);

		return _possibleConstructorReturn(this, (MidiDesk.__proto__ || Object.getPrototypeOf(MidiDesk)).apply(this, arguments));
	}

	_createClass(MidiDesk, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    midi = _props.midi,
			    updateMidi = _props.updateMidi,
			    global = _props.global,
			    _props$currentState = _props.currentState,
			    currentState = _props$currentState === undefined ? 0 : _props$currentState;

			return _react2.default.createElement(
				"div",
				{
					style: {
						width: "300px",
						overflow: "scroll"
					}
				},
				_react2.default.createElement(_KeyboardSVG2.default, {
					currentState: currentState,
					updateMidi: this.props.updateMidi,
					setTime: this.props.setTime
				})
			);
		}
	}]);

	return MidiDesk;
}(_react2.default.PureComponent);

var melody = function (_React$PureComponent2) {
	_inherits(melody, _React$PureComponent2);

	function melody() {
		_classCallCheck(this, melody);

		return _possibleConstructorReturn(this, (melody.__proto__ || Object.getPrototypeOf(melody)).apply(this, arguments));
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
				_react2.default.createElement(Header, { global: global }),
				_react2.default.createElement(MidiDesk, {
					currentState: this.props.currentState,
					midi: this.props.melody,
					updateMidi: this.props.updateMidi,
					setTime: this.props.setTime,
					global: this.props.global
				})
			);
		}
	}]);

	return melody;
}(_react2.default.PureComponent);

exports.default = melody;