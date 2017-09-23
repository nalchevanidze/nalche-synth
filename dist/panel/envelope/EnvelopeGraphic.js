"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GridLine = require("../GridLine");

var _GridLine2 = _interopRequireDefault(_GridLine);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Controller = require("../../Controller");

var _Controller2 = _interopRequireDefault(_Controller);

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

var PointCircle = function (_React$Component) {
    _inherits(PointCircle, _React$Component);

    function PointCircle(props) {
        _classCallCheck(this, PointCircle);

        var _this = _possibleConstructorReturn(this, (PointCircle.__proto__ || Object.getPrototypeOf(PointCircle)).call(this, props));

        _this.state = {};
        _this.levelMove = _this.levelMove.bind(_this);
        _this.mouseDown = _this.mouseDown.bind(_this);
        return _this;
    }

    _createClass(PointCircle, [{
        key: "levelMove",
        value: function levelMove(event) {
            var _props = this.props,
                onChange = _props.onChange,
                position = _props.position;

            if (onChange) {
                onChange(position(event));
            }
        }
    }, {
        key: "mouseDown",
        value: function mouseDown(switcher, event) {
            this.props.point.current = this.levelMove;
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                cx = _props2.cx,
                cy = _props2.cy,
                target = _props2.target;

            return _react2.default.createElement("circle", {
                cx: cx,
                cy: cy,
                draggable: false,
                onTouchStart: this.mouseDown,
                onMouseDown: this.mouseDown,
                r: 5
            });
        }
    }]);

    return PointCircle;
}(_react2.default.Component);

var EnvelopeGraphic = function (_React$PureComponent) {
    _inherits(EnvelopeGraphic, _React$PureComponent);

    function EnvelopeGraphic(props) {
        _classCallCheck(this, EnvelopeGraphic);

        var _this2 = _possibleConstructorReturn(this, (EnvelopeGraphic.__proto__ || Object.getPrototypeOf(EnvelopeGraphic)).call(this, props));

        _this2.state = {
            attack: 0,
            release: 0,
            sustain: 0,
            decay: 0
        };
        _this2.hide = false;
        _this2.position = _this2.position.bind(_this2);
        _this2.point = { current: null };
        _this2.levelMove = _this2.levelMove.bind(_this2);
        _this2.clearPoint = _this2.clearPoint.bind(_this2);
        return _this2;
    }

    _createClass(EnvelopeGraphic, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.state = this.props.state;
            this.original = this.props.state;
            this.hide = false;
            this.target = _reactDom2.default.findDOMNode(this);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            this.state = next.state;
            this.original = next.state;
        }
    }, {
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
        key: "position",
        value: function position(event) {
            if (event.type === "touchmove") {
                event = event.touches[0];
            }

            var _SvgCoordinates = SvgCoordinates(this.target, event),
                x = _SvgCoordinates.x,
                y = _SvgCoordinates.y;

            x = Math.min(Math.max(x, 0) / 100, 1);
            y = 1 - Math.min(Math.max(y, 0) / 100, 1);

            return { x: x, y: y };
        }
    }, {
        key: "levelMove",
        value: function levelMove(event) {
            if (this.point.current) {
                this.point.current(event);
            }
        }
    }, {
        key: "clearPoint",
        value: function clearPoint() {
            this.point.current = null;
        }
    }, {
        key: "updateValues",
        value: function updateValues(state) {
            Object.assign(this.original, state);
            this.setState(state);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                attack = _state.attack,
                release = _state.release,
                sustain = _state.sustain,
                decay = _state.decay;

            attack = attack * 100;
            decay = attack + decay * 100;
            var sustainX = decay + 20;
            sustain = (1 - sustain) * 100;
            release = sustainX + release * 100;
            //points
            var PointStart = [0, 100],
                pointAttack = [attack, 0],
                pointSustain = [sustainX, sustain],
                pointDecay = [decay, sustain],
                pointRelease = [release, 100];
            return _react2.default.createElement(
                "svg",
                {
                    viewBox: "-5 -5 210 110", width: "200px", height: "120px",
                    onMouseMove: this.levelMove,
                    onTouchMove: this.levelMove,
                    onMouseLeave: this.clearPoint,
                    onTouchEnd: this.clearPoint,
                    onMouseUp: this.clearPoint
                },
                _react2.default.createElement(_GridLine2.default, null),
                _react2.default.createElement("path", {
                    stroke: "#fd9a06",
                    fill: "#fd9a06",
                    fillOpacity: "0.40",
                    d: "M" + [PointStart, pointAttack, pointDecay, pointSustain, pointRelease] + "Z"
                }),
                _react2.default.createElement(
                    "g",
                    {
                        stroke: "#FFF",
                        fill: "none",
                        strokeWidth: "0.75"
                    },
                    _react2.default.createElement("path", { d: "M" + [].concat(pointAttack, [attack, 100]) }),
                    _react2.default.createElement("path", { d: "M" + [decay, sustain, decay, 100] }),
                    _react2.default.createElement("path", { d: "M" + [sustainX, 100].concat(pointSustain) })
                ),
                _react2.default.createElement(
                    "g",
                    {
                        className: "controllers",
                        fillOpacity: 0.8,
                        fill: "gray",
                        stroke: "#333"
                    },
                    _react2.default.createElement(PointCircle, {
                        name: "attack",
                        point: this.point,
                        position: this.position,
                        onChange: function onChange(_ref) {
                            var x = _ref.x;
                            _this3.updateValues({ attack: x });
                        },
                        cx: attack,
                        cy: 0
                    }),
                    _react2.default.createElement(PointCircle, {
                        name: "decay",
                        position: this.position,
                        point: this.point,
                        onChange: function onChange(_ref2) {
                            var x = _ref2.x,
                                y = _ref2.y;

                            _this3.updateValues({
                                decay: Math.max(x - attack / 100, 0),
                                sustain: y
                            });
                        },
                        cx: decay,
                        cy: sustain
                    }),
                    _react2.default.createElement(PointCircle, {
                        name: "release",
                        position: this.position,
                        point: this.point,
                        onChange: function onChange(_ref3) {
                            var x = _ref3.x,
                                y = _ref3.y;

                            _this3.updateValues({
                                release: Math.max(x - sustainX / 100, 0)
                            });
                        },
                        cx: release,
                        cy: 100
                    })
                )
            );
        }
    }]);

    return EnvelopeGraphic;
}(_react2.default.PureComponent);

exports.default = EnvelopeGraphic;