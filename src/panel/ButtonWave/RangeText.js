import React from "react";


const rangeFunc = ({ min, max }, x) => {
	let size = (max - min);
	return Math.floor(min + x * size);
};

const RangeText = ({ color, range, value }) =>
	<text
		x="50"
		y="65"
		fontSize="40px"
		textAnchor="middle"
		fill={color}
		style={{userSelect: "none"}}
	>
		{
			rangeFunc(range, value)
		}
	</text>
	;
export default RangeText;