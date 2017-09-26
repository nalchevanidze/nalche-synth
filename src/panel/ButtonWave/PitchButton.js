
import React from "react";
import ReactDOM from "react-dom";
import CirclerangeButton from "./CirclerangeButton";

export default class ButtonWave extends React.PureComponent {
    render() {
        return (
            <CirclerangeButton {...this.props}>
                <text
                    x="50"
                    y="65"
                    fontSize="40px"
                    textAnchor="middle"
                    fill={
                        this.props.color
                        || "#222"
                    }
                >
                    {
                        this.props.target.pitch * 8 - 4
                    }
                </text>
            </CirclerangeButton>
        );
    }

}