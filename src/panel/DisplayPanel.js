import React from "react";
const styles = {
	panel: {
		display: "flex",
		margin: "5px",
		justifyContent: "space-around",
		flexWrap: "wrap",
		flexShrink: 0
	},
	panelHeader: {
		color: "#03A9F4",
		fontSize: "12px",
		margin: "0px",
		width: "100%",
		textAlign: "center",
		textTransform: "uppercase",
	}
}

const DisplayPanel = ({
	children,
	label,
	size = 1
}) =>
	<div style={{
		...styles.panel,
		width: (size * 50 + (size - 1) * 20 )+"px"
	}}
	>
		<h1 style={styles.panelHeader} > {label} </h1>
		{
			children
		}
	</div>

export default DisplayPanel;