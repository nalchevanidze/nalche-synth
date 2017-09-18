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
export default class melody extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			value: 0
		}
	}
	render() {
		return (
			<div className="midi-panel" >
				<h3>sequencer</h3>
				<Sequencer seq={this.props.seq || []} updateMidi={this.props.updateMidi}/>
				<h3> midi </h3>
				<ul className="midi" >
					{
						this.props.melody.map(
							(quard, i) => {
								return (
									<li key={i} className="quartel" >
										{
											list.map(
												(note, noteIndex) => {
													const chordIndex = quard.indexOf(note);
													const selected = (chordIndex !== -1) ? "active" : "";
													return (
														<button
															key={noteIndex}
															className={isBlack(note) + " " + selected}
															onClick={() => {
																if (chordIndex !== -1) {
																	quard.splice(chordIndex)
																} else {
																	quard.push(note);
																}
																this.props.updateMidi();
																this.setState({ value: Math.random() })
															}}
														/>
													)
												}
											)

										}
									</li>);
							}
						)
					}
				</ul>
			</div>
		)
	}
}
