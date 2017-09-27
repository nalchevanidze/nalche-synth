import React from "react";
const gridSize = 40;
function randomName() {

    return "TimelinePattern" + [0, 0, 0, 0, 0, 0, 0].map(
        () => String.fromCharCode(65 + Math.random() * 25)
    ).join("");
}

const parent = randomName();
const child = randomName();
const stroke = "#ffa929";
const background = "#555";

const TimelinePattern = () =>
    <g>
        <defs>
            <pattern
                width="10"
                height="20"
                patternUnits="userSpaceOnUse"
                id={child}
            >
                <line
                    x1={1}
                    x2={1}
                    y1={0}
                    y2={5}
                    stroke={stroke}
                    strokeWidth={0.5}
                />

            </pattern>

            <pattern
                width={gridSize}
                height={20}
                patternUnits="userSpaceOnUse"
                id={parent}
            >
                <rect
                    width={gridSize}
                    height={20}
                    fill={background}
                />
                <rect
                    width={gridSize}
                    height={20}
                    fill={"url(#" + child + ")"}
                />
                <line
                    x1={1}
                    x2={1}
                    y1={0}
                    y2={10}
                    stroke={stroke}
                    strokeWidth={1}
                />
            </pattern>
        </defs>
        <rect
            width="100%"
            height={20}
            y={-20}
            fill={"url(#" + parent + ")"}
        />
    </g>
    ;

export default TimelinePattern;