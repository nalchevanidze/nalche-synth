import React from "react";

import Controller from "../Controller" ;
import WaveForm from "../Oscillator/WaveForm";

import GridLine from "./GridLine";
import ButtonWave from "./ButtonWave";
import EnvelopeGraphic from './EnvelopeGraphic';

const WavePoint =  index => (1 - WaveForm(index) )*100 ;

function GenerateWave() {
    let end = WavePoint(0);
    let start = WavePoint(1);
    let p = (start+end)/2
    let wave = Array.from({ length: 200 }, (e, i) => (i  +" "+ WavePoint(i / 200) ));
    return "M 0 "+p+" "+ wave +" 200 "+p;

}

const WaveOption = ({ name , change , value }) =>
    <span>
        <label>{name}</label>
        <input value={value} type="range" min="0" max="1" name={name} step="0.05" onChange={ change } />
    </span>;

class PanelOscillator extends React.Component {
    constructor(props){
        super(props);
        this.state  = Controller.wave ;
        this.change = this.change.bind(this);
        this.envelope = this.envelope.bind(this);
        this.update = this.update.bind(this);
    }
    update(){
      if(!this.live) return ;
      this.setState({v:Math.random });
      setTimeout( this.update , 100 );
    }
    componentWillMount(){
      this.live = true;
      this.update();  
    }
    componentWillUnmount(){
       this.live = false;
    }
    change({target}){
        Controller.wave[ target.name ] = Number(target.value) ;
       // this.setState(  Controller.wave );
    }
    envelope({target}){
       Controller.envelope[ target.name ] = Number(target.value) ;
    }
    render() {
        let {release , attack , decay , sustain } = Controller.envelope;
        return(
        <div className="oscillator">
              
                 
                <div className="wave-form" >
                    <h1> Oscillator </h1>
                    <h4> Waveform </h4>
                    <svg viewBox="-1 0 202 200" width="90px" height="90px" >
                        <path d={GenerateWave()} stroke="#444" fill="none" strokeWidth={0.5} />
                        <GridLine />
                    </svg>
                </div>

                <div className="wave-controllers" >
                    <ButtonWave  id="sine" target={Controller.wave} />
                    <ButtonWave  id="square" target={Controller.wave} />
                    <ButtonWave  id="saw" target={Controller.wave} />
                    <ButtonWave  id="saw2" target={Controller.wave} />
                    <ButtonWave  id="tech" target={Controller.wave} />
                    <ButtonWave  id="noise" target={Controller.wave} />
                </div>
                <div className="fm-controllers" >
                    <h1> FM Modular </h1>
                    <ButtonWave id="fm" target={Controller.wave} />
                    <p>Amount</p>
                </div>
            
                <div className="envelope" >
                    <div className="envelope-form" >
                        <h4> envelope </h4>
                        <EnvelopeGraphic {...Controller.envelope} />
                    </div>
                    <div>
                      <WaveOption name="attack" change={this.envelope} value={attack}  />
                      <WaveOption name="decay" change={this.envelope} value={decay}  /> 
                      <WaveOption name="sustain" change={this.envelope} value={sustain}  /> 
                      <WaveOption name="release" change={this.envelope} value={release}  />
                    </div>
                </div>
            </div>
        );
    }
}


export default PanelOscillator;