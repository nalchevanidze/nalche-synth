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

const flatten = arr => arr.reduce(
	(acc, val, i) =>
		Array.isArray(val) ? acc.concat(
			val.map(

				e => ({ ...e, index: i })

			)
		) : acc
	,
	[]
);

function deepen(flat) {


	standartMidi.forEach(
		(e, i) => {
			standartMidi[i] = null;
		}
	);

	flat.forEach(
		({ index, at, id, length }) => {

			if (!standartMidi[index]) {
				standartMidi[index] = [];
			}

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
				startY ,
				x1,
				y1,
				x2,
				y2
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
	clearPoint(event) {

		

		if (this.currentNote) {
			let { index, note } = this.currentNote;
			if (!standartMidi[index]) {
				standartMidi[index] = [];
			}
			standartMidi[index].push(note);
			this.currentNote = null;
			this.props.updateMidi();
			window.localStorage.midi = JSON.stringify(standartMidi);
			this.setState(
				{ notes: flatten(standartMidi) }
			);
		}

		if (this.state.selectZone) {
			this.setState({
				selectZone: null
			});
			this.select();
		}
	}

	select() {

		let rawNotes = [
			...this.state.selected,
			...this.state.notes
		];

		let selected = [],
			notes = [];
		let { x1, x2, y1, y2 } = this.state.selectZone;

		let minIndex = Math.floor((360 - y2) / 10);
		let maxIndex = Math.floor((360 - y1) / 10);


		function ff(e) {

			let index = noteDetector.indexOf(e);
			let x = (e.index * 8 + e.at) * 5;
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
					[-20, -10, stageWidth, stageHeigth ].join(" ")
				}
				width={stageWidth+20 + "px"}
				height={stageHeigth+30 + "px"}
				onMouseMove={this.levelMove}
				onTouchMove={this.levelMove}
				onMouseLeave={this.clearPoint}
				onTouchEnd={this.clearPoint}
				onMouseUp={this.clearPoint}
				style={{
					background:"#3c474a"
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
						mouseDown={this.deleteNote.bind(this)}
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

					<Quarter
						quard={this.state.selected}
						index={0}
						color={"#03A9F4"}
						mouseDown={this.deleteNote.bind(this)}
						updateMidi={this.props.updateMidi}
					/>

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