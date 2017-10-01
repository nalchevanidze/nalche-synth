"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Controller = require("../../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _EnvelopeGraphic = require("./EnvelopeGraphic");

var _EnvelopeGraphic2 = _interopRequireDefault(_EnvelopeGraphic);

var _DisplayPanel = require("../DisplayPanel");

var _DisplayPanel2 = _interopRequireDefault(_DisplayPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
	button: {
		outline: "none",
		background: "none",
		border: "1px solid #222",
		width: "50%"
	},
	nav: {
		marginTop: "10px",
		width: "80%"
	}
};

var Button = function Button(_ref) {
	var id = _ref.id,
	    active = _ref.active,
	    _onClick = _ref.onClick;
	return _react2.default.createElement(
		"button",
		{
			style: _extends({}, styles.button, {
				color: id === active ? "#FFA928" : "gray"
			}),
			onClick: function onClick() {
				return _onClick(id);
			}
		},
		id
	);
};

var PanelEnvelope = function (_React$PureComponent) {
	_inherits(PanelEnvelope, _React$PureComponent);

	function PanelEnvelope(props) {
		_classCallCheck(this, PanelEnvelope);

		var _this = _possibleConstructorReturn(this, (PanelEnvelope.__proto__ || Object.getPrototypeOf(PanelEnvelope)).call(this, props));

		_this.state = { active: "volume" };
		_this.switch = _this.switch.bind(_this);
		return _this;
	}

	_createClass(PanelEnvelope, [{
		key: "switch",
		value: function _switch(active) {
			this.setState({ active: active });
		}
	}, {
		key: "render",
		value: function render() {
			var active = this.state.active;
			var envelope = _Controller2.default.envelope,
			    env = _Controller2.default.env;

			return _react2.default.createElement(
				_DisplayPanel2.default,
				{ label: "envelope", size: 3 },
				_react2.default.createElement(
					"div",
					{ style: styles.nav },
					_react2.default.createElement(Button, { id: "volume", active: active, onClick: this.switch }),
					_react2.default.createElement(Button, { id: "filter", active: active, onClick: this.switch })
				),
				_react2.default.createElement(_EnvelopeGraphic2.default, { state: active === "filter" ? env.filter : envelope
				})
			);
		}
	}]);

	return PanelEnvelope;
}(_react2.default.PureComponent);

exports.default = PanelEnvelope;