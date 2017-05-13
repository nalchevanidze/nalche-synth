import NalcheOscillator from "./Oscillator";
import Context from "./Context";

const nodes = []
function FreeNodes() {
    return nodes.filter( 
        node => !node.isActive() 
    );
}

function freeOscilator () {
    let free_nodes = FreeNodes();
    if (free_nodes.length < 1) {
        let new_node = NalcheOscillator(Context);
        nodes.push(new_node);
        return new_node;
    }
    return free_nodes[0];
};


function Note_to_freq( index ){
  index = Number(index);
  if( Number.isNaN(index) ) throw new Error("Invalid Note");
  let pow = ( index - 49 )/12 ;
  return  ( 2 ** pow )* 440;

}

function MyOSC(note) {
  
    const param = {
        freq: Note_to_freq( note ) || 880.0,
        attack: 0.15,
        release: 0.25
    };

    let Oscilator = freeOscilator();
    Oscilator.start(param);
    return Oscilator;
}

export default function SynthPad () {
  const notes = {};

  function play (value){
    if( !notes[value] ){
      notes[value] = MyOSC(value);
    }
  }
  function stop (value) {
    if( notes[value] ){
      notes[value].end();
      delete notes[value];
    }
  };
  return {play,stop};
};