"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var keys = [{ id: "C" }, { semi: true, id: "C#" }, { id: "D" }, { semi: true, id: "D#" }, { id: "E" }, { id: "F" }, { semi: true, id: "F#" }, { id: "G" }, { semi: true, id: "G#" }, { id: "A" }, { semi: true, id: "A#" }, { id: "B" }];

var keyStyle = {
  default: {
    display: "block",
    textAlign: "center",
    border: "1px solid #c1c1c1",
    borderRadius: "2px",
    boxShadow: "2px 10px 2px rgba(0, 0, 0, 0.1)",
    width: "14.2%",
    paddingTop: "180px",
    color: "#FF9800",
    background: "white",
    flexGrow: 0
  }
};

keyStyle.black = _extends({}, keyStyle.default, {
  backgroundColor: "black",
  width: "10%",
  position: "absolute",
  zIndex: 100,
  paddingTop: "140px"
  // box-shadow: 2px 4px 1px rgba(0, 0, 0, 0.1);
});

var Key = function Key(_ref) {
  var index = _ref.index,
      _ref$active = _ref.active,
      active = _ref$active === undefined ? [] : _ref$active,
      press = _ref.press,
      up = _ref.up,
      semi = _ref.semi,
      id = _ref.id;


  return _react2.default.createElement(
    "button",
    {
      style: semi ? keyStyle.black : keyStyle.default,
      className: (semi && "black" || "") + " " + (active[index] && "active" || ""), id: index,
      onTouchStart: press.bind(undefined, index),
      onTouchEnd: press.bind(undefined, index),
      onMouseDown: press.bind(undefined, index),
      onMouseUp: up.bind(undefined, index)
    },
    id
  );
};

var styles = {
  listStyleType: "none",
  cursor: "pointer",
  display: "flex",
  position: "relative",
  width: "300px",
  userSelect: "none",
  justifyContent: "space-between",
  alignItems: "start"
};

var Octave = function Octave(_ref2) {
  var index = _ref2.index,
      props = _objectWithoutProperties(_ref2, ["index"]);

  return _react2.default.createElement(
    "li",
    { style: styles },
    keys.map(function (_ref3, i) {
      var id = _ref3.id,
          semi = _ref3.semi;
      return _react2.default.createElement(Key, _extends({}, props, { id: id, semi: semi, index: index * 12 + i, key: i }));
    })
  );
};

exports.default = Octave;