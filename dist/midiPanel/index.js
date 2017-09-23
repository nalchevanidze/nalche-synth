"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Sequencer = require("./Sequencer");

var _Sequencer2 = _interopRequireDefault(_Sequencer);

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
			console.log(quard, chordIndex, note);
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

var MidiDesk = function MidiDesk(_ref) {
	var midi = _ref.midi,
	    updateMidi = _ref.updateMidi,
	    global = _ref.global;
	return _react2.default.createElement(
		"div",
		{ className: "midi window-panel" },
		_react2.default.createElement(
			"h3",
			null,
			_react2.default.createElement(
				"section",
				{ className: "playStop" },
				_react2.default.createElement(
					"button",
					{ onClick: global.play },
					"play"
				),
				_react2.default.createElement(
					"button",
					{ onClick: global.stop },
					"stop"
				)
			)
		),
		_react2.default.createElement(
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
		)
	);
};

var melody = function (_React$Component2) {
	_inherits(melody, _React$Component2);

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
				_react2.default.createElement(_Sequencer2.default, { seq: this.props.seq || [], updateMidi: this.props.updateMidi }),
				_react2.default.createElement(MidiDesk, {
					midi: this.props.melody,
					updateMidi: this.props.updateMidi,
					global: this.props.global
				})
			);
		}
	}]);

	return melody;
}(_react2.default.Component);

exports.default = melody;