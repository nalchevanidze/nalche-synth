import React from "react";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
	...keys.map(note => note + "1"),
	...keys.map(note => note + "2"),
	...keys.map(note => note + "3"),
	...keys.map(note => note + "4"),
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

		if (chordIndex !== -1) {
			quard.splice(chordIndex, 1);
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


class Keys extends React.PureComponent {
	render() {
		let { midi, updateMidi } = this.props;
		return (
			<ul >
				<li className="names" >
					{
						list.map(
							(note, i) =>
								<button key={i} className={"note " + isBlack(note)} >{note}</button>

						)

					}
				</li>
				{
					midi.map((quard, i) =>
						<Quarter key={i} quard={quard} updateMidi={updateMidi} />
					)
				}
			</ul>
		);
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


class MidiDesk extends React.PureComponent {
	render() {
		let { midi, updateMidi, global, currentState = 0 } = this.props;
		return (
			<div className="midi window-panel" >
				<Header global={global} />
				<div className="time-line" >
					<button style={{ left: currentState * 200 + 48 + "px" }} />
				</div>
				<Keys midi={midi} updateMidi={updateMidi} />
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
