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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaveOption = function WaveOption(_ref) {
    var name = _ref.name,
        change = _ref.change,
        value = _ref.value;
    return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(
            "label",
            null,
            name
        ),
        _react2.default.createElement("input", { value: value, type: "range", min: "0", max: "1", name: name, step: "0.05", onChange: change })
    );
};

var PanelEnvelope = function (_React$Component) {
    _inherits(PanelEnvelope, _React$Component);

    function PanelEnvelope(props) {
        _classCallCheck(this, PanelEnvelope);

        var _this = _possibleConstructorReturn(this, (PanelEnvelope.__proto__ || Object.getPrototypeOf(PanelEnvelope)).call(this, props));

        _this.state = _Controller2.default.wave;
        _this.envelope = _this.envelope.bind(_this);
        return _this;
    }

    _createClass(PanelEnvelope, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.live = true;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.live = false;
        }
    }, {
        key: "envelope",
        value: function envelope(_ref2) {
            var target = _ref2.target;

            _Controller2.default.envelope[target.name] = Number(target.value);
            this.setState(_Controller2.default.envelope);
        }
    }, {
        key: "render",
        value: function render() {
            var _Controller$envelope = _Controller2.default.envelope,
                release = _Controller$envelope.release,
                attack = _Controller$envelope.attack,
                decay = _Controller$envelope.decay,
                sustain = _Controller$envelope.sustain;

            return _react2.default.createElement(
                "div",
                { className: "envelope" },
                _react2.default.createElement(
                    "h1",
                    null,
                    " envelope "
                ),
                _react2.default.createElement(_EnvelopeGraphic2.default, _Controller2.default.envelope),
                _react2.default.createElement(
                    "div",
                    { className: "controllers" },
                    _react2.default.createElement(WaveOption, { name: "attack", change: this.envelope, value: attack }),
                    _react2.default.createElement(WaveOption, { name: "decay", change: this.envelope, value: decay }),
                    _react2.default.createElement(WaveOption, { name: "sustain", change: this.envelope, value: sustain }),
                    _react2.default.createElement(WaveOption, { name: "release", change: this.envelope, value: release })
                )
            );
        }
    }]);

    return PanelEnvelope;
}(_react2.default.Component);

exports.default = PanelEnvelope;