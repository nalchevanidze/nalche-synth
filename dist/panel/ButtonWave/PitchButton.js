"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CirclerangeButton = require("./CirclerangeButton");

var _CirclerangeButton2 = _interopRequireDefault(_CirclerangeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonWave = function (_React$PureComponent) {
    _inherits(ButtonWave, _React$PureComponent);

    function ButtonWave() {
        _classCallCheck(this, ButtonWave);

        return _possibleConstructorReturn(this, (ButtonWave.__proto__ || Object.getPrototypeOf(ButtonWave)).apply(this, arguments));
    }

    _createClass(ButtonWave, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _CirclerangeButton2.default,
                this.props,
                _react2.default.createElement(
                    "text",
                    {
                        x: "50",
                        y: "65",
                        fontSize: "40px",
                        textAnchor: "middle",
                        fill: "#CDDC39"
                    },
                    this.props.target.pitch * 8 - 4
                )
            );
        }
    }]);

    return ButtonWave;
}(_react2.default.PureComponent);

exports.default = ButtonWave;