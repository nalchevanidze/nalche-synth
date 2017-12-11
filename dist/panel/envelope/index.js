"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EnvelopeGraphic_1 = require("./EnvelopeGraphic");
const styles = {
    button: {
        outline: "none",
        background: "none",
        border: "1px solid #222",
        width: "50%"
    },
    nav: {
        marginTop: "10px",
        width: "80%"
    }
};
const Button = ({ id, active, onClick }) => React.createElement("button", { style: Object.assign({}, styles.button, { color: (id === active) ? "#FFA928" : "gray" }), onClick: () => onClick(id) }, id);
const DisplayPanel_1 = require("../DisplayPanel");
class PanelEnvelope extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { active: "gain" };
        this.switch = this.switch.bind(this);
    }
    switch(active) {
        this.setState({ active });
    }
    render() {
        let { active } = this.state;
        let { filter, gain } = this.props.env;
        let selectedEnvelope = (active === "filter") ? filter : gain;
        return (React.createElement(DisplayPanel_1.default, { label: "envelope", size: 3 },
            React.createElement("div", { style: styles.nav },
                React.createElement(Button, { id: "gain", active: active, onClick: this.switch }),
                React.createElement(Button, { id: "filter", active: active, onClick: this.switch })),
            React.createElement(EnvelopeGraphic_1.default, { state: selectedEnvelope })));
    }
}
exports.default = PanelEnvelope;
