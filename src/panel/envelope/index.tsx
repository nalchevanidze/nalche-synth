import * as React from "react";
import { EnvelopeStates, EnvelopeState } from "../../Controller";
import EnvelopeGraphic from "./EnvelopeGraphic";

const styles = {
	button: {
		outline: "none",
		background: "none",
		border: "1px solid #222",
		width: "50%"
	},
	nav: {
		marginTop: "10px",
		width: "80%"
	}
};

export type Options = "gain" | "filter";

export interface ButtonProps {
	id: Options;
	active: Options;
	onClick: (input: Options) => void;
}

export interface PanelEnvelopeProps {
	env: EnvelopeStates
}

export interface PanelEnvelopeState {
	active: Options;
}


const Button = ({ id, active, onClick }: ButtonProps) =>
	<button
		style={{
			...styles.button,
			color: (id === active) ? "#FFA928" : "gray"
		}}
		onClick={() => onClick(id)}
	>
		{id}
	</button >
	;

import Panel from "../DisplayPanel";



class PanelEnvelope extends React.PureComponent<PanelEnvelopeProps, PanelEnvelopeState> {
	constructor(props: PanelEnvelopeProps) {
		super(props);
		this.state = { active: "gain" };
		this.switch = this.switch.bind(this);
	}
	switch(active: Options) {
		this.setState({ active });
	}
	render() {
		let { active } = this.state;
		let { filter, gain } = this.props.env;
		let selectedEnvelope: EnvelopeState = (active === "filter") ? filter : gain;
		return (
			<Panel label="envelope" size={3} >
				<div style={styles.nav} >
					<Button id="gain" active={active} onClick={this.switch} />
					<Button id="filter" active={active} onClick={this.switch} />
				</div>
				<EnvelopeGraphic state={selectedEnvelope} />
			</Panel>
		);
	}
}

export default PanelEnvelope;