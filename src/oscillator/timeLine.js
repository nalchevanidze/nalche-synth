import Context from "../Context";
const { sampleRate } = Context;
let bpm = 130;
let qartel = 1 / (60 * sampleRate / (bpm * 8));

let counter = 0;
let index = 0;

import createMelodySet from "../midi/createMelodySet";
import melody from "../standartMidi";

let myMidi = createMelodySet(melody);
const midi = myMidi;
let endIndex = 128 || midi.length;



function PlayTask(task, main) {

	task.start.forEach(
		e =>
			main.setNote(e + 12)


	);
	task.end.forEach(
		e =>
			main.unsetNote(e + 12)

	);

}

export default function timeLine(main) {

	if (main.dead) {
		return null;
	}
	counter += qartel;
	if (counter > 1) {

		if (index >= endIndex) {
			index = 0;
		}

		if (midi[index]) {
			PlayTask(midi[index], main);
		}

		index++;
		counter = 0;
		const update = () => {
			main.update(index);
		};
		requestAnimationFrame(update);
	}

}
