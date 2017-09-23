import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";

const Panel = (props) =>
    <div className="panel" >
        <PanelOscillator  {...props} />
        <PanelEnvelope />
    </div>;

export default Panel;