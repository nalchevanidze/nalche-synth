"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = [{ id: "C" }, { semi: true, id: "C#" }, { id: "D" }, { semi: true, id: "D#" }, { id: "E" }, { id: "F" }, { semi: true, id: "F#" }, { id: "G" }, { semi: true, id: "G#" }, { id: "A" }, { semi: true, id: "A#" }, { id: "B" }];

var Octave = function Octave(_ref) {
  var index = _ref.index,
      _ref$active = _ref.active,
      active = _ref$active === undefined ? [] : _ref$active,
      press = _ref.press,
      up = _ref.up;
  return _react2.default.createElement(
    "li",
    null,
    keys.map(function (_ref2, i) {
      var id = _ref2.id,
          semi = _ref2.semi;
      return _react2.default.createElement(
        "button",
        { key: i, className: (semi && "black" || "") + " " + (active[index * 12 + i] && "active" || ""), id: index * 12 + i,
          onTouchStart: press.bind(undefined, index * 12 + i),
          onTouchEnd: press.bind(undefined, index * 12 + i),
          onMouseDown: press.bind(undefined, index * 12 + i),
          onMouseUp: up.bind(undefined, index * 12 + i)
        },
        id
      );
    })
  );
};

exports.default = Octave;