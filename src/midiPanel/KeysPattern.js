import React from "react";
const gridSize = 40;
const KeysPattern = () =>
	<g>
		<defs>
			<pattern
				width={gridSize}
				height="120"
				patternUnits="userSpaceOnUse"
				id="startkeys"
			>
				<rect width={gridSize} height={120} fill="white" />
				<g
					stroke="black"
					fill="none"
					strokeWidth={0.2}
				>
					<line x1={0} x2={200} y1={1} y2={1} />
					<line x1={0} x2={200} y1={70} y2={70} />
					<line x1={gridSize} x2={gridSize} y1={0} y2={120} />
				</g>
				<g fill="black">
					<rect y={10} width={gridSize} height="10" />
					<rect y={30} width={gridSize} height="10" />
					<rect y={50} width={gridSize} height="10" />
					<rect y={80} width={gridSize} height="10" />
					<rect y={100} width={gridSize} height="10" />
				</g>
			</pattern>
		</defs>
		<rect
			x={-20}
			width="20" 
			height={120 * 3}
			fill="url(#startkeys)" 
			stroke={"black"}
		/>


	</g>
				;
export default KeysPattern;