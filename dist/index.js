"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _midi = require("./panel/midi");

var _midi2 = _interopRequireDefault(_midi);

var _keymap = require("./keymap");

var _keymap2 = _interopRequireDefault(_keymap);

var _oscillator = require("./audio/oscillator");

var _oscillator2 = _interopRequireDefault(_oscillator);

var _Controller = require("./Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _Keyboard = require("./panel/Keyboard");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _standartMidi = require("./standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function keyEvent(target, type) {
	var name = (type ? "add" : "remove") + "EventListener";
	document[name]("keydown", target.keyPress);
	document[name]("keyup", target.keyUp);
}


var sequence = [[1, 2, 3], [], [], [1, 2, 3], [], [], [1, 2, 3], [], [], [1, 2, 3], [], [], [1, 2, 3], [], [1, 2, 3], [], []];

var Synth = function (_React$Component) {
	_inherits(Synth, _React$Component);

	function Synth(props) {
		_classCallCheck(this, Synth);

		var _this = _possibleConstructorReturn(this, (Synth.__proto__ || Object.getPrototypeOf(Synth)).call(this, props));

		_this.osc = new _oscillator2.default(_Controller2.default.default, function (time, active) {
			_this.setState({
				time: time,
				active: active
			});
		}, sequence);

		_this.state = {
			name: "default",
			active: _this.osc.active,
			time: 0,
			oscSettings: _Controller2.default.default
		};

		_this.setSequence = _this.osc.setSequence;

		_this.keyPress = _this.keyPress.bind(_this);
		_this.keyUp = _this.keyUp.bind(_this);

		_this.global = {
			setBPM: function setBPM() {},
			BPM: function BPM() {
				return 128;
			},
			stop: function stop() {
				return _this.stop();
			},
			pause: function pause() {
				return _this.pause();
			},
			play: function play() {
				_this.setState({
					isPlayng: true
				});
				_this.osc.play();
			}
		};
		return _this;
	}

	_createClass(Synth, [{
		key: "keyPress",
		value: function keyPress(e) {
			if (typeof e !== "number") {
				e = _keymap2.default.indexOf(e.key) + 12;
				if (e === -1) {
					return;
				}
			}
			this.osc.setNote(e);
			//this.setState({});
		}
	}, {
		key: "keyUp",
		value: function keyUp(e) {
			if (typeof e !== "number") {
				e = _keymap2.default.indexOf(e.key) + 12;
				if (e === -1) {
					return;
				}
			}
			this.osc.unsetNote(e);
			//this.setState({});
		}
	}, {
		key: "pause",
		value: function pause() {
			this.osc.pause();
			this.setState({
				isPlayng: false
			});
		}
	}, {
		key: "stop",
		value: function stop() {
			this.osc.stop();
			this.setState({
				isPlayng: false,
				time: 0
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			keyEvent(this, true);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.stop();
			keyEvent(this, false);
		}
	}, {
		key: "setPreset",
		value: function setPreset() {
			var name = this.state.name === "default" ? "pluck" : "default";
			var oscSettings = _Controller2.default[name];
			this.setState({
				name: name,
				oscSettings: oscSettings
			});
			this.osc.setSetting(oscSettings);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "nalche-synth",
					style: {
						display: "flex",
						position: "relative",
						justifyContent: "center",
						fontFamily: "sans-serif"
					} },
				_react2.default.createElement(
					"button",
					{ onClick: this.setPreset.bind(this) },
					" change Preset "
				),
				_react2.default.createElement(
					"section",
					{
						style: {
							boxShadow: "0px 5px 10px gray",
							width: "660px",
							height: "410px",
							borderRadius: "3px",
							background: "#333333"
						} },
					_react2.default.createElement(_panel2.default, {
						seq: sequence,
						setSequence: this.setSequence,
						oscSettings: this.state.oscSettings
					}),
					_react2.default.createElement(_Keyboard2.default, {
						keyPress: this.keyPress,
						keyUp: this.keyUp,
						active: this.state.active
					})
				),
				_react2.default.createElement(_midi2.default, {
					midi: _standartMidi2.default,
					updateMidi: this.osc.setMidi,
					setTime: this.osc.setTime,
					global: this.global,
					isPlayng: this.state.isPlayng,
					currentState: this.state.time
				}),
				" "
			);
		}
	}]);

	return Synth;
}(_react2.default.Component);

exports.default = Synth;