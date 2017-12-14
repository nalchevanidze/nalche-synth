"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _oscillator = require("./oscillator");

var _oscillator2 = _interopRequireDefault(_oscillator);

var _envelope = require("./envelope");

var _envelope2 = _interopRequireDefault(_envelope);

var _Sequencer = require("./Sequencer");

var _Sequencer2 = _interopRequireDefault(_Sequencer);

var _Controller = require("../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_React$PureComponent) {
	_inherits(Panel, _React$PureComponent);

	function Panel() {
		_classCallCheck(this, Panel);

		return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
	}

	_createClass(Panel, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{
					style: {
						display: "flex",
						padding: "5px"
					}
				},
				_react2.default.createElement(_oscillator2.default, this.props.oscSettings),
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_envelope2.default, { env: this.props.oscSettings.env }),
					_react2.default.createElement(_Sequencer2.default, {
						seq: this.props.seq,
						setSequence: this.props.setSequence
					})
				)
			);
		}
	}]);

	return Panel;
}(_react2.default.PureComponent);

exports.default = Panel;