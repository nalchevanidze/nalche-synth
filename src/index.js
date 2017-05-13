import React from "react";
import SynthesizerController from "./SynthesizerController";
import css from "./Styles/index.scss";
import Octave from "./panel/Octave";
import PanelOscillator from "./panel/PanelOscillator";

const keymap = ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"];
export default class Synth extends React.Component {
    constructor(props){
        super(props);
        this.state  = { active: Array.from( {length:24}, e=> false )  };
        this.keyPress = this.keyPress.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.osc = SynthesizerController();
    }
    keyPress(e){
      if(typeof e !== "number") { 
          e = keymap.indexOf(e.key);
         if (e === -1) return;
      }
      this.state.active[e] = true;
      this.osc.play(e + 24 );
      this.setState({ha:Math.random()});
      
    }
    keyUp(e){
      if(typeof e !== "number") { 
         e = keymap.indexOf(e.key);
         if (e === -1) return;
      }
      this.state.active[e] = false;
      this.osc.stop(e + 24);
      this.setState({ha:Math.random()});
    }
    componentDidMount(){
        document.addEventListener("keydown", this.keyPress );
        document.addEventListener("keyup", this.keyUp );
    }
    render() {
        return (
            <div className='page piano' >
               <section className="keyboard">
                   <div className="panel">
                      <PanelOscillator />
                    </div>
                    <ul>
                    <Octave index={0} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                    <Octave index={1} press={this.keyPress} up={this.keyUp} active={this.state.active}/>
                    </ul>
               </section>
            </div>
        );
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.keyPress );
        document.removeEventListener("keyup", this.keyUp );
    }
};



