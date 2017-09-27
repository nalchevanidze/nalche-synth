import React from "react";

const icon = {
    play: "M20 0 L 90 50 20 100Z",
    pause: "M30,100V0 M70,0v100",
    stop: "M5 5 L 95 5 95 95 5 95z"
}

const HeaderButton = ({ id, actions }) =>
    <svg
        viewBox={[0, 0, 100, 100]}
        width="20px"
        height="20px"
        onClick={actions[id]}
        style={{ 
            cursor: "pointer",
            padding:"5px"
        }}
    >
        <path
            stroke="#ffa929"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            d={icon[id]}
            fill="none"
        />
    </svg>
    ;

export default HeaderButton;