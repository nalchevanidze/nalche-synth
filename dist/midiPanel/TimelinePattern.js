"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridSize = 40;
function randomName() {

    return "TimelinePattern" + [0, 0, 0, 0, 0, 0, 0].map(function () {
        return String.fromCharCode(65 + Math.random() * 25);
    }).join("");
}

var parent = randomName();
var child = randomName();
var stroke = "#ffa929";
var background = "#555";

var TimelinePattern = function TimelinePattern() {
    return _react2.default.createElement(
        "g",
        null,
        _react2.default.createElement(
            "defs",
            null,
            _react2.default.createElement(
                "pattern",
                {
                    width: "10",
                    height: "20",
                    patternUnits: "userSpaceOnUse",
                    id: child
                },
                _react2.default.createElement("line", {
                    x1: 1,
                    x2: 1,
                    y1: 0,
                    y2: 5,
                    stroke: stroke,
                    strokeWidth: 0.5
                })
            ),
            _react2.default.createElement(
                "pattern",
                {
                    width: gridSize,
                    height: 20,
                    patternUnits: "userSpaceOnUse",
                    id: parent
                },
                _react2.default.createElement("rect", {
                    width: gridSize,
                    height: 20,
                    fill: background
                }),
                _react2.default.createElement("rect", {
                    width: gridSize,
                    height: 20,
                    fill: "url(#" + child + ")"
                }),
                _react2.default.createElement("line", {
                    x1: 1,
                    x2: 1,
                    y1: 0,
                    y2: 10,
                    stroke: stroke,
                    strokeWidth: 1
                })
            )
        ),
        _react2.default.createElement("rect", {
            width: "100%",
            height: 20,
            y: -20,
            fill: "url(#" + parent + ")"
        })
    );
};

exports.default = TimelinePattern;