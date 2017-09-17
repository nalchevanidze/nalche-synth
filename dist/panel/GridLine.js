"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLine = function GridLine() {
    return _react2.default.createElement(
        "g",
        { className: "grid-line" },
        _react2.default.createElement(
            "defs",
            null,
            _react2.default.createElement(
                "pattern",
                { width: "100", height: "100", patternUnits: "userSpaceOnUse", id: "grid" },
                _react2.default.createElement("path", { d: "M 100 0 L 0 0 0 100 0 0" }),
                _react2.default.createElement(
                    "pattern",
                    { width: "10", height: "10", patternUnits: "userSpaceOnUse", id: "s-grid" },
                    _react2.default.createElement("path", { d: "M 10 0 L 0 0 0 10 0 0" })
                ),
                _react2.default.createElement("rect", { width: "100", height: "100", fill: "url(#s-grid)" })
            )
        ),
        _react2.default.createElement("rect", { width: "100%", height: "100%", fill: "url(#grid)", className: "grids" })
    );
};

exports.default = GridLine;