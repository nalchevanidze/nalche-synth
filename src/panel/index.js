import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";
import Sequencer from "./Sequencer";

const Panel = (props) =>
    <div className="panel" >
        <PanelOscillator  {...props} />
        <div>
            <PanelEnvelope />
            <Sequencer seq={props.seq || []} updateMidi={props.updateMidi} />
        </div>
    </div>;

export default Panel;