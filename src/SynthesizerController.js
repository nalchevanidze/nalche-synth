import NalcheOscillator from "./oscillator";
import Context from "./Context";
const nodes = []


function FreeNodes() {
  return nodes.filter(
    node => !node.isActive()
  );
}


function freeOscilator() {
  let free_nodes = FreeNodes();
  if (free_nodes.length < 1) {
    let new_node = NalcheOscillator(Context);
    nodes.push(new_node);
    return new_node;
  }
  return free_nodes[0];
};


function MyOSC(note) {
  let Oscilator = freeOscilator();
  Oscilator.start({
    note
  });
  return Oscilator;
}

export default function SynthPad() {
  const notes = {};

  function play(value) {
    if (!notes[value]) {
      notes[value] = MyOSC(value);
    }
  }

  function removeNote() {
    notes[value].end();
    delete notes[value];
  }

  function stop(value) {
    if (notes[value]) {
      notes[value].end();
      delete notes[value];
    }
  };

  function stopAll() {
    Object.keys(notes).forEach((note) => {
      stop(note)
    })
  }
  
  return {
    play,
    stop,
    stopAll
  };
};
