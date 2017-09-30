import React from "react";
import Controller from "../../Controller";
import WaveForm from "../../oscillator/WaveForm";
import GridLine from "../GridLine";
import ButtonWave from "../ButtonWave";
import PitchButton from "../ButtonWave/PitchButton";
import Panel from "../DisplayPanel";

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
const styles = {
	main: {
		display: "flex",
		fontSize: "10px",
		color: "#2287f4"
	}
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
			<div className="oscillator" style={styles.main} >
				<Panel label="global" size={2} >
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
				</Panel>
				<Panel
					label="Oscillator"
					size={2}
					list={[
						{ id: "sine" },
						{ id: "square" },
						{ id: "saw" },
						{ id: "saw2" },
						{ id: "tech" },
						{ id: "noise" },
						{ id: "offset" },
						{ id: "voices" },
					]}
					target={Controller.wave}
					onChange={this.update}
					color={"#ffa929"}

				/>
				<Panel
					label="FM"
					list={[
						{ id: "fm" },
						{ id: "fmFreq" }
					]}
					target={Controller.wave}
					color={"#2196f3"}
				/>
				<Panel
					label="Filter"
					list={[
						{ id: "cutoff" },
						{ id: "resonance" },
						{ id: "envelope" }
					]}
					target={Controller.filter}
					color={"#2196f3"}
				/>
			</div >
		);
	}
};

export default PanelOscillator;