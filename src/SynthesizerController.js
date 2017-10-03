import NalcheOscillator from "./oscillator";
const Main = NalcheOscillator();
export default function SynthPad() {

	function play(value) {
		Main.newNote(value);
	}

	function stop(value) {
		Main.endNote(value);
	}

	function stopAll() {
		Main.endAll();
	}

	return {
		playMidi(){
			Main.play();
		},
		play,
		stop,
		stopAll,
		notes: Main.notes
	};
}
