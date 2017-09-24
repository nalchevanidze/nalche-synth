import React from "react";
const KeyboardPattern = () =>
<g>
    <defs>
        <pattern
            width="50"
            height="120"
            patternUnits="userSpaceOnUse"
            id="key"
        >
            <g
                stroke="black"
                fill="none"
                fillOpacity="0.1"
                strokeOpacity="0.1"
                strokeWidth="0.5"
            >
                <rect y={0} width="50" height="10" />
                <rect y={20} width="50" height="10" />
                <rect y={40} width="50" height="10" />
                <rect y={50} width="50" height="10" />
                <rect y={70} width="50" height="10" />
                <rect y={90} width="50" height="10" />
                <rect y={110} width="50" height="10" />
                <g fill="black" >
                    <rect y={10} width="50" height="10" />
                    <rect y={30} width="50" height="10" />
                    <rect y={60} width="50" height="10" />
                    <rect y={80} width="50" height="10" />
                    <rect y={100} width="50" height="10" />
                </g>
            </g>
        </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#key)" className="grids" />
</g>
;
export default KeyboardPattern;