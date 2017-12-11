import React from "react";
import Controller from "../../Controller";
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

const Button = ({ id, active, onClick }) =>
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

class PanelEnvelope extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { active: "volume" };
		this.switch = this.switch.bind(this);
	}
	switch(active) {
		this.setState({ active });
	}
	render() {
		let { active } = this.state;
		let { filter , gain } = Controller.env;
		return (
			<Panel label="envelope" size={3} >
				<div style={styles.nav} >
					<Button id="volume" active={active} onClick={this.switch} />
					<Button id="filter" active={active} onClick={this.switch} />
				</div>
				<EnvelopeGraphic 
					state={
						(active === "filter") ? filter : gain
					}
				/>
			</Panel>
		);
	}
}

export default PanelEnvelope;