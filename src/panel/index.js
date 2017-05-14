import React from "react";
import PanelOscillator from "./oscillator";
import PanelEnvelope from "./envelope";

const Panel = ()=>
    <div className="panel">
        <PanelOscillator />
        <PanelEnvelope  />
    </div>;

export default Panel;