import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";
import Sequencer from "./Sequencer";

export default class Panel extends React.PureComponent {

    render() {
        let { props } = this;

        return (
            <div className="panel" >
                <PanelOscillator  {...props} />
                <div>
                    <PanelEnvelope />
                    <Sequencer seq={props.seq || []} updateMidi={props.updateMidi} />
                </div>
            </div>
        );
    }
}

