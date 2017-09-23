import React from "react";
import ReactDOM from "react-dom";
import lib from "./icons";


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

function safeValue() {


}

class ButtonWave extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			level: false,
			gain: 0.75
		}
		this.hide = false;
		this.levelMove = this.levelMove.bind(this);
		this.mouseUp = this.listenLevel.bind(this, false);
		this.mouseDown = this.listenLevel.bind(this, true);
	}

	componentDidMount() {
		this.hide = false;
		this.target = ReactDOM.findDOMNode(this);
	}

	componentWillUnmount() {
		this.hide = true;
		this.target = null;
	}

	levelMove(event, ...e) {

		let { onChange, target, id } = this.props;


		const stepSize = 32;

		if (event.type === "touchmove") {
			event = event.touches[0]
		}


		if (!this.hide) {
			if (this.state.levelmove) {

				let { x, y } = SvgCoordinates(this.target, event);
				const value = 1 - Math.min((Math.max(y - 5, 0) / 80), 1);
				let fixed = Math.round(value * stepSize) / stepSize
				if (target) {
					target[id] = fixed;
				};

				if (onChange) {
					onChange({ [id]: fixed });
				}

			}
		}
	}

	listenLevel(switcher, event) {
		if (!this.hide) {
			this.setState({
				levelmove: switcher
			})
		}
	}

	render() {

		let {
			id,
			target
		} = this.props;
		let level = target[id];


		const fullLength = 45 * 2 * Math.PI;
		const step = fullLength / 16;
		const dashArray = [1, step - 1];

		return (
			<svg

				draggable={false}
				viewBox="0 0 100 100"
				className="wave-button"
				onMouseLeave={this.mouseUp}
				onTouchStart={this.mouseDown}
				onTouchEnd={this.mouseUp}
				onMouseDown={this.mouseDown}
				onMouseUp={this.mouseUp}
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}

			>

				<g fill="none" stroke="#222" >

					<path
						d={lib[id]}
						strokeWidth={2}
					/>

					<circle
						strokeWidth={10}
						cx={50}
						cy={50}
						r={45}
						strokeDasharray={dashArray}
						opacity={0.5}
					/>

					<g strokeOpacity={0.1} >
						<circle
							strokeWidth={1}
							cx={50}
							cy={50}
							r={49}
						/>
						<circle
							strokeWidth={1}
							cx={50}
							cy={50}
						/>
					</g>

					<circle
						strokeWidth={10}
						strokeOpacity={0.4}
						cx={50}
						cy={50}
						r={45}
						strokeDasharray={285}
						strokeDashoffset={285 * (1 - level)}
					/>

				</g>

			</svg>
		)
	}
}

export default ButtonWave;
