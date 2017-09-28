import React from "react";
import noteDetector from "./noteDetector";
import standartMidi from "../standartMidi";

export default class Quarter extends React.Component {
	render() {
		const quard = this.props.quard;
		return (
			<g fill={this.props.color || "#f75927"} >
				{
					quard.map(
						(note, noteIndex) =>
							<rect
								onTouchStart={(event) => this.props.mouseDown(note, event)}
								onMouseDown={(event) => this.props.mouseDown(note, event)}
								width={40 * note.length / 8}
								height={10}
								stroke="#000"
								strokeWidth={0.25}
								key={noteIndex}
								x={(note.index + note.at / 8) * 40}
								y={360 - noteDetector.indexOf(note) * 10}
							/>
					)
				}
			</g>
		)
	}
}