import React from "react";
import Controller from "../../Controller";
import EnvelopeGraphic from './EnvelopeGraphic';
import ButtonWave from "../ButtonWave";



class PanelEnvelope extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { active: "volume" };
    }
    switch(active) {
        this.setState({ active });
    }
    render() {
        let { active } = this.state;
        let {  envelope , env } = Controller;
        return (
            <div className="envelope" >
                <h1> envelope </h1>
                <div className="selector" >
                    <button
                        onClick={() => this.switch("volume")}
                        className={active=="volume"?"active":""}
                    >
                        volume
                    </button>
                    <button
                        onClick={() => this.switch("filter")}
                        className={active=="filter"?"active":""}
                    >
                        filter
                    </button>
                </div>
                <EnvelopeGraphic state={
                    (
                        active == "filter") ?
                        env.filter: envelope
                    } 
                />
            </div>
        );
    }
}

export default PanelEnvelope;