import React from "react";
import lib from "./icons";
import TextWrapper from "./TextWrapper";
import CirclerangeButton from "./CirclerangeButton";

export default class ButtonWave extends React.PureComponent {
	render() {
		return (
			<TextWrapper {...this.props} >
				<CirclerangeButton {...this.props}>
					<g fill="none" >
						<path
							d={lib[this.props.id]}
							strokeWidth={2}
							stroke={this.props.color}
						/>
					</g>
				</CirclerangeButton>
			</TextWrapper >
		);
	}

}