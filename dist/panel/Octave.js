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

var keys = [{ id: "C" }, { semi: true, id: "C#" }, { id: "D" }, { semi: true, id: "D#" }, { id: "E" }, { id: "F" }, { semi: true, id: "F#" }, { id: "G" }, { semi: true, id: "G#" }, { id: "A" }, { semi: true, id: "A#" }, { id: "B" }];

var Octave = function (_React$PureComponent) {
  _inherits(Octave, _React$PureComponent);

  function Octave() {
    _classCallCheck(this, Octave);

    return _possibleConstructorReturn(this, (Octave.__proto__ || Object.getPrototypeOf(Octave)).apply(this, arguments));
  }

  _createClass(Octave, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          index = _props.index,
          _props$active = _props.active,
          active = _props$active === undefined ? [] : _props$active,
          press = _props.press,
          up = _props.up;

      return _react2.default.createElement(
        "li",
        null,
        keys.map(function (_ref, i) {
          var id = _ref.id,
              semi = _ref.semi;
          return _react2.default.createElement(
            "button",
            { key: i, className: (semi && "black" || "") + " " + (active[index * 12 + i] && "active" || ""), id: index * 12 + i,
              onTouchStart: press.bind(_this2, index * 12 + i),
              onTouchEnd: press.bind(_this2, index * 12 + i),
              onMouseDown: press.bind(_this2, index * 12 + i),
              onMouseUp: up.bind(_this2, index * 12 + i)
            },
            id
          );
        })
      );
    }
  }]);

  return Octave;
}(_react2.default.PureComponent);

exports.default = Octave;