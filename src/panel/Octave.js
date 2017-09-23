import React from "react";

const keys = [
  { id: "C" },
  { semi: true, id: "C#" },
  { id: "D" },
  { semi: true, id: "D#" },
  { id: "E" },
  { id: "F" },
  { semi: true, id: "F#" },
  { id: "G" },
  { semi: true, id: "G#" },
  { id: "A" },
  { semi: true, id: "A#" },
  { id: "B" }

];

export default class Octave extends React.PureComponent {
  render() {

    let { index, active = [], press, up } = this.props;
    return (
      <li>
        {
          keys.map(({ id, semi }, i) =>
            <button key={i} className={(semi && "black" || "") + " " + (active[index * 12 + i] && "active" || "")} id={index * 12 + i}
              onTouchStart={press.bind(this, index * 12 + i)}
              onTouchEnd={press.bind(this, index * 12 + i)}
              onMouseDown={press.bind(this, index * 12 + i)}
              onMouseUp={up.bind(this, index * 12 + i)}
            >
              {id}
            </button>
          )
        }
      </li>
    );
  }
}