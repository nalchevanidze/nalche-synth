import React from "react";
import GridLine from "../GridLine";
import ReactDOM from "react-dom";
import Controller from "../../Controller";


function SvgCoordinates(svg, event) {
    let {
		clientX,
        clientY
	} = event;
    var point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
}

class PointCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.levelMove = this.levelMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
    }
    levelMove(event) {
        let { onChange, position } = this.props;
        if (onChange) {
            onChange(
                position(event)
            );
        }
    }
    mouseDown(switcher, event) {
        this.props.point.current = this.levelMove;
    }
    render() {
        let {
			cx, cy,
            target
        } = this.props;
        return (
            <circle
                cx={cx}
                cy={cy}
                draggable={false}
                onTouchStart={this.mouseDown}
                onMouseDown={this.mouseDown}
                r={5}
            />
        );
    }
}
export default class EnvelopeGraphic extends React.PureComponent  {
    constructor(props) {
        super(props);
        this.state = Controller.envelope;
        this.hide = false;
        this.position = this.position.bind(this);
        this.point = { current: null };
        this.levelMove = this.levelMove.bind(this);
        this.clearPoint = this.clearPoint.bind(this);
    }

    componentDidMount() {
        this.hide = false;
        this.target = ReactDOM.findDOMNode(this);
    }
    componentWillUnmount() {
        this.hide = true;
        this.target = null;
    }

    position(event) {
        if (event.type === "touchmove") {
            event = event.touches[0]
        }
        let { x, y } = SvgCoordinates(this.target, event)
        x = Math.min((Math.max(x, 0) / 100), 1);
        y = 1 - Math.min((Math.max(y, 0) / 100), 1);

        return { x, y };
    }

    levelMove(event) {
        if (this.point.current) {
            this.point.current(event);
        }
    }

    clearPoint() {
        this.point.current = null;

    }

    updateValues(state) {
        Controller.envelope = { ...Controller.envelope, ...state };
        this.setState(state);
    }

    render() {

        let { attack, release, sustain, decay } = this.state;


        attack = attack * 100;
        decay = (attack + decay * 100);
        let sustainX = decay + 20;
        sustain = (1 - sustain) * 100;
        release = (sustainX + release * 100);

        //points
        let PointStart = [0, 100],
            pointAttack = [attack, 0],
            pointSustain = [sustainX, sustain],
            pointDecay = [decay, sustain],
            pointRelease = [release, 100];

        return (
            <svg
                viewBox="-5 -5 210 110" width="200px" height="120px"
                onMouseMove={this.levelMove}
                onTouchMove={this.levelMove}
                onMouseLeave={this.clearPoint}
                onTouchEnd={this.clearPoint}
                onMouseUp={this.clearPoint}
            >
                <GridLine />


                <path
                    stroke="#fd9a06"
                    fill="#fd9a06"
                    fillOpacity="0.40"
                    d={"M" + [PointStart, pointAttack, pointDecay, pointSustain, pointRelease] + "Z"}
                />


                <g
                    stroke="#FFF"
                    fill="none"
                    strokeWidth="0.75"
                >
                    <path d={"M" + [...pointAttack, attack, 100]} />
                    <path d={"M" + [decay, sustain, decay, 100]} />
                    <path d={"M" + [sustainX, 100, ...pointSustain]} />
                </g>

                <g
                    className="controllers"
                    fillOpacity={0.8}
                    fill="gray"
                    stroke="#333"
                >

                    <PointCircle
                        name="attack"
                        point={this.point}
                        position={this.position}
                        onChange={({ x }) => { this.updateValues({ attack: x }) }}
                        cx={attack}
                        cy={0}
                    />
                    <PointCircle
                        name="decay"
                        position={this.position}
                        point={this.point}
                        onChange={
                            ({ x, y }) => {
                                this.updateValues({
                                    decay: Math.max(x - attack / 100, 0),
                                    sustain: y
                                })
                            }}
                        cx={decay}
                        cy={sustain}
                    />
                    <PointCircle
                        name="release"
                        position={this.position}
                        point={this.point}
                        onChange={
                            ({ x, y }) => {
                                this.updateValues({
                                    release: Math.max(x - sustainX / 100, 0)
                                })
                            }}
                        cx={release}
                        cy={100}
                    />
                </g>
            </svg>
        )
    }
}