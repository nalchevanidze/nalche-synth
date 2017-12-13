import React from "react";
import Panel from "./panel";
import MidiPanel from "./panel/midi";
import keymap from "./keymap";
import NalcheOscillator from "./audio/oscillator";
import Controller from "./Controller";
import Keyboard from "./panel/Keyboard";

function keyEvent(target, type) {
	const name = (type ? "add" : "remove") + "EventListener";
	document[name]("keydown", target.keyPress);
	document[name]("keyup", target.keyUp);
}
import midi from "./standartMidi";

let sequence: number[][] = [
	[1, 2, 3],
	[],
	[],
	[1, 2, 3],
	[],
	[],
	[1, 2, 3],
	[],
	[],
	[1, 2, 3],
	[],
	[],
	[1, 2, 3],
	[],
	[1, 2, 3],
	[],
	[],
];


export default class Synth extends React.Component {
	constructor(props) {

		super(props);
		this.osc = new NalcheOscillator(
			Controller,
			(time: number, active: Set < number > ) => {
				this.setState({
					time,
					active
				});
			}
		);

		this.state = {
			active: this.osc.active,
			time: 0
		};

		this.setSequence = this.osc.setSequence;

		this.keyPress = this.keyPress.bind(this);
		this.keyUp = this.keyUp.bind(this);


		this.global = {
			setBPM: () => {},
			BPM: () => 128,
			stop: () => this.stop(),
			pause: () => this.pause(),
			play: () => {
				this.setState({
					isPlayng: true
				});
				this.osc.play();
			}
		};
	}
	keyPress(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key) + 12;
			if (e === -1) {
				return;
			}
		}
		this.osc.setNote(e);
		//this.setState({});
	}
	keyUp(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key) + 12;
			if (e === -1) {
				return;
			}
		}
		this.osc.unsetNote(e);
		//this.setState({});
	}
	pause() {
		this.osc.pause();
		this.setState({
			isPlayng: false
		});
	}
	stop() {
		this.osc.stop();
		this.setState({
			isPlayng: false,
			time: 0
		});
	}
	componentDidMount() {
		keyEvent(this, true);
	}
	componentWillUnmount() {
		this.stop();
		keyEvent(this, false);
	}
	render() {
		return ( <
			div className = "nalche-synth"
			style = {
				{
					display: "flex",
					position: "relative",
					justifyContent: "center",
					fontFamily: "sans-serif"
				}
			} >
			<
			section style = {
				{
					boxShadow: "0px 5px 10px gray",
					width: "660px",
					height: "410px",
					borderRadius: "3px",
					background: "#333333"
				}
			} >
			<
			Panel seq = {
				sequence
			}
			setSequence = {
				this.setSequence
			}
			/> <
			Keyboard keyPress = {
				this.keyPress
			}
			keyUp = {
				this.keyUp
			}
			active = {
				this.state.active
			}
			/> < /
			section > <
			MidiPanel midi = {
				midi
			}
			updateMidi = {
				this.osc.setMidi
			}
			setTime = {
				this.osc.setTime
			}
			global = {
				this.global
			}
			isPlayng = {
				this.state.isPlayng
			}
			currentState = {
				this.state.time
			}
			/> < /
			div >
		);
	}
}