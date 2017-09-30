import React from "react";
const color = "#FFEB3B";
const GridLine = () =>
	<g className="grid-line">
		<defs>
			<pattern width="100" height="100" patternUnits="userSpaceOnUse" id="grid">
				<g stroke={color} fill="none" strokeWidth={0.3} strokeOpacity={0.3} >
					<pattern width="10" height="10" patternUnits="userSpaceOnUse" id="s-grid">
						<path strokeWidth={0.3} d="M 10 0 L 0 0 0 10 0 0" />
					</pattern>
					<path d="M 100 0 L 0 0 0 100 0 0" />
					<rect width="100" height="100" fill="url(#s-grid)" />
				</g>
			</pattern>
		</defs>
		<rect 
			width="100%" 
			height="100%" 
			fill="url(#grid)" 
			className="grids" 
		/>
	</g>;

export default GridLine;