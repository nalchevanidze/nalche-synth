import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";


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

const standartMidi = [

	[
		{
			at: 0,
			id: "F#1",
			length: 8
		},
		{
			at: 2,
			id: "G#2",
			length: 2
		},
		{
			at: 4,
			id: "C#3",
			length: 1
		}
	],

	null,

	[
		{
			at: 4,
			id: "F#1",
			length: 2
		},
		{
			at: 2,
			id: "G#2",
			length: 4
		},
		{
			at: 0,
			id: "C#3",
			length: 24
		}
	],
	null
];


class Quarter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
	}
	update() { }
	render() {
		const quard = this.props.quard;
		return (
			<g>
				{
					quard.map(
						(note, noteIndex) =>
							<rect
								fill="#f75927"
								width={40 * note.length / 8}
								height={10}
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


class Header extends React.PureComponent {
	render() {
		let { play, stop } = this.props.global;
		return (
			<h3>
				<section className="playStop" >
					<button onClick={play}  >play</button>
					<button onClick={stop}  >stop</button>
				</section>
			</h3>
		)
	}
}



class KeyboardSVG extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {};
		this.position = this.position.bind(this);
		this.levelMove = this.levelMove.bind(this);
		this.clearPoint = this.clearPoint.bind(this);
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
		let { x, y } = svgCordinates(this.target, event)
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
	render() {
		let notestep = 10;
		let state = this.props.currentState * 200;
		return (
			<svg
				viewBox="0 0 200 400" width="200px" height="400px"
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}
				onMouseLeave={this.clearPoint}
				onTouchEnd={this.clearPoint}
				onMouseUp={this.clearPoint}
			>
				<KeyboardPattern />
				<line x1={state} x2={state} y1="0" y2="400" stroke="red" />
				<g>
					{
						standartMidi.map((quard, i) =>
							<Quarter key={i} quard={quard || []} index={i} />
						)
					}
				</g>
			</svg>
		)
	}
};

class MidiDesk extends React.PureComponent {
	render() {
		let { midi, updateMidi, global, currentState = 0 } = this.props;
		return (
			<div className="midi window-panel" >
				<Header global={global} />
				<KeyboardSVG currentState={currentState} />
			</div>
		)
	}
}


export default class melody extends React.PureComponent {
	render() {
		return (
			<div className="midi-panel" >
				<MidiDesk
					currentState={this.props.currentState}
					midi={this.props.melody}
					updateMidi={this.props.updateMidi}
					global={this.props.global}
				/>
			</div>
		)
	}
}