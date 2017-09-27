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

const sequence = [
    [1], [2], [3], [4], [], [],
    [1, 2, 3, 4], [], [],
    [1, 2, 3, 4], [], [],
    [1, 2, 3, 4], [],
    [1, 2, 3, 4], []
]




const midi = [
    "F1,G#2,C3",
    "G#1,G#2,C3",
    "A#1,A#2,D#2",
    "C#2,G#2,G#3",
].map(e => e.split(","));

export default class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: 0,
            active: Array.from({ length: 24 }, e => false),
            time: 0,
        };
        this.keyPress = this.keyPress.bind(this);
        this.keyUp = this.keyUp.bind(this);
        this.osc = SynthesizerController();
        this.changePitch = this.changePitch.bind(this);



        this.midi = new midiPlayer({
            play: this.keyPress,
            stop: this.keyUp,
            sequence,
            midi,
            component: (time) => {
                this.setState({ time })
            }
        });

        const midiplayer = this.midi;

        this.global = {
            setBPM: (event) => {

                this.midi.setBPM(event.target.value);

            },
            BPM: () => this.midi.BPM,
            play: () => { this.midi.play() },
            stop: () => this.stop(),
            pause: () => this.pause(),
            get isPlayng() {
                return (midiplayer.loop !== undefined)
            }
        };

    }
    keyPress(e) {
        if (typeof e !== "number") {
            e = keymap.indexOf(e.key);
            if (e === -1) return;
        }
        this.state.active[e] = true;
        this.osc.play(e + this.state.range * 12);
        this.setState({ time: this.midi.currentState });
    }
    keyUp(e) {
        if (typeof e !== "number") {
            e = keymap.indexOf(e.key);
            if (e === -1) return;
        }
        this.state.active[e] = false;
        this.osc.stop(e + this.state.range * 12);
        this.setState({ time: this.midi.currentState });
    }
    pause() {
        this.midi.pause();
        this.setState({
            active:
            this.state.active.map(() => false)
        });
        this.osc.stopAll();
    }
    stop() {
        this.midi.stop();
        this.pause();

    }
    componentDidMount() {
        this.midi.melody = this.props.midi || this.midi.melody;
        keyEvent(this, true);
    }
    componentWillUnmount() {
        this.midi.stop();
        keyEvent(this, false);
    }
    changePitch(value) {
        this.setState({
            range: Math.floor(value.pitch * 8 - 4)
        })
    }
    render() {
        return (
            <div
                className="nalche-synth"
                style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    fontFamily: "sans-serif"
                }}
            >
                <section
                    style={{
                        boxShadow: "0px 5px 10px gray",
                        width: "580px",
                        height: "410px",
                        borderRadius: "3px",
                        background: "#333333"
                    }}
                >
                    <Panel
                        pitch={(this.state.range + 4) / 8}
                        changePitch={this.changePitch}
                        seq={this.midi.seq}
                        updateMidi={this.midi.updateMidi}
                    />
                    <ul

                        style={{
                            display: "flex",
                            padding: "0px",
                            margin: "0px"
                        }}
                    >
                        <Octave index={0} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                        <Octave index={1} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                        <Octave index={2} press={this.keyPress} up={this.keyUp} active={this.state.active} />
                    </ul>
                </section>

                <MidiPanel {...this.midi} global={this.global}
                />
            </div >
        );
    }
};
