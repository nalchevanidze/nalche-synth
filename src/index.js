import React from "react";
import SynthesizerController from "./SynthesizerController";
import Octave from "./panel/Octave";
import Panel from "./panel";
import midiPlayer from "./midiPlayer";
import MidiPanel from "./midiPanel";

const keymap = ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", "q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u"];


export default class Synth extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            range: 2, 
            active: Array.from({ length: 24 }, e=>false) 
            
        };
        this.keyPress = this.keyPress.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.osc = SynthesizerController();
        this.midi = new midiPlayer({
            play: this.keyPress,
            stop: this.keyUp
        });

    }

    keyPress(e) {

        if (typeof e !== "number") {
            e = keymap.indexOf(e.key);
            if (e === -1) return;
        }
        this.state.active[e] = true;
        this.osc.play(e + this.state.range * 12);
        this.setState({ ha: Math.random() });

    }

    keyUp(e) {
        if (typeof e !== "number") {
            e = keymap.indexOf(e.key);
            if (e === -1) return;
        }
        this.state.active[e] = false;
        this.osc.stop(e + this.state.range * 12);
        this.setState({ ha: Math.random() });
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyPress);
        document.addEventListener("keyup", this.keyUp);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPress);
        document.removeEventListener("keyup", this.keyUp);
    }

    midiActive() {

        console.log("ssf")

        if (!this.midi) {
            this.midi = true

            this.midiController.stop = this.keyUp;
            this.midiController.start = this.keyPress;


        } else {

            this.midiController.stop = () => {};
            this.midiController.start = () => {};
            this.midi = false

        }



    }

    render() {
        return (
            <div className="nalche-synth" >
            <div className='page piano' >
               <section className="keyboard">
                    <Panel />
                    <input 
                       type="range" 
                       min="-1" 
                       max="5" 
                       step="1" 
                       value={this.state.range}
                       onChange={ (event)=>{
                           this.setState({
                               range: event.target.value
                           })
                       }} 
                    />
                    <label> pitch </label>
                    <ul>
                    <Octave index={0} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                    <Octave index={1} press={this.keyPress} up={this.keyUp} active={this.state.active}/>
                    <Octave index={2} press={this.keyPress} up={this.keyUp} active={this.state.active}/>
                    </ul>
               </section>
            </div>
            <section className="playStop" >
                 <button onClick={ ()=>this.midi.play() }  >play</button>
                 <button onClick={ ()=>this.midi.stop() }  >stop</button>
            </section>
            <MidiPanel {...this.midi} />
            </div>
        );
    }

};
