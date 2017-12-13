import * as React from "react";
import ButtonWave from "./ButtonWave";
import styled from "styled-components";
const styles = {
	panelHeader: {
		color: "#03A9F4",
		fontSize: "12px",
		margin: "0px",
		width: "100%",
		textAlign: "center",
		textTransform: "uppercase",
	}
};

const Container = styled.div`
	display: flex;
	margin: 5px;
	justify-content: space-around;
	flex-wrap: wrap;
	flex-shrink: 0;
`;

const Label = styled.h3`
	font-size: 12px;
	margin: 0px;
	width: 100%;
	text-align: center;
	text-transform: uppercase;
`;

export interface DisplayPanelProps {
	children: any[];
	label: string;
	size: number;
	//additional propertis
	onOff?: (any) => void;
	isActive?: boolean;
	onChange?: ({ }) => void;
	list?: any[];
	color?: string;
	target?: object;
}

const DisplayPanel = ({
	children,
	label,
	size = 1,
	target,
	onChange,
	onOff,
	isActive,
	//additional propertis
	color = "#2196f3",
	list = [],

}: DisplayPanelProps) =>
	<Container
		style={{
			width: (size * 50 + (size - 1) * 20) + "px",
			opacity: (onOff && !isActive) ? 0.3 : 1
		}}
	>
		<div style={{
			display: "flex",
			height: 10
		}}>{

				onOff ? <input
					type="checkbox"
					name="zutat"
					value="salami"
					onChange={onOff}
				/> : null

			}
			<Label style={{ color }}>{label}</Label>
		</div>
		<Container
			style={{
				width: (size * 50 + (size - 1) * 20) + "px"
			}}
		>
			{
				children
			}{
				list.map(
					(par, i) => <ButtonWave
						{...par}
						key={i}
						color={color}
						target={target}
						onChange={(stateChanges: {}) => {
							if (onChange) {
								onChange(stateChanges);
							}
						}}
					/>
				)
			}
		</Container>
	</Container >;

export default DisplayPanel;