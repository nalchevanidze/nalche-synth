"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function SvgCoordinates(svg, event) {
    var clientX = event.clientX,
        clientY = event.clientY;

    var point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}

var lib = {
    saw: [0, 0.5, 0, 0, 1, 1, 1, 0.5],
    square: [0, 0.5, 0, 0, 0.5, 0, 0.5, 1, 1, 1, 1, 0.5],
    saw2: [0, 0.5, 0, 0, 0.5, 1, 0.5, 0, 1, 1, 1, 0.5]
};

function FunctionalWave(func) {
    return Array.from({ length: 40 }, function (e, i) {
        return 30 + i + " " + (30 + func(i / 40) * 40);
    });
}

lib.noise = "M" + FunctionalWave(Math.random);
lib.sine = "M" + FunctionalWave(function (e) {
    return Math.sin(e * 2 * Math.PI) / 2 + 0.5;
});
lib.saw = rescale(lib.saw);
lib.saw2 = rescale(lib.saw2);
lib.square = rescale(lib.square);
lib.tech = "M" + FunctionalWave(function (i) {
    var wave = 0.5;
    if (i < 0.15) wave = Math.min((0.05 - i % 0.05) * 50 - 0.7, 1) - 0.5;
    return wave;
});

lib.fm = lib.sine;

function rescale(vector) {
    return "M" + vector.map(function (value) {
        return 30 + value * 40;
    });
}

var ButtonWave = function (_React$Component) {
    _inherits(ButtonWave, _React$Component);

    function ButtonWave(props) {
        _classCallCheck(this, ButtonWave);

        var _this = _possibleConstructorReturn(this, (ButtonWave.__proto__ || Object.getPrototypeOf(ButtonWave)).call(this, props));

        _this.state = { level: false, gain: 0.75 };
        _this.hide = false;
        _this.levelMove = _this.levelMove.bind(_this);
        _this.mouseUp = _this.listenLevel.bind(_this, false);
        _this.mouseDown = _this.listenLevel.bind(_this, true);
        return _this;
    }

    _createClass(ButtonWave, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.hide = false;
            this.target = _reactDom2.default.findDOMNode(this);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.hide = true;
            this.target = null;
        }
    }, {
        key: "levelMove",
        value: function levelMove(event) {

            if (event.type === "touchmove") {
                event = event.touches[0];
            }

            if (!this.hide) {
                if (this.state.levelmove) {
                    var _SvgCoordinates = SvgCoordinates(this.target, event),
                        x = _SvgCoordinates.x,
                        y = _SvgCoordinates.y;

                    this.props.target[this.props.id] = 1 - Math.min(Math.max(y - 5, 0) / 80, 1);
                }
            }
        }
    }, {
        key: "listenLevel",
        value: function listenLevel(switcher, event) {
            if (!this.hide) {
                this.setState({ levelmove: switcher });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                id = _props.id,
                target = _props.target;

            var level = target[id];
            return _react2.default.createElement(
                "svg",
                {
                    draggable: false,
                    viewBox: "0 0 100 100",
                    className: "wave-button",
                    onMouseLeave: this.mouseUp,
                    onTouchStart: this.mouseDown,
                    onTouchEnd: this.mouseUp,
                    onMouseDown: this.mouseDown,
                    onMouseUp: this.mouseUp,
                    onMouseMove: this.levelMove,
                    onTouchMove: this.levelMove
                },
                _react2.default.createElement(
                    "g",
                    { fill: "none", stroke: "#222" },
                    _react2.default.createElement("path", { d: lib[id] }),
                    _react2.default.createElement("circle", { strokeWidth: 0.4, cx: 50, cy: 50, r: 45, strokeDasharray: 285, strokeDashoffset: 285 * (1 - level) })
                )
            );
        }
    }]);

    return ButtonWave;
}(_react2.default.Component);

exports.default = ButtonWave;