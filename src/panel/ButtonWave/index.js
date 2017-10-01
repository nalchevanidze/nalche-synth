import React from "react";
import lib from "./icons";
import TextWrapper from "./TextWrapper";
import CirclerangeButton from "./CirclerangeButton";
import RangeText from "./RangeText";


const Swithcer = ({ range, ...props }) => range ?
	<RangeText
		{...props}
		range={range}
		value={props.target[props.id]}
	/>
	:
	<g fill="none" >
		<path
			d={lib[props.id]}
			strokeWidth={2}
			stroke={props.color}
		/>
	</g>
	;

export default class ButtonWave extends React.PureComponent {
	render() {
		return (
			<TextWrapper {...this.props} >
				<CirclerangeButton {...this.props}>
					<Swithcer {...this.props} />
				</CirclerangeButton>
			</TextWrapper >
		);
	}

}