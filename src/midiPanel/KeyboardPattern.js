import React from "react";
const gridSize = 40;
const KeyboardPattern = () =>
	<g>
		<defs>
			<pattern
				width="10"
				height="120"
				patternUnits="userSpaceOnUse"
				id="quart"
			>
				<rect
					y={0}
					fill="none"
					width="10"
					height="120"
					stroke="#000"
					strokeWidth={0.1}
				/>
			</pattern>
			<pattern
				width={gridSize}
				height="120"
				patternUnits="userSpaceOnUse"
				id="key"
			>
				<g
					stroke="black"
					fill="none"
					strokeWidth={0.2}
				>
					<line x1={0} x2={200} y1={1} y2={1} />
					<line x1={0} x2={200} y1={70} y2={70} />
					<line x1={gridSize} x2={gridSize} y1={0} y2={120} />
				</g>
				<g
					fill="black"
					fillOpacity="0.2"
				>
					<rect y={10} width={gridSize} height="10" />
					<rect y={30} width={gridSize} height="10" />
					<rect y={50} width={gridSize} height="10" />
					<rect y={80} width={gridSize} height="10" />
					<rect y={100} width={gridSize} height="10" />
				</g>

				<rect
					width={gridSize}
					height="120"
					fill="url(#quart)"
				/>
			</pattern>
		</defs>
		<rect width="100%" height={120*3} fill="url(#key)" className="grids" />
	</g>
				;
export default KeyboardPattern;