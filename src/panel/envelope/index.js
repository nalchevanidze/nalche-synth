import React from "react";
import Controller from "../../Controller";
import EnvelopeGraphic from './EnvelopeGraphic';
import ButtonWave from "../ButtonWave";


class PanelEnvelope extends React.Component {
    render() {
        let { release, attack, decay, sustain } = Controller.envelope;
        return (
            <div className="envelope" >
                <h1> envelope </h1>
                <EnvelopeGraphic {...Controller.envelope} />
            </div>
        );
    }
}

export default PanelEnvelope;