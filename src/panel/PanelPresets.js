import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
	margin: 5px;
	justify-content: space-around;
	flex-wrap: wrap;
	flex-shrink: 0;
	background:#333333;
	padding:10px;
`;

const Label = styled.h3`
	font-size: 12px;
	margin: 0px;
	width: 100%;
	text-align: center;
	text-transform: uppercase;
	color: rgb(205, 220, 57);
	padding:10px 0px;
`;

export interface PanelPresetsProps {
	data: {
		[key: string]: Object
	};
	active: string;
}

const Button = styled.button`
	display:block;
	color: white;
	background:none;
	outline: none;
	border: none;
	padding:5px;
	width:100%;
	text-align:center;
	&:hover{
		background: #444;
	}
`;


const PanelPresets = ({
	data = [],
	active,
	setPreset
}: PanelPresetsProps) =>
	<Container>
		<Label>Presets</Label>
		<div>
			{
				Object.keys(data).map(
					(name, i) =>
						<Button
							key={i}
							style={{
								color: name === active ? "red" : "gray"
							}}
							onClick={() => setPreset(name)}
						>
							{name}
						</Button>
				)
			}
		</div>
	</Container >;

export default PanelPresets;