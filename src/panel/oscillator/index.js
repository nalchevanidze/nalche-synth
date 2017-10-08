import React from "react";
import Controller from "../../Controller";
import WaveForm from "../../audio/oscillator/WaveForm";
import GridLine from "../GridLine";
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
	let p = (start + end) / 2;
	let wave = Array.from({ length: 200 }, (e, i) => (i + " " + WavePoint(i / 200)));
	return "M 0 " + p + " " + wave + " 200 " + p;
}
const styles = {
	main: {
		display: "flex",
		fontSize: "10px",
		alignItems: "flex-start"
	}
};
class PanelOscillator extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = Controller.wave;
		this.update = this.update.bind(this);
	}
	update(state) {
		this.setState(state);
	}
	render() {
		return (
			<div className="oscillator" style={styles.main} >
				<Panel
					label="global"
					size={2}
					color={"#CDDC39"}
				>
					<svg viewBox="-1 0 202 200" width="100px" height="100px" >
						<path
							d={GenerateWave()}
							stroke="#CDDC39"
							strokeWidth={2}
							fill="none"
						/>
						<GridLine />
					</svg>
				</Panel>
				<Panel
					label="Oscillator"
					size={3}

					list={[
						{ id: "sine" },
						{ id: "square" },
						{ id: "saw" },
						{ id: "saw2" },
						{ id: "tech" },
						{ id: "noise" },
						{ id: "offset" },
						{
							id: "voices",
							range: {
								min: 1,
								max: 12
							},
							steps: 11
						},
						{
							id: "pitch",
							range: {
								min: -4,
								max: 4
							},
							steps: 8
						},
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
					color={"#FF5722"}
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
					isActive={Controller.filter.on}
					onOff={() => {
						Controller.filter.on = !Controller.filter.on;
						this.setState({ i: Math.random() });
					}}
				/>
			</div >
		);
	}
}

export default PanelOscillator;