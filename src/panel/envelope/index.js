import React from "react";
import Controller from "../../Controller";
import EnvelopeGraphic from './EnvelopeGraphic';

const WaveOption = ({ name, change, value }) =>
    <span>
        <label>{name}</label>
        <input value={value} type="range" min="0" max="1" name={name} step="0.05" onChange={change} />
    </span>;

class PanelEnvelope extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = Controller.wave;
        this.envelope = this.envelope.bind(this);
    }
    
    componentWillMount() {
        this.live = true;
    }
    
    componentWillUnmount() {
        this.live = false;
    }
    
    envelope({ target }) {
        Controller.envelope[target.name] = Number(target.value);
        this.setState( Controller.envelope );
    }
    
    render() {
        let { release, attack, decay, sustain } = Controller.envelope;
        return (
            <div className="envelope" >
                <h1> envelope </h1>
                <EnvelopeGraphic {...Controller.envelope} />
                <div className="controllers" >
                    <WaveOption name="attack" change={this.envelope} value={attack} />
                    <WaveOption name="decay" change={this.envelope} value={decay} />
                    <WaveOption name="sustain" change={this.envelope} value={sustain} />
                    <WaveOption name="release" change={this.envelope} value={release} />
                </div>
            </div>
        );
    }
    
}

export default PanelEnvelope;