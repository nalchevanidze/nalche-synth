"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _keymap = require("./keymap");

var _keymap2 = _interopRequireDefault(_keymap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function keyEvent(target, type) {
    var name = (type ? "add" : "remove") + "EventListener";
    document[name]("keydown", target.keyPress);
    document[name]("keyup", target.keyUp);
}

var sequence = [[1, 2, 3, 4], [], [], [1, 2, 3, 4], [], [], [1, 2, 3, 4], [], [], [1, 2, 3, 4], [], [], [1, 2, 3, 4], [], [1, 2, 3, 4], []];

var midi = ["F1,G#2,C3", "G#1,G#2,C3", "A#1,A#2,D#2", "C#2,G#2,G#3"].map(function (e) {
    return e.split(",");
});

var Synth = function (_React$Component) {
    _inherits(Synth, _React$Component);

    function Synth(props) {
        _classCallCheck(this, Synth);

        var _this = _possibleConstructorReturn(this, (Synth.__proto__ || Object.getPrototypeOf(Synth)).call(this, props));

        _this.state = {
            range: 0,
            active: Array.from({ length: 24 }, function (e) {
                return false;
            }),
            time: 0
        };
        _this.keyPress = _this.keyPress.bind(_this);
        _this.keyUp = _this.keyUp.bind(_this);
        _this.osc = (0, _SynthesizerController2.default)();
        _this.changePitch = _this.changePitch.bind(_this);

        _this.global = {
            play: function play() {
                _this.midi.play();
            },
            stop: function stop() {
                return _this.stop();
            }
        };

        _this.midi = new _midiPlayer2.default({
            play: _this.keyPress,
            stop: _this.keyUp,
            sequence: sequence,
            midi: midi,
            component: function component(time) {
                _this.setState({ time: time });
            }
        });
        return _this;
    }

    _createClass(Synth, [{
        key: "keyPress",
        value: function keyPress(e) {
            if (typeof e !== "number") {
                e = _keymap2.default.indexOf(e.key);
                if (e === -1) return;
            }
            this.state.active[e] = true;
            this.osc.play(e + this.state.range * 12);
            this.setState({ time: this.midi.currentState });
        }
    }, {
        key: "keyUp",
        value: function keyUp(e) {
            if (typeof e !== "number") {
                e = _keymap2.default.indexOf(e.key);
                if (e === -1) return;
            }
            this.state.active[e] = false;
            this.osc.stop(e + this.state.range * 12);
            this.setState({ time: this.midi.currentState });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.midi.stop();
            this.osc.stopAll();
            this.setState({
                active: this.state.active.map(function () {
                    return false;
                })
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.midi.melody = this.props.midi || this.midi.melody;
            keyEvent(this, true);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.midi.stop();
            keyEvent(this, false);
        }
    }, {
        key: "changePitch",
        value: function changePitch(value) {
            this.setState({
                range: Math.floor(value.pitch * 8 - 4)
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "nalche-synth" },
                _react2.default.createElement(
                    "div",
                    { className: "page piano" },
                    _react2.default.createElement(
                        "section",
                        { className: "keyboard" },
                        _react2.default.createElement(_panel2.default, {
                            pitch: (this.state.range + 4) / 8,
                            changePitch: this.changePitch,
                            seq: this.midi.seq,
                            updateMidi: this.midi.updateMidi
                        }),
                        _react2.default.createElement(
                            "ul",
                            { className: "midi-keys" },
                            _react2.default.createElement(_Octave2.default, { index: 0, press: this.keyPress, up: this.keyUp, active: this.state.active }),
                            _react2.default.createElement(_Octave2.default, { index: 1, press: this.keyPress, up: this.keyUp, active: this.state.active }),
                            _react2.default.createElement(_Octave2.default, { index: 2, press: this.keyPress, up: this.keyUp, active: this.state.active })
                        )
                    )
                ),
                _react2.default.createElement(_midiPanel2.default, _extends({}, this.midi, { global: this.global
                }))
            );
        }
    }]);

    return Synth;
}(_react2.default.Component);

exports.default = Synth;
;