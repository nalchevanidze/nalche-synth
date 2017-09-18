import React from "react";
import Sequencer from "./Sequencer";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
	...keys.map(note => note + "1"),
	...keys.map(note => note + "2"),
	...keys.map(note => note + "3"),
].reverse();
function isBlack(note) {
	return (note.charAt(1) === "#") ? "note black" : "note"
}


class Quarter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
	}
	update(quard, chordIndex, note) {
		console.log(quard,chordIndex,note);
		if (chordIndex !== -1) {
			quard.splice(chordIndex,1);
		} else {
			quard.push(note);
		}
		this.props.updateMidi();
		this.setState({ value: Math.random() })
	}
	render() {
		const quard = this.props.quard;
		return (
			<li className="quartel" >
				{
					list.map(
						(note, noteIndex) => {
							const chordIndex = quard.indexOf(note);
							const selected = (chordIndex !== -1) ? "active" : "";
							return (
								<button
									key={noteIndex}
									className={isBlack(note) + " " + selected}
									onClick={() => this.update(quard, chordIndex, note)}
								/>
							)
						}
					)

				}
			</li>
		)
	}
}

const MidiDesk = ({ midi, updateMidi }) =>
	<div className="midi window-panel" >
		<h3> midi </h3>
		<ul >
			{
				midi.map((quard, i) =>
					<Quarter key={i} quard={quard} updateMidi={updateMidi} />
				)
			}
		</ul>
	</div>
	;


export default class melody extends React.Component {
	render() {
		return (
			<div className="midi-panel" >
				<Sequencer seq={this.props.seq || []} updateMidi={this.props.updateMidi} />
				<MidiDesk midi={this.props.melody} updateMidi={this.props.updateMidi} />
			</div>
		)
	}
}
