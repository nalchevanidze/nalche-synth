import React from "react";
import ButtonWave from "./ButtonWave";

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
};

const DisplayPanel = ({
	children,
	label,
	size = 1,
	list = [],
	color = "#2196f3",
	target,
	onChange
}) =>
	<div style={{
		...styles.panel,
		width: (size * 50 + (size - 1) * 20) + "px"
	}}
	>
		<h1
			style={{
				color: color,
				fontSize: "12px",
				margin: "0px",
				width: "100%",
				textAlign: "center",
				textTransform: "uppercase",
			}}
		>
			{
				label
			}
		</h1>
		{
			children
		}{
			list.map(
				(par, i) => <ButtonWave
					{...par}
					key={i}
					color={color}
					target={target}
					onChange={(...e) => {
						if (onChange) {
							onChange(...e);
						}
					}}
				/>
			)
		}
	</div>;

export default DisplayPanel;