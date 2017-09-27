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

var _Quarter = require("./Quarter");

var _Quarter2 = _interopRequireDefault(_Quarter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 8;

var KeyboardSVG = function (_React$PureComponent) {
	_inherits(KeyboardSVG, _React$PureComponent);

	function KeyboardSVG(props) {
		_classCallCheck(this, KeyboardSVG);

		var _this = _possibleConstructorReturn(this, (KeyboardSVG.__proto__ || Object.getPrototypeOf(KeyboardSVG)).call(this, props));

		_this.state = {};
		_this.position = _this.position.bind(_this);
		_this.levelMove = _this.levelMove.bind(_this);
		_this.clearPoint = _this.clearPoint.bind(_this);
		_this.mouseDown = _this.mouseDown.bind(_this);
		_this.setTime = _this.setTime.bind(_this);
		_this.point = { current: null };
		_this.hide = false;
		return _this;
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
				this.create.length = Math.max(Math.floor(length / 4.5), 1);
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
			var index = this.index;

			if (this.create && this.index !== null) {
				if (!_standartMidi2.default[index]) {
					_standartMidi2.default[index] = [];
				}
				_standartMidi2.default[index].push(this.create);
			}
			this.point.current = null;
			this.create = null;
			this.index = null;
			this.createAt = 0;
			this.props.updateMidi();
			window.localStorage.midi = JSON.stringify(_standartMidi2.default);
			this.setState({ m: Math.random() });
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
			var at = Math.floor(x / 5);
			var index = Math.floor(at / 8);

			at = at % 8;

			return {
				index: index,
				note: {
					at: at,
					length: 1,
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

			var _noteFromXY = this.noteFromXY(x, y),
			    index = _noteFromXY.index,
			    note = _noteFromXY.note;

			this.createAt = x;
			this.index = index;
			this.create = note;
			console.log("start");
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

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
						return _react2.default.createElement(_Quarter2.default, {
							key: i,
							quard: quard || [],
							index: i,
							updateMidi: _this2.props.updateMidi
						});
					}),
					this.create ? _react2.default.createElement(_Quarter2.default, {
						quard: [this.create],
						index: this.index,
						updateMidi: this.props.updateMidi
					}) : null
				)
			);
		}
	}]);

	return KeyboardSVG;
}(_react2.default.PureComponent);

exports.default = KeyboardSVG;
;