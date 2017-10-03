import React from "react";
import Octave from "./panel/Octave";
import Panel from "./panel";
import MidiPanel from "./midiPanel";
import keymap from "./keymap";
import NalcheOscillator from "./oscillator";

function keyEvent(target, type) {
	const name = (type ? "add" : "remove") + "EventListener";
	document[name]("keydown", target.keyPress);
	document[name]("keyup", target.keyUp);
}
import midi from "./standartMidi";

export default class Synth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: Array.from({ length: 24 }, e => false),
			time: 0,
		};
		this.keyPress = this.keyPress.bind(this);
		this.keyUp = this.keyUp.bind(this);

		this.osc = NalcheOscillator(
			(time, active) => {
				this.setState(
					{
						time,
						active
					}
				);
			}
		);
		this.global = {
			setBPM: () => { },
			BPM: () => 128,
			stop: () => this.stop(),
			pause: () => this.pause(),
			play: () => {
				this.setState({ isPlayng: true });
				this.osc.play();
			}
		};
	}
	keyPress(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key);
			if (e === -1) {
				return;
			}
		}
		this.osc.setNote(e);
		this.setState({});
	}
	keyUp(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key);
			if (e === -1) {
				return;
			}
		}
		this.osc.unsetNote(e);
		this.setState({});
	}
	pause() {
		this.osc.pause();
		this.setState({ isPlayng: false });
	}
	stop() {
		this.osc.stop();
		this.setState(
			{
				isPlayng: false,
				time: 0
			}
		);
	}
	componentDidMount() {
		keyEvent(this, true);
	}
	componentWillUnmount() {
		this.stop();
		keyEvent(this, false);
	}
	render() {
		return (
			<div
				className="nalche-synth"
				style={{
					display: "flex",
					position: "relative",
					justifyContent: "center",
					fontFamily: "sans-serif"
				}}
			>
				<section
					style={{
						boxShadow: "0px 5px 10px gray",
						width: "660px",
						height: "410px",
						borderRadius: "3px",
						background: "#333333"
					}}
				>
					<Panel />
					<ul

						style={{
							display: "flex",
							padding: "0px",
							margin: "0px"
						}}
					>
						<Octave index={0} press={this.keyPress} up={this.keyUp} active={this.state.active} />
						<Octave index={1} press={this.keyPress} up={this.keyUp} active={this.state.active} />
						<Octave index={2} press={this.keyPress} up={this.keyUp} active={this.state.active} />
					</ul>
				</section>
				<MidiPanel
					midi={midi}
					updateMidi={this.osc.setMidi}
					setTime={this.osc.setTime}
					global={this.global}
					isPlayng={this.state.isPlayng}
					currentState={this.state.time}
				/>
			</div >
		);
	}
}
