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

        _this.state = { active: Array.from({ length: 24 }, function (e) {
                return false;
            }) };
        _this.keyPress = _this.keyPress.bind(_this);
        _this.keyUp = _this.keyUp.bind(_this);
        _this.osc = (0, _SynthesizerController2.default)();
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
            this.osc.play(e + 24);
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
            this.osc.stop(e + 24);
            this.setState({ ha: Math.random() });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            document.addEventListener("keydown", this.keyPress);
            document.addEventListener("keyup", this.keyUp);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page piano" },
                _react2.default.createElement(
                    "section",
                    { className: "keyboard" },
                    _react2.default.createElement(_panel2.default, null),
                    _react2.default.createElement(
                        "ul",
                        null,
                        _react2.default.createElement(_Octave2.default, { index: 0, press: this.keyPress, up: this.keyUp, active: this.state.active }),
                        _react2.default.createElement(_Octave2.default, { index: 1, press: this.keyPress, up: this.keyUp, active: this.state.active })
                    )
                )
            );
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            document.removeEventListener("keydown", this.keyPress);
            document.removeEventListener("keyup", this.keyUp);
        }
    }]);

    return Synth;
}(_react2.default.Component);

exports.default = Synth;
;