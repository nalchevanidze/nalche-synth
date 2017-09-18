import React from "react";
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
    ...keys.map(note => note + "1"),
    ...keys.map(note => note + "2"),
    ...keys.map(note => note + "3"),
].reverse();

const Sequence = ({ chord, active , onClick }) =>
    <li>
        {
            [1, 2, 3].reverse().map((index) =>
                <button
                    className={(chord.indexOf(index) !== -1) ? "active" : ""}
                    key={index}
                    onClick={() => onClick(index)}
                />
            )
        }
    </li>
    ;

export default class melody extends React.Component {
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
            <div className="sequencer window-panel" >
                <h3>sequencer</h3>
                <ul>
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
            </div>
        )
    }
};