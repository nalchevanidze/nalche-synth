"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _svgCordinates2 = require("../svgCordinates");

var _svgCordinates3 = _interopRequireDefault(_svgCordinates2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rangeFunc = function rangeFunc(_ref, x) {
	var min = _ref.min,
	    max = _ref.max;

	var size = max - min;
	return Math.floor(min + x * size);
};

var CirclerangeButton = function (_React$PureComponent) {
	_inherits(CirclerangeButton, _React$PureComponent);

	function CirclerangeButton(props) {
		_classCallCheck(this, CirclerangeButton);

		var _this = _possibleConstructorReturn(this, (CirclerangeButton.__proto__ || Object.getPrototypeOf(CirclerangeButton)).call(this, props));

		_this.state = {};
		_this.hide = false;
		_this.levelMove = _this.levelMove.bind(_this);
		_this.mouseUp = _this.listenLevel.bind(_this, false);
		_this.mouseDown = _this.listenLevel.bind(_this, true);
		return _this;
	}

	_createClass(CirclerangeButton, [{
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
		key: "levelMove",
		value: function levelMove(event) {
			var _props = this.props,
			    onChange = _props.onChange,
			    target = _props.target,
			    id = _props.id,
			    _props$steps = _props.steps,
			    steps = _props$steps === undefined ? 32 : _props$steps,
			    range = _props.range;


			var stepSize = steps;
			if (event.type === "touchmove") {
				event = event.touches[0];
			}

			if (!this.hide) {
				if (this.state.levelmove) {
					// updates state
					var _svgCordinates = (0, _svgCordinates3.default)(this.target, event),
					    x = _svgCordinates.x,
					    y = _svgCordinates.y;

					this.setState({ x: x, y: y });

					var value = 1 - Math.min(Math.max(y - 5, 0) / 80, 1);

					value = Math.round(value * stepSize) / stepSize;
					if (range) {
						value = rangeFunc(range, value);
					}

					if (target) {
						target[id] = value;
					}

					if (onChange) {
						onChange(_defineProperty({}, id, value));
					}
				}
			}
		}
	}, {
		key: "listenLevel",
		value: function listenLevel(switcher) {
			if (!this.hide) {
				this.setState({
					levelmove: switcher
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    id = _props2.id,
			    target = _props2.target,
			    _props2$steps = _props2.steps,
			    steps = _props2$steps === undefined ? 16 : _props2$steps,
			    children = _props2.children,
			    _props2$color = _props2.color,
			    color = _props2$color === undefined ? "#222" : _props2$color,
			    range = _props2.range;

			var level = target[id];

			if (range) {
				level = (level - range.min) / (range.max - range.min);
			}

			var fullLength = 45 * 2 * Math.PI;
			var step = fullLength / steps;
			var dashArray = [1, step - 1];

			return _react2.default.createElement(
				"svg",
				{
					draggable: false,
					viewBox: "0 0 100 100",
					className: "wave-button",
					onMouseLeave: this.mouseUp,
					onTouchStart: this.mouseDown,
					onTouchEnd: this.mouseUp,
					onMouseDown: this.mouseDown,
					onMouseUp: this.mouseUp,
					onMouseMove: this.levelMove,
					onTouchMove: this.levelMove,
					width: "50px",
					height: "50px",
					style: {
						margin: "5px",
						flexShrink: 0
					}
				},
				children,
				_react2.default.createElement(
					"g",
					{ fill: "none", stroke: color },
					_react2.default.createElement("circle", {
						strokeWidth: 10,
						cx: 50,
						cy: 50,
						r: 45,
						strokeDasharray: dashArray,
						opacity: 0.5
					}),
					_react2.default.createElement(
						"g",
						{ strokeOpacity: 0.1 },
						_react2.default.createElement("circle", {
							strokeWidth: 1,
							cx: 50,
							cy: 50,
							r: 49
						}),
						_react2.default.createElement("circle", {
							strokeWidth: 1,
							cx: 50,
							cy: 50
						})
					),
					_react2.default.createElement("circle", {
						strokeWidth: 10,
						strokeOpacity: 0.4,
						cx: 50,
						cy: 50,
						r: 45,
						strokeDasharray: 285,
						strokeDashoffset: 285 * (1 - level)
					})
				)
			);
		}
	}]);

	return CirclerangeButton;
}(_react2.default.PureComponent);

exports.default = CirclerangeButton;