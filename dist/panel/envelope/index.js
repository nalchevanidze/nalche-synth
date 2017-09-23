"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Controller = require("../../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _EnvelopeGraphic = require("./EnvelopeGraphic");

var _EnvelopeGraphic2 = _interopRequireDefault(_EnvelopeGraphic);

var _ButtonWave = require("../ButtonWave");

var _ButtonWave2 = _interopRequireDefault(_ButtonWave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelEnvelope = function (_React$PureComponent) {
    _inherits(PanelEnvelope, _React$PureComponent);

    function PanelEnvelope(props) {
        _classCallCheck(this, PanelEnvelope);

        var _this = _possibleConstructorReturn(this, (PanelEnvelope.__proto__ || Object.getPrototypeOf(PanelEnvelope)).call(this, props));

        _this.state = { active: "volume" };
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
            var _this2 = this;

            var active = this.state.active;
            var envelope = _Controller2.default.envelope,
                env = _Controller2.default.env;

            return _react2.default.createElement(
                "div",
                { className: "envelope" },
                _react2.default.createElement(
                    "h1",
                    null,
                    " envelope "
                ),
                _react2.default.createElement(
                    "div",
                    { className: "selector" },
                    _react2.default.createElement(
                        "button",
                        {
                            onClick: function onClick() {
                                return _this2.switch("volume");
                            },
                            className: active == "volume" ? "active" : ""
                        },
                        "volume"
                    ),
                    _react2.default.createElement(
                        "button",
                        {
                            onClick: function onClick() {
                                return _this2.switch("filter");
                            },
                            className: active == "filter" ? "active" : ""
                        },
                        "filter"
                    )
                ),
                _react2.default.createElement(_EnvelopeGraphic2.default, { state: active == "filter" ? env.filter : envelope
                })
            );
        }
    }]);

    return PanelEnvelope;
}(_react2.default.PureComponent);

exports.default = PanelEnvelope;