import React from "react";

const RangeText = ({ color, value }) =>
	<text
		x="50"
		y="65"
		fontSize="40px"
		textAnchor="middle"
		fill={color}
		style={{userSelect: "none"}}
	>
		{value}
	</text>
	;
export default RangeText;