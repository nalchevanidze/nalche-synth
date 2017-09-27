import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";
import standartMidi from "../standartMidi";
import noteDetector from "./noteDetector";
import TimelinePattern from "./TimelinePattern";



class Quarter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
		this.mouseDown = this.mouseDown.bind(this);
	}
	mouseDown(note, event) {
		const array = standartMidi[this.props.index];
		let arrayIndex = array.indexOf(note);
		array.splice(arrayIndex, 1);
		this.props.updateMidi();
		this.setState({ M: Math.random() });
	}
	render() {
		const quard = this.props.quard;
		return (
			<g>
				{
					quard.map(
						(note, noteIndex) =>
							<rect
								onTouchStart={(event) => this.mouseDown(note, event)}
								onMouseDown={(event) => this.mouseDown(note, event)}
								fill="#f75927"
								width={40 * note.length / 8}
								height={10}
								stroke="#000"
								strokeWidth={0.25}
								key={noteIndex}
								x={(this.props.index + note.at / 8) * 40}
								y={360 - noteDetector.indexOf(note) * 10}
							/>
					)
				}
			</g>
		)
	}
}
const count = 8;
export default class KeyboardSVG extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {};
		this.position = this.position.bind(this);
		this.levelMove = this.levelMove.bind(this);
		this.clearPoint = this.clearPoint.bind(this);
		this.mouseDown = this.mouseDown.bind(this);
		this.setTime = this.setTime.bind(this);
		this.point = { current: null };
		this.hide = false;
	}
	componentWillMount() {
		this.hide = false;
		this.target = ReactDOM.findDOMNode(this);
	}
	componentWillReceiveProps(next) {
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
		let { x, y } = svgCordinates(this.target, event);
		let length = x - this.createAt;
		if (length > 0) {
			this.create.length = Math.floor(length / 4.5);
		}
		this.setState(
			{ m: Math.random() }
		)
	}
	levelMove(event) {
		if (this.create) {
			this.position(event);
		}
	}
	clearPoint() {
		this.point.current = null;
		this.create = null;
		this.createAt = 0;
		this.props.updateMidi();
		window.localStorage.midi = JSON.stringify(standartMidi);

	}

	setTime(event) {
		let { x } = svgCordinates(this.target, event);
		let time = Math.floor(x / 5);
		this.props.setTime(time);
	}
	noteFromXY(x, y) {

		// findNote Name
		let noteIndex = Math.floor((360 - y) / 10);

		let id = noteDetector.idByIndex(noteIndex);

		// Note
		let at = Math.floor(x / 10);
		let index = Math.floor(at / 4);
		at = (at % 4) * 2;

		return {
			index,
			note: {
				at,
				length: 2,
				id
			}
		};

	}


	mouseDown(event) {

		let { x, y } = svgCordinates(this.target, event);
		this.createAt = x;
		let { index, note } = this.noteFromXY(x, y);
		if (!standartMidi[index]) {
			standartMidi[index] = [];
		}
		this.create = note;

		standartMidi[index].push(this.create);
		this.props.updateMidi();
		this.setState(
			{ m: Math.random() }
		);
	}
	render() {
		let notestep = 10;
		let stageWidth = count * 80;
		let state = this.props.currentState * notestep / 2;
		let stageHeigth = 360;
		return (
			<svg
				viewBox={
					[0, -20, stageWidth, stageHeigth].join(" ")
				}
				width={stageWidth + "px"}
				height={stageHeigth + "px"}
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}
				onMouseLeave={this.clearPoint}
				onTouchEnd={this.clearPoint}
				onMouseUp={this.clearPoint}
			>
				<TimelinePattern />
				<KeyboardPattern />
				<rect
					fillOpacity="0"
					width={stageWidth} height={360}
					onTouchStart={this.mouseDown}
					onMouseDown={this.mouseDown}
				/>
				{
					// timelineActions
				}
				<rect
					fillOpacity="0"
					y={-20}
					height={20}
					width={stageWidth}
					onTouchStart={this.setTime}
					onMouseDown={this.setTime}
				/>
				<line x1={state} x2={state} y1={-20} y2={stageHeigth} stroke="red" />
				<g>
					{
						standartMidi.map((quard, i) =>
							<Quarter
								key={i}
								quard={quard || []}
								index={i}
								updateMidi={this.props.updateMidi}
							/>
						)
					}
				</g>
			</svg>
		)
	}
};