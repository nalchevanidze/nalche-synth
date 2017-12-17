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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ControlPoint = (function (_super) {
    __extends(ControlPoint, _super);
    function ControlPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelMove = function (event) {
            _this.props.onChange(_this.props.position(event));
        };
        _this.mouseDown = function () {
            _this.props.point.current = _this.levelMove;
        };
        return _this;
    }
    ControlPoint.prototype.render = function () {
        var _a = this.props, cx = _a.cx, cy = _a.cy;
        return (React.createElement("circle", { cx: cx, cy: cy, onTouchStart: this.mouseDown, onMouseDown: this.mouseDown, r: 5 }));
    };
    return ControlPoint;
}(React.Component));
exports.default = ControlPoint;
