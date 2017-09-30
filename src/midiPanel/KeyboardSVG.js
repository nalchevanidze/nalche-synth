import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";
//import standartMidi from "../standartMidi";
import TimelinePattern from "./TimelinePattern";
import Quarter from "./Quarter";
const count = 8;
import noteFromXY from "./noteFromXY";
import noteDetector from "./noteDetector";
import KeysPattern from "./KeysPattern";


function notePosition(index, at) {
	return index * 8 + at;
}

function sortNumbers(n1, n2) {
	return [n1, n2].sort((a, b) => a > b ? 1 : -1);
}

function isInArea(
	//Area
	{
		x1, x2, y1, y2
	},
	//Note
	{
		position, i
	}
) {
	let y = 360 - 10 * i;
	let x = position * 5;
	return (x > x1 && x < x2 && y > y1 && y < y2);
}

const flatten = arr => arr.reduce(
	(acc, val, i) =>
		Array.isArray(val) ? acc.concat(
			val.map(

				e => (
					{
						...e,
						index: i,
						i: noteDetector.indexOf(e),
						position: notePosition(i, e.at)
					}
				)

			)
		) : acc
	,
	[]
);

function deepen(flat) {

	//let midi = standartMidi;
	let midi = [];


	midi.forEach(
		(e, i) => {
			midi[i] = [];
		}
	);

	flat.forEach(
		({ length, position, i }) => {
			let index = Math.floor(position / 8);
			let at = (position % 8);
			let id = noteDetector.idByIndex(i - 1);
			midi[index] = midi[index] || [];
			midi[index].push({ at, id, length });
		}
	);

	return midi;
}

