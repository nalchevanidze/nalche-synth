import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";
import Sequencer from "./Sequencer";

export default class Panel extends React.PureComponent {
	render() {
		let { props } = this;
		return (
			<div
				style={{
					display: "flex",
					padding: "5px"
				}}
			>
				<PanelOscillator {...props} />
				<div>
					<PanelEnvelope />
					<Sequencer
						seq={this.props.seq} 
						setSequence={this.props.setSequence}
					/>
				</div>
			</div>
		);
	}
}

