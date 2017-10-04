import React from "react";

export default class Quarter extends React.PureComponent {
	render() {
		const quard = this.props.quard;
		return (
			<g fill={this.props.color || "#f75927"} >
				{
					quard.map(
						(note, noteIndex) =>
							<g key={noteIndex} >
								<rect
									onTouchStart={(event) => this.props.mouseDown(note, event)}
									onMouseDown={(event) => this.props.mouseDown(note, event)}
									width={5 * note.length}
									height={10}
									stroke="#000"
									strokeWidth={0.25}

									x={note.position * 5}
									y={360 - note.i * 10}
								/>
								<rect
									width={5}
									height={10}
									fill={"gray"}
									fillOpacity={0.1}
									onTouchStart={(event) => this.props.resize && this.props.resize(note, event)}
									onMouseDown={(event) => {

										if (this.props.resize) {
											this.props.resize(note, event);
										}
									}}
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
		);
	}
}