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

var Quarter = function (_React$PureComponent) {
	_inherits(Quarter, _React$PureComponent);

	function Quarter() {
		_classCallCheck(this, Quarter);

		return _possibleConstructorReturn(this, (Quarter.__proto__ || Object.getPrototypeOf(Quarter)).apply(this, arguments));
	}

	_createClass(Quarter, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var quard = this.props.quard;
			return _react2.default.createElement(
				"g",
				{ fill: this.props.color || "#f75927" },
				quard.map(function (note, noteIndex) {
					return _react2.default.createElement(
						"g",
						{ key: noteIndex },
						_react2.default.createElement("rect", {
							onTouchStart: function onTouchStart(event) {
								return _this2.props.mouseDown(note, event);
							},
							onMouseDown: function onMouseDown(event) {
								return _this2.props.mouseDown(note, event);
							},
							width: 5 * note.length,
							height: 10,
							stroke: "#000",
							strokeWidth: 0.25,

							x: note.position * 5,
							y: 360 - note.i * 10
						}),
						_react2.default.createElement("rect", {
							width: 5,
							height: 10,
							fill: "gray",
							fillOpacity: 0.1,
							onTouchStart: function onTouchStart(event) {
								return _this2.props.resize && _this2.props.resize(note, event);
							},
							onMouseDown: function onMouseDown(event) {

								if (_this2.props.resize) {
									_this2.props.resize(note, event);
								}
							},
							style: {
								cursor: "e-resize"
							},
							key: "s" + noteIndex,
							x: (note.position + note.length - 1) * 5,
							y: 360 - note.i * 10
						})
					);
				})
			);
		}
	}]);

	return Quarter;
}(_react2.default.PureComponent);

exports.default = Quarter;