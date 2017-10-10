import React from "react";
let stepSize = 8;
import Controller from "../Controller";

const Sequence = ({ chord, onClick }) =>
	<li

		style={{
			width: stepSize + "px",
			listStyle: "none",
			border: "1px solid #333"
		}}

	>
		{
			[1, 2, 3, 4].reverse().map((index) =>
				<button
					style={{
						width: "100%",
						border: "none",
						outline: "none",
						borderBottom: "1px solid #333",
						height: stepSize + "px",
						display: "block",
						background: (chord.indexOf(index) !== -1) ? "#ffa929" : "#555"

					}}
					key={index}
					onClick={() => onClick(index)}
				/>
			)
		}
	</li>
	;

import Panel from "./DisplayPanel";


export default class Sequencer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { seq: [] };
	}
	componentWillMount() {
		this.state.seq = this.props.seq;
	}
	setNew(i, index) {

		const chord = this.state.seq[i];
		const chordIndex = chord.indexOf(index);
		if (chordIndex === -1) {
			chord.push(index);
		} else {
			chord.splice(chordIndex, 1);
		}
		this.props.setSequence(this.props.seq);
		this.setState({ seq: [...this.state.seq] });
	}
	render() {
		return (
			<Panel
				label="sequencer"
				size={3}
				isActive={Controller.seq.on}
				onOff={() => {
					Controller.seq.on = !Controller.seq.on;
					this.setState({ i: Math.random() });
				}}
			>
				<ul
					style={{
						display: "flex",
						margin: "0px",
						padding: "0px"
					}}
				>
					{
						this.props.seq.map((chord, i) =>
							<Sequence
								key={i}
								chord={chord}
								onClick={(index) => this.setNew(i, index)}
							/>
						)
					}
				</ul>
			</Panel >
		);
	}
}