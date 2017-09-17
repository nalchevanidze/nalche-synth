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

var _ButtonWave = require("./ButtonWave");

var _ButtonWave2 = _interopRequireDefault(_ButtonWave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WavePoint = function WavePoint(index) {
    return (1 - (0, _WaveForm2.default)(index)) * 100;
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

var PanelOscillator = function (_React$Component) {
    _inherits(PanelOscillator, _React$Component);

    function PanelOscillator(props) {
        _classCallCheck(this, PanelOscillator);

        var _this = _possibleConstructorReturn(this, (PanelOscillator.__proto__ || Object.getPrototypeOf(PanelOscillator)).call(this, props));

        _this.state = _Controller2.default.wave;
        _this.change = _this.change.bind(_this);
        _this.update = _this.update.bind(_this);
        return _this;
    }

    _createClass(PanelOscillator, [{
        key: "update",
        value: function update() {
            if (!this.live) return;
            this.setState({ v: Math.random });
            setTimeout(this.update, 100);
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.live = true;
            this.update();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.live = false;
        }
    }, {
        key: "change",
        value: function change(_ref) {
            var target = _ref.target;

            _Controller2.default.wave[target.name] = Number(target.value);
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
                { className: "oscillator" },
                _react2.default.createElement(
                    "div",
                    { className: "screen" },
                    _react2.default.createElement(
                        "h1",
                        null,
                        " Oscillator "
                    ),
                    _react2.default.createElement(
                        "h4",
                        null,
                        " Waveform "
                    ),
                    _react2.default.createElement(
                        "svg",
                        { viewBox: "-1 0 202 200", width: "90px", height: "90px" },
                        _react2.default.createElement("path", { d: GenerateWave(), stroke: "#444", fill: "none", strokeWidth: 0.5 }),
                        _react2.default.createElement(_GridLine2.default, null)
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "controllers" },
                    _react2.default.createElement(_ButtonWave2.default, { id: "sine", target: _Controller2.default.wave }),
                    _react2.default.createElement(_ButtonWave2.default, { id: "square", target: _Controller2.default.wave }),
                    _react2.default.createElement(_ButtonWave2.default, { id: "saw", target: _Controller2.default.wave }),
                    _react2.default.createElement(_ButtonWave2.default, { id: "saw2", target: _Controller2.default.wave }),
                    _react2.default.createElement(_ButtonWave2.default, { id: "tech", target: _Controller2.default.wave }),
                    _react2.default.createElement(_ButtonWave2.default, { id: "noise", target: _Controller2.default.wave })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "fm" },
                    _react2.default.createElement(
                        "h1",
                        null,
                        " FM Modular "
                    ),
                    _react2.default.createElement(_ButtonWave2.default, { id: "fm", target: _Controller2.default.wave }),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Amount"
                    )
                )
            );
        }
    }]);

    return PanelOscillator;
}(_react2.default.Component);

exports.default = PanelOscillator;