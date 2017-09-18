import React from "react";
const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
let list = [
    ...keys.map(note => note + "1"),
    ...keys.map(note => note + "2"),
    ...keys.map(note => note + "3"),
].reverse();

const Sequence = ({ onClick, active }) =>
    <li>
        {
            [1, 2, 3].reverse().map((index) =>
                <button
                    className={(index === active) ? "active" : ""}
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
        this.props.seq[i] = (this.props.seq[i] === index) ? 0 : index;
        this.props.updateMidi();
        this.setState({ value: Math.random() })
    }
    render() {
        return (
            <ul className="sequencer" >
                {
                    (this.props.seq).map((selectedIndex, i) =>
                        <Sequence
                            key={i}
                            active={selectedIndex}
                            onClick={(index) => this.setNew(i, index)}
                        />
                    )
                }
            </ul>
        )
    }
};