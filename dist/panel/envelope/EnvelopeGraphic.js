"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var GridLine_1 = require("../GridLine");
var ReactDOM = require("react-dom");
var svgCordinates_1 = require("../svgCordinates");
var ControlPoint_1 = require("./ControlPoint");
var EnvelopeGraphic = (function (_super) {
    __extends(EnvelopeGraphic, _super);
    function EnvelopeGraphic(props) {
        var _this = _super.call(this, props) || this;
        _this.position = function (event) {
            if (!_this.target) {
                return { x: 0, y: 0 };
            }
            var _a = svgCordinates_1.default(_this.target, event), x = _a.x, y = _a.y;
            x = Math.min((Math.max(x, 0) / 100), 1);
            y = 1 - Math.min((Math.max(y, 0) / 100), 1);
            return { x: x, y: y };
        };
        _this.levelMove = function (event) {
            if (_this.point.current) {
                _this.point.current(event);
            }
        };
        _this.clearPoint = function (event) {
            _this.point.current = function () { };
        };
        _this.setAttack = function (_a) {
            var x = _a.x;
            _this.updateValues({ attack: x });
        };
        _this.setDecay = function (_a) {
            var x = _a.x, y = _a.y;
            _this.updateValues({
                decay: Math.max(x - _this.state.attack, 0),
                sustain: y
            });
        };
        _this.state = {
            attack: 0,
            release: 0,
            sustain: 0,
            decay: 0
        };
        _this.hide = false;
        _this.position = _this.position.bind(_this);
        _this.point = { current: function () { } };
        return _this;
    }
    EnvelopeGraphic.prototype.updateTagret = function () {
        this.hide = false;
        this.target = ReactDOM.findDOMNode(this);
    };
    EnvelopeGraphic.prototype.componentWillMount = function () {
        this.state = this.props.state;
        this.original = this.props.state;
        this.updateTagret();
    };
    EnvelopeGraphic.prototype.componentDidMount = function () {
        this.updateTagret();
    };
    EnvelopeGraphic.prototype.componentWillReceiveProps = function (next) {
        this.state = next.state;
        this.original = next.state;
    };
    EnvelopeGraphic.prototype.componentWillUnmount = function () {
        this.hide = true;
        this.target = null;
    };
    EnvelopeGraphic.prototype.updateValues = function (state) {
        Object.assign(this.original, state);
        this.setState(this.original);
    };
    EnvelopeGraphic.prototype.render = function () {
        var _this = this;
        var _a = this.state, attack = _a.attack, release = _a.release, sustain = _a.sustain, decay = _a.decay;
        attack = attack * 100;
        decay = (attack + decay * 100);
        var sustainX = decay + 20;
        sustain = (1 - sustain) * 100;
        release = (sustainX + release * 100);
        var PointStart = [0, 100], pointAttack = [attack, 0], pointSustain = [sustainX, sustain], pointDecay = [decay, sustain], pointRelease = [release, 100];
        var setRelease = function (_a) {
            var x = _a.x;
            _this.updateValues({
                release: Math.max(x - sustainX / 100, 0)
            });
        };
        return (React.createElement("svg", { viewBox: "-5 -5 210 110", width: "180px", height: "100px", onMouseMove: this.levelMove, onTouchMove: this.levelMove, onMouseLeave: this.clearPoint, onTouchEnd: this.clearPoint, onMouseUp: this.clearPoint },
            React.createElement(GridLine_1.default, null),
            React.createElement("path", { stroke: "#fd9a06", fill: "#fd9a06", fillOpacity: "0.40", d: "M" + [PointStart, pointAttack, pointDecay, pointSustain, pointRelease] + "Z" }),
            React.createElement("g", { stroke: "#FFF", fill: "none", strokeWidth: "0.75" },
                React.createElement("path", { d: "M" + __spread(pointAttack, [attack, 100]) }),
                React.createElement("path", { d: "M" + [decay, sustain, decay, 100] }),
                React.createElement("path", { d: "M" + __spread([sustainX, 100], pointSustain) })),
            React.createElement("g", { className: "controllers", fillOpacity: 0.8, fill: "gray", stroke: "#333" },
                "/* attack */",
                React.createElement(ControlPoint_1.default, { point: this.point, position: this.position, onChange: this.setAttack, cx: attack, cy: 0 }),
                "/* decay */",
                React.createElement(ControlPoint_1.default, { position: this.position, point: this.point, onChange: this.setDecay, cx: decay, cy: sustain }),
                "/* release */",
                React.createElement(ControlPoint_1.default, { position: this.position, point: this.point, onChange: setRelease, cx: release, cy: 100 }))));
    };
    return EnvelopeGraphic;
}(React.Component));
exports.default = EnvelopeGraphic;