export default class KeyboardSVG extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectZone: null,
			notes: [],
			selected: []
		};

		this.levelMove = this.levelMove.bind(this);
		this.clearPoint = this.clearPoint.bind(this);
		this.mouseDown = this.mouseDown.bind(this);
		this.setTime = this.setTime.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
		this.hide = false;
	}
	componentWillMount() {
		this.hide = false;
		this.target = ReactDOM.findDOMNode(this);
		this.state.notes = flatten(this.props.midi);
		document.addEventListener("keydown", this.deleteEvent);

	}
	refreshMidi(newNotes) {
		let notes = deepen(newNotes || this.state.notes);
		this.props.updateMidi(notes);
	}
	deleteEvent(event) {
		if (event.key === "Delete") {
			this.setState({
				selected: []
			});
		}
		this.refreshMidi();
	}
	componentDidMount() {
		this.hide = false;
		this.target = ReactDOM.findDOMNode(this);
	}
	componentWillUnmount() {
		this.hide = true;
		this.target = null;
		document.removeEventListener("keydown", this.deleteEvent);
	}


	startCreatingNote(event) {

		this.setState({
			currentNote: noteFromXY(
				svgCordinates(this.target, event)
			)
		});

	}
	startMoveSelectedNotes(note, event) {
		this.setState({
			moveStart: svgCordinates(this.target, event)
		});
	}

	startResizeSelectedNotes(note, event) {
		this.setState({
			resizeStart: svgCordinates(this.target, event)
		});
	}

	startSelecting(event) {
		let { x, y } = svgCordinates(this.target, event);
		this.setState(
			{
				selectZone: {
					startX: x,
					startY: y,
					x1: x,
					y1: y,
					x2: x,
					y2: y
				}
			}
		);
	}

	levelMove(event) {
		if (this.state.currentNote) {
			this.editCreatingNote(event);
		}
		if (this.state.selectZone) {
			this.setZone(event);
		}

		if (this.state.moveStart) {
			this.moveNotes(event);
		}
		if (this.state.resizeStart) {
			this.resizeNotes(event);
		}
	}

	editCreatingNote(event) {
		let { x } = svgCordinates(this.target, event);
		let { length, position, i } = this.state.currentNote;
		length = Math.max(
			Math.round(x / 5 - position),
			1
		);

		this.setState({
			currentNote: {
				length, position, i
			}
		});
	}
	setZone(event) {
		let { x, y } = svgCordinates(this.target, event);
		let { startX, startY } = this.state.selectZone;
		let [x1, x2] = sortNumbers(startX, x);
		let [y1, y2] = sortNumbers(startY, y);
		this.setState({
			selectZone: {
				startX,
				startY,
				x1,
				y1,
				x2,
				y2
			}
		});
	}
	moveNotes(event) {
		let { x, y } = svgCordinates(this.target, event);
		let diff = Math.floor((x - this.state.moveStart.x) / 5);
		let noteDiff = Math.floor((y - this.state.moveStart.y) / 10);
		let selected = this.state.selected.map(
			e => {
				let oldI = e.oldI || e.i;
				let oldPosition = e.oldPosition || e.position;

				let position = oldPosition + diff;
				let i = oldI - noteDiff;
				return { ...e, position, oldPosition, i, oldI };
			}
		);
		this.setState(
			{ selected }
		);
	}

	resizeNotes(event) {
		let { x } = svgCordinates(this.target, event);
		let diff = Math.round((x - this.state.resizeStart.x) / 5);
		let selected = this.state.selected.map(
			e => {
				let oldLength = e.oldLength || e.length;
				let length = oldLength + diff;
				return { ...e, length, oldLength };
			}
		);
		this.setState(
			{ selected }
		);
	}


	allNotes() {
		return [
			...this.state.selected,
			...this.state.notes
		];
	}

	getResetNotes() {
		let notes = this.allNotes().map(
			({ i, position, length }) =>
				({ i, position, length })
		);

		this.setNewResetState(notes);

	}

	setNewResetState(notes) {
		this.refreshMidi(notes);
		this.setState({
			notes,
			selected: []
		});
	}


	select() {
		let selected = [], notes = [];
		this.allNotes().forEach(
			note =>
				isInArea(this.state.selectZone, note) ?
					selected.push(note) : notes.push(note)

		);
		this.setState({
			selected,
			notes
		});
	}

	deleteNote(note) {
		const notes = this.allNotes()
			.filter(arrayNote =>
				arrayNote !== note
			);
		this.refreshMidi(notes);
		this.setState(
			{ notes: notes }
		);
	}

	selectSingleNote(note) {
		let notes = this.allNotes().filter(e => e !== note);
		this.setState({
			notes,
			selected: [note]
		});
	}
	setTime(event) {
		let { x } = svgCordinates(this.target, event);
		let time = Math.floor(x / 5);
		this.props.setTime(time);
	}

	clearPoint() {

		if (this.state.currentNote) {
			let notes = [...this.state.notes, this.state.currentNote];
			this.state.currentNote = null;
			this.setNewResetState(notes);

		}
		if (this.state.selectZone) {
			this.setState({ selectZone: null });
			this.select();
		}
		if (this.state.moveStart) {
			this.state.moveStart = null;
			this.getResetNotes();
		}
		if (this.state.resizeStart) {
			this.state.resizeStart = null;
			this.getResetNotes();
		}
	}
	mouseDown(event) {
		if (this.props.actionType === "draw") {
			this.startCreatingNote(event);
		}
		if (this.props.actionType === "select") {
			this.startSelecting(event);
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
					[-20, -10, stageWidth, stageHeigth].join(" ")
				}
				width={stageWidth + 20 + "px"}
				height={stageHeigth + 30 + "px"}
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}
				onMouseLeave={this.clearPoint}
				onTouchEnd={this.clearPoint}
				onMouseUp={this.clearPoint}
				style={{
					background: "#3c474a"
				}}
			>
				<TimelinePattern />
				<KeyboardPattern />
				<KeysPattern />
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
					<Quarter
						quard={this.state.notes}
						mouseDown={
							this.props.actionType === "draw" ?
								this.deleteNote.bind(this) :
								this.selectSingleNote.bind(this)

						}
					/>
					<Quarter
						quard={this.state.selected}
						color={"#03A9F4"}
						mouseDown={this.startMoveSelectedNotes.bind(this)}
						resize={this.startResizeSelectedNotes.bind(this)}
					/>
					{
						this.state.currentNote ?
							<Quarter
								quard={[this.state.currentNote]}
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
		);
	}
}