import React from "react";
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
    ...keys.map(note => note + "1"),
    ...keys.map(note => note + "2"),
    ...keys.map(note => note + "3"),
].reverse();

let stepSize = 8;

const Sequence = ({ chord, active, onClick }) =>
    <li

        style={{
            width: stepSize + "px",
            listStyle: "none",
            border: "1px solid #333"
        }}

    >
        {
            [1, 2, 3, 4].reverse().map((index) =>
                <button
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        borderBottom: "1px solid #333",
                        height: stepSize + "px",
                        display: "block",
                        background: (chord.indexOf(index) !== -1) ? "#ffa929" : "#555"

                    }}
                    key={index}
                    onClick={() => onClick(index)}
                />
            )
        }
    </li>
    ;

import Panel from "./DisplayPanel";


export default class Sequencer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    setNew(i, index) {

        const chord = this.props.seq[i];

        const chordIndex = chord.indexOf(index);
        if (chordIndex === -1) {
            chord.push(index);
        } else {
            chord.splice(chordIndex, 1);
        }
        this.props.updateMidi();
        this.setState({ value: Math.random() })
    }
    render() {
        return (
            <Panel label="sequencer" size={3} >
                <ul
                    style={{
                        display: "flex",
                        margin: "0px",
                        padding: "0px"
                    }}

                >
                    {
                        this.props.seq.map((chord, i) =>
                            <Sequence
                                key={i}
                                chord={chord}
                                onClick={(index) => this.setNew(i, index)}
                            />
                        )
                    }
                </ul>
            </Panel >
        )
    }
};