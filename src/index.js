import React from "react";
import SynthesizerController from "./SynthesizerController";
import Octave from "./panel/Octave";
import Panel from "./panel";
import midiPlayer from "./midiPlayer";
import MidiPanel from "./midiPanel";
import keymap from "./keymap";

function keyEvent(target, type) {
    const name = (type ? "add" : "remove") + "EventListener";
    document[name]("keydown", target.keyPress);
    document[name]("keyup", target.keyUp);
}

export default class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: 0,
            active: Array.from({ length: 24 }, e => false)
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
    stop() {
        this.midi.stop()
        this.osc.stopAll();
        this.setState({
            active:
            this.state.active.map(() => false)
        });
    }
    componentDidMount() {
        keyEvent(this, true);
    }
    componentWillUnmount() {
        this.midi.stop();
        keyEvent(this, false);
    }
    render() {
        return (
            <div className="nalche-synth" >
                <div className='page piano' >
                    <section className="keyboard">
                        <Panel />
                        <div className="pitch">
                            <input
                                type="range"
                                min="-1"
                                max="5"
                                step="1"
                                value={this.state.range}
                                onChange={(event) => {
                                    this.setState({
                                        range: event.target.value
                                    })
                                }}
                            />
                            <label> pitch </label>
                        </div>
                        <ul className="midi-keys" >
                            <Octave index={0} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                            <Octave index={1} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                            <Octave index={2} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                        </ul>
                    </section>
                </div>
                <section className="playStop" >
                    <button onClick={() => this.midi.play()}  >play</button>
                    <button onClick={() => this.stop()}  >stop</button>
                </section>
                <MidiPanel {...this.midi} />
            </div>
        );
    }
};
