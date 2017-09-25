import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";
import standartMidi from "../standartMidi";
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
	...keys.map(note => note + "1"),
	...keys.map(note => note + "2"),
	...keys.map(note => note + "3")
].reverse();
function isBlack(note) {
	return (note.charAt(1) === "#") ? "note black" : "note"
}
function findIndex(note) {

	return (list.indexOf(note.id) + 5) * 10;

}
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
								y={findIndex(note)}
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
	mouseDown(event) {

		let { x, y } = svgCordinates(this.target, event);
		this.createAt = x;
		let noteIndex = Math.floor(y / 10 - 5);
		let id = list[noteIndex];
		let at = Math.floor(x / 10);
		let index = Math.floor(at / 4);
		at = (at % 4) * 2;
		if (!standartMidi[index]) {
			standartMidi[index] = [];
		}
		this.create = {
			at,
			length: 2,
			id
		};
		standartMidi[index].push(this.create);
		this.props.updateMidi();
		this.setState(
			{ m: Math.random() }
		);
	}
	render() {
		let notestep = 10;
		let stageWidth = count * 80;
		let state = this.props.currentState * stageWidth;
		return (
			<svg
				viewBox={"0 0 " + stageWidth + " 400"}
				width={stageWidth + "px"}
				height="400px"
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}
				onMouseLeave={this.clearPoint}
				onTouchEnd={this.clearPoint}
				onMouseUp={this.clearPoint}
			>
				<KeyboardPattern />
				<rect
					fillOpacity="0"
					width={stageWidth} height={400}
					onTouchStart={this.mouseDown}
					onMouseDown={this.mouseDown}
				/>
				<line x1={state} x2={state} y1="0" y2="400" stroke="red" />
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