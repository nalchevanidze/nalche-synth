"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _KeyboardPattern = require("./KeyboardPattern");

var _KeyboardPattern2 = _interopRequireDefault(_KeyboardPattern);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _svgCordinates3 = require("../panel/svgCordinates");

var _svgCordinates4 = _interopRequireDefault(_svgCordinates3);

var _standartMidi = require("../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

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
}))).reverse();
function isBlack(note) {
	return note.charAt(1) === "#" ? "note black" : "note";
}
function findIndex(note) {

	return (list.indexOf(note.id) + 5) * 10;
}

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
						y: findIndex(note)
					});
				})
			);
		}
	}]);

	return Quarter;
}(_react2.default.Component);

var count = 8;

var KeyboardSVG = function (_React$PureComponent) {
	_inherits(KeyboardSVG, _React$PureComponent);

	function KeyboardSVG(props) {
		_classCallCheck(this, KeyboardSVG);

		var _this3 = _possibleConstructorReturn(this, (KeyboardSVG.__proto__ || Object.getPrototypeOf(KeyboardSVG)).call(this, props));

		_this3.state = {};
		_this3.position = _this3.position.bind(_this3);
		_this3.levelMove = _this3.levelMove.bind(_this3);
		_this3.clearPoint = _this3.clearPoint.bind(_this3);
		_this3.mouseDown = _this3.mouseDown.bind(_this3);
		_this3.point = { current: null };
		_this3.hide = false;
		return _this3;
	}

	_createClass(KeyboardSVG, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.hide = false;
			this.target = _reactDom2.default.findDOMNode(this);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.hide = false;
			this.target = _reactDom2.default.findDOMNode(this);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.hide = true;
			this.target = null;
		}
	}, {
		key: "position",
		value: function position(event) {
			if (event.type === "touchmove") {
				event = event.touches[0];
			}

			var _svgCordinates = (0, _svgCordinates4.default)(this.target, event),
			    x = _svgCordinates.x,
			    y = _svgCordinates.y;

			var length = x - this.createAt;
			if (length > 0) {
				this.create.length = Math.floor(length / 4.5);
			}
			this.setState({ m: Math.random() });
		}
	}, {
		key: "levelMove",
		value: function levelMove(event) {
			if (this.create) {
				this.position(event);
			}
		}
	}, {
		key: "clearPoint",
		value: function clearPoint() {

			this.point.current = null;
			this.create = null;
			this.createAt = 0;
			this.props.updateMidi();

			window.localStorage.midi = JSON.stringify(_standartMidi2.default);
		}
	}, {
		key: "mouseDown",
		value: function mouseDown(event) {
			var _svgCordinates2 = (0, _svgCordinates4.default)(this.target, event),
			    x = _svgCordinates2.x,
			    y = _svgCordinates2.y;

			this.createAt = x;
			var noteIndex = Math.floor(y / 10 - 5);
			var id = list[noteIndex];
			var at = Math.floor(x / 10);
			var index = Math.floor(at / 4);
			at = at % 4 * 2;
			if (!_standartMidi2.default[index]) {
				_standartMidi2.default[index] = [];
			}
			this.create = {
				at: at,
				length: 2,
				id: id
			};
			_standartMidi2.default[index].push(this.create);
			this.props.updateMidi();
			this.setState({ m: Math.random() });
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			var notestep = 10;
			var stageWidth = count * 80;
			var state = this.props.currentState * notestep / 2;
			return _react2.default.createElement(
				"svg",
				{
					viewBox: "0 0 " + stageWidth + " 400",
					width: stageWidth + "px",
					height: "400px",
					onMouseMove: this.levelMove,
					onTouchMove: this.levelMove,
					onMouseLeave: this.clearPoint,
					onTouchEnd: this.clearPoint,
					onMouseUp: this.clearPoint
				},
				_react2.default.createElement(_KeyboardPattern2.default, null),
				_react2.default.createElement("rect", {
					fillOpacity: "0",
					width: stageWidth, height: 400,
					onTouchStart: this.mouseDown,
					onMouseDown: this.mouseDown
				}),
				_react2.default.createElement("line", { x1: state, x2: state, y1: "0", y2: "400", stroke: "red" }),
				_react2.default.createElement(
					"g",
					null,
					_standartMidi2.default.map(function (quard, i) {
						return _react2.default.createElement(Quarter, {
							key: i,
							quard: quard || [],
							index: i,
							updateMidi: _this4.props.updateMidi
						});
					})
				)
			);
		}
	}]);

	return KeyboardSVG;
}(_react2.default.PureComponent);

exports.default = KeyboardSVG;
;