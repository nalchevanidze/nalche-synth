import NalcheOscillator from "./oscillator";
import Context from "./Context";
const nodes = [];
console.log(nodes);

function FreeNodes() {
	return nodes.filter(
		node => !node.eventTimes.live
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
}


function MyOSC(note) {
	let Oscilator = freeOscilator();
	Oscilator.start({
		note
	});
	return Oscilator;
}

const Main = freeOscilator();

export default function SynthPad() {
	const notes = {};

	function play(value){
	//	if(!notes[value]){
			Main.newNote(value);
	//	}
	}

	// function play(value) {
	// 	if (!notes[value]) {
	// 		notes[value] = MyOSC(value);
	// 	}
	// }

	function stop(value) {
		Main.endNote(value);
		// if (notes[value]) {
		// 	notes[value].end();
		// 	delete notes[value];
		// }
	}

	function stopAll() {
		Main.endAll();
		// Object.keys(notes).forEach((note) => {
		// 	stop(note);
		// });
	}
  
	return {
		play,
		stop,
		stopAll
	};
}
