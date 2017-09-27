import React from "react";
import noteDetector from "./noteDetector";
import standartMidi from "../standartMidi";

export default class Quarter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		}
		this.mouseDown = this.mouseDown.bind(this);
	}
	mouseDown(note, event) {
		const array = standartMidi[this.props.index];
		let arrayIndex = array.indexOf(note);
		array.splice(arrayIndex, 1);
		this.props.updateMidi();
		this.setState({ M: Math.random() });
	}
	render() {
		const quard = this.props.quard;
		return (
			<g>
				{
					quard.map(
						(note, noteIndex) =>
							<rect
								onTouchStart={(event) => this.mouseDown(note, event)}
								onMouseDown={(event) => this.mouseDown(note, event)}
								fill="#f75927"
								width={40 * note.length / 8}
								height={10}
								stroke="#000"
								strokeWidth={0.25}
								key={noteIndex}
								x={(this.props.index + note.at / 8) * 40}
								y={360 - noteDetector.indexOf(note) * 10}
							/>
					)
				}
			</g>
		)
	}
}