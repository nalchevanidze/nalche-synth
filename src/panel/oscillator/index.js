import React from "react";

import Controller from "../../Controller";
import WaveForm from "../../oscillator/WaveForm";

import GridLine from "../GridLine";
import ButtonWave from "../ButtonWave";
import PitchButton from "../ButtonWave/PitchButton";

const WavePoint = index => (
	1 - WaveForm(
		(index + Controller.wave.offset) % 1
		,
		Controller.wave
	)
) * 100;

function GenerateWave() {

	let end = WavePoint(0);
	let start = WavePoint(1);
	let p = (start + end) / 2
	let wave = Array.from({ length: 200 }, (e, i) => (i + " " + WavePoint(i / 200)));
	return "M 0 " + p + " " + wave + " 200 " + p;
}

class PanelOscillator extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = Controller.wave;
		this.change = this.change.bind(this);
		this.update = this.update.bind(this);
	}
	update(state) {
		this.setState(state);
	}
	componentWillMount() {
		this.live = true;
	}
	componentWillUnmount() {
		this.live = false;
	}
	change({ target }) {
		Controller.wave[target.name] = Number(target.value);
	}
	render() {
		let { release, attack, decay, sustain } = Controller.envelope;
		return (
			<div className="oscillator">
				<div className="global" >
					<h1> global </h1>
					<svg viewBox="-1 0 202 200" width="100px" height="100px" >
						<path
							d={GenerateWave()}
							stroke="#CDDC39"
							strokeWidth={2}
							fill="none"
						/>
						<GridLine />
					</svg>
					<PitchButton
						id="pitch"
						target={{ pitch: this.props.pitch }}
						onChange={this.props.changePitch}
						color={"#CDDC39"}
						steps={8}
					/>
					<p>pitch</p>
				</div>
				<div className="controllers" >
					<h1> Oscillator </h1>
					<ButtonWave color={"#ffa929"} id="sine" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="square" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="saw" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="saw2" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="tech" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="noise" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="offset" target={Controller.wave} onChange={this.update} />
					<ButtonWave color={"#ffa929"} id="voices" target={Controller.wave} onChange={this.update} />
				</div>
				<div className="fm" >
					<h1> FM </h1>
					<ButtonWave
						id="fm"
						color="#2196f3"
						target={Controller.wave}
					/>
					<p>Amount</p>
					<ButtonWave
						id="fmFreq"
						target={Controller.wave}
						color="#2196f3"
					/>
					<p>frequency</p>

				</div>
				<div className="fm"  >
					<h1> Filter </h1>
					<ButtonWave
						id="cutoff"
						target={Controller.filter}
						color="#2196f3"
					/>
					<p>cutoff</p>
					<ButtonWave
						id="resonance" 
						target={Controller.filter}
						color="#2196f3"  
					/>
					<p>resonance</p>
				</div>
			</div>
		);
	}
}

export default PanelOscillator;