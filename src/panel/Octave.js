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

const Key = ({ index, active = [], press, up, semi, id }) => {

  return (
    <button
      className={(semi && "black" || "") + " " + (active[index] && "active" || "")} id={index}
      onTouchStart={press.bind(this, index)}
      onTouchEnd={press.bind(this, index)}
      onMouseDown={press.bind(this, index)}
      onMouseUp={up.bind(this, index)}
    >
      {id}
    </button>
  );
}

const styles = {
  listStyleType: "none",
  cursor: "pointer",
  display: "flex",
  position: "relative",
  width: "300px",
  userSelect: "none",
  justifyContent: "space-between",
  alignItems: "start"
}

const Octave = ({ index, ...props }) =>
  <li style={styles} >
    {
      keys.map(({ id, semi }, i) =>
        <Key {...props} id={id} semi={semi} index={index * 12 + i} key={i} />
      )
    }
  </li>
  ;

export default Octave;