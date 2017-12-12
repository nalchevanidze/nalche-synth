"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ControlPoint extends React.Component {
    constructor() {
        super(...arguments);
        this.levelMove = (event) => {
            this.props.onChange(this.props.position(event));
        };
        this.mouseDown = () => {
            this.props.point.current = this.levelMove;
        };
    }
    render() {
        let { cx, cy } = this.props;
        return (React.createElement("circle", { cx: cx, cy: cy, onTouchStart: this.mouseDown, onMouseDown: this.mouseDown, r: 5 }));
    }
}
exports.default = ControlPoint;
