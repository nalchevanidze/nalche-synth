import React from "react";

const GridLine = () => (
    <g className="grid-line">
        <defs>
            <pattern width="100" height="100" patternUnits="userSpaceOnUse" id="grid">
                <path d="M 100 0 L 0 0 0 100 0 0" />
                <pattern width="10" height="10" patternUnits="userSpaceOnUse" id="s-grid">
                    <path d="M 10 0 L 0 0 0 10 0 0" />
                </pattern>
                <rect width="100" height="100" fill="url(#s-grid)"></rect>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="grids"></rect>
    </g>
)

export default GridLine;