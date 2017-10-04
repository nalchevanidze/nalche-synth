import React from "react";
import Octave from "./Octave";
export default class Keyboard extends React.Component {
	render() {
		let { keyPress, keyUp, active } = this.props;
		return (
			<ul
				style={{
					display: "flex",
					padding: "0px",
					margin: "0px"
				}}
			>
				{
					[1, 2, 3].map(
						i =>
							<Octave
							    key={i}
								index={i} 
								press={keyPress} 
								up={keyUp} 
								active={active}
							/>
					)
				}
			</ul>
		);
	}
}


