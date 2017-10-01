"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Controller = require("../../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _WaveForm = require("../../oscillator/WaveForm");

var _WaveForm2 = _interopRequireDefault(_WaveForm);

var _GridLine = require("../GridLine");

var _GridLine2 = _interopRequireDefault(_GridLine);

var _DisplayPanel = require("../DisplayPanel");

var _DisplayPanel2 = _interopRequireDefault(_DisplayPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WavePoint = function WavePoint(index) {
	return (1 - (0, _WaveForm2.default)((index + _Controller2.default.wave.offset) % 1, _Controller2.default.wave)) * 100;
};
function GenerateWave() {
	var end = WavePoint(0);
	var start = WavePoint(1);
	var p = (start + end) / 2;
	var wave = Array.from({ length: 200 }, function (e, i) {
		return i + " " + WavePoint(i / 200);
	});
	return "M 0 " + p + " " + wave + " 200 " + p;
}
var styles = {
	main: {
		display: "flex",
		fontSize: "10px",
		alignItems: "flex-start"
	}
};

var PanelOscillator = function (_React$PureComponent) {
	_inherits(PanelOscillator, _React$PureComponent);

	function PanelOscillator(props) {
		_classCallCheck(this, PanelOscillator);

		var _this = _possibleConstructorReturn(this, (PanelOscillator.__proto__ || Object.getPrototypeOf(PanelOscillator)).call(this, props));

		_this.state = _Controller2.default.wave;
		_this.update = _this.update.bind(_this);
		return _this;
	}

	_createClass(PanelOscillator, [{
		key: "update",
		value: function update(state) {
			this.setState(state);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "oscillator", style: styles.main },
				_react2.default.createElement(
					_DisplayPanel2.default,
					{
						label: "global",
						size: 2,
						color: "#CDDC39",
						target: { pitch: this.props.pitch },
						onChange: this.props.changePitch,
						list: [{
							id: "pitch",
							range: {
								min: -4,
								max: 4
							},
							steps: 8
						}]
					},
					_react2.default.createElement(
						"svg",
						{ viewBox: "-1 0 202 200", width: "100px", height: "100px" },
						_react2.default.createElement("path", {
							d: GenerateWave(),
							stroke: "#CDDC39",
							strokeWidth: 2,
							fill: "none"
						}),
						_react2.default.createElement(_GridLine2.default, null)
					)
				),
				_react2.default.createElement(_DisplayPanel2.default, {
					label: "Oscillator",
					size: 3,

					list: [{ id: "sine" }, { id: "square" }, { id: "saw" }, { id: "saw2" }, { id: "tech" }, { id: "noise" }, { id: "offset" }, {
						id: "voices",
						range: {
							min: 1,
							max: 12
						},
						steps: 11
					}],

					target: _Controller2.default.wave,
					onChange: this.update,
					color: "#ffa929"

				}),
				_react2.default.createElement(_DisplayPanel2.default, {
					label: "FM",
					list: [{ id: "fm" }, { id: "fmFreq" }],
					target: _Controller2.default.wave,
					color: "#FF5722"
				}),
				_react2.default.createElement(_DisplayPanel2.default, {
					label: "Filter",
					list: [{ id: "cutoff" }, { id: "resonance" }, { id: "envelope" }],
					target: _Controller2.default.filter,
					color: "#2196f3"
				})
			);
		}
	}]);

	return PanelOscillator;
}(_react2.default.PureComponent);

exports.default = PanelOscillator;