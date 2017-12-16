"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonWave_1 = require("./ButtonWave");
const styled_components_1 = require("styled-components");
const styles = {
    panelHeader: {
        color: "#03A9F4",
        fontSize: "12px",
        margin: "0px",
        width: "100%",
        textAlign: "center",
        textTransform: "uppercase",
    }
};
const Container = styled_components_1.default.div `
	display: flex;
	margin: 5px;
	justify-content: space-around;
	flex-wrap: wrap;
	flex-shrink: 0;
`;
const Label = styled_components_1.default.h3 `
	font-size: 12px;
	margin: 0px;
	width: 100%;
	text-align: center;
	text-transform: uppercase;
`;
const Button = styled_components_1.default.button `
	display: block;
	width:12px;
	height:12px;
	border-radius: 6px;
	margin: 2px;
	border: 3px solid #894a36;
	padding: 0px;
	background: ${(props) => props.isActive ? "#FF5722" : "none"};
	&:focus{
		outline: none;
	}
`;
const TurnOnButton = () => React.createElement(Button, null);
const DisplayPanel = ({ children, label, size = 1, target, onChange, onOff, isActive, color = "#2196f3", list = [], }) => React.createElement(Container, { style: {
        width: (size * 50 + (size - 1) * 20) + "px",
    } },
    React.createElement("div", { style: {
            display: "flex",
            height: 10
        } },
        onOff ? React.createElement(Button, { onClick: onOff, color: color, isActive: isActive }) : null,
        React.createElement(Label, { style: { color } }, label)),
    React.createElement(Container, { style: {
            width: (size * 50 + (size - 1) * 20) + "px",
            opacity: (onOff && !isActive) ? 0.3 : 1
        } },
        children,
        list.map((par, i) => React.createElement(ButtonWave_1.default, Object.assign({}, par, { key: i, color: color, target: target, onChange: (stateChanges) => {
                if (onChange) {
                    onChange(stateChanges);
                }
            } })))));
exports.default = DisplayPanel;
