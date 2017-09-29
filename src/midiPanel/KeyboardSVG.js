import React from "react";
import KeyboardPattern from "./KeyboardPattern";
import ReactDOM from "react-dom";
import svgCordinates from "../panel/svgCordinates";
import standartMidi from "../standartMidi";
import TimelinePattern from "./TimelinePattern";
import Quarter from "./Quarter";
const count = 8;
import noteFromXY from "./noteFromXY";
import noteDetector from "./noteDetector";
import KeysPattern from './KeysPattern';


function notePosition(index, at) {
	return index * 8 + at;
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


	standartMidi.forEach(
		(e, i) => {
			standartMidi[i] = [];
		}
	);

	flat.forEach(
		({ length, position, i }) => {
			let index = Math.floor(position / 8);
			let at = (position % 8);
			let id = noteDetector.idByIndex(i - 1);
			standartMidi[index].push({ at, id, length });
		}
	)

	return standartMidi;
}

export default class KeyboardSVG extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectZone: null,
			notes: [],
			selected: []
		};

		this.position = this.position.bind(this);
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
		this.state.notes = flatten(standartMidi);
		document.addEventListener("keydown", this.deleteEvent);

	}
	deleteEvent(event) {

		if (event.key === "Delete") {

			this.setState({
				selected: []
			});

		}
		deepen(this.state.notes);
		this.props.updateMidi();

	}
	componentWillReceiveProps(next) {
		this.state.notes = flatten(standartMidi);
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
		let { x1, y1, startX, startY } = this.state.selectZone;
		let x2, y2;

		if (startX > x) {
			x1 = x;
			x2 = startX
		} else {
			x1 = startX;
			x2 = x;
		}

		if (startY > y) {
			y1 = y;
			y2 = startY
		} else {
			y1 = startY;
			y2 = y;
		}

		this.setState({
			selectZone: {
				startX,
				startY,
				x1,
				y1,
				x2,
				y2
			}
		})
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
		)

		this.setState(
			{ selected }
		)
	}

	resizeNotes(event) {

		let { x, y } = svgCordinates(this.target, event);
		let diff = Math.round( (x - this.state.resizeStart.x) / 5);

		let selected = this.state.selected.map(
			e => {
				let oldLength = e.oldLength ||  e.length ;
				let length = oldLength + diff;
				return { ...e, length, oldLength };
			}
		)
		this.setState(
			{ selected }
		)
	}

	levelMove(event) {

		if (this.currentNote) {

			this.position(event);

		}
		if (this.state.selectZone) {

			this.setZone(event);

		}

		if (this.state.moveStart) {

			this.moveNotes(event);

		}
		if(this.state.resizeStart){
			 this.resizeNotes(event);
		}
	}

	clearPoint(event) {

		if (this.currentNote) {

			let { index, note } = this.currentNote;
			let notes = [...this.state.notes, note];
			this.currentNote = null;
			deepen(notes);
			this.props.updateMidi();
			this.setState({ notes });
		}
		if (this.state.selectZone) {
			this.setState({ selectZone: null });
			this.select();
		}

		if (this.state.moveStart) {
			this.state.moveStart = null;
			let notes = this.allNotes().map(e => {
				e.oldPosition = null;
				return e;
			});
			this.setState({
				notes,
				selected: []
			})
			deepen(notes);
			this.props.updateMidi();
		}

		if (this.state.resizeStart) {
			this.state.resizeStart = null;
			let notes = this.allNotes().map(e => {
				e.oldLength = null;
				return e;
			});
			this.setState({
				notes,
				selected: []
			})
			deepen(notes);
			this.props.updateMidi();
		}
	}

	allNotes() {
		return [
			...this.state.selected,
			...this.state.notes
		];
	}


	select() {

		let rawNotes = this.allNotes();

		let selected = [],
			notes = [];
		let { x1, x2, y1, y2 } = this.state.selectZone;

		let minIndex = Math.floor((360 - y2) / 10);
		let maxIndex = Math.floor((360 - y1) / 10);


		function ff(e) {

			let index = noteDetector.indexOf(e);
			let x = e.position * 5;
			return (
				x > x1
				&& x < x2
				&& index > minIndex
				&& index < maxIndex
			)
		}

		rawNotes.forEach(
			e =>
				ff(e) ? selected.push(e) : notes.push(e)

		)

		this.setState({
			selected,
			notes
		})

	}

	deleteNote(note, event) {
		const array = standartMidi[note.index];

		let arrayIndex = array.findIndex(
			(arrayNote) => note.at === arrayNote.at && note.id === arrayNote.id
		);

		array.splice(arrayIndex, 1);
		this.props.updateMidi();
		this.setState(
			{ notes: flatten(standartMidi) }
		);
	}

	selectSingleNote(note) {
		let notes = this.allNotes().filter(e => e !== note);
		this.setState({
			notes,
			selected: [note]
		})
	}

	startMoveSelectedNotes(note, event) {
		this.setState({
			moveStart: svgCordinates(this.target, event)
		})
	}

	startResizeSelectedNotes(note, event) {
		this.setState({
			resizeStart: svgCordinates(this.target, event)
		})
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
						index={0}
						mouseDown={
							this.props.actionType === "draw" ?
								this.deleteNote.bind(this) :
								this.selectSingleNote.bind(this)

						}
						updateMidi={this.props.updateMidi}
					/>
					<Quarter
						quard={this.state.selected}
						color={"#03A9F4"}
						mouseDown={this.startMoveSelectedNotes.bind(this)}
						resize={this.startResizeSelectedNotes.bind(this)}
						updateMidi={this.props.updateMidi}
					/>
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