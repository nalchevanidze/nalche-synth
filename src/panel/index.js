import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";

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
				</div>
			</div>
		);
	}
}

