import React from "react";
import Octave from "./panel/Octave";
import Panel from "./panel";
import midiPlayer from "./midiPlayer";
import MidiPanel from "./midiPanel";
import keymap from "./keymap";
import NalcheOscillator from "./oscillator";

function keyEvent(target, type) {
	const name = (type ? "add" : "remove") + "EventListener";
	document[name]("keydown", target.keyPress);
	document[name]("keyup", target.keyUp);
}

const sequence = [
	[1], [2], [3], [4], [], [],
	[1, 2, 3, 4], [], [],
	[1, 2, 3, 4], [], [],
	[1, 2, 3, 4], [],
	[1, 2, 3, 4], []
];

import midi from "./standartMidi";

export default class Synth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			range: 1,
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

		this.changePitch = this.changePitch.bind(this);


		this.midi = new midiPlayer({
			play: this.keyboardSet.bind(this),
			stop: this.keyboardUnset.bind(this),
			sequence,
			midi,
			component: (time) => {
				this.midi.currentState = time;
				this.mid.index = time;
				this.setState({ time });

			}
		});

		this.global = {
			setBPM: (event) => {
				this.midi.setBPM(event.target.value);
			},
			BPM: () => this.midi.BPM,
			stop: () => this.stop(),
			pause: () => this.pause()
		};

		this.global.play = () => {
			this.setState({ isPlayng: true });
			this.osc.play();
		};

	}
	keyboardSet(e) {
		this.state.active[e] = true;
		this.setState({});
	}
	keyboardUnset(e) {
		this.state.active[e] = false;
		this.setState({});
	}
	keyPress(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key);
			if (e === -1) {
				return;
			}
		}
		this.osc.setNote(e);
		this.keyboardSet(e);
	}
	keyUp(e) {
		if (typeof e !== "number") {
			e = keymap.indexOf(e.key);
			if (e === -1) {
				return;
			}
		}
		this.osc.unsetNote(e);
		this.keyboardUnset(e);
	}
	pause() {
		//this.midi.pause();
		this.osc.stop();
		this.setState({ isPlayng: false });
	}
	stop() {
		this.global.isPlayng = false;
		this.osc.stop();
	}
	componentDidMount() {
		this.midi.melody = this.props.midi || this.midi.melody;
		keyEvent(this, true);
	}
	componentWillUnmount() {
		this.midi.stop();
		keyEvent(this, false);
	}
	changePitch(value) {
		this.setState({
			range: Math.floor(value.pitch * 8 - 4)
		});
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
					<Panel
						pitch={(this.state.range + 4) / 8}
						changePitch={this.changePitch}
						seq={this.midi.seq}
						updateMidi={this.midi.updateMidi}
					/>
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
					{...this.midi} 
					global={this.global}
					isPlayng={this.state.isPlayng}
					currentState={this.state.time}
				/>
			</div >
		);
	}
}
