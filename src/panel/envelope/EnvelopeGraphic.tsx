import * as React from "react";
import GridLine from "../GridLine";
import * as ReactDOM from "react-dom";
import svgCordinates from "../svgCordinates";
import ControlPoint, { Point, SelectEvent } from "./ControlPoint";
import { EnvelopeState } from "../../Controller";
import { MouseEvent } from "react";

export interface EnvelopeGraphicProps {
	state: EnvelopeState;
}


export default class EnvelopeGraphic extends React.Component<EnvelopeGraphicProps, EnvelopeState> {

	hide: boolean;
	point: {
		current: (event: SelectEvent) => void
	};
	original: EnvelopeState;
	target: Element;

	constructor(props) {
		super(props);
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


	private updateTagret(): void {
		this.hide = false;
		this.target = ReactDOM.findDOMNode(this);
	}

	componentWillMount() {
		this.state = this.props.state;
		this.original = this.props.state;
		this.updateTagret()
	}
	componentDidMount() {
		this.updateTagret();
	}
	componentWillReceiveProps(next: EnvelopeGraphicProps) {
		this.state = next.state;
		this.original = next.state;
	}
	componentWillUnmount() {
		this.hide = true;
		this.target = null;
	}
	position = (event: SelectEvent): Point => {

		if (event.type === "touchmove") {
			event = event.touches[0];
		}

		let { x, y } = svgCordinates(this.target, event);
		x = Math.min((Math.max(x, 0) / 100), 1);
		y = 1 - Math.min((Math.max(y, 0) / 100), 1);

		return { x, y };
	}
	levelMove = (event: SelectEvent): void => {
		if (this.point.current) {
			this.point.current(event);
		}
	}
	clearPoint = (event: SelectEvent): void => {
		this.point.current = null;

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
		//points
		let PointStart = [0, 100],
			pointAttack = [attack, 0],
			pointSustain = [sustainX, sustain],
			pointDecay = [decay, sustain],
			pointRelease = [release, 100];
		return (
			<svg
				viewBox="-5 -5 210 110"
				width="180px" height="100px"
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
					/* attack */
					<ControlPoint
						point={this.point}
						position={this.position}
						onChange={({ x }: Point): void => { this.updateValues({ attack: x }); }}
						cx={attack}
						cy={0}
					/>
					/* decay */
					<ControlPoint
						position={this.position}
						point={this.point}
						onChange={
							({ x, y }) => {
								this.updateValues({
									decay: Math.max(x - attack / 100, 0),
									sustain: y
								});
							}}
						cx={decay}
						cy={sustain}
					/>
					/* release */
					<ControlPoint
						position={this.position}
						point={this.point}
						onChange={
							({ x }) => {
								this.updateValues({
									release: Math.max(x - sustainX / 100, 0)
								});
							}}
						cx={release}
						cy={100}
					/>
				</g>
			</svg>
		);
	}
}