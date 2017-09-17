import React from "react";

import Controller from "../../Controller" ;
import WaveForm from "../../oscillator/WaveForm";

import GridLine from "../GridLine";
import ButtonWave from "./ButtonWave";

const WavePoint =  index => (1 - WaveForm(index) )*100 ;
function GenerateWave() {
	let end = WavePoint(0);
	let start = WavePoint(1);
	let p = (start+end)/2
	let wave = Array.from({ length: 200 }, (e, i) => (i  +" "+ WavePoint(i / 200) ));
	return "M 0 "+p+" "+ wave +" 200 "+p;
}

class PanelOscillator extends React.Component {
	constructor(props){
		super(props);
		this.state  = Controller.wave ;
		this.change = this.change.bind(this);
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
	}
	render() {
		let {release , attack , decay , sustain } = Controller.envelope;
		return(
		<div className="oscillator">

				<div className="screen" >
					<h1> Oscillator </h1>
					<h4> Waveform </h4>
					<svg viewBox="-1 0 202 200" width="90px" height="90px" >
						<path d={GenerateWave()} stroke="#444" fill="none" strokeWidth={0.5} />
						<GridLine />
					</svg>
				</div>

				<div className="controllers" >
					<ButtonWave  id="sine" target={Controller.wave} />
					<ButtonWave  id="square" target={Controller.wave} />
					<ButtonWave  id="saw" target={Controller.wave} />
					<ButtonWave  id="saw2" target={Controller.wave} />
					<ButtonWave  id="tech" target={Controller.wave} />
					<ButtonWave  id="noise" target={Controller.wave} />
				</div>

				<div className="fm" >
					<h1> FM Modular </h1>
					<ButtonWave id="fm" target={Controller.wave} />
					<p>Amount</p>
					<ButtonWave id="fmFreq" target={Controller.wave} />
					<p>frequency</p>
					
				</div>
			</div>
		);
	}
}

export default PanelOscillator;