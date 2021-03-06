import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";
import Sequencer from "./Sequencer";
import Controller from "../Controller";

export default class Panel extends React.PureComponent {
	render() {
		return (
			<div
				style={{
					display: "flex",
					padding: "5px"
				}}
			>
				<PanelOscillator 
					{...this.props.oscSettings} 
					preset={this.props.preset}
				/>
				<div>
					<PanelEnvelope env={this.props.oscSettings.env} />
					<Sequencer
						seq={this.props.oscSettings.sequence} 
						setSequence={this.props.setSequence}
						settings={this.props.oscSettings}
					/>
				</div>
			</div>
		);
	}
}

