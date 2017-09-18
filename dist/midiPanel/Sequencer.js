"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var list = [].concat(_toConsumableArray(keys.map(function (note) {
    return note + "1";
})), _toConsumableArray(keys.map(function (note) {
    return note + "2";
})), _toConsumableArray(keys.map(function (note) {
    return note + "3";
}))).reverse();

var Sequence = function Sequence(_ref) {
    var chord = _ref.chord,
        active = _ref.active,
        _onClick = _ref.onClick;
    return _react2.default.createElement(
        "li",
        null,
        [1, 2, 3].reverse().map(function (index) {
            return _react2.default.createElement("button", {
                className: chord.indexOf(index) !== -1 ? "active" : "",
                key: index,
                onClick: function onClick() {
                    return _onClick(index);
                }
            });
        })
    );
};

var melody = function (_React$Component) {
    _inherits(melody, _React$Component);

    function melody(props) {
        _classCallCheck(this, melody);

        var _this = _possibleConstructorReturn(this, (melody.__proto__ || Object.getPrototypeOf(melody)).call(this, props));

        _this.state = {
            value: 0
        };
        return _this;
    }

    _createClass(melody, [{
        key: "setNew",
        value: function setNew(i, index) {

            var chord = this.props.seq[i];

            var chordIndex = chord.indexOf(index);
            if (chordIndex === -1) {
                chord.push(index);
            } else {
                chord.splice(chordIndex, 1);
            }
            this.props.updateMidi();
            this.setState({ value: Math.random() });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "sequencer window-panel" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "sequencer"
                ),
                _react2.default.createElement(
                    "ul",
                    null,
                    this.props.seq.map(function (chord, i) {
                        return _react2.default.createElement(Sequence, {
                            key: i,
                            chord: chord,
                            onClick: function onClick(index) {
                                return _this2.setNew(i, index);
                            }
                        });
                    })
                )
            );
        }
    }]);

    return melody;
}(_react2.default.Component);

exports.default = melody;
;