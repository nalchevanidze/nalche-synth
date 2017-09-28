import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";
import standartMidi from "../standartMidi";
import noteDetector from "./noteDetector";
import TimelinePattern from "./TimelinePattern";
import Quarter from "./Quarter";
const count = 8;
function noteFromXY({ x, y }) {
	// findNote Name
	let noteIndex = Math.floor((360 - y) / 10);
	let id = noteDetector.idByIndex(noteIndex);
	// Note
	let at = Math.floor(x / 5);
	let index = Math.floor(at / 8);

	at = (at % 8);

	return {
		startedAt: x,
		index,
		note: {
			at,
			length: 1,
			id
		}
	};
}
export default class KeyboardSVG extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selectZone: null
		};
		this.position = this.position.bind(this);
		this.levelMove = this.levelMove.bind(this);
		this.clearPoint = this.clearPoint.bind(this);
		this.mouseDown = this.mouseDown.bind(this);
		this.setTime = this.setTime.bind(this);
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

		let { x, y } = svgCordinates(this.target, event);
		let length = x - this.currentNote.startedAt;
		if (length > 0) {
			this.currentNote.note.length = Math.max(
				Math.floor(length / 4.5),
				1
			)
		}
		this.setState({ m: Math.random() })

	}

	setZone(event) {

		let { x, y } = svgCordinates(this.target, event);
		let { x1 , y1 } = this.state.selectZone;
		this.setState({
			selectZone: {
				x1,
				y1,
				x2: x,
				y2: y
			}
		})
	}

	levelMove(event) {

		if (this.currentNote) {
			this.position(event);
		}
		if (this.state.selectZone) {
			this.setZone(event);
		}
	}
	clearPoint() {

		if (this.currentNote) {
			let { index, note } = this.currentNote;
			if (!standartMidi[index]) {
				standartMidi[index] = [];
			}
			standartMidi[index].push(note);
			this.currentNote = null;
			this.props.updateMidi();
			window.localStorage.midi = JSON.stringify(standartMidi);
			this.setState({ m: Math.random() });
		}

		if (this.state.selectZone) {
			this.setState({
				selectZone: null
			})
		}



	}
	setTime(event) {
		let { x } = svgCordinates(this.target, event);
		let time = Math.floor(x / 5);
		this.props.setTime(time);
	}

	mouseDown(event) {

		if (this.props.actionType === "draw") {
			this.currentNote = noteFromXY(
				svgCordinates(this.target, event)
			);
		}
		if (this.props.actionType === "select") {
			let { x, y } = svgCordinates(this.target, event)
			this.setState(
				{
					selectZone: {
						x1: x,
						y1: y,
						x2: x,
						y2: y
					}
				}
			);
		}

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
					{
						this.currentNote ?
							<Quarter
								quard={[this.currentNote.note]}
								index={this.currentNote.index}
								updateMidi={this.props.updateMidi}
							/> : null
					}
				</g>
				{
					this.state.selectZone ?
						<rect
						    stroke={"red"}
							fill={"red"}
							fillOpacity={0.1}
							x={this.state.selectZone.x1}
							y={this.state.selectZone.y1}
							width={this.state.selectZone.x2 - this.state.selectZone.x1}
							height={this.state.selectZone.y2 - this.state.selectZone.y1}
						/>
						: null
				}
			</svg>
		)
	}
};