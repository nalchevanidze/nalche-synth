import React from "react";
import CirclerangeButton from "./CirclerangeButton";
import TextWrapper from "./TextWrapper";
import RangeText from "./RangeText";


export default class ButtonWave extends React.PureComponent {
	render() {
		return (
			<TextWrapper {...this.props} >
				<CirclerangeButton {...this.props}>
					<RangeText
						{...this.props}
						range={{ min: -4, max: 4 }}
						value={this.props.target.pitch}
					/>
				</CirclerangeButton>
			</TextWrapper >
		);
	}

}