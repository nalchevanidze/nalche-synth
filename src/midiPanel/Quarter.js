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
							<g>
								<rect
									onTouchStart={(event) => this.props.mouseDown(note, event)}
									onMouseDown={(event) => this.props.mouseDown(note, event)}
									width={5 * note.length}
									height={10}
									stroke="#000"
									strokeWidth={0.25}
									key={noteIndex}
									x={note.position * 5}
									y={360 - note.i * 10}
								/>
								<rect
									width={5}
									height={10}
									fill={"gray"}
									fillOpacity={0.1}
									style={{
										cursor: "e-resize"
									}}
									key={"s" + noteIndex}
									x={(note.position + note.length - 1) * 5}
									y={360 - note.i * 10}
								/>
							</g>
					)
				}
			</g>
		)
	}
}