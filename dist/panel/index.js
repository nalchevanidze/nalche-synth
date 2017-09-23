"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _oscillator = require("./oscillator");

var _oscillator2 = _interopRequireDefault(_oscillator);

var _envelope = require("./envelope");

var _envelope2 = _interopRequireDefault(_envelope);

var _Sequencer = require("./Sequencer");

var _Sequencer2 = _interopRequireDefault(_Sequencer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function Panel(props) {
    return _react2.default.createElement(
        "div",
        { className: "panel" },
        _react2.default.createElement(_oscillator2.default, props),
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_envelope2.default, null),
            _react2.default.createElement(_Sequencer2.default, { seq: props.seq || [], updateMidi: props.updateMidi })
        )
    );
};

exports.default = Panel;