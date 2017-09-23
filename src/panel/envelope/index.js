import React from "react";
import Controller from "../../Controller";
import EnvelopeGraphic from './EnvelopeGraphic';
import ButtonWave from "../ButtonWave";


class PanelEnvelope extends React.PureComponent  {
    render() {
        let { release, attack, decay, sustain } = Controller.envelope;
        return (
            <div className="envelope" >
                <h1> envelope </h1>
                <div className="selector" >
                   <button className="active" >volume</button>
                   <button>filter</button>
                </div>
                <EnvelopeGraphic {...Controller.envelope} />
            </div>
        );
    }
}

export default PanelEnvelope;