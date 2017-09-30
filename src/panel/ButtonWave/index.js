import React from "react";
import ReactDOM from "react-dom";
import lib from "./icons";

import CirclerangeButton from "./CirclerangeButton";

export default class ButtonWave extends React.PureComponent {
	render() {
		return (
			<div>
				<CirclerangeButton {...this.props}>
					<g fill="none" >
						<path
							d={lib[this.props.id]}
							strokeWidth={2}
							stroke={this.props.color}
						/>
					</g>
				</CirclerangeButton>
				<p
					style={{
						color: this.props.color,
						width: "100%",
						textAlign:"center"
					}}
				>{this.props.id}</p>
			</div>
		);
	}

}