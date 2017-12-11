"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const GridLine_1 = require("../GridLine");
const ReactDOM = require("react-dom");
const svgCordinates_1 = require("../svgCordinates");
const ControlPoint_1 = require("./ControlPoint");
class EnvelopeGraphic extends React.Component {
    constructor(props) {
        super(props);
        this.position = (event) => {
            if (event.type === "touchmove") {
                event = event.touches[0];
            }
            let { x, y } = svgCordinates_1.default(this.target, event);
            x = Math.min((Math.max(x, 0) / 100), 1);
            y = 1 - Math.min((Math.max(y, 0) / 100), 1);
            return { x, y };
        };
        this.levelMove = (event) => {
            if (this.point.current) {
                this.point.current(event);
            }
        };
        this.clearPoint = (event) => {
            this.point.current = null;
        };
        this.state = {
            attack: 0,
            release: 0,
            sustain: 0,
            decay: 0
        };
        this.hide = false;
        this.position = this.position.bind(this);
        this.point = { current: null };
    }
    updateTagret() {
        this.hide = false;
        this.target = ReactDOM.findDOMNode(this);
    }
    componentWillMount() {
        this.state = this.props.state;
        this.original = this.props.state;
        this.updateTagret();
    }
    componentDidMount() {
        this.updateTagret();
    }
    componentWillReceiveProps(next) {
        this.state = next.state;
        this.original = next.state;
    }
    componentWillUnmount() {
        this.hide = true;
        this.target = null;
    }
    updateValues(state) {
        Object.assign(this.original, state);
        this.setState(state);
    }
    render() {
        let { attack, release, sustain, decay } = this.state;
        attack = attack * 100;
        decay = (attack + decay * 100);
        let sustainX = decay + 20;
        sustain = (1 - sustain) * 100;
        release = (sustainX + release * 100);
        let PointStart = [0, 100], pointAttack = [attack, 0], pointSustain = [sustainX, sustain], pointDecay = [decay, sustain], pointRelease = [release, 100];
        return (React.createElement("svg", { viewBox: "-5 -5 210 110", width: "180px", height: "100px", onMouseMove: this.levelMove, onTouchMove: this.levelMove, onMouseLeave: this.clearPoint, onTouchEnd: this.clearPoint, onMouseUp: this.clearPoint },
            React.createElement(GridLine_1.default, null),
            React.createElement("path", { stroke: "#fd9a06", fill: "#fd9a06", fillOpacity: "0.40", d: "M" + [PointStart, pointAttack, pointDecay, pointSustain, pointRelease] + "Z" }),
            React.createElement("g", { stroke: "#FFF", fill: "none", strokeWidth: "0.75" },
                React.createElement("path", { d: "M" + [...pointAttack, attack, 100] }),
                React.createElement("path", { d: "M" + [decay, sustain, decay, 100] }),
                React.createElement("path", { d: "M" + [sustainX, 100, ...pointSustain] })),
            React.createElement("g", { className: "controllers", fillOpacity: 0.8, fill: "gray", stroke: "#333" },
                "/* attack */",
                React.createElement(ControlPoint_1.default, { point: this.point, position: this.position, onChange: ({ x }) => { this.updateValues({ attack: x }); }, cx: attack, cy: 0 }),
                "/* decay */",
                React.createElement(ControlPoint_1.default, { position: this.position, point: this.point, onChange: ({ x, y }) => {
                        this.updateValues({
                            decay: Math.max(x - attack / 100, 0),
                            sustain: y
                        });
                    }, cx: decay, cy: sustain }),
                "/* release */",
                React.createElement(ControlPoint_1.default, { position: this.position, point: this.point, onChange: ({ x }) => {
                        this.updateValues({
                            release: Math.max(x - sustainX / 100, 0)
                        });
                    }, cx: release, cy: 100 }))));
    }
}
exports.default = EnvelopeGraphic;
