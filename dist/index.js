"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SynthesizerController = require("./SynthesizerController");

var _SynthesizerController2 = _interopRequireDefault(_SynthesizerController);

var _Octave = require("./panel/Octave");

var _Octave2 = _interopRequireDefault(_Octave);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _midiPlayer = require("./midiPlayer");

var _midiPlayer2 = _interopRequireDefault(_midiPlayer);

var _midiPanel = require("./midiPanel");

var _midiPanel2 = _interopRequireDefault(_midiPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keymap = ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"];

var Synth = function (_React$Component) {
    _inherits(Synth, _React$Component);

    function Synth(props) {
        _classCallCheck(this, Synth);

        var _this = _possibleConstructorReturn(this, (Synth.__proto__ || Object.getPrototypeOf(Synth)).call(this, props));

        _this.state = {
            range: 2,
            active: Array.from({ length: 24 }, function (e) {
                return false;
            })

        };
        _this.keyPress = _this.keyPress.bind(_this);
        _this.keyUp = _this.keyUp.bind(_this);
        _this.osc = (0, _SynthesizerController2.default)();
        _this.midi = new _midiPlayer2.default({
            play: _this.keyPress,
            stop: _this.keyUp
        });

        return _this;
    }

    _createClass(Synth, [{
        key: "keyPress",
        value: function keyPress(e) {

            if (typeof e !== "number") {
                e = keymap.indexOf(e.key);
                if (e === -1) return;
            }
            this.state.active[e] = true;
            this.osc.play(e + this.state.range * 12);
            this.setState({ ha: Math.random() });
        }
    }, {
        key: "keyUp",
        value: function keyUp(e) {
            if (typeof e !== "number") {
                e = keymap.indexOf(e.key);
                if (e === -1) return;
            }
            this.state.active[e] = false;
            this.osc.stop(e + this.state.range * 12);
            this.setState({ ha: Math.random() });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            document.addEventListener("keydown", this.keyPress);
            document.addEventListener("keyup", this.keyUp);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            document.removeEventListener("keydown", this.keyPress);
            document.removeEventListener("keyup", this.keyUp);
        }
    }, {
        key: "midiActive",
        value: function midiActive() {

            console.log("ssf");

            if (!this.midi) {
                this.midi = true;

                this.midiController.stop = this.keyUp;
                this.midiController.start = this.keyPress;
            } else {

                this.midiController.stop = function () {};
                this.midiController.start = function () {};
                this.midi = false;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    { className: "page piano" },
                    _react2.default.createElement(
                        "section",
                        { className: "keyboard" },
                        _react2.default.createElement(_panel2.default, null),
                        _react2.default.createElement("input", {
                            type: "range",
                            min: "-1",
                            max: "5",
                            step: "1",
                            value: this.state.range,
                            onChange: function onChange(event) {
                                _this2.setState({
                                    range: event.target.value
                                });
                            }
                        }),
                        _react2.default.createElement(
                            "label",
                            null,
                            " pitch "
                        ),
                        _react2.default.createElement(
                            "ul",
                            null,
                            _react2.default.createElement(_Octave2.default, { index: 0, press: this.keyPress, up: this.keyUp, active: this.state.active }),
                            _react2.default.createElement(_Octave2.default, { index: 1, press: this.keyPress, up: this.keyUp, active: this.state.active }),
                            _react2.default.createElement(_Octave2.default, { index: 2, press: this.keyPress, up: this.keyUp, active: this.state.active })
                        )
                    )
                ),
                _react2.default.createElement(
                    "section",
                    null,
                    _react2.default.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.midi.play();
                            } },
                        "play"
                    ),
                    _react2.default.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.midi.stop();
                            } },
                        "stop"
                    )
                ),
                _react2.default.createElement(_midiPanel2.default, this.midi)
            );
        }
    }]);

    return Synth;
}(_react2.default.Component);

exports.default = Synth;
;