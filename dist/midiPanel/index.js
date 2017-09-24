"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var list = [].concat(_toConsumableArray(keys.map(function (note) {
	return note + "1";
})), _toConsumableArray(keys.map(function (note) {
	return note + "2";
})), _toConsumableArray(keys.map(function (note) {
	return note + "3";
})), _toConsumableArray(keys.map(function (note) {
	return note + "4";
}))).reverse();
function isBlack(note) {
	return note.charAt(1) === "#" ? "note black" : "note";
}

var Quarter = function (_React$Component) {
	_inherits(Quarter, _React$Component);

	function Quarter(props) {
		_classCallCheck(this, Quarter);

		var _this = _possibleConstructorReturn(this, (Quarter.__proto__ || Object.getPrototypeOf(Quarter)).call(this, props));

		_this.state = {
			value: 0
		};
		return _this;
	}

	_createClass(Quarter, [{
		key: "update",
		value: function update(quard, chordIndex, note) {

			if (chordIndex !== -1) {
				quard.splice(chordIndex, 1);
			} else {
				quard.push(note);
			}
			this.props.updateMidi();
			this.setState({ value: Math.random() });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var quard = this.props.quard;
			return _react2.default.createElement(
				"li",
				{ className: "quartel" },
				list.map(function (note, noteIndex) {
					var chordIndex = quard.indexOf(note);
					var selected = chordIndex !== -1 ? "active" : "";
					return _react2.default.createElement("button", {
						key: noteIndex,
						className: isBlack(note) + " " + selected,
						onClick: function onClick() {
							return _this2.update(quard, chordIndex, note);
						}
					});
				})
			);
		}
	}]);

	return Quarter;
}(_react2.default.Component);

var Keys = function (_React$PureComponent) {
	_inherits(Keys, _React$PureComponent);

	function Keys() {
		_classCallCheck(this, Keys);

		return _possibleConstructorReturn(this, (Keys.__proto__ || Object.getPrototypeOf(Keys)).apply(this, arguments));
	}

	_createClass(Keys, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    midi = _props.midi,
			    updateMidi = _props.updateMidi;

			return _react2.default.createElement(
				"ul",
				null,
				_react2.default.createElement(
					"li",
					{ className: "names" },
					list.map(function (note, i) {
						return _react2.default.createElement(
							"button",
							{ key: i, className: "note " + isBlack(note) },
							note
						);
					})
				),
				midi.map(function (quard, i) {
					return _react2.default.createElement(Quarter, { key: i, quard: quard, updateMidi: updateMidi });
				})
			);
		}
	}]);

	return Keys;
}(_react2.default.PureComponent);

var Header = function (_React$PureComponent2) {
	_inherits(Header, _React$PureComponent2);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	}

	_createClass(Header, [{
		key: "render",
		value: function render() {
			var _props$global = this.props.global,
			    play = _props$global.play,
			    stop = _props$global.stop;

			return _react2.default.createElement(
				"h3",
				null,
				_react2.default.createElement(
					"section",
					{ className: "playStop" },
					_react2.default.createElement(
						"button",
						{ onClick: play },
						"play"
					),
					_react2.default.createElement(
						"button",
						{ onClick: stop },
						"stop"
					)
				)
			);
		}
	}]);

	return Header;
}(_react2.default.PureComponent);

var MidiDesk = function (_React$PureComponent3) {
	_inherits(MidiDesk, _React$PureComponent3);

	function MidiDesk() {
		_classCallCheck(this, MidiDesk);

		return _possibleConstructorReturn(this, (MidiDesk.__proto__ || Object.getPrototypeOf(MidiDesk)).apply(this, arguments));
	}

	_createClass(MidiDesk, [{
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    midi = _props2.midi,
			    updateMidi = _props2.updateMidi,
			    global = _props2.global,
			    _props2$currentState = _props2.currentState,
			    currentState = _props2$currentState === undefined ? 0 : _props2$currentState;

			return _react2.default.createElement(
				"div",
				{ className: "midi window-panel" },
				_react2.default.createElement(Header, { global: global }),
				_react2.default.createElement(
					"div",
					{ className: "time-line" },
					_react2.default.createElement("button", { style: { left: currentState * 200 + 48 + "px" } })
				),
				_react2.default.createElement(Keys, { midi: midi, updateMidi: updateMidi })
			);
		}
	}]);

	return MidiDesk;
}(_react2.default.PureComponent);

var melody = function (_React$PureComponent4) {
	_inherits(melody, _React$PureComponent4);

	function melody() {
		_classCallCheck(this, melody);

		return _possibleConstructorReturn(this, (melody.__proto__ || Object.getPrototypeOf(melody)).apply(this, arguments));
	}

	_createClass(melody, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "midi-panel" },
				_react2.default.createElement(MidiDesk, {
					currentState: this.props.currentState,
					midi: this.props.melody,
					updateMidi: this.props.updateMidi,
					global: this.props.global
				})
			);
		}
	}]);

	return melody;
}(_react2.default.PureComponent);

exports.default = melody;