import React from "react";
import KeyboardSVG from "./KeyboardSVG";

class Header extends React.PureComponent {
	render() {
		let { play, stop, setBPM, BPM } = this.props.global;
		return (
			<h3>
				<section className="playStop" >
					<button onClick={play}  >play</button>
					<button onClick={stop}  >stop</button>
				</section>
				<label>BPM</label>
				<input onChange={setBPM} defaultValue={BPM()} />
			</h3>
		)
	}
}

class MidiDesk extends React.PureComponent {
	render() {
		let { midi, updateMidi, global, currentState = 0 } = this.props;
		return (
			<div className="midi" >
				<KeyboardSVG currentState={currentState} updateMidi={this.props.updateMidi} />
			</div>
		)
	}
}

export default class melody extends React.PureComponent {
	render() {
		let { global } = this.props;
		return (
			<div className="midi-panel window-panel" >
				<Header global={global} />
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