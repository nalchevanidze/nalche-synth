import NalcheOscillator from "./oscillator";
import Context from "./Context";
const Main = NalcheOscillator(Context);
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
		play,
		stop,
		stopAll
	};
}
