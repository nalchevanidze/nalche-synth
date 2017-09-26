import React from "react";

const keys = [
  { id: "C" },
  { semi: true, id: "C#", left: 9.2 },
  { id: "D" },
  { semi: true, id: "D#", left: 23.6 },
  { id: "E" },
  { id: "F" },
  { semi: true, id: "F#", left: 52.1 },
  { id: "G" },
  { semi: true, id: "G#", left: 66.5 },
  { id: "A" },
  { semi: true, id: "A#", left: 81.5 },
  { id: "B" }

].map(
  (key, i) => ({ ...key, i })
  );

const whiteKeys = keys.filter(e => !e.semi);
const blackKeys = keys.filter(e => e.semi);


const keyStyle = {
  default: {
    display: "block",
    border: "1px solid #c1c1c1",
    borderRadius: "2px",
    flexGrow: 0,
    boxShadow: "2px 10px 2px rgba(0, 0, 0, 0.1)",
    width: "14.2%",
    paddingTop: "180px",
    background: "white",

  }
}

keyStyle.black = {
  ...keyStyle.default,
  background: "black",
  width: "10%",
  position: "absolute",
  paddingTop: "140px"
}

const StyleBlack = {
  active: {
    ...keyStyle.black,
    background: "#333",
    paddingTop: "135px"
  },
  default: keyStyle.black
}


const StyleWhite = {
  default: keyStyle.default,
  active: {
    ...keyStyle.default,
    background: "#EEE",
    paddingTop: "170px"
  }
}


const Key = ({ index, active = [], press, up, style, left }) =>
  <button
    style={
      {
        ...(active[index] ? style.active : style.default),
        left

      }
    }
    onTouchStart={press.bind(this, index)}
    onTouchEnd={press.bind(this, index)}
    onMouseDown={press.bind(this, index)}
    onMouseUp={up.bind(this, index)}
  />
  ;


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
      whiteKeys.map(({ i }) =>
        <Key {...props} index={index * 12 + i} key={i} style={StyleWhite} />
      )
    }{
      blackKeys.map(({ i, left }) =>
        <Key {...props} left={left + "%"} index={index * 12 + i} key={i} style={StyleBlack} />
      )
    }

  </li>
  ;

export default Octave;