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

var _svgCordinates4 = require("../panel/svgCordinates");

var _svgCordinates5 = _interopRequireDefault(_svgCordinates4);

var _standartMidi = require("../standartMidi");

var _standartMidi2 = _interopRequireDefault(_standartMidi);

var _noteDetector = require("./noteDetector");

var _noteDetector2 = _interopRequireDefault(_noteDetector);

var _TimelinePattern = require("./TimelinePattern");

var _TimelinePattern2 = _interopRequireDefault(_TimelinePattern);

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
		_this3.setTime = _this3.setTime.bind(_this3);
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

			var _svgCordinates = (0, _svgCordinates5.default)(this.target, event),
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
		key: "setTime",
		value: function setTime(event) {
			var _svgCordinates2 = (0, _svgCordinates5.default)(this.target, event),
			    x = _svgCordinates2.x;

			var time = Math.floor(x / 5);
			this.props.setTime(time);
		}
	}, {
		key: "noteFromXY",
		value: function noteFromXY(x, y) {

			// findNote Name
			var noteIndex = Math.floor((360 - y) / 10);

			var id = _noteDetector2.default.idByIndex(noteIndex);

			// Note
			var at = Math.floor(x / 10);
			var index = Math.floor(at / 4);
			at = at % 4 * 2;

			return {
				index: index,
				note: {
					at: at,
					length: 2,
					id: id
				}
			};
		}
	}, {
		key: "mouseDown",
		value: function mouseDown(event) {
			var _svgCordinates3 = (0, _svgCordinates5.default)(this.target, event),
			    x = _svgCordinates3.x,
			    y = _svgCordinates3.y;

			this.createAt = x;

			var _noteFromXY = this.noteFromXY(x, y),
			    index = _noteFromXY.index,
			    note = _noteFromXY.note;

			if (!_standartMidi2.default[index]) {
				_standartMidi2.default[index] = [];
			}
			this.create = note;

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
			var stageHeigth = 360;
			return _react2.default.createElement(
				"svg",
				{
					viewBox: [0, -20, stageWidth, stageHeigth].join(" "),
					width: stageWidth + "px",
					height: stageHeigth + "px",
					onMouseMove: this.levelMove,
					onTouchMove: this.levelMove,
					onMouseLeave: this.clearPoint,
					onTouchEnd: this.clearPoint,
					onMouseUp: this.clearPoint
				},
				_react2.default.createElement(_TimelinePattern2.default, null),
				_react2.default.createElement(_KeyboardPattern2.default, null),
				_react2.default.createElement("rect", {
					fillOpacity: "0",
					width: stageWidth, height: 360,
					onTouchStart: this.mouseDown,
					onMouseDown: this.mouseDown
				}),
				_react2.default.createElement("rect", {
					fillOpacity: "0",
					y: -20,
					height: 20,
					width: stageWidth,
					onTouchStart: this.setTime,
					onMouseDown: this.setTime
				}),
				_react2.default.createElement("line", { x1: state, x2: state, y1: -20, y2: stageHeigth, stroke: "red" }),
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