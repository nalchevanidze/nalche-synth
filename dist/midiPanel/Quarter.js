"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _noteDetector = require("./noteDetector");

var _noteDetector2 = _interopRequireDefault(_noteDetector);

var _standartMidi = require("../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quarter = function (_React$Component) {
	_inherits(Quarter, _React$Component);

	function Quarter(props) {
		_classCallCheck(this, Quarter);

		var _this = _possibleConstructorReturn(this, (Quarter.__proto__ || Object.getPrototypeOf(Quarter)).call(this, props));

		_this.state = {
			value: 0
		};
		_this.mouseDown = _this.mouseDown.bind(_this);
		return _this;
	}

	_createClass(Quarter, [{
		key: "mouseDown",
		value: function mouseDown(note, event) {
			var array = _standartMidi2.default[this.props.index];
			var arrayIndex = array.indexOf(note);
			array.splice(arrayIndex, 1);
			this.props.updateMidi();
			this.setState({ M: Math.random() });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var quard = this.props.quard;
			return _react2.default.createElement(
				"g",
				null,
				quard.map(function (note, noteIndex) {
					return _react2.default.createElement("rect", {
						onTouchStart: function onTouchStart(event) {
							return _this2.mouseDown(note, event);
						},
						onMouseDown: function onMouseDown(event) {
							return _this2.mouseDown(note, event);
						},
						fill: "#f75927",
						width: 40 * note.length / 8,
						height: 10,
						stroke: "#000",
						strokeWidth: 0.25,
						key: noteIndex,
						x: (_this2.props.index + note.at / 8) * 40,
						y: 360 - _noteDetector2.default.indexOf(note) * 10
					});
				})
			);
		}
	}]);

	return Quarter;
}(_react2.default.Component);

exports.default = Quarter;