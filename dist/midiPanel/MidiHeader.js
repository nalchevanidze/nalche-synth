"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _HeaderButton = require("./HeaderButton");

var _HeaderButton2 = _interopRequireDefault(_HeaderButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MidiHeader = function (_React$Component) {
	_inherits(MidiHeader, _React$Component);

	function MidiHeader() {
		_classCallCheck(this, MidiHeader);

		return _possibleConstructorReturn(this, (MidiHeader.__proto__ || Object.getPrototypeOf(MidiHeader)).apply(this, arguments));
	}

	_createClass(MidiHeader, [{
		key: "render",
		value: function render() {
			var _props$global = this.props.global,
			    setBPM = _props$global.setBPM,
			    BPM = _props$global.BPM;

			console.log(this.props.isPlayng);
			var id = this.props.isPlayng ? "pause" : "play";
			return _react2.default.createElement(
				"section",
				{
					style: {
						background: "#444",
						color: "#ffa929",
						padding: "5px",
						border: "1px solid #333",
						display: "flex"
					}
				},
				_react2.default.createElement(_HeaderButton2.default, { id: id, actions: this.props.global }),
				_react2.default.createElement(_HeaderButton2.default, { id: "stop", actions: this.props.global }),
				_react2.default.createElement(
					"div",
					{
						style: {
							padding: "5px",
							fontSize: "12px"
						}
					},
					_react2.default.createElement(
						"label",
						null,
						"BPM"
					),
					_react2.default.createElement("input", {
						style: {
							background: "#444",
							border: "none",
							color: "#ffa929",
							borderBottom: "1px solid"
						},
						className: "bpm-value",
						onChange: setBPM,
						defaultValue: BPM()

					})
				),
				_react2.default.createElement(_HeaderButton2.default, {
					id: "draw",
					color: this.props.actionType === "draw" ? "#ffa929" : "#777",
					actions: this.props.setMode
				}),
				_react2.default.createElement(_HeaderButton2.default, {
					id: "select",
					color: this.props.actionType === "select" ? "#ffa929" : "#777",
					actions: this.props.setMode
				})
			);
		}
	}]);

	return MidiHeader;
}(_react2.default.Component);

exports.default = MidiHeader;