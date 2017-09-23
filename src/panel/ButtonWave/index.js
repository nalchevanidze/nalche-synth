import React from "react";
import ReactDOM from "react-dom";
import lib from "./icons";

import CirclerangeButton from "./CirclerangeButton";

export default class ButtonWave extends React.PureComponent {
	render() {
		return (
			<CirclerangeButton {...this.props}>
				<g fill="none" >
					<path
						d={lib[this.props.id]}
						strokeWidth={2}
					/>
				</g>
			</CirclerangeButton>
		);
	}

}